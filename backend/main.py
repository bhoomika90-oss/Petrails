"""
PETRAILS — Intelligent Pet Insurance Risk & Claims Intelligence Backend
FastAPI REST API with Dual-Engine Actuarial Rules and Predictive Scoring
Integrated with MongoDB Atlas via PyMongo Async (AsyncMongoClient)
"""

import sys
import time
from pathlib import Path
from typing import List, Optional, Dict, Any
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Depends, Header, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

# Ensure backend directory is in sys.path
backend_dir = Path(__file__).resolve().parent
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

from database import db_manager, mask_mongodb_uri


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Lifecycle startup: Connect and verify MongoDB Atlas with real ping
    print("=" * 60)
    print("Initializing PETRAILS Backend & MongoDB Atlas Connection...")
    print("=" * 60)
    status = await db_manager.connect_and_verify()
    if status["connected"]:
        print(f"MongoDB Atlas Verified: CONNECTED (Ping: {status['pingMs']}ms | DB: {status['database']})")
        print(f"Verified Collections: {', '.join(status.get('verifiedCollections', []))}")
    else:
        print(f"MongoDB Atlas Status: {status['status'].upper()}")
        if status.get("error"):
            print(f"Notice: {status['error']}")
    yield
    # Lifecycle shutdown: Close MongoDB connection pool cleanly
    if db_manager.client:
        try:
            await db_manager.client.close()
            print("MongoDB Atlas connection closed gracefully.")
        except Exception:
            pass


app = FastAPI(
    title="PETRAILS Actuarial Intelligence API",
    description="Enterprise API for pet insurance underwriting risk evaluation and claims anomaly detection with MongoDB Atlas persistence.",
    version="2.4.0",
    lifespan=lifespan
)

# Enable CORS for frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:3000",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------------------------------------
# Pydantic Schemas
# ---------------------------------------------------------

class LoginRequest(BaseModel):
    email: str
    password: Optional[str] = None

class RegisterRequest(BaseModel):
    organization: str
    fullName: str
    workEmail: str
    role: str
    authorityTier: str
    password: Optional[str] = None

class UnderwriterDecisionPayload(BaseModel):
    decision: str  # Approve | Request Information | Refer for Review
    notes: str
    stipulation: Optional[str] = None
    user: Optional[str] = "Sarah Jenkins"

class InfoRequestPayload(BaseModel):
    gapTitle: Optional[str] = None
    recipient: str = "clinic"
    urgency: str = "Standard (48h)"
    questions: List[str]

class ClaimDecisionPayload(BaseModel):
    status: str
    notes: str
    approvedAmountInr: Optional[float] = None
    decidedBy: Optional[str] = "Sarah Jenkins"

# ---------------------------------------------------------
# Health & Database Status Routes
# ---------------------------------------------------------

@app.get("/api/health")
async def health_check():
    db_status = db_manager.get_status()
    return {
        "status": "healthy",
        "service": "PETRAILS Actuarial Intelligence API",
        "version": "2.4.0",
        "port": 8000,
        "database": {
            "connected": db_status["connected"],
            "status": db_status["status"],
            "database": db_status["database"],
            "pingMs": db_status["pingMs"],
            "maskedUri": db_status["maskedUri"],
            "configured": db_status["configured"],
            "verifiedCollections": db_status.get("verifiedCollections", [])
        }
    }

@app.get("/api/database/status")
async def get_database_status():
    """Returns detailed, credential-safe MongoDB Atlas status and diagnostics."""
    return db_manager.get_status()

@app.post("/api/database/reconnect")
async def reconnect_database():
    """Re-reads backend/.env and re-verifies MongoDB Atlas connection live with a real ping."""
    return await db_manager.connect_and_verify()

# ---------------------------------------------------------
# Authentication Routes
# ---------------------------------------------------------

@app.post("/api/auth/login")
async def login(payload: LoginRequest):
    user = await db_manager.get_user_by_email(payload.email)
    if not user:
        user = {
            "id": "usr-1",
            "fullName": "Sarah Jenkins",
            "email": payload.email,
            "role": "Senior Underwriting Officer",
            "authorityLimitInr": 500000,
            "organization": "Tata AIG General Insurance"
        }
    return {
        "token": "petrails-jwt-authenticated-token",
        "user": user
    }

@app.post("/api/auth/register")
async def register(payload: RegisterRequest):
    new_user = {
        "id": f"usr-{int(time.time() * 1000)}",
        "organization": payload.organization,
        "fullName": payload.fullName,
        "email": payload.workEmail,
        "role": payload.role,
        "authorityLimitInr": 500000,
        "createdAt": time.strftime("%Y-%m-%d %H:%M:%S UTC")
    }
    persisted_user = await db_manager.create_user(new_user)
    return {
        "token": "petrails-jwt-registered-token",
        "user": persisted_user
    }

@app.get("/api/auth/me")
async def get_me():
    user = await db_manager.get_user_by_email("sarah.jenkins@petrails.insure")
    return user or {
        "id": "usr-1",
        "fullName": "Sarah Jenkins",
        "email": "sarah.jenkins@petrails.insure",
        "role": "Senior Underwriting Officer",
        "authorityLimitInr": 500000,
        "organization": "Tata AIG General Insurance"
    }

# ---------------------------------------------------------
# Assessment Endpoints & Dual-Engine Scoring
# ---------------------------------------------------------

@app.get("/api/assessments")
async def get_assessments():
    return await db_manager.get_assessments()

@app.get("/api/assessments/{assessment_id}")
async def get_assessment(assessment_id: str):
    asm = await db_manager.get_assessment(assessment_id)
    if asm:
        return asm
    raise HTTPException(status_code=404, detail="Assessment not found")

@app.post("/api/assessments")
async def create_assessment(payload: Dict[str, Any] = Body(...)):
    """Persists a new underwriting risk assessment into MongoDB Atlas."""
    if not payload.get("id"):
        payload["id"] = f"asm-{int(time.time() * 1000)}"
    if not payload.get("lastUpdated"):
        payload["lastUpdated"] = "Just now"
    return await db_manager.create_assessment(payload)

@app.post("/api/assessments/{assessment_id}/decision")
async def record_decision(assessment_id: str, payload: UnderwriterDecisionPayload):
    asm = await db_manager.get_assessment(assessment_id)
    if not asm:
        raise HTTPException(status_code=404, detail="Assessment not found")

    new_history_entry = {
        "id": f"dh-{int(time.time() * 1000)}",
        "action": payload.decision,
        "user": payload.user or "Sarah Jenkins",
        "role": "Senior Underwriting Officer",
        "timestamp": time.strftime("%Y-%m-%d %H:%M IST"),
        "notes": payload.notes,
        "ruleScoreAtTime": asm.get("ruleScore", 58),
        "mlScoreAtTime": asm.get("mlScore", 67)
    }
    new_status = (
        "Approved" if payload.decision == "Approve"
        else "Information Requested" if payload.decision == "Request Information"
        else "Referred"
    )
    result = await db_manager.record_assessment_decision(assessment_id, new_history_entry, new_status)
    return {"success": True, "decision": result or new_history_entry}

@app.post("/api/assessments/{assessment_id}/information-request")
async def request_information(assessment_id: str, payload: InfoRequestPayload):
    asm = await db_manager.get_assessment(assessment_id)
    if not asm:
        raise HTTPException(status_code=404, detail="Assessment not found")

    gap_entry = {
        "id": f"gap-{int(time.time() * 1000)}",
        "title": payload.gapTitle or f"Clinical Questionnaire for {payload.recipient}",
        "description": f"Dispatched questionnaire with {len(payload.questions)} inquiries ({payload.urgency}).",
        "questions": payload.questions,
        "status": "Requested",
        "requestedAt": time.strftime("%Y-%m-%dT%H:%M:%SZ"),
        "affectsCalibration": True
    }
    history_entry = {
        "id": f"dh-{int(time.time() * 1000)}",
        "action": "Request Information",
        "user": "Sarah Jenkins",
        "role": "Senior Underwriting Officer",
        "timestamp": time.strftime("%Y-%m-%d %H:%M IST"),
        "notes": f"Dispatched {len(payload.questions)} questions to {payload.recipient}.",
        "ruleScoreAtTime": asm.get("ruleScore", 58),
        "mlScoreAtTime": asm.get("mlScore", 67)
    }
    await db_manager.record_assessment_decision(assessment_id, history_entry, "Information Requested")
    await db_manager.record_information_request(assessment_id, {
        "recipient": payload.recipient,
        "urgency": payload.urgency,
        "questions": payload.questions,
        "gapTitle": payload.gapTitle
    })

    return {
        "success": True,
        "message": f"Questionnaire dispatched to {payload.recipient}",
        "dispatchedAt": time.strftime("%Y-%m-%d %H:%M:%S UTC"),
        "gap": gap_entry
    }

# ---------------------------------------------------------
# Claims Endpoints
# ---------------------------------------------------------

@app.get("/api/claims")
async def get_claims():
    return await db_manager.get_claims()

@app.get("/api/claims/{claim_id}")
async def get_claim(claim_id: str):
    claim = await db_manager.get_claim(claim_id)
    if claim:
        return claim
    raise HTTPException(status_code=404, detail="Claim not found")

@app.post("/api/claims/{claim_id}/decision")
async def record_claim_decision(claim_id: str, payload: ClaimDecisionPayload):
    claim = await db_manager.get_claim(claim_id)
    if not claim:
        raise HTTPException(status_code=404, detail="Claim not found")

    new_status = "Approved" if "Approve" in payload.status else "Under Review"
    decision_entry = {
        "status": payload.status,
        "approvedAmountInr": payload.approvedAmountInr or (claim.get("amountInr", 40000) * 0.9),
        "notes": payload.notes,
        "decidedBy": payload.decidedBy or "Sarah Jenkins",
        "timestamp": time.strftime("%Y-%m-%d %H:%M IST")
    }
    result = await db_manager.record_claim_decision(claim_id, decision_entry, new_status)
    return {"success": True, "decision": result or decision_entry}

# ---------------------------------------------------------
# Pets Endpoints
# ---------------------------------------------------------

@app.get("/api/pets")
async def get_pets():
    return await db_manager.get_pets()

@app.get("/api/pets/{pet_id}")
async def get_pet(pet_id: str):
    pet = await db_manager.get_pet(pet_id)
    if pet:
        return pet
    raise HTTPException(status_code=404, detail="Pet not found")

@app.post("/api/pets")
async def create_pet(payload: Dict[str, Any] = Body(...)):
    """Persists a new pet record into MongoDB Atlas."""
    if not payload.get("id"):
        payload["id"] = f"pet-{int(time.time() * 1000)}"
    return await db_manager.create_pet(payload)

# ---------------------------------------------------------
# Information Requests & Audit Logs Endpoints
# ---------------------------------------------------------

@app.get("/api/information-requests")
async def get_information_requests():
    if db_manager.is_connected and db_manager.db is not None:
        cursor = db_manager.db["information_requests"].find({}, {"_id": 0})
        return await cursor.to_list(length=100)
    return []

@app.get("/api/audit-logs")
async def get_audit_logs():
    if db_manager.is_connected and db_manager.db is not None:
        cursor = db_manager.db["audit_logs"].find({}, {"_id": 0}).sort("timestamp", -1)
        return await cursor.to_list(length=100)
    return []

# ---------------------------------------------------------
# Analytics & Metrics Endpoints
# ---------------------------------------------------------

@app.get("/api/analytics/portfolio")
async def get_portfolio_metrics():
    return await db_manager.get_portfolio_metrics()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
