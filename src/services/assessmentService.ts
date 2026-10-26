import { apiClient } from './apiClient';
import { Assessment, DecisionHistoryEntry } from '../types';
import { MOCK_ASSESSMENTS } from '../data/mockData';

export interface DecisionPayload {
  decision: 'Approve' | 'Request Information' | 'Refer for Review';
  notes: string;
  stipulation?: string;
  user?: string;
}

export interface InformationRequestPayload {
  gapTitle?: string;
  recipient: 'clinic' | 'owner' | 'both';
  urgency: string;
  questions: string[];
}

export const assessmentService = {
  async getAssessments(): Promise<Assessment[]> {
    return apiClient.get<Assessment[]>('/assessments', MOCK_ASSESSMENTS);
  },

  async getAssessmentById(id: string): Promise<Assessment | undefined> {
    const fallback = MOCK_ASSESSMENTS.find(a => a.id === id);
    return apiClient.get<Assessment>(`/assessments/${id}`, fallback);
  },

  async createAssessment(assessment: Assessment): Promise<Assessment> {
    return apiClient.post<Assessment>('/assessments', assessment, assessment);
  },

  async recordDecision(
    assessmentId: string,
    payload: DecisionPayload
  ): Promise<{ success: boolean; decision: DecisionHistoryEntry }> {
    const fallbackResult = {
      success: true,
      decision: {
        id: `dh-${Date.now()}`,
        action: payload.decision,
        user: payload.user || 'Sarah Jenkins',
        role: 'Senior Underwriting Officer',
        timestamp: new Date().toLocaleString('en-IN') + ' IST',
        notes: payload.notes,
        ruleScoreAtTime: 58,
        mlScoreAtTime: 67
      }
    };
    return apiClient.post(`/assessments/${assessmentId}/decision`, payload, fallbackResult);
  },

  async requestInformation(
    assessmentId: string,
    payload: InformationRequestPayload
  ): Promise<{ success: boolean; message: string }> {
    return apiClient.post(`/assessments/${assessmentId}/information-request`, payload, {
      success: true,
      message: 'Questionnaire dispatched to clinic'
    });
  }
};
