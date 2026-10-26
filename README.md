# PETRAILS — Intelligent Pet Insurance Risk & Claims Intelligence Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.1.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110%2B-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.13-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> **PETRAILS** is an enterprise-grade AI-assisted pet insurance risk assessment and claims intelligence platform built for insurance underwriters, claims adjusters, brokers, risk analysts, and veterinary actuaries.

---

## 🌟 Executive Overview

PETRAILS combines **cinematic Netflix-style card-based browsing**, **Apple-level typographic precision**, and **enterprise-grade insurance density** into a unified intelligence workstation.

Unlike generic chatbot wrappers, PETRAILS provides:
- **Transparent Dual-Engine Scoring**: Actuarial Rule-based evaluation alongside calibrated Predictive ML Risk Scoring.
- **Explainable AI (SHAP)**: Granular risk driver factor attribution with positive and negative score impacts.
- **Clinical Information Gap Resolution**: Automated clinic questionnaire generation and follow-up tracking for ambiguous medical histories.
- **Claims Anomaly Detection**: Forensic discrepancy detection between veterinary treatment diagnoses and itemized invoices.
- **Audit-Compliant Decision Ledger**: Strict human-in-the-loop sign-off with permanent underwriter accountability.

---

## 🏗️ Architecture

```
                                  ┌────────────────────────┐
                                  │      Web Browser       │
                                  │   (React 18 + Vite)    │
                                  └───────────┬────────────┘
                                              │
                         HTTP / JSON          │   Proxy: /api
                    ┌─────────────────────────┴─────────────────────────┐
                    ▼                                                   ▼
       ┌────────────────────────┐                          ┌────────────────────────┐
       │   PETRAILS Frontend    │                          │    FastAPI Backend     │
       │  (Vite Dev Server)     │                          │  (Actuarial API)       │
       │  Port: 5173            │                          │  Port: 8000            │
       └────────────────────────┘                          └───────────┬────────────┘
                                                                       │
                                            ┌──────────────────────────┴──────────────────────────┐
                                            ▼                                                     ▼
                                 ┌───────────────────────┐                             ┌───────────────────────┐
                                 │ Actuarial Rule Engine │                             │ Predictive ML Engine  │
                                 │ (Deterministic Rules) │                             │ (SHAP Factor Scoring) │
                                 └───────────────────────┘                             └───────────────────────┘
```

---

## 🚀 Key Feature Modules

### 1. Pre-Dashboard Suite
- **Cinematic Landing Page (`/`)**: Enterprise value proposition, live platform metrics ticker, interactive risk simulation card, interactive workflow walkthrough, and institutional testimonials.
- **Underwriter Authentication (`/sign-in`, `/sign-up`, `/forgot-password`)**: Institutional SSO, MFA verification badges, and authority tier selection.
- **Profile & Settings (`/profile`, `/settings`)**: Underwriter authority tier limit management (e.g., ₹5,00,000 threshold), notification preferences, API integrations, and audit logs.

### 2. Underwriter Dashboard (`/dashboard`)
- **Cinematic Hero**: Viewport-optimized hero (55–65vh) with prominent clinical photography, high-contrast typography, and quick underwriter actions.
- **"Continue Working" Shelf**: Horizontal scrolling cards with progress rings, priority badges, and quick-resume buttons.
- **Portfolio Intelligence Shelf**: Visual risk breakdown across active policies with live threshold filters.
- **Claims Intelligence**: Immediate visibility into pending claims, fraud flags, and high-frequency incident alerts.

### 3. Risk Underwriting & Explainability (`/assessments`, `/assessments/:id`)
- **Dual-Engine Calibration**: Direct comparison between deterministic actuarial rules and machine learning predictions.
- **SHAP Contributing Factors**: Visual impact bars showing exact point contributions for age, breed vulnerabilities, geographic hazards, and pre-existing conditions.
- **Explainability Modal**: Deep-dive statistical calibration band, confidence intervals, and decision tree traces.
- **Human Decision Ledger**: Underwriters can approve, add stipulations, refer to a supervisor, or request additional clinical information with notes recorded into the audit trail.

### 4. Information Gap Requests (`/info-requests`)
- Identifies missing clinical records (e.g., unconfirmed radiologic diagnosis of joint stability).
- Generates structured clinical questionnaires directly dispatchable to registered veterinary hospitals.

### 5. Claims Intelligence (`/claims`, `/claims/:id`)
- Forensic invoice itemization vs. clinical notes review.
- Automated flag detection (e.g., pre-existing condition exclusions, uncustomary fee variances).
- Adjudication action controls with instant claim approval or audit referral.

### 6. Portfolio Analytics (`/analytics`)
- Loss ratio trajectory charts, claims volume trends, and risk distribution histograms across species and breeds.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend Framework** | React 18, TypeScript 5.7, Vite 6 |
| **Routing** | React Router DOM v6 |
| **Styling & Design System** | TailwindCSS 3.4, Vanilla CSS Custom Properties, Glassmorphism, Google Fonts (`Inter`, `Cinzel`) |
| **Icons & Media** | Lucide React, Unsplash Veterinary Photography |
| **Backend API** | Python 3.13, FastAPI 0.110+, Uvicorn, Pydantic v2 |
| **Data & Analytics** | NumPy, Pandas, Scikit-Learn, XGBoost, SHAP |

---

## 📋 Repository Structure

```
Petrails/
├── .env.example             # Frontend environment variables template
├── .gitignore               # Multi-platform production gitignore
├── index.html               # Main HTML entrypoint with typography preloads
├── package.json             # NPM scripts and frontend dependencies
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite server configuration with API proxy
│
├── backend/                 # Python FastAPI Backend
│   ├── main.py              # Actuarial API endpoints & dual scoring engine
│   ├── requirements.txt     # Python backend dependencies
│   ├── run.bat              # Windows batch launch script (Port 8000)
│   └── run.ps1              # PowerShell launch script (Port 8000)
│
└── src/                     # React Frontend Application
    ├── App.tsx              # Application layout & navigation
    ├── index.css            # Global CSS design tokens & animations
    ├── main.tsx             # React DOM root entrypoint
    ├── vite-env.d.ts        # Vite client type definitions
    │
    ├── components/
    │   ├── common/          # AssessmentCard, InformationGap, Modal, MetricCard
    │   ├── navigation/      # Cinematic TopBar, UserMenu, NotificationTray
    │   └── ui/              # Button, Badge, StatusPill, Input components
    │
    ├── pages/               # 13 Application Pages
    │   ├── LandingPage.tsx          # Public-facing cinematic showcase
    │   ├── SignInPage.tsx           # Institutional authentication
    │   ├── SignUpPage.tsx           # Underwriter registration
    │   ├── ForgotPasswordPage.tsx   # Password recovery flow
    │   ├── ProfilePage.tsx          # Underwriter credentials & credentials
    │   ├── SettingsPage.tsx         # Actuarial rules & notification settings
    │   ├── DashboardPage.tsx        # Underwriter mission control
    │   ├── AssessmentsPage.tsx      # Policy risk intake queue
    │   ├── AssessmentDetailPage.tsx # Deep-dive SHAP factors & decisioning
    │   ├── NewAssessmentPage.tsx    # Policy application intake wizard
    │   ├── PetProfilePage.tsx       # Longitudinal clinical pet history
    │   ├── ClaimsPage.tsx           # Claims triage ledger
    │   ├── ClaimDetailPage.tsx      # Forensic invoice & diagnosis adjudication
    │   ├── InfoRequestsPage.tsx     # Clinic inquiry dispatch center
    │   └── AnalyticsPage.tsx        # Actuarial portfolio loss trends
    │
    ├── services/            # API Client Layer with Mock Fallback
    │   ├── apiClient.ts
    │   ├── assessmentService.ts
    │   ├── claimService.ts
    │   ├── petService.ts
    │   └── analyticsService.ts
    │
    ├── mock/                # Enterprise Clinical Datasets
    │   ├── assessments.ts   # Synthetic risk evaluations
    │   ├── claims.ts        # Itemized claims & invoices
    │   └── pets.ts          # Complete longitudinal pet records
    │
    └── types/               # TypeScript Actuarial Interfaces
        └── index.ts         # RiskLevel, Assessment, Claim, Pet, SHAP types
```

---

## ⚡ Quickstart Guide

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **Python**: 3.10+ (Anaconda or standard Python)

---

### 1. Clone the Repository
```bash
git clone https://github.com/imannaswini/Petrails.git
cd Petrails
```

### 2. Frontend Setup
Install frontend dependencies:
```bash
npm install
```

Start the Vite development server:
```bash
npm run dev
```
The application will launch at **[http://localhost:5173](http://localhost:5173)**.

---

### 3. Backend Setup
From the project root, you can start the FastAPI backend directly using:

```bash
# Option A: Via npm script
npm run backend

# Option B: Navigate to backend folder and run
cd backend
.\run.ps1       # On PowerShell
# or
.\run.bat       # On Windows Command Prompt
```

The backend API will run at **[http://localhost:8000](http://localhost:8000)**.
Interactive Swagger documentation is available at **[http://localhost:8000/docs](http://localhost:8000/docs)**.

---

## 🌐 API Route Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status check |
| `POST` | `/api/auth/login` | Underwriter authentication & JWT generation |
| `POST` | `/api/auth/register` | Organization user intake |
| `GET` | `/api/auth/me` | Current session underwriter credentials |
| `GET` | `/api/assessments` | Fetch all underwriting risk assessments |
| `GET` | `/api/assessments/{id}` | Single assessment with SHAP factor breakdown |
| `POST` | `/api/assessments/{id}/decision` | Record underwriter approval, stipulation, or referral |
| `POST` | `/api/assessments/{id}/information-request` | Dispatch clinical questionnaire to veterinary hospital |
| `GET` | `/api/claims` | List submitted claims and adjudication status |
| `GET` | `/api/claims/{id}` | Detailed forensic invoice & discrepancy breakdown |
| `POST` | `/api/claims/{id}/decision` | Record claims adjudication payout |
| `GET` | `/api/analytics/portfolio` | Loss ratio and portfolio risk distribution metrics |

---

## 🛡️ Resilience & Mock Fallback

PETRAILS features a resilient frontend architecture:
- If the backend is running, the frontend automatically proxies API requests through `/api` to `http://localhost:8000`.
- If the backend is offline or disconnected, `VITE_USE_MOCK_FALLBACK=true` allows the application to continue functioning seamlessly with full interactive mock data, ensuring uninterrupted demonstrations and client reviews.

---

## 📄 License & Credits

Developed as part of the **Guidewire Pet Insurance Underwriting & Claims Intelligence Research Project** at **Reva University**.

Designed with ❤️ for veterinary actuaries, underwriters, and claims specialists worldwide.
