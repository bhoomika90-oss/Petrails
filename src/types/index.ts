export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';

export type Species = 'Dog' | 'Cat' | 'Other';

export interface MedicalRecord {
  id: string;
  date: string;
  event: string;
  diagnosis: string;
  treatment: string;
  outcome: string;
  clinicName: string;
  veterinarian: string;
  notes?: string;
}

export interface VaccinationRecord {
  id: string;
  vaccineName: string;
  administeredDate: string;
  nextDueDate: string;
  batchNumber: string;
  status: 'Up to Date' | 'Due Soon' | 'Overdue';
}

export interface MedicationRecord {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  prescribedFor: string;
}

export interface SurgeryRecord {
  id: string;
  surgeryName: string;
  date: string;
  hospital: string;
  surgeon: string;
  complications: string;
  postOpRecovery: string;
}

export interface PolicySummary {
  id: string;
  policyNumber: string;
  tier: 'Essential' | 'Comprehensive' | 'Elite Wellness';
  annualCoverageLimit: number;
  deductible: number;
  copayPercent: number;
  startDate: string;
  renewalDate: string;
  status: 'Active' | 'Under Review' | 'Pending Documents' | 'Approved' | 'Declined';
}

export interface ClaimSummary {
  id: string;
  claimNumber: string;
  treatment: string;
  amountInr: number;
  date: string;
  status: 'Under Review' | 'Attention Required' | 'Approved' | 'Settled' | 'Flagged';
}

export interface Pet {
  id: string;
  name: string;
  species: Species;
  breed: string;
  age: number;
  ageUnit: 'years' | 'months';
  sex: 'Male' | 'Female';
  weightKg: number;
  microchipId?: string;
  imageUrl: string;
  policyId: string;
  policyStatus: 'Active' | 'Under Review' | 'Pending Documents' | 'Approved' | 'Declined';
  riskLevel: RiskLevel;
  riskScore: number;
  location: string;
  ownerName: string;
  ownerPhone: string;
  registeredVetClinic: string;
  medicalHistory: MedicalRecord[];
  vaccinations: VaccinationRecord[];
  medications: MedicationRecord[];
  surgeries: SurgeryRecord[];
  policies: PolicySummary[];
  claims: ClaimSummary[];
}

export interface ShapFactor {
  id: string;
  name: string;
  impact: number; // e.g. +14, -4
  category: 'Medical History' | 'Age & Breed' | 'Vaccination' | 'Claims History' | 'Geography';
  explanation: string;
  confidence: number;
}

export interface InformationGap {
  id: string;
  title: string;
  description: string;
  questions: string[];
  status: 'Pending Request' | 'Requested' | 'Received' | 'Resolved';
  requestedAt?: string;
  responseSummary?: string;
  affectsCalibration: boolean;
}

export interface DecisionHistoryEntry {
  id: string;
  action: 'Approve' | 'Request Information' | 'Refer for Review' | 'Condition Added';
  user: string;
  role: string;
  timestamp: string;
  notes: string;
  ruleScoreAtTime: number;
  mlScoreAtTime: number;
}

export interface UnderwriterDecision {
  recommendation: RiskLevel | string;
  selectedDecision: 'Approve' | 'Request Information' | 'Refer for Review' | null;
  underwriterNotes: string;
  stipulations?: string[];
  lastModifiedBy?: string;
  lastModifiedAt?: string;
}

export interface Assessment {
  id: string;
  petId: string;
  petName: string;
  breed: string;
  species: Species;
  ageText: string;
  sex: string;
  policyId: string;
  riskLevel: RiskLevel;
  combinedScore: number;
  ruleScore: number;
  mlScore: number;
  modelConfidence: number; // e.g. 91%
  calibrationBand: string; // e.g. 'Calibrated ±3.2%'
  informationGapsCount: number;
  informationGaps: InformationGap[];
  contributingFactors: ShapFactor[];
  status: 'Under Review' | 'Approved' | 'Information Requested' | 'Referred' | 'Attention Required';
  lastUpdated: string;
  underwriterDecision?: UnderwriterDecision;
  decisionHistory?: DecisionHistoryEntry[];
  imageUrl: string;
}

export interface AnomalyIndicator {
  name: string;
  status: 'Normal' | 'Low' | 'Moderate' | 'Elevated';
  detail: string;
}

export interface InvoiceDetails {
  invoiceNumber: string;
  clinicGstNumber: string;
  clinicName: string;
  procedureCodes: string[];
  medicationBilled: number;
  surgicalBilled: number;
  diagnosticBilled: number;
  roomCharges: number;
  totalBilledInr: number;
  standardMarketRangeInr: [number, number];
}

export interface EvidenceItem {
  id: string;
  title: string;
  type: 'Pathology Report' | 'Veterinary Invoice' | 'Surgical Discharge Summary' | 'Radiograph' | 'Prescription';
  date: string;
  source: string;
  verified: boolean;
  notes: string;
  fileSize: string;
}

export interface ClaimDecision {
  status: 'Approved' | 'Adjusted' | 'Information Requested' | 'Referred to Senior Adjuster';
  approvedAmountInr?: number;
  notes: string;
  decidedBy: string;
  timestamp: string;
}

export interface Claim {
  id: string;
  claimNumber: string;
  petId: string;
  petName: string;
  breed: string;
  species: Species;
  claimType: string;
  treatment: string;
  amountInr: number;
  date: string;
  status: 'Under Review' | 'Attention Required' | 'Approved' | 'Settled' | 'Flagged';
  anomalyScore: number; // e.g. 31%
  anomalyLevel: 'LOW CONCERN' | 'MODERATE CONCERN' | 'ELEVATED CONCERN';
  indicators: AnomalyIndicator[];
  invoiceDetails: InvoiceDetails;
  medicalEvidence: EvidenceItem[];
  adjusterDecision?: ClaimDecision;
  imageUrl: string;
  underwritingNotes?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  link: string;
  type: 'assessment' | 'claim' | 'info_request' | 'system';
}

export interface PortfolioMetrics {
  totalApplications: number;
  requireAttention: number;
  claimsUnderReview: number;
  informationGaps: number;
  riskDistribution: {
    low: number;
    medium: number;
    high: number;
  };
  claimsActivity: {
    month: string;
    submitted: number;
    approved: number;
    flagged: number;
    averagePayoutInr: number;
  }[];
  speciesBreakdown: {
    species: string;
    percentage: number;
    count: number;
  }[];
  breedRiskTrends: {
    breed: string;
    avgRiskScore: number;
    claimRatio: number;
    sampleSize: number;
  }[];
}
