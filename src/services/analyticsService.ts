import { apiClient } from './apiClient';
import { PortfolioMetrics } from '../types';
import { MOCK_PORTFOLIO_METRICS } from '../data/mockData';

export const analyticsService = {
  async getPortfolioMetrics(): Promise<PortfolioMetrics> {
    return apiClient.get<PortfolioMetrics>('/analytics/portfolio', MOCK_PORTFOLIO_METRICS);
  }
};
