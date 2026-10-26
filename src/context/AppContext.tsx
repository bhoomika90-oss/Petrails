import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Pet, Assessment, Claim, NotificationItem, EvidenceItem } from '../types';
import { MOCK_PETS, MOCK_ASSESSMENTS, MOCK_CLAIMS, MOCK_NOTIFICATIONS } from '../data/mockData';
import { assessmentService } from '../services/assessmentService';
import { petService } from '../services/petService';
import { claimService } from '../services/claimService';

interface AppContextType {
  pets: Pet[];
  assessments: Assessment[];
  claims: Claim[];
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  isLoadingBackend: boolean;
  
  // UI States
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  
  // Modals
  requestInfoModal: {
    isOpen: boolean;
    assessmentId: string | null;
    petName: string;
    gapTitle?: string;
  };
  openRequestInfoModal: (assessmentId: string, petName: string, gapTitle?: string) => void;
  closeRequestInfoModal: () => void;
  
  evidenceViewerModal: {
    isOpen: boolean;
    evidence: EvidenceItem | null;
  };
  openEvidenceModal: (evidence: EvidenceItem) => void;
  closeEvidenceModal: () => void;
  
  // Underwriting actions
  recordUnderwriterDecision: (
    assessmentId: string,
    decision: 'Approve' | 'Request Information' | 'Refer for Review',
    notes: string,
    stipulation?: string
  ) => void;
  
  // Claim actions
  recordClaimDecision: (
    claimId: string,
    status: 'Approved' | 'Adjusted' | 'Information Requested' | 'Referred to Senior Adjuster',
    notes: string,
    approvedAmount?: number
  ) => void;

  // New assessment creation
  addNewAssessment: (assessment: Assessment, pet: Pet) => void;
  
  // Notifications actions
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;

  // Search helper
  searchQuery: string;
  setSearchQuery: (q: string) => void;

  // Refresh data from backend
  refreshData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [pets, setPets] = useState<Pet[]>(MOCK_PETS);
  const [assessments, setAssessments] = useState<Assessment[]>(MOCK_ASSESSMENTS);
  const [claims, setClaims] = useState<Claim[]>(MOCK_CLAIMS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [isLoadingBackend, setIsLoadingBackend] = useState<boolean>(false);
  
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [requestInfoModal, setRequestInfoModal] = useState<{
    isOpen: boolean;
    assessmentId: string | null;
    petName: string;
    gapTitle?: string;
  }>({
    isOpen: false,
    assessmentId: null,
    petName: '',
  });

  const [evidenceViewerModal, setEvidenceViewerModal] = useState<{
    isOpen: boolean;
    evidence: EvidenceItem | null;
  }>({
    isOpen: false,
    evidence: null
  });

  // Load from backend services on initial mount
  const refreshData = async () => {
    setIsLoadingBackend(true);
    try {
      const [fetchedPets, fetchedAssessments, fetchedClaims] = await Promise.all([
        petService.getPets(),
        assessmentService.getAssessments(),
        claimService.getClaims()
      ]);

      if (fetchedPets && fetchedPets.length > 0) setPets(fetchedPets);
      if (fetchedAssessments && fetchedAssessments.length > 0) setAssessments(fetchedAssessments);
      if (fetchedClaims && fetchedClaims.length > 0) setClaims(fetchedClaims);
    } catch (err) {
      console.warn('[PETRAILS] Backend not responding yet. Using local state.', err);
    } finally {
      setIsLoadingBackend(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const openRequestInfoModal = (assessmentId: string, petName: string, gapTitle?: string) => {
    setRequestInfoModal({
      isOpen: true,
      assessmentId,
      petName,
      gapTitle
    });
  };

  const closeRequestInfoModal = () => {
    setRequestInfoModal(prev => ({ ...prev, isOpen: false }));
  };

  const openEvidenceModal = (evidence: EvidenceItem) => {
    setEvidenceViewerModal({
      isOpen: true,
      evidence
    });
  };

  const closeEvidenceModal = () => {
    setEvidenceViewerModal({
      isOpen: false,
      evidence: null
    });
  };

  const recordUnderwriterDecision = (
    assessmentId: string,
    decision: 'Approve' | 'Request Information' | 'Refer for Review',
    notes: string,
    stipulation?: string
  ) => {
    // 1. Optimistic Local State Update
    setAssessments(prev =>
      prev.map(asm => {
        if (asm.id !== assessmentId) return asm;

        const newHistoryEntry = {
          id: `dh-${Date.now()}`,
          action: decision,
          user: 'Sarah Jenkins',
          role: 'Senior Underwriting Officer',
          timestamp: new Date().toLocaleString('en-IN', {
            dateStyle: 'medium',
            timeStyle: 'short',
            hour12: false
          }) + ' IST',
          notes: notes || `Recorded underwriter decision: ${decision}.`,
          ruleScoreAtTime: asm.ruleScore,
          mlScoreAtTime: asm.mlScore
        };

        const updatedStatus =
          decision === 'Approve'
            ? 'Approved'
            : decision === 'Request Information'
            ? 'Information Requested'
            : 'Referred';

        const updatedStipulations = stipulation 
          ? [...(asm.underwriterDecision?.stipulations || []), stipulation]
          : asm.underwriterDecision?.stipulations;

        return {
          ...asm,
          status: updatedStatus as Assessment['status'],
          lastUpdated: 'Just now',
          underwriterDecision: {
            recommendation: asm.riskLevel,
            selectedDecision: decision,
            underwriterNotes: notes,
            stipulations: updatedStipulations,
            lastModifiedBy: 'Sarah Jenkins',
            lastModifiedAt: 'Just now'
          },
          decisionHistory: [newHistoryEntry, ...(asm.decisionHistory || [])]
        };
      })
    );

    // Also update pet policy status if approved
    setPets(prev =>
      prev.map(p => {
        const matchingAsm = assessments.find(a => a.id === assessmentId);
        if (matchingAsm && p.id === matchingAsm.petId) {
          return {
            ...p,
            policyStatus: decision === 'Approve' ? 'Active' : 'Under Review'
          };
        }
        return p;
      })
    );

    // 2. Dispatch to Backend Service
    assessmentService.recordDecision(assessmentId, {
      decision,
      notes,
      stipulation,
      user: 'Sarah Jenkins'
    }).catch(err => {
      console.warn('[PETRAILS] Backend decision sync error (fallback active)', err);
    });

    // Add notification
    const currentAsm = assessments.find(a => a.id === assessmentId);
    if (currentAsm) {
      setNotifications(prev => [
        {
          id: `notif-${Date.now()}`,
          title: `Decision recorded for ${currentAsm.petName}`,
          description: `Sarah Jenkins recorded: ${decision}. Audit log updated.`,
          timestamp: 'Just now',
          read: false,
          priority: 'medium',
          link: `/assessments/${assessmentId}`,
          type: 'assessment'
        },
        ...prev
      ]);
    }
  };

  const recordClaimDecision = (
    claimId: string,
    status: 'Approved' | 'Adjusted' | 'Information Requested' | 'Referred to Senior Adjuster',
    notes: string,
    approvedAmount?: number
  ) => {
    // 1. Optimistic Local Update
    setClaims(prev =>
      prev.map(c => {
        if (c.id !== claimId) return c;
        const finalStatus =
          status === 'Approved' || status === 'Adjusted'
            ? 'Approved'
            : status === 'Information Requested'
            ? 'Under Review'
            : 'Attention Required';

        return {
          ...c,
          status: finalStatus as Claim['status'],
          adjusterDecision: {
            status,
            approvedAmountInr: approvedAmount ?? (status === 'Approved' ? c.amountInr * 0.9 : 0),
            notes,
            decidedBy: 'Sarah Jenkins (Senior Underwriting & Claims Officer)',
            timestamp: new Date().toLocaleString('en-IN', {
              dateStyle: 'medium',
              timeStyle: 'short',
              hour12: false
            }) + ' IST'
          }
        };
      })
    );

    // 2. Dispatch to Backend Service
    claimService.recordDecision(claimId, {
      status,
      notes,
      approvedAmountInr: approvedAmount,
      decidedBy: 'Sarah Jenkins (Senior Underwriting & Claims Officer)'
    }).catch(err => {
      console.warn('[PETRAILS] Backend claim decision sync error', err);
    });
  };

  const addNewAssessment = (newAsm: Assessment, newPet: Pet) => {
    // 1. Local State Update
    setAssessments(prev => [newAsm, ...prev]);
    setPets(prev => [newPet, ...prev]);
    
    // 2. Dispatch to Backend Services
    petService.createPet(newPet).catch(console.warn);
    assessmentService.createAssessment(newAsm).catch(console.warn);

    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: `New Risk Assessment run for ${newPet.name}`,
        description: `Automated Rule Engine (${newAsm.ruleScore}) and ML Model (${newAsm.mlScore}) generated risk score ${newAsm.combinedScore}.`,
        timestamp: 'Just now',
        read: false,
        priority: 'high',
        link: `/assessments/${newAsm.id}`,
        type: 'assessment'
      },
      ...prev
    ]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        pets,
        assessments,
        claims,
        notifications,
        unreadNotificationCount,
        isLoadingBackend,
        isSearchOpen,
        setIsSearchOpen,
        isNotificationsOpen,
        setIsNotificationsOpen,
        requestInfoModal,
        openRequestInfoModal,
        closeRequestInfoModal,
        evidenceViewerModal,
        openEvidenceModal,
        closeEvidenceModal,
        recordUnderwriterDecision,
        recordClaimDecision,
        addNewAssessment,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        searchQuery,
        setSearchQuery,
        refreshData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
