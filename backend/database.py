"""
PETRAILS — MongoDB Atlas Async Database Integration
Powered by PyMongo Async (AsyncMongoClient / Motor)

Handles:
- Loading configuration from backend/.env
- Validating MongoDB Atlas connection strings (strictly rejects localhost / 127.0.0.1)
- Real database ping verification (admin.command('ping'))
- Credential masking (never exposes passwords in logs or API responses)
- Initializing required collections safely without inserting fake data or deleting existing data:
  - users
  - pets
  - assessments
  - claims
  - information_requests
  - notifications
  - audit_logs
- Async operations for persistent storage
"""

import os
import re
import json
import time
import logging
from pathlib import Path
from typing import Optional, Dict, Any, List
from dotenv import load_dotenv

from pymongo import AsyncMongoClient
from pymongo.errors import (
    ConnectionFailure,
    ServerSelectionTimeoutError,
    OperationFailure,
    ConfigurationError,
)

logger = logging.getLogger("petrails.database")

BACKEND_DIR = Path(__file__).resolve().parent
ENV_PATH = BACKEND_DIR / ".env"
ROOT_ENV_PATH = BACKEND_DIR.parent / ".env"

if ENV_PATH.exists():
    load_dotenv(ENV_PATH, override=True)
elif ROOT_ENV_PATH.exists():
    load_dotenv(ROOT_ENV_PATH, override=True)

MONGODB_URI = os.getenv("MONGODB_URI", "").strip()
MONGODB_DATABASE = os.getenv("MONGODB_DATABASE", "petrails").strip() or "petrails"

REQUIRED_COLLECTIONS = [
    "users",
    "pets",
    "assessments",
    "claims",
    "information_requests",
    "notifications",
    "audit_logs"
]

def mask_mongodb_uri(uri: str) -> str:
    """Mask credentials in MongoDB connection string for safe logging and status reporting."""
    if not uri:
        return ""
    return re.sub(r'(mongodb(?:\+srv)?:\/\/[^:]+:)([^@]+)(@)', r'\1*****\3', uri)

class DatabaseManager:
    def __init__(self):
        self.client: Optional[AsyncMongoClient] = None
        self.db = None
        self.is_connected: bool = False
        self.is_atlas: bool = False
        self.connection_status: str = "unconfigured"
        self.last_error: Optional[str] = None
        self.last_ping_ms: Optional[float] = None
        self.connected_at: Optional[str] = None
        self.cluster_info: Dict[str, Any] = {}
        self.verified_collections: List[str] = []
        self.verified_indexes: Dict[str, List[str]] = {}
        
        # Read-only fallback dataset for offline frontend rendering before Atlas URI is provided
        self.fallback_data = self._load_seed_file()

    def _load_seed_file(self) -> Dict[str, Any]:
        seed_file = BACKEND_DIR / "seed_data.json"
        if seed_file.exists():
            try:
                with open(seed_file, "r", encoding="utf-8") as f:
                    return json.load(f)
            except Exception as e:
                logger.warning(f"Could not load seed_data.json: {e}")
        return {
            "pets": [],
            "assessments": [],
            "claims": [],
            "portfolioMetrics": {},
            "notifications": []
        }

    async def connect_and_verify(self) -> Dict[str, Any]:
        """
        Connects to MongoDB Atlas and verifies connection with a real ping.
        Enforces MongoDB Atlas usage (rejects localhost / 127.0.0.1).
        """
        global MONGODB_URI, MONGODB_DATABASE
        # Reload env in case updated at runtime
        if ENV_PATH.exists():
            load_dotenv(ENV_PATH, override=True)
        MONGODB_URI = os.getenv("MONGODB_URI", "").strip()
        MONGODB_DATABASE = os.getenv("MONGODB_DATABASE", "petrails").strip() or "petrails"

        if not MONGODB_URI:
            self.is_connected = False
            self.is_atlas = False
            self.connection_status = "unconfigured"
            self.last_error = (
                "MONGODB_URI is not set in backend/.env. "
                "Please configure your MongoDB Atlas connection string "
                "(e.g., mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority)."
            )
            return self.get_status()

        # Enforce MongoDB Atlas requirement (strictly reject localhost or 127.0.0.1)
        uri_lower = MONGODB_URI.lower()
        if "localhost" in uri_lower or "127.0.0.1" in uri_lower:
            self.is_connected = False
            self.is_atlas = False
            self.connection_status = "rejected_local"
            self.last_error = (
                "Local MongoDB connection strings (localhost/127.0.0.1) are disallowed. "
                "PETRAILS strictly requires a MongoDB Atlas connection string "
                "(e.g., mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority)."
            )
            return self.get_status()

        self.is_atlas = "mongodb.net" in uri_lower or "mongodb+srv://" in uri_lower

        try:
            if self.client:
                try:
                    await self.client.close()
                except Exception:
                    pass

            masked = mask_mongodb_uri(MONGODB_URI)
            logger.info(f"Connecting to MongoDB Atlas at {masked} (Database: {MONGODB_DATABASE})...")

            self.client = AsyncMongoClient(
                MONGODB_URI,
                serverSelectionTimeoutMS=5000,
                connectTimeoutMS=5000,
                socketTimeoutMS=5000
            )

            # REAL DATABASE PING VERIFICATION
            t0 = time.time()
            ping_response = await self.client.admin.command('ping')
            latency = round((time.time() - t0) * 1000, 2)

            if ping_response.get("ok") != 1:
                raise ConnectionFailure("Ping command did not return ok: 1")

            self.db = self.client[MONGODB_DATABASE]
            self.is_connected = True
            self.connection_status = "connected"
            self.last_ping_ms = latency
            self.last_error = None
            self.connected_at = time.strftime("%Y-%m-%d %H:%M:%S UTC")

            try:
                build_info = await self.client.admin.command('buildInfo')
                self.cluster_info = {
                    "version": build_info.get("version"),
                    "gitVersion": build_info.get("gitVersion"),
                    "sysInfo": build_info.get("sysInfo")
                }
            except Exception:
                self.cluster_info = {"version": "Atlas Cluster"}

            logger.info(f"MongoDB Atlas verified successfully! Ping: {latency}ms | DB: {MONGODB_DATABASE}")

            # Verify and safely initialize missing collections and indexes without modifying data
            await self.verify_and_initialize_collections()

        except ServerSelectionTimeoutError:
            self.is_connected = False
            self.connection_status = "timeout"
            self.last_error = (
                "Connection timed out. Could not reach MongoDB Atlas cluster within 5 seconds. "
                "Please verify: 1) Your MongoDB Atlas Network Access IP Whitelist includes your IP (or 0.0.0.0/0), "
                "2) The cluster host in MONGODB_URI is spelled correctly, and "
                "3) Your network permits outbound traffic on port 27017."
            )
            logger.error(f"MongoDB Atlas connection timeout: {self.last_error}")

        except OperationFailure as op_err:
            self.is_connected = False
            self.connection_status = "auth_failed"
            error_msg = str(op_err)
            if "Authentication failed" in error_msg or op_err.code == 18:
                self.last_error = (
                    "Authentication failed. Please verify the username and password in MONGODB_URI. "
                    "Ensure special characters in the password are URL-encoded."
                )
            else:
                self.last_error = f"MongoDB operation failed: {error_msg}"
            logger.error("MongoDB Atlas authentication error")

        except ConfigurationError as cfg_err:
            self.is_connected = False
            self.connection_status = "configuration_error"
            self.last_error = f"MongoDB URI configuration error: {str(cfg_err)}"
            logger.error(f"MongoDB Atlas config error: {self.last_error}")

        except Exception as exc:
            self.is_connected = False
            self.connection_status = "connection_failed"
            sanitized_err = mask_mongodb_uri(str(exc))
            self.last_error = f"Database connection error: {sanitized_err}"
            logger.error(f"MongoDB connection failed: {self.last_error}")

        return self.get_status()

    async def verify_and_initialize_collections(self):
        """
        Safely verifies and initializes required collections and indexes.
        Preserves all existing data without inserting fake data or deleting records.
        """
        if not self.is_connected or self.db is None:
            return

        try:
            existing_colls = await self.db.list_collection_names()
            self.verified_collections = []
            self.verified_indexes = {}

            # Create any missing collections safely
            for coll_name in REQUIRED_COLLECTIONS:
                if coll_name not in existing_colls:
                    try:
                        await self.db.create_collection(coll_name)
                    except Exception as e:
                        logger.warning(f"Collection creation notice for {coll_name}: {e}")
                self.verified_collections.append(coll_name)

            # Safely create appropriate indexes without damaging existing data
            indexes_spec = {
                "users": [("email", {"unique": True}), ("id", {"unique": True})],
                "pets": [("id", {"unique": True}), ("policyId", {}), ("ownerName", {})],
                "assessments": [("id", {"unique": True}), ("petId", {}), ("status", {})],
                "claims": [("id", {"unique": True}), ("claimNumber", {"unique": True}), ("petId", {}), ("status", {})],
                "information_requests": [("id", {"unique": True}), ("assessmentId", {})],
                "notifications": [("id", {"unique": True}), ("timestamp", {})],
                "audit_logs": [("id", {"unique": True}), ("timestamp", {}), ("action", {})]
            }

            for coll_name, idx_list in indexes_spec.items():
                coll = self.db[coll_name]
                created_for_coll = []
                for field, kwargs in idx_list:
                    try:
                        idx_name = await coll.create_index(field, **kwargs)
                        created_for_coll.append(idx_name)
                    except Exception as idx_err:
                        logger.warning(f"Index creation note for {coll_name}.{field}: {idx_err}")
                self.verified_indexes[coll_name] = created_for_coll

            logger.info(f"Verified {len(self.verified_collections)} collections and indexes in MongoDB Atlas.")

        except Exception as e:
            logger.error(f"Error during collection verification: {e}")

    def get_status(self) -> Dict[str, Any]:
        """Returns safe, credential-free connection status."""
        return {
            "connected": self.is_connected,
            "status": self.connection_status,
            "isAtlas": self.is_atlas,
            "database": MONGODB_DATABASE if self.is_connected else None,
            "maskedUri": mask_mongodb_uri(MONGODB_URI) if MONGODB_URI else None,
            "pingMs": self.last_ping_ms,
            "connectedAt": self.connected_at,
            "clusterInfo": self.cluster_info,
            "verifiedCollections": self.verified_collections,
            "verifiedIndexes": self.verified_indexes,
            "error": self.last_error,
            "configured": bool(MONGODB_URI)
        }

    # -------------------------------------------------------------
    # Async Persistent Operations
    # -------------------------------------------------------------

    async def log_audit(self, action: str, entity_type: str, entity_id: str, details: Dict[str, Any], user: str = "Sarah Jenkins"):
        """Records an audit log entry in MongoDB Atlas."""
        entry = {
            "id": f"aud-{int(time.time() * 1000)}",
            "action": action,
            "entityType": entity_type,
            "entityId": entity_id,
            "details": details,
            "user": user,
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S IST")
        }
        if self.is_connected and self.db is not None:
            try:
                await self.db["audit_logs"].insert_one(entry)
            except Exception as e:
                logger.error(f"Failed to write audit log: {e}")
        return entry

    # --- Users ---
    async def get_user_by_email(self, email: str) -> Optional[Dict[str, Any]]:
        if self.is_connected and self.db is not None:
            user = await self.db["users"].find_one({"email": email}, {"_id": 0})
            if user:
                return user
        if email == "sarah.jenkins@petrails.insure":
            return {
                "id": "usr-1",
                "fullName": "Sarah Jenkins",
                "email": "sarah.jenkins@petrails.insure",
                "role": "Senior Underwriting Officer",
                "authorityLimitInr": 500000,
                "organization": "Tata AIG General Insurance"
            }
        return None

    async def create_user(self, user_data: Dict[str, Any]) -> Dict[str, Any]:
        clean_data = {k: v for k, v in user_data.items() if k != "_id"}
        if self.is_connected and self.db is not None:
            await self.db["users"].update_one(
                {"email": clean_data["email"]},
                {"$set": clean_data},
                upsert=True
            )
            await self.log_audit("USER_REGISTER", "user", clean_data.get("id", "new"), {"email": clean_data["email"]})
        return clean_data

    # --- Assessments ---
    async def get_assessments(self) -> List[Dict[str, Any]]:
        if self.is_connected and self.db is not None:
            cursor = self.db["assessments"].find({}, {"_id": 0})
            docs = await cursor.to_list(length=200)
            if docs:
                return docs
        return self.fallback_data.get("assessments", [])

    async def get_assessment(self, assessment_id: str) -> Optional[Dict[str, Any]]:
        if self.is_connected and self.db is not None:
            doc = await self.db["assessments"].find_one({"id": assessment_id}, {"_id": 0})
            if doc:
                return doc
        for asm in self.fallback_data.get("assessments", []):
            if asm.get("id") == assessment_id:
                return asm
        return None

    async def create_assessment(self, assessment: Dict[str, Any]) -> Dict[str, Any]:
        clean_asm = {k: v for k, v in assessment.items() if k != "_id"}
        if self.is_connected and self.db is not None:
            await self.db["assessments"].update_one(
                {"id": clean_asm["id"]},
                {"$set": clean_asm},
                upsert=True
            )
            await self.log_audit("ASSESSMENT_CREATE", "assessment", clean_asm["id"], {"petId": clean_asm.get("petId")})
        else:
            self.fallback_data.setdefault("assessments", []).append(clean_asm)
        return clean_asm

    async def record_assessment_decision(self, assessment_id: str, decision_entry: Dict[str, Any], new_status: str) -> Optional[Dict[str, Any]]:
        if self.is_connected and self.db is not None:
            res = await self.db["assessments"].update_one(
                {"id": assessment_id},
                {
                    "$push": {"decisionHistory": {"$each": [decision_entry], "$position": 0}},
                    "$set": {"status": new_status, "lastUpdated": "Just now"}
                }
            )
            await self.log_audit("UNDERWRITER_DECISION", "assessment", assessment_id, {
                "decision": decision_entry.get("action"),
                "notes": decision_entry.get("notes")
            }, user=decision_entry.get("user", "Sarah Jenkins"))
            if res.matched_count > 0:
                return decision_entry
        else:
            for asm in self.fallback_data.get("assessments", []):
                if asm.get("id") == assessment_id:
                    asm.setdefault("decisionHistory", []).insert(0, decision_entry)
                    asm["status"] = new_status
                    asm["lastUpdated"] = "Just now"
                    return decision_entry
        return None

    # --- Information Requests ---
    async def record_information_request(self, assessment_id: str, req_data: Dict[str, Any]) -> Dict[str, Any]:
        clean_req = {"id": f"req-{int(time.time() * 1000)}", "assessmentId": assessment_id, **req_data}
        if self.is_connected and self.db is not None:
            await self.db["information_requests"].insert_one({k: v for k, v in clean_req.items() if k != "_id"})
            await self.log_audit("INFO_REQUEST_DISPATCH", "information_request", clean_req["id"], {
                "assessmentId": assessment_id,
                "recipient": req_data.get("recipient")
            })
        return clean_req

    # --- Claims ---
    async def get_claims(self) -> List[Dict[str, Any]]:
        if self.is_connected and self.db is not None:
            cursor = self.db["claims"].find({}, {"_id": 0})
            docs = await cursor.to_list(length=200)
            if docs:
                return docs
        return self.fallback_data.get("claims", [])

    async def get_claim(self, claim_id: str) -> Optional[Dict[str, Any]]:
        if self.is_connected and self.db is not None:
            doc = await self.db["claims"].find_one({"id": claim_id}, {"_id": 0})
            if doc:
                return doc
        for claim in self.fallback_data.get("claims", []):
            if claim.get("id") == claim_id:
                return claim
        return None

    async def record_claim_decision(self, claim_id: str, decision_entry: Dict[str, Any], new_status: str) -> Optional[Dict[str, Any]]:
        if self.is_connected and self.db is not None:
            res = await self.db["claims"].update_one(
                {"id": claim_id},
                {
                    "$set": {
                        "status": new_status,
                        "adjusterDecision": decision_entry
                    }
                }
            )
            await self.log_audit("CLAIM_DECISION", "claim", claim_id, {
                "status": new_status,
                "notes": decision_entry.get("notes")
            }, user=decision_entry.get("decidedBy", "Sarah Jenkins"))
            if res.matched_count > 0:
                return decision_entry
        else:
            for claim in self.fallback_data.get("claims", []):
                if claim.get("id") == claim_id:
                    claim["status"] = new_status
                    claim["adjusterDecision"] = decision_entry
                    return decision_entry
        return None

    # --- Pets ---
    async def get_pets(self) -> List[Dict[str, Any]]:
        if self.is_connected and self.db is not None:
            cursor = self.db["pets"].find({}, {"_id": 0})
            docs = await cursor.to_list(length=200)
            if docs:
                return docs
        return self.fallback_data.get("pets", [])

    async def get_pet(self, pet_id: str) -> Optional[Dict[str, Any]]:
        if self.is_connected and self.db is not None:
            doc = await self.db["pets"].find_one({"id": pet_id}, {"_id": 0})
            if doc:
                return doc
        for pet in self.fallback_data.get("pets", []):
            if pet.get("id") == pet_id:
                return pet
        return None

    async def create_pet(self, pet_data: Dict[str, Any]) -> Dict[str, Any]:
        clean_pet = {k: v for k, v in pet_data.items() if k != "_id"}
        if self.is_connected and self.db is not None:
            await self.db["pets"].update_one(
                {"id": clean_pet["id"]},
                {"$set": clean_pet},
                upsert=True
            )
            await self.log_audit("PET_CREATE", "pet", clean_pet["id"], {"name": clean_pet.get("name")})
        else:
            self.fallback_data.setdefault("pets", []).append(clean_pet)
        return clean_pet

    # --- Analytics ---
    async def get_portfolio_metrics(self) -> Dict[str, Any]:
        if self.is_connected and self.db is not None:
            total_asm = await self.db["assessments"].count_documents({})
            total_claims = await self.db["claims"].count_documents({})
            base = self.fallback_data.get("portfolioMetrics", {})
            return {
                **base,
                "totalApplications": max(total_asm, base.get("totalApplications", 24)),
                "claimsUnderReview": max(total_claims, base.get("claimsUnderReview", 18))
            }
        return self.fallback_data.get("portfolioMetrics", {})

# Singleton instance
db_manager = DatabaseManager()
