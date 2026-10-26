import { apiClient } from './apiClient';
import { Claim, ClaimDecision } from '../types';
import { MOCK_CLAIMS } from '../data/mockData';

export interface ClaimDecisionPayload {
  status: 'Approved' | 'Adjusted' | 'Information Requested' | 'Referred to Senior Adjuster';
  notes: string;
  approvedAmountInr?: number;
  decidedBy?: string;
}

export const claimService = {
  async getClaims(): Promise<Claim[]> {
    return apiClient.get<Claim[]>('/claims', MOCK_CLAIMS);
  },

  async getClaimById(id: string): Promise<Claim | undefined> {
    const fallback = MOCK_CLAIMS.find(c => c.id === id);
    return apiClient.get<Claim>(`/claims/${id}`, fallback);
  },

  async recordDecision(
    claimId: string,
    payload: ClaimDecisionPayload
  ): Promise<{ success: boolean; decision: ClaimDecision }> {
    const fallbackDecision: ClaimDecision = {
      status: payload.status,
      approvedAmountInr: payload.approvedAmountInr,
      notes: payload.notes,
      decidedBy: payload.decidedBy || 'Sarah Jenkins (Senior Underwriting & Claims Officer)',
      timestamp: new Date().toLocaleString('en-IN') + ' IST'
    };

    return apiClient.post(`/claims/${claimId}/decision`, payload, {
      success: true,
      decision: fallbackDecision
    });
  }
};
