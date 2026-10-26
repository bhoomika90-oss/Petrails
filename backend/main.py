"""
PETRAILS — Intelligent Pet Insurance Risk & Claims Intelligence Backend
FastAPI REST API with Dual-Engine Actuarial Rules and Predictive Scoring
"""

import time
from typing import List, Optional, Dict, Any
from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(
    title="PETRAILS Actuarial Intelligence API",
    description="Enterprise API for pet insurance underwriting risk evaluation and claims anomaly detection.",
    version="2.4.0"
)

# Enable CORS for frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "*"],
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

class NewPetPayload(BaseModel):
    id: str
    name: str
    species: str
    breed: str
    age: int
    sex: str
    weightKg: float
    location: str
    ownerName: str
    registeredVetClinic: str
    policyId: str

class NewAssessmentPayload(BaseModel):
    id: str
    petId: str
    petName: str
    breed: str
    species: str
    ageText: str
    sex: str
    policyId: str

# ---------------------------------------------------------
# In-Memory Datastore & Initial Synthetic State
# ---------------------------------------------------------

DEMO_USER = {
    "id": "usr-1",
    "fullName": "Sarah Jenkins",
    "email": "sarah.jenkins@petrails.insure",
    "role": "Senior Underwriting Officer",
    "authorityLimitInr": 500000,
    "organization": "Tata AIG General Insurance"
}

ASSESSMENTS_DB = [
    {
        "id": "asm-1",
        "petId": "pet-1",
        "petName": "Max",
        "breed": "Golden Retriever",
        "species": "Dog",
        "ageText": "6 years",
        "sex": "Male",
        "policyId": "PT-10291",
        "riskLevel": "MEDIUM",
        "combinedScore": 64,
        "ruleScore": 58,
        "mlScore": 67,
        "modelConfidence": 91,
        "calibrationBand": "Calibrated ±3.2%",
        "informationGapsCount": 2,
        "informationGaps": [
            {
                "id": "gap-1",
                "title": "Incomplete Orthopedic Diagnostic & Outcome Records",
                "description": "An orthopedic treatment history was identified in the veterinary record, but the definitive radiologic diagnosis and long-term treatment outcome are incomplete.",
                "questions": [
                    "What was the definitive radiologic diagnosis of the right stifle joint?",
                    "When was the latest physical examination performed for stifle joint stability?",
                    "Was surgical intervention (e.g., TPLO / TTA) formally recommended or scheduled?"
                ],
                "status": "Requested",
                "requestedAt": "2024-10-22T09:40:00Z",
                "affectsCalibration": True
            }
        ],
        "contributingFactors": [
            {
                "id": "f-1",
                "name": "Previous orthopedic treatment",
                "impact": 14,
                "category": "Medical History",
                "explanation": "History of stifle joint laxity and NSAID administration elevates joint underwriting hazard.",
                "confidence": 94
            },
            {
                "id": "f-2",
                "name": "Age bracket (6 years)",
                "impact": 10,
                "category": "Age & Breed",
                "explanation": "Canine senior transition window correlates with higher probability of chronic claims.",
                "confidence": 92
            },
            {
                "id": "f-3",
                "name": "Breed profile (Golden Retriever)",
                "impact": 8,
                "category": "Age & Breed",
                "explanation": "Breed actuarial baseline exhibits higher incidence of hip dysplasia.",
                "confidence": 89
            },
            {
                "id": "f-4",
                "name": "Previous claims history",
                "impact": 5,
                "category": "Claims History",
                "explanation": "Recent claim submission for surgical consultation during policy probation period.",
                "confidence": 86
            },
            {
                "id": "f-5",
                "name": "Vaccination & preventive compliance",
                "impact": -4,
                "category": "Vaccination",
                "explanation": "Consistent multi-year DHPPiL booster compliance reduces infectious risk.",
                "confidence": 95
            }
        ],
        "status": "Under Review",
        "lastUpdated": "2 hours ago",
        "decisionHistory": [
            {
                "id": "dh-1",
                "action": "Request Information",
                "user": "Sarah Jenkins",
                "role": "Senior Underwriting Officer",
                "timestamp": "2024-10-22 15:10 IST",
                "notes": "Dispatched 3 clinical questions to Cessna Lifeline regarding stifle laxity prognosis.",
                "ruleScoreAtTime": 58,
                "mlScoreAtTime": 67
            }
        ],
        "imageUrl": "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=80"
    }
]

CLAIMS_DB = [
    {
        "id": "cl-20831",
        "claimNumber": "CL-20831",
        "petId": "pet-1",
        "petName": "Max",
        "breed": "Golden Retriever",
        "species": "Dog",
        "claimType": "Orthopedic Surgery & Diagnostics",
        "treatment": "Orthopedic Surgery & Post-Op Arthroscopy",
        "amountInr": 42000,
        "date": "2024-10-18",
        "status": "Under Review",
        "anomalyScore": 31,
        "anomalyLevel": "LOW CONCERN",
        "indicators": [
            {
                "name": "Treatment frequency",
                "status": "Moderate",
                "detail": "First orthopedic procedure billed in 14 months."
            },
            {
                "name": "Invoice deviation",
                "status": "Low",
                "detail": "Billed amount (₹42,000) is within standard Bangalore veterinary surgery benchmark (₹38,000 – ₹46,000)."
            },
            {
                "name": "Previous claim pattern",
                "status": "Elevated",
                "detail": "Claim initiated 47 days after policy modification endorsement."
            },
            {
                "name": "Medical consistency",
                "status": "Normal",
                "detail": "Carprofen prescription matches arthroscopy clinical discharge protocols."
            }
        ],
        "invoiceDetails": {
            "invoiceNumber": "INV-CESSNA-2024-8841",
            "clinicGstNumber": "29AAACC1234F1Z8",
            "clinicName": "Cessna Lifeline Veterinary Hospital, Indiranagar",
            "procedureCodes": ["VET-SURG-ORTHO-04", "VET-ANES-GEN-02"],
            "medicationBilled": 6400,
            "surgicalBilled": 24500,
            "diagnosticBilled": 7100,
            "roomCharges": 4000,
            "totalBilledInr": 42000,
            "standardMarketRangeInr": [38000, 46000]
        },
        "medicalEvidence": [
            {
                "id": "ev-1",
                "title": "Surgical Discharge Summary & Operative Note",
                "type": "Surgical Discharge Summary",
                "date": "2024-10-18",
                "source": "Cessna Lifeline Specialty Surgery Unit",
                "verified": True,
                "notes": "Exploratory arthroscopy of right stifle joint confirming minor meniscal debridement.",
                "fileSize": "2.4 MB PDF"
            }
        ],
        "imageUrl": "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=80"
    }
]

# ---------------------------------------------------------
# Health & Status Route
# ---------------------------------------------------------

@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "PETRAILS Actuarial Intelligence API",
        "version": "2.4.0",
        "port": 8000
    }

# ---------------------------------------------------------
# Authentication Routes
# ---------------------------------------------------------

@app.post("/api/auth/login")
def login(payload: LoginRequest):
    return {
        "token": "petrails-jwt-authenticated-token",
        "user": DEMO_USER
    }

@app.post("/api/auth/register")
def register(payload: RegisterRequest):
    return {
        "token": "petrails-jwt-registered-token",
        "user": {
            **DEMO_USER,
            "organization": payload.organization,
            "fullName": payload.fullName,
            "email": payload.workEmail,
            "role": payload.role
        }
    }

@app.get("/api/auth/me")
def get_me():
    return DEMO_USER

# ---------------------------------------------------------
# Assessment Endpoints & Dual-Engine Scoring
# ---------------------------------------------------------

@app.get("/api/assessments")
def get_assessments():
    return ASSESSMENTS_DB

@app.get("/api/assessments/{assessment_id}")
def get_assessment(assessment_id: str):
    for asm in ASSESSMENTS_DB:
        if asm["id"] == assessment_id:
            return asm
    raise HTTPException(status_code=404, detail="Assessment not found")

@app.post("/api/assessments/{assessment_id}/decision")
def record_decision(assessment_id: str, payload: UnderwriterDecisionPayload):
    for asm in ASSESSMENTS_DB:
        if asm["id"] == assessment_id:
            new_history_entry = {
                "id": f"dh-{int(time.time()*1000)}",
                "action": payload.decision,
                "user": payload.user or "Sarah Jenkins",
                "role": "Senior Underwriting Officer",
                "timestamp": time.strftime("%Y-%m-%d %H:%M IST"),
                "notes": payload.notes,
                "ruleScoreAtTime": asm.get("ruleScore", 58),
                "mlScoreAtTime": asm.get("mlScore", 67)
            }
            if "decisionHistory" not in asm or asm["decisionHistory"] is None:
                asm["decisionHistory"] = []
            asm["decisionHistory"].insert(0, new_history_entry)
            asm["status"] = (
                "Approved" if payload.decision == "Approve"
                else "Information Requested" if payload.decision == "Request Information"
                else "Referred"
            )
            return {"success": True, "decision": new_history_entry}
    raise HTTPException(status_code=404, detail="Assessment not found")

@app.post("/api/assessments/{assessment_id}/information-request")
def request_information(assessment_id: str, payload: InfoRequestPayload):
    return {
        "success": True,
        "message": f"Questionnaire dispatched to {payload.recipient}",
        "dispatchedAt": time.strftime("%Y-%m-%d %H:%M:%S UTC")
    }

# ---------------------------------------------------------
# Claims Endpoints
# ---------------------------------------------------------

@app.get("/api/claims")
def get_claims():
    return CLAIMS_DB

@app.get("/api/claims/{claim_id}")
def get_claim(claim_id: str):
    for claim in CLAIMS_DB:
        if claim["id"] == claim_id:
            return claim
    raise HTTPException(status_code=404, detail="Claim not found")

@app.post("/api/claims/{claim_id}/decision")
def record_claim_decision(claim_id: str, payload: ClaimDecisionPayload):
    for claim in CLAIMS_DB:
        if claim["id"] == claim_id:
            claim["status"] = "Approved" if "Approve" in payload.status else "Under Review"
            decision_entry = {
                "status": payload.status,
                "approvedAmountInr": payload.approvedAmountInr or (claim["amountInr"] * 0.9),
                "notes": payload.notes,
                "decidedBy": payload.decidedBy or "Sarah Jenkins",
                "timestamp": time.strftime("%Y-%m-%d %H:%M IST")
            }
            claim["adjusterDecision"] = decision_entry
            return {"success": True, "decision": decision_entry}
    raise HTTPException(status_code=404, detail="Claim not found")

# ---------------------------------------------------------
# Analytics & Metrics Endpoints
# ---------------------------------------------------------

@app.get("/api/analytics/portfolio")
def get_portfolio_metrics():
    return {
        "totalApplications": len(ASSESSMENTS_DB) + 23,
        "requireAttention": 7,
        "claimsUnderReview": len(CLAIMS_DB) + 17,
        "informationGaps": 13,
        "riskDistribution": {"low": 48, "medium": 38, "high": 14},
        "claimsActivity": [
            {"month": "May", "submitted": 42, "approved": 38, "flagged": 4, "averagePayoutInr": 28400},
            {"month": "Jun", "submitted": 56, "approved": 51, "flagged": 5, "averagePayoutInr": 31200},
            {"month": "Jul", "submitted": 68, "approved": 62, "flagged": 6, "averagePayoutInr": 29800},
            {"month": "Aug", "submitted": 74, "approved": 65, "flagged": 9, "averagePayoutInr": 34500},
            {"month": "Sep", "submitted": 89, "approved": 80, "flagged": 9, "averagePayoutInr": 33900},
            {"month": "Oct", "submitted": 64, "approved": 52, "flagged": 7, "averagePayoutInr": 36200}
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
