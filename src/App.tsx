import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { SearchModal } from './components/common/SearchModal';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { RequestInfoModal } from './components/common/RequestInfoModal';
import { EvidenceViewerModal } from './components/common/EvidenceViewerModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { AssessmentsPage } from './pages/AssessmentsPage';
import { NewAssessmentPage } from './pages/NewAssessmentPage';
import { RiskAssessmentDetailPage } from './pages/RiskAssessmentDetailPage';
import { PetsPage } from './pages/PetsPage';
import { PetDetailPage } from './pages/PetDetailPage';
import { ClaimsPage } from './pages/ClaimsPage';
import { ClaimDetailPage } from './pages/ClaimDetailPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { InformationRequestsPage } from './pages/InformationRequestsPage';
import { SettingsPage } from './pages/SettingsPage';
import { ProfilePage } from './pages/ProfilePage';
import { SignInPage } from './pages/SignInPage';
import { SignUpPage } from './pages/SignUpPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';

export const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-background text-petText-primary flex flex-col font-sans selection:bg-brand-teal/20 selection:text-white">
          {/* Sticky Minimal Navbar (Adapts between Public Landing & Authenticated App) */}
          <Navbar />

          {/* Interactive Modals and Drawers */}
          <SearchModal />
          <NotificationDrawer />
          <RequestInfoModal />
          <EvidenceViewerModal />

          {/* Route Content Area */}
          <main className="flex-1">
            <Routes>
              {/* Public Marketing & Authentication */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/login" element={<Navigate to="/sign-in" replace />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/register" element={<Navigate to="/sign-up" replace />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />

              {/* Authenticated Insurance Intelligence Platform */}
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/assessments" element={<AssessmentsPage />} />
              <Route path="/assessments/new" element={<NewAssessmentPage />} />
              <Route path="/assessments/:id" element={<RiskAssessmentDetailPage />} />
              <Route path="/pets" element={<PetsPage />} />
              <Route path="/pets/:id" element={<PetDetailPage />} />
              <Route path="/claims" element={<ClaimsPage />} />
              <Route path="/claims/:id" element={<ClaimDetailPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/information-requests" element={<InformationRequestsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/profile" element={<ProfilePage />} />

              {/* Catch-all fallback */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
