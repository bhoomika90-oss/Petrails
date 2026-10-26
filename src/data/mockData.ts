import { Pet, Assessment, Claim, NotificationItem, PortfolioMetrics } from '../types';

export const PET_IMAGES = {
  max: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=1200&q=80', // Golden Retriever
  luna: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1200&q=80', // Persian Cat
  bruno: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?auto=format&fit=crop&w=1200&q=80', // German Shepherd
  milo: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=1200&q=80', // Domestic Shorthair
  bella: 'https://images.unsplash.com/photo-1591769225440-811ad7d6eab2?auto=format&fit=crop&w=1200&q=80', // Labrador
  rocky: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=1200&q=80', // French Bulldog
  coco: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=1200&q=80', // Beagle
  daisy: 'https://images.unsplash.com/photo-1513360309081-38f0762b47d7?auto=format&fit=crop&w=1200&q=80', // Siamese Cat
  vetExamDog: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=1920&q=80', // Vet examining dog hero
  vetClinicClean: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=1200&q=80', // Modern vet clinic interior
  vetCatExam: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=1200&q=80', // Vet with cat
  vetSurgery: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80', // Clinical diagnostic
};

export const MOCK_PETS: Pet[] = [
  {
    id: 'pet-1',
    name: 'Max',
    species: 'Dog',
    breed: 'Golden Retriever',
    age: 6,
    ageUnit: 'years',
    sex: 'Male',
    weightKg: 31,
    microchipId: '985141002341982',
    imageUrl: PET_IMAGES.max,
    policyId: 'PT-10291',
    policyStatus: 'Under Review',
    riskLevel: 'MEDIUM',
    riskScore: 64,
    location: 'Indiranagar, Bengaluru, KA',
    ownerName: 'Vikram & Ananya Sharma',
    ownerPhone: '+91 98450 12890',
    registeredVetClinic: 'Cessna Lifeline Veterinary Hospital, Bengaluru',
    medicalHistory: [
      {
        id: 'med-101',
        date: '2024-08-14',
        event: 'Right Stifle Joint Laxity Evaluation',
        diagnosis: 'Partial cranial cruciate ligament (CCL) sprain',
        treatment: 'Conservative medical management, NSAIDs (Carprofen 75mg), weight control',
        outcome: 'Mild lameness resolved; follow-up arthroscopy recommended if pain recurs',
        clinicName: 'Cessna Lifeline Veterinary Hospital',
        veterinarian: 'Dr. Rohan Nambiar, MVSc (Orthopedics)',
        notes: 'Owner advised to maintain restricted exercise for 8 weeks.'
      },
      {
        id: 'med-102',
        date: '2023-11-02',
        event: 'Annual Comprehensive Geriatric Screening',
        diagnosis: 'Mild dental tartar stage 1, unremarkable thoracic radiograph',
        treatment: 'Ultrasonic dental scaling and polishing under propofol sedation',
        outcome: 'Full recovery, normal hepatic and renal function panels',
        clinicName: 'Cessna Lifeline Veterinary Hospital',
        veterinarian: 'Dr. Priya Desai'
      },
      {
        id: 'med-103',
        date: '2022-04-19',
        event: 'Allergic Dermatitis Flare',
        diagnosis: 'Seasonal flea allergy dermatitis (FAD)',
        treatment: 'Oclacitinib (Apoquel) 16mg q12h for 14 days, Bravecto chewable spot-on',
        outcome: 'Pruritus scored down from 8/10 to 1/10 within 72 hours',
        clinicName: 'Crown Vet Indiranagar',
        veterinarian: 'Dr. Arjun Shenoy'
      }
    ],
    vaccinations: [
      {
        id: 'vac-1',
        vaccineName: 'DHPPi + L (Canine Distemper, Parvo, Lepto)',
        administeredDate: '2024-05-10',
        nextDueDate: '2025-05-10',
        batchNumber: 'VANG-9041B',
        status: 'Up to Date'
      },
      {
        id: 'vac-2',
        vaccineName: 'Anti-Rabies Vaccine (Nobivac Rabies)',
        administeredDate: '2024-05-10',
        nextDueDate: '2025-05-10',
        batchNumber: 'RAB-4819X',
        status: 'Up to Date'
      },
      {
        id: 'vac-3',
        vaccineName: 'Kennel Cough (Bordetella Bronchiseptica)',
        administeredDate: '2023-10-18',
        nextDueDate: '2024-10-18',
        batchNumber: 'BRON-1102A',
        status: 'Due Soon'
      }
    ],
    medications: [
      {
        id: 'med-1',
        name: 'Carprofen (Rimadyl)',
        dosage: '75 mg',
        frequency: 'Once daily with meals as required',
        startDate: '2024-08-14',
        endDate: '2024-09-14',
        prescribedFor: 'Right stifle joint inflammatory management'
      },
      {
        id: 'med-2',
        name: 'Omega-3 Marine Lipid Complex',
        dosage: '1000 mg',
        frequency: 'Twice daily',
        startDate: '2024-08-14',
        prescribedFor: 'Joint cartilage support & barrier health'
      }
    ],
    surgeries: [
      {
        id: 'surg-1',
        surgeryName: 'Castration (Elective Gonadectomy)',
        date: '2019-03-12',
        hospital: 'Crown Vet Koramangala',
        surgeon: 'Dr. Arjun Shenoy',
        complications: 'None. Healed by primary intention within 10 days',
        postOpRecovery: 'Uneventful'
      }
    ],
    policies: [
      {
        id: 'pol-1',
        policyNumber: 'PT-10291',
        tier: 'Comprehensive',
        annualCoverageLimit: 300000,
        deductible: 4000,
        copayPercent: 10,
        startDate: '2024-09-01',
        renewalDate: '2025-08-31',
        status: 'Under Review'
      }
    ],
    claims: [
      {
        id: 'cl-1',
        claimNumber: 'CL-20831',
        treatment: 'Orthopedic Surgery & Post-Op Arthroscopy',
        amountInr: 42000,
        date: '2024-10-18',
        status: 'Under Review'
      }
    ]
  },
  {
    id: 'pet-2',
    name: 'Luna',
    species: 'Cat',
    breed: 'Persian Cat',
    age: 4,
    ageUnit: 'years',
    sex: 'Female',
    weightKg: 3.8,
    microchipId: '985141008129034',
    imageUrl: PET_IMAGES.luna,
    policyId: 'PT-10442',
    policyStatus: 'Under Review',
    riskLevel: 'MEDIUM',
    riskScore: 54,
    location: 'Bandra West, Mumbai, MH',
    ownerName: 'Dr. Meera Merchant',
    ownerPhone: '+91 98201 44552',
    registeredVetClinic: 'Crown Vet Worli, Mumbai',
    medicalHistory: [
      {
        id: 'med-201',
        date: '2024-09-04',
        event: 'Feline Stomatitis & Gingivitis Evaluation',
        diagnosis: 'Caudal stomatitis with bilateral maxillary dental resorption',
        treatment: 'Targeted surgical dental extractions (premolars 108/208)',
        outcome: 'Marked improvement in oral comfort, eating wet formulation',
        clinicName: 'Crown Vet Worli',
        veterinarian: 'Dr. Farhan Qureshi'
      }
    ],
    vaccinations: [
      {
        id: 'vac-21',
        vaccineName: 'FVRCP (Feline Viral Rhinotracheitis, Calici, Panleukopenia)',
        administeredDate: '2024-03-22',
        nextDueDate: '2025-03-22',
        batchNumber: 'FEL-5501C',
        status: 'Up to Date'
      },
      {
        id: 'vac-22',
        vaccineName: 'Rabies (Feline Monovalent)',
        administeredDate: '2024-03-22',
        nextDueDate: '2025-03-22',
        batchNumber: 'RAB-0934M',
        status: 'Up to Date'
      }
    ],
    medications: [
      {
        id: 'med-21',
        name: 'Meloxicam Oral Suspension (Metacam)',
        dosage: '0.05 mg/kg',
        frequency: 'Daily for 5 days',
        startDate: '2024-09-04',
        endDate: '2024-09-09',
        prescribedFor: 'Post-dental analgesia'
      }
    ],
    surgeries: [],
    policies: [
      {
        id: 'pol-2',
        policyNumber: 'PT-10442',
        tier: 'Essential',
        annualCoverageLimit: 150000,
        deductible: 2500,
        copayPercent: 15,
        startDate: '2024-06-15',
        renewalDate: '2025-06-14',
        status: 'Under Review'
      }
    ],
    claims: [
      {
        id: 'cl-2',
        claimNumber: 'CL-20832',
        treatment: 'Dental Stomatitis Extraction & Diagnostics',
        amountInr: 18500,
        date: '2024-09-12',
        status: 'Approved'
      }
    ]
  },
  {
    id: 'pet-3',
    name: 'Bruno',
    species: 'Dog',
    breed: 'German Shepherd',
    age: 8,
    ageUnit: 'years',
    sex: 'Male',
    weightKg: 36,
    microchipId: '985141003450912',
    imageUrl: PET_IMAGES.bruno,
    policyId: 'PT-09823',
    policyStatus: 'Active',
    riskLevel: 'LOW',
    riskScore: 32,
    location: 'Vasant Vihar, New Delhi, DL',
    ownerName: 'Col. Rajesh & Sangeeta Bakshi',
    ownerPhone: '+91 98111 87654',
    registeredVetClinic: 'Max Vets Super Speciality Hospital, New Delhi',
    medicalHistory: [
      {
        id: 'med-301',
        date: '2024-06-11',
        event: 'Senior Canine Health & Hip Dysplasia Screening',
        diagnosis: 'Bilateral hips OFA Fair, clear lumbosacral alignment',
        treatment: 'Preventative joint chondroprotectants',
        outcome: 'Excellent mobility score for age profile',
        clinicName: 'Max Vets New Delhi',
        veterinarian: 'Dr. K. S. Dogra'
      }
    ],
    vaccinations: [
      {
        id: 'vac-31',
        vaccineName: 'DHPPiL + Rabies Booster',
        administeredDate: '2024-02-14',
        nextDueDate: '2025-02-14',
        batchNumber: 'NOBI-9981',
        status: 'Up to Date'
      }
    ],
    medications: [
      {
        id: 'med-31',
        name: 'Glucosamine + MSM Complex',
        dosage: '1 tab',
        frequency: 'Daily',
        startDate: '2023-01-01',
        prescribedFor: 'Geriatric canine joint prophylaxis'
      }
    ],
    surgeries: [],
    policies: [
      {
        id: 'pol-3',
        policyNumber: 'PT-09823',
        tier: 'Elite Wellness',
        annualCoverageLimit: 500000,
        deductible: 5000,
        copayPercent: 10,
        startDate: '2023-11-01',
        renewalDate: '2024-10-31',
        status: 'Active'
      }
    ],
    claims: []
  },
  {
    id: 'pet-4',
    name: 'Milo',
    species: 'Cat',
    breed: 'Domestic Shorthair',
    age: 3,
    ageUnit: 'years',
    sex: 'Male',
    weightKg: 4.4,
    microchipId: '985141007765123',
    imageUrl: PET_IMAGES.milo,
    policyId: 'PT-11004',
    policyStatus: 'Under Review',
    riskLevel: 'HIGH',
    riskScore: 78,
    location: 'Jubilee Hills, Hyderabad, TS',
    ownerName: 'Tanvi Reddy',
    ownerPhone: '+91 99890 23419',
    registeredVetClinic: 'Olive Pet Hospital, Hyderabad',
    medicalHistory: [
      {
        id: 'med-401',
        date: '2024-09-28',
        event: 'Acute Vomiting & Foreign Body Ingestion Emergency',
        diagnosis: 'Gastric string linear foreign body obstruction',
        treatment: 'Emergency endoscopic retrieval under general anesthesia',
        outcome: 'Successfully extracted without mucosal perforation',
        clinicName: 'Olive Pet Hospital',
        veterinarian: 'Dr. Suresh Varma'
      },
      {
        id: 'med-402',
        date: '2024-01-15',
        event: 'Recurrent Pica Behavior Consultation',
        diagnosis: 'Obsessive compulsive fabric chew / ingestive pica',
        treatment: 'Environmental enrichment, puzzle feeders',
        outcome: 'High behavioral risk factor for recurrent GI foreign bodies',
        clinicName: 'Olive Pet Hospital',
        veterinarian: 'Dr. Suresh Varma'
      }
    ],
    vaccinations: [
      {
        id: 'vac-41',
        vaccineName: 'Tricat Trio (FVRCP)',
        administeredDate: '2024-04-12',
        nextDueDate: '2025-04-12',
        batchNumber: 'FEL-7890B',
        status: 'Up to Date'
      }
    ],
    medications: [],
    surgeries: [],
    policies: [
      {
        id: 'pol-4',
        policyNumber: 'PT-11004',
        tier: 'Comprehensive',
        annualCoverageLimit: 250000,
        deductible: 3000,
        copayPercent: 15,
        startDate: '2024-10-01',
        renewalDate: '2025-09-30',
        status: 'Under Review'
      }
    ],
    claims: [
      {
        id: 'cl-4',
        claimNumber: 'CL-20838',
        treatment: 'Foreign Body Gastrointestinal Endoscopy',
        amountInr: 28400,
        date: '2024-10-02',
        status: 'Under Review'
      }
    ]
  },
  {
    id: 'pet-5',
    name: 'Bella',
    species: 'Dog',
    breed: 'Labrador Retriever',
    age: 2,
    ageUnit: 'years',
    sex: 'Female',
    weightKg: 28,
    microchipId: '985141001189445',
    imageUrl: PET_IMAGES.bella,
    policyId: 'PT-11589',
    policyStatus: 'Active',
    riskLevel: 'LOW',
    riskScore: 24,
    location: 'Kalyani Nagar, Pune, MH',
    ownerName: 'Nikhil & Radhika Deshmukh',
    ownerPhone: '+91 97654 32109',
    registeredVetClinic: 'Pune Small Animal Clinic, Pune',
    medicalHistory: [
      {
        id: 'med-501',
        date: '2024-07-20',
        event: 'Routine Bi-Annual Wellness Exam',
        diagnosis: 'Healthy young canine, no palpable joint effusion or cardiac murmurs',
        treatment: 'Routine heartworm antigen test (negative), NexGard flea & tick',
        outcome: 'Optimal vitality scores',
        clinicName: 'Pune Small Animal Clinic',
        veterinarian: 'Dr. Anita Joshi'
      }
    ],
    vaccinations: [
      {
        id: 'vac-51',
        vaccineName: 'Nobivac DHPPi + L4',
        administeredDate: '2024-07-20',
        nextDueDate: '2025-07-20',
        batchNumber: 'VANG-1029P',
        status: 'Up to Date'
      }
    ],
    medications: [],
    surgeries: [],
    policies: [
      {
        id: 'pol-5',
        policyNumber: 'PT-11589',
        tier: 'Comprehensive',
        annualCoverageLimit: 400000,
        deductible: 3500,
        copayPercent: 10,
        startDate: '2024-08-01',
        renewalDate: '2025-07-31',
        status: 'Active'
      }
    ],
    claims: []
  },
  {
    id: 'pet-6',
    name: 'Rocky',
    species: 'Dog',
    breed: 'French Bulldog',
    age: 5,
    ageUnit: 'years',
    sex: 'Male',
    weightKg: 13.5,
    microchipId: '985141009901238',
    imageUrl: PET_IMAGES.rocky,
    policyId: 'PT-10920',
    policyStatus: 'Under Review',
    riskLevel: 'HIGH',
    riskScore: 81,
    location: 'Adyar, Chennai, TN',
    ownerName: 'Girish Chandran',
    ownerPhone: '+91 94440 98123',
    registeredVetClinic: 'Madras Veterinary College Clinic, Chennai',
    medicalHistory: [
      {
        id: 'med-601',
        date: '2024-09-10',
        event: 'Brachycephalic Obstructive Airway (BOAS) Consultation',
        diagnosis: 'Grade 3 BOAS with elongated soft palate and stenotic nares',
        treatment: 'Surgical staphylectomy and alar fold wedge resection',
        outcome: 'Respiratory stridor significantly reduced; heat tolerance monitoring advised',
        clinicName: 'Madras Veterinary College Clinic',
        veterinarian: 'Prof. Dr. S. Balasubramanian'
      }
    ],
    vaccinations: [
      {
        id: 'vac-61',
        vaccineName: 'Canine 7-in-1 Vaccine',
        administeredDate: '2024-01-18',
        nextDueDate: '2025-01-18',
        batchNumber: 'MV-9821',
        status: 'Up to Date'
      }
    ],
    medications: [],
    surgeries: [
      {
        id: 'surg-61',
        surgeryName: 'BOAS Surgical Corrective Staged Surgery',
        date: '2024-09-15',
        hospital: 'Madras Veterinary College Clinic',
        surgeon: 'Prof. Dr. S. Balasubramanian',
        complications: 'Post-extubation laryngeal swelling controlled with IV dexamethasone',
        postOpRecovery: 'Stable in oxygen cage for 24h, discharged uneventfully'
      }
    ],
    policies: [
      {
        id: 'pol-6',
        policyNumber: 'PT-10920',
        tier: 'Essential',
        annualCoverageLimit: 200000,
        deductible: 5000,
        copayPercent: 20,
        startDate: '2024-05-10',
        renewalDate: '2025-05-09',
        status: 'Under Review'
      }
    ],
    claims: [
      {
        id: 'cl-6',
        claimNumber: 'CL-20835',
        treatment: 'Soft Palate Resection & BOAS Correction',
        amountInr: 65000,
        date: '2024-09-18',
        status: 'Attention Required'
      }
    ]
  },
  {
    id: 'pet-7',
    name: 'Coco',
    species: 'Dog',
    breed: 'Beagle',
    age: 4,
    ageUnit: 'years',
    sex: 'Female',
    weightKg: 12.2,
    microchipId: '985141004561234',
    imageUrl: PET_IMAGES.coco,
    policyId: 'PT-11210',
    policyStatus: 'Active',
    riskLevel: 'MEDIUM',
    riskScore: 48,
    location: 'Sector 43, Gurugram, HR',
    ownerName: 'Amit & Pooja Kapoor',
    ownerPhone: '+91 99100 45678',
    registeredVetClinic: 'Jeeyo Pet Clinic, Gurugram',
    medicalHistory: [
      {
        id: 'med-701',
        date: '2024-08-02',
        event: 'Ears Head-Shaking & Pruritus',
        diagnosis: 'Bilateral otitis externa with Malassezia yeast overgrowth',
        treatment: 'Deep ear canal flush, Posatex otic suspension for 7 days',
        outcome: 'Cytology negative on 14-day recheck; maintenance ear cleanse prescribed',
        clinicName: 'Jeeyo Pet Clinic',
        veterinarian: 'Dr. Neha Tandon'
      }
    ],
    vaccinations: [
      {
        id: 'vac-71',
        vaccineName: 'DHPPiL Vaccine',
        administeredDate: '2024-06-12',
        nextDueDate: '2025-06-12',
        batchNumber: 'VIRB-4321',
        status: 'Up to Date'
      }
    ],
    medications: [],
    surgeries: [],
    policies: [
      {
        id: 'pol-7',
        policyNumber: 'PT-11210',
        tier: 'Comprehensive',
        annualCoverageLimit: 300000,
        deductible: 3000,
        copayPercent: 10,
        startDate: '2024-07-01',
        renewalDate: '2025-06-30',
        status: 'Active'
      }
    ],
    claims: [
      {
        id: 'cl-7',
        claimNumber: 'CL-20841',
        treatment: 'Bilateral Otitis Externa Cytology & Treatment',
        amountInr: 9200,
        date: '2024-08-10',
        status: 'Settled'
      }
    ]
  },
  {
    id: 'pet-8',
    name: 'Daisy',
    species: 'Cat',
    breed: 'Siamese Cat',
    age: 5,
    ageUnit: 'years',
    sex: 'Female',
    weightKg: 3.5,
    microchipId: '985141007788112',
    imageUrl: PET_IMAGES.daisy,
    policyId: 'PT-10874',
    policyStatus: 'Active',
    riskLevel: 'LOW',
    riskScore: 29,
    location: 'Salt Lake Sector 1, Kolkata, WB',
    ownerName: 'Anirban Sen',
    ownerPhone: '+91 98300 11223',
    registeredVetClinic: 'Advanced Veterinary Care Center, Kolkata',
    medicalHistory: [
      {
        id: 'med-801',
        date: '2024-05-18',
        event: 'Annual Feline Renal Profile Screening',
        diagnosis: 'Normal SDMA and creatinine; urine specific gravity 1.042 (well concentrated)',
        treatment: 'Encourage wet hydration diet',
        outcome: 'Grade 0 renal baseline confirmed',
        clinicName: 'Advanced Veterinary Care Center',
        veterinarian: 'Dr. Debasish Roy'
      }
    ],
    vaccinations: [
      {
        id: 'vac-81',
        vaccineName: 'Fel-O-Vax IV + Rabies',
        administeredDate: '2024-05-18',
        nextDueDate: '2025-05-18',
        batchNumber: 'FEL-9901Z',
        status: 'Up to Date'
      }
    ],
    medications: [],
    surgeries: [],
    policies: [
      {
        id: 'pol-8',
        policyNumber: 'PT-10874',
        tier: 'Essential',
        annualCoverageLimit: 200000,
        deductible: 2000,
        copayPercent: 10,
        startDate: '2023-10-15',
        renewalDate: '2024-10-14',
        status: 'Active'
      }
    ],
    claims: []
  }
];

export const MOCK_ASSESSMENTS: Assessment[] = [
  {
    id: 'asm-1',
    petId: 'pet-1',
    petName: 'Max',
    breed: 'Golden Retriever',
    species: 'Dog',
    ageText: '6 years',
    sex: 'Male',
    policyId: 'PT-10291',
    riskLevel: 'MEDIUM',
    combinedScore: 64,
    ruleScore: 58,
    mlScore: 67,
    modelConfidence: 91,
    calibrationBand: 'Calibrated ±3.2%',
    informationGapsCount: 2,
    informationGaps: [
      {
        id: 'gap-1',
        title: 'Incomplete Orthopedic Diagnostic & Outcome Records',
        description: 'An orthopedic treatment history was identified in the veterinary record, but the definitive radiologic diagnosis and long-term treatment outcome are incomplete.',
        questions: [
          'What was the definitive radiologic diagnosis of the right stifle joint?',
          'When was the latest physical examination performed for stifle joint stability?',
          'Was surgical intervention (e.g., TPLO / TTA) formally recommended or scheduled?'
        ],
        status: 'Requested',
        requestedAt: '2024-10-22T09:40:00Z',
        responseSummary: 'Requested via Cessna Lifeline clinic questionnaire portal. Awaiting orthopedic specialist notes.',
        affectsCalibration: true
      },
      {
        id: 'gap-2',
        title: 'Prior Year Claim Reconciliation',
        description: 'Pre-existing policy declarations indicate 1 minor clinic reimbursement that lacks corresponding diagnostic code categorization.',
        questions: [
          'Please furnish the clinic invoice itemization for the November 2023 dental procedure.',
          'Verify if any concurrent medications were initiated during the 2023 dental exam.'
        ],
        status: 'Pending Request',
        affectsCalibration: false
      }
    ],
    contributingFactors: [
      {
        id: 'f-1',
        name: 'Previous orthopedic treatment',
        impact: 14,
        category: 'Medical History',
        explanation: 'History of stifle joint laxity and NSAID administration elevates joint underwriting hazard.',
        confidence: 94
      },
      {
        id: 'f-2',
        name: 'Age bracket (6 years)',
        impact: 10,
        category: 'Age & Breed',
        explanation: 'Canine senior transition window correlates with higher probability of chronic metabolic and musculoskeletal claims.',
        confidence: 92
      },
      {
        id: 'f-3',
        name: 'Breed profile (Golden Retriever)',
        impact: 8,
        category: 'Age & Breed',
        explanation: 'Breed actuarial baseline exhibits higher incidence of hip dysplasia, cruciate ligament rupture, and neoplastic conditions.',
        confidence: 89
      },
      {
        id: 'f-4',
        name: 'Previous claims history',
        impact: 5,
        category: 'Claims History',
        explanation: 'Recent claim submission for surgical consultation during policy probation period.',
        confidence: 86
      },
      {
        id: 'f-5',
        name: 'Vaccination & preventive compliance',
        impact: -4,
        category: 'Vaccination',
        explanation: 'Consistent multi-year DHPPiL booster compliance and up-to-date core immunization lowers infectious disease risk profile.',
        confidence: 95
      }
    ],
    status: 'Under Review',
    lastUpdated: '2 hours ago',
    underwriterDecision: {
      recommendation: 'MEDIUM RISK',
      selectedDecision: null,
      underwriterNotes: 'Reviewed primary veterinary submission from Cessna Lifeline. Need confirmation on stifle ligament integrity before binding orthopedic endorsement.',
      stipulations: ['Bilateral stifle joint 6-month waiting period recommended if unverified']
    },
    decisionHistory: [
      {
        id: 'dh-1',
        action: 'Request Information',
        user: 'Sarah Jenkins',
        role: 'Senior Underwriting Officer',
        timestamp: '2024-10-22 15:10 IST',
        notes: 'Dispatched 3 clinical questions to Cessna Lifeline regarding stifle laxity prognosis.',
        ruleScoreAtTime: 58,
        mlScoreAtTime: 67
      },
      {
        id: 'dh-0',
        action: 'Condition Added',
        user: 'Automated Rule Engine v3.2',
        role: 'Guidewire Core Rules',
        timestamp: '2024-10-20 11:00 IST',
        notes: 'Underwriting threshold flagged: Canine breed Golden Retriever age > 5 with musculoskeletal record triggers mandatory manual review.',
        ruleScoreAtTime: 58,
        mlScoreAtTime: 65
      }
    ],
    imageUrl: PET_IMAGES.max
  },
  {
    id: 'asm-2',
    petId: 'pet-2',
    petName: 'Luna',
    breed: 'Persian Cat',
    species: 'Cat',
    ageText: '4 years',
    sex: 'Female',
    policyId: 'PT-10442',
    riskLevel: 'MEDIUM',
    combinedScore: 54,
    ruleScore: 50,
    mlScore: 57,
    modelConfidence: 88,
    calibrationBand: 'Calibrated ±2.8%',
    informationGapsCount: 1,
    informationGaps: [
      {
        id: 'gap-201',
        title: 'Post-Extraction Dental Histology & Follow-up',
        description: 'Confirmation required that caudal stomatitis is stabilized without refractory lymphocytic-plasmacytic lesions.',
        questions: [
          'Was full mouth intraoral radiography performed post-extraction?',
          'Is any immunosuppressive therapy (e.g., cyclosporine) ongoing?'
        ],
        status: 'Requested',
        requestedAt: '2024-10-23T14:20:00Z',
        affectsCalibration: true
      }
    ],
    contributingFactors: [
      {
        id: 'f-21',
        name: 'Chronic feline oral disease (Stomatitis)',
        impact: 12,
        category: 'Medical History',
        explanation: 'Feline chronic gingivostomatitis has high recurrence rate and may require full mouth dental extractions.',
        confidence: 90
      },
      {
        id: 'f-22',
        name: 'Breed predisposition (Persian)',
        impact: 6,
        category: 'Age & Breed',
        explanation: 'Brachycephalic facial structure correlates with higher dental malocclusion and tear duct stenosis.',
        confidence: 85
      },
      {
        id: 'f-23',
        name: 'Indoor domestic environment',
        impact: -3,
        category: 'Geography',
        explanation: '100% strictly indoor domestic feline environment eliminates trauma/traffic exposure.',
        confidence: 92
      }
    ],
    status: 'Attention Required',
    lastUpdated: '4 hours ago',
    imageUrl: PET_IMAGES.luna
  },
  {
    id: 'asm-3',
    petId: 'pet-3',
    petName: 'Bruno',
    breed: 'German Shepherd',
    species: 'Dog',
    ageText: '8 years',
    sex: 'Male',
    policyId: 'PT-09823',
    riskLevel: 'LOW',
    combinedScore: 32,
    ruleScore: 35,
    mlScore: 29,
    modelConfidence: 96,
    calibrationBand: 'Calibrated ±1.9%',
    informationGapsCount: 0,
    informationGaps: [],
    contributingFactors: [
      {
        id: 'f-31',
        name: 'Verified clear joint radiographic baseline',
        impact: -10,
        category: 'Medical History',
        explanation: 'OFA Fair hip certification and lack of spinal arthropathy at age 8 indicates exceptional geriatric baseline.',
        confidence: 97
      },
      {
        id: 'f-32',
        name: 'Senior breed hazard',
        impact: 6,
        category: 'Age & Breed',
        explanation: 'Standard age loading factor for large canine breeds over 7 years.',
        confidence: 93
      },
      {
        id: 'f-33',
        name: 'Continuous 4-year policy retention',
        impact: -5,
        category: 'Claims History',
        explanation: 'No historical claim frequency across 48 months of continuous active coverage.',
        confidence: 99
      }
    ],
    status: 'Approved',
    lastUpdated: '1 day ago',
    imageUrl: PET_IMAGES.bruno
  },
  {
    id: 'asm-4',
    petId: 'pet-4',
    petName: 'Milo',
    breed: 'Domestic Shorthair',
    species: 'Cat',
    ageText: '3 years',
    sex: 'Male',
    policyId: 'PT-11004',
    riskLevel: 'HIGH',
    combinedScore: 78,
    ruleScore: 74,
    mlScore: 82,
    modelConfidence: 93,
    calibrationBand: 'Calibrated ±3.8%',
    informationGapsCount: 2,
    informationGaps: [
      {
        id: 'gap-401',
        title: 'Behavioral Pica Assessment & Household Safeguards',
        description: 'Documented history of obsessive linear foreign body ingestion requires behavioral mitigation validation.',
        questions: [
          'Has a certified feline veterinary behaviorist evaluated Milo?',
          'Are yarn, string, and linear hazards securely sequestered in the living space?'
        ],
        status: 'Pending Request',
        affectsCalibration: true
      }
    ],
    contributingFactors: [
      {
        id: 'f-41',
        name: 'Recurrent foreign body ingestion (Pica)',
        impact: 22,
        category: 'Medical History',
        explanation: 'Actuarial probability of second GI foreign body intervention within 24 months exceeds 62% in documented pica felines.',
        confidence: 96
      },
      {
        id: 'f-42',
        name: 'Recent emergency endoscopic intervention',
        impact: 14,
        category: 'Claims History',
        explanation: 'Emergency claim filed within 48 hours of policy proposal registration.',
        confidence: 95
      },
      {
        id: 'f-43',
        name: 'Young adult age category',
        impact: -3,
        category: 'Age & Breed',
        explanation: 'High cellular vitality and zero metabolic comorbidities.',
        confidence: 88
      }
    ],
    status: 'Attention Required',
    lastUpdated: '3 hours ago',
    imageUrl: PET_IMAGES.milo
  },
  {
    id: 'asm-5',
    petId: 'pet-5',
    petName: 'Bella',
    breed: 'Labrador Retriever',
    species: 'Dog',
    ageText: '2 years',
    sex: 'Female',
    policyId: 'PT-11589',
    riskLevel: 'LOW',
    combinedScore: 24,
    ruleScore: 22,
    mlScore: 26,
    modelConfidence: 95,
    calibrationBand: 'Calibrated ±2.1%',
    informationGapsCount: 0,
    informationGaps: [],
    contributingFactors: [
      {
        id: 'f-51',
        name: 'Zero pre-existing conditions reported',
        impact: -12,
        category: 'Medical History',
        explanation: 'Complete verified medical history confirms zero recorded illnesses or chronic therapy.',
        confidence: 96
      },
      {
        id: 'f-52',
        name: 'Optimal young adult physical index',
        impact: -6,
        category: 'Age & Breed',
        explanation: 'Weight-to-body-condition score 5/9 optimal for female Labrador.',
        confidence: 94
      }
    ],
    status: 'Approved',
    lastUpdated: '2 days ago',
    imageUrl: PET_IMAGES.bella
  },
  {
    id: 'asm-6',
    petId: 'pet-6',
    petName: 'Rocky',
    breed: 'French Bulldog',
    species: 'Dog',
    ageText: '5 years',
    sex: 'Male',
    policyId: 'PT-10920',
    riskLevel: 'HIGH',
    combinedScore: 81,
    ruleScore: 85,
    mlScore: 78,
    modelConfidence: 94,
    calibrationBand: 'Calibrated ±3.5%',
    informationGapsCount: 3,
    informationGaps: [
      {
        id: 'gap-601',
        title: 'Laryngeal Function & Post-Staphylectomy Assessment',
        description: 'BOAS corrective surgery documentation lacks post-extubation functional respiratory grading.',
        questions: [
          'What is the current post-surgical respiratory grade (0-3)?',
          'Were everted laryngeal saccules resected during the procedure?'
        ],
        status: 'Requested',
        requestedAt: '2024-10-21T16:00:00Z',
        affectsCalibration: true
      }
    ],
    contributingFactors: [
      {
        id: 'f-61',
        name: 'Severe Brachycephalic Airway Syndrome (BOAS)',
        impact: 24,
        category: 'Medical History',
        explanation: 'Grade 3 BOAS with past surgical correction presents permanent vulnerability to hyperthermia and aspiration.',
        confidence: 98
      },
      {
        id: 'f-62',
        name: 'High-risk breed actuarial category',
        impact: 16,
        category: 'Age & Breed',
        explanation: 'French Bulldogs show a 310% higher claim incidence than canine portfolio baseline.',
        confidence: 97
      },
      {
        id: 'f-63',
        name: 'Sub-tropical climate zone (Chennai)',
        impact: 5,
        category: 'Geography',
        explanation: 'Elevated ambient heat and humidity exacerbates brachycephalic thermoregulatory compromise.',
        confidence: 86
      }
    ],
    status: 'Referred',
    lastUpdated: '5 hours ago',
    imageUrl: PET_IMAGES.rocky
  },
  {
    id: 'asm-7',
    petId: 'pet-7',
    petName: 'Coco',
    breed: 'Beagle',
    species: 'Dog',
    ageText: '4 years',
    sex: 'Female',
    policyId: 'PT-11210',
    riskLevel: 'MEDIUM',
    combinedScore: 48,
    ruleScore: 45,
    mlScore: 51,
    modelConfidence: 89,
    calibrationBand: 'Calibrated ±2.4%',
    informationGapsCount: 1,
    informationGaps: [
      {
        id: 'gap-701',
        title: 'Allergy Diagnostics Follow-up',
        description: 'Verify if chronic otitis is secondary to food hypersensitivity or environmental atopy.',
        questions: [
          'Has an elimination diet trial been attempted?',
          'Is maintenance topical antimicrobial ear therapy prescribed?'
        ],
        status: 'Pending Request',
        affectsCalibration: false
      }
    ],
    contributingFactors: [
      {
        id: 'f-71',
        name: 'Recurrent bilateral otitis externa',
        impact: 10,
        category: 'Medical History',
        explanation: 'Pendulous ear pinnae and humid ear canals present moderate risk of chronic yeast and bacterial otitis.',
        confidence: 91
      },
      {
        id: 'f-72',
        name: 'Active policy history',
        impact: -4,
        category: 'Claims History',
        explanation: 'Timely claim reporting with transparent veterinary invoicing.',
        confidence: 87
      }
    ],
    status: 'Under Review',
    lastUpdated: '1 day ago',
    imageUrl: PET_IMAGES.coco
  },
  {
    id: 'asm-8',
    petId: 'pet-8',
    petName: 'Daisy',
    breed: 'Siamese Cat',
    species: 'Cat',
    ageText: '5 years',
    sex: 'Female',
    policyId: 'PT-10874',
    riskLevel: 'LOW',
    combinedScore: 29,
    ruleScore: 30,
    mlScore: 28,
    modelConfidence: 93,
    calibrationBand: 'Calibrated ±1.8%',
    informationGapsCount: 0,
    informationGaps: [],
    contributingFactors: [
      {
        id: 'f-81',
        name: 'Ideal renal biomonitoring baseline',
        impact: -8,
        category: 'Medical History',
        explanation: 'Documented normal SDMA screening eliminates early feline nephropathy concerns.',
        confidence: 95
      },
      {
        id: 'f-82',
        name: 'Up-to-date preventive protocols',
        impact: -5,
        category: 'Vaccination',
        explanation: 'Strict annual vaccinations and prophylactic parasite prevention.',
        confidence: 92
      }
    ],
    status: 'Approved',
    lastUpdated: '3 days ago',
    imageUrl: PET_IMAGES.daisy
  }
];

export const MOCK_CLAIMS: Claim[] = [
  {
    id: 'cl-20831',
    claimNumber: 'CL-20831',
    petId: 'pet-1',
    petName: 'Max',
    breed: 'Golden Retriever',
    species: 'Dog',
    claimType: 'Orthopedic Surgery & Diagnostics',
    treatment: 'Orthopedic Surgery & Post-Op Arthroscopy',
    amountInr: 42000,
    date: '2024-10-18',
    status: 'Under Review',
    anomalyScore: 31,
    anomalyLevel: 'LOW CONCERN',
    indicators: [
      {
        name: 'Treatment frequency',
        status: 'Moderate',
        detail: 'First orthopedic procedure billed in 14 months; aligned with previous stifle laxity record.'
      },
      {
        name: 'Invoice deviation',
        status: 'Low',
        detail: 'Billed amount (₹42,000) is within standard Bangalore veterinary surgery benchmark (₹38,000 – ₹46,000).'
      },
      {
        name: 'Previous claim pattern',
        status: 'Elevated',
        detail: 'Claim initiated 47 days after policy modification endorsement.'
      },
      {
        name: 'Medical consistency',
        status: 'Normal',
        detail: 'Carprofen prescription and post-op medication matches arthroscopy clinical discharge protocols.'
      }
    ],
    invoiceDetails: {
      invoiceNumber: 'INV-CESSNA-2024-8841',
      clinicGstNumber: '29AAACC1234F1Z8',
      clinicName: 'Cessna Lifeline Veterinary Hospital, Indiranagar',
      procedureCodes: ['VET-SURG-ORTHO-04', 'VET-ANES-GEN-02', 'VET-PHARM-NSAID-01'],
      medicationBilled: 6400,
      surgicalBilled: 24500,
      diagnosticBilled: 7100,
      roomCharges: 4000,
      totalBilledInr: 42000,
      standardMarketRangeInr: [38000, 46000]
    },
    medicalEvidence: [
      {
        id: 'ev-1',
        title: 'Surgical Discharge Summary & Operative Note',
        type: 'Surgical Discharge Summary',
        date: '2024-10-18',
        source: 'Cessna Lifeline Specialty Surgery Unit',
        verified: true,
        notes: 'Exploratory arthroscopy of right stifle joint confirming minor meniscal debridement without complete cranial cruciate rupture.',
        fileSize: '2.4 MB PDF'
      },
      {
        id: 'ev-2',
        title: 'Digital High-Definition Radiographs (Pre & Post)',
        type: 'Radiograph',
        date: '2024-10-18',
        source: 'Siemens Multix Vet Radiography Suite',
        verified: true,
        notes: 'Caudocranial and mediolateral projections of right stifle showing minimal osteophytosis.',
        fileSize: '14.8 MB DICOM'
      },
      {
        id: 'ev-3',
        title: 'Itemized Hospital Pharmacy & Consumables Invoice',
        type: 'Veterinary Invoice',
        date: '2024-10-18',
        source: 'Cessna Hospital Billing System',
        verified: true,
        notes: 'Contains verified clinic GSTIN and signed surgeon stamp.',
        fileSize: '820 KB PDF'
      }
    ],
    adjusterDecision: {
      status: 'Approved',
      approvedAmountInr: 37800, // 42000 minus 10% copay
      notes: 'Medical review establishes treatment necessity for right stifle meniscal debridement. Deductible of ₹4,000 previously met. 10% standard copay deducted. Clean investigation with zero evidence of misrepresentation.',
      decidedBy: 'Sarah Jenkins (Senior Underwriting & Claims Officer)',
      timestamp: '2024-10-24 16:30 IST'
    },
    imageUrl: PET_IMAGES.max
  },
  {
    id: 'cl-20832',
    claimNumber: 'CL-20832',
    petId: 'pet-2',
    petName: 'Luna',
    breed: 'Persian Cat',
    species: 'Cat',
    claimType: 'Dental Surgery & Extractions',
    treatment: 'Dental Stomatitis Extraction & Diagnostics',
    amountInr: 18500,
    date: '2024-09-12',
    status: 'Approved',
    anomalyScore: 14,
    anomalyLevel: 'LOW CONCERN',
    indicators: [
      {
        name: 'Treatment frequency',
        status: 'Normal',
        detail: 'Single dental extraction intervention; pre-op blood panels attached.'
      },
      {
        name: 'Invoice deviation',
        status: 'Normal',
        detail: 'Matches Mumbai metro veterinary dental schedule (₹15,000 – ₹20,000).'
      },
      {
        name: 'Previous claim pattern',
        status: 'Normal',
        detail: 'First claim in 16 months of coverage.'
      },
      {
        name: 'Medical consistency',
        status: 'Normal',
        detail: 'Pre-op dental radiographs demonstrate clear resorptive lesions.'
      }
    ],
    invoiceDetails: {
      invoiceNumber: 'INV-CRW-2024-5110',
      clinicGstNumber: '27AAACE5678B1Z2',
      clinicName: 'Crown Vet Worli, Mumbai',
      procedureCodes: ['VET-DENT-EXT-02', 'VET-BLOOD-PREOP-01'],
      medicationBilled: 2500,
      surgicalBilled: 12000,
      diagnosticBilled: 4000,
      roomCharges: 0,
      totalBilledInr: 18500,
      standardMarketRangeInr: [15000, 20000]
    },
    medicalEvidence: [
      {
        id: 'ev-21',
        title: 'Intraoral Dental Radiographs',
        type: 'Radiograph',
        date: '2024-09-12',
        source: 'Crown Vet Imaging',
        verified: true,
        notes: 'Demonstrates feline odontoclastic resorptive lesions (FORL Type 2) on tooth 108 and 208.',
        fileSize: '4.1 MB PDF'
      }
    ],
    imageUrl: PET_IMAGES.luna
  },
  {
    id: 'cl-20835',
    claimNumber: 'CL-20835',
    petId: 'pet-6',
    petName: 'Rocky',
    breed: 'French Bulldog',
    species: 'Dog',
    claimType: 'Corrective Soft Palate Resection',
    treatment: 'Soft Palate Resection & BOAS Correction',
    amountInr: 65000,
    date: '2024-09-18',
    status: 'Attention Required',
    anomalyScore: 58,
    anomalyLevel: 'MODERATE CONCERN',
    indicators: [
      {
        name: 'Treatment frequency',
        status: 'Normal',
        detail: 'Standard surgical protocol for BOAS.'
      },
      {
        name: 'Invoice deviation',
        status: 'Moderate',
        detail: 'Billed amount (₹65,000) exceeds Chennai institutional median (₹42,000 – ₹52,000) by 25%.'
      },
      {
        name: 'Previous claim pattern',
        status: 'Elevated',
        detail: 'Claim submitted within 130 days of initial policy commencement.'
      },
      {
        name: 'Medical consistency',
        status: 'Moderate',
        detail: 'Verify whether clinical symptoms originated prior to the 90-day respiratory waiting period.'
      }
    ],
    invoiceDetails: {
      invoiceNumber: 'INV-MVC-2024-1290',
      clinicGstNumber: '33AAABM9876C1Z4',
      clinicName: 'Madras Veterinary College Specialty Hospital',
      procedureCodes: ['VET-SURG-BOAS-01', 'VET-ICU-O2-24H'],
      medicationBilled: 9500,
      surgicalBilled: 42000,
      diagnosticBilled: 6500,
      roomCharges: 7000,
      totalBilledInr: 65000,
      standardMarketRangeInr: [45000, 52000]
    },
    medicalEvidence: [
      {
        id: 'ev-61',
        title: 'Operative Summary & Anesthesia Monitoring Chart',
        type: 'Surgical Discharge Summary',
        date: '2024-09-18',
        source: 'MVC Department of Surgery',
        verified: true,
        notes: 'Documented staple resection of elongated palate under sevoflurane.',
        fileSize: '3.8 MB PDF'
      }
    ],
    imageUrl: PET_IMAGES.rocky
  },
  {
    id: 'cl-20838',
    claimNumber: 'CL-20838',
    petId: 'pet-4',
    petName: 'Milo',
    breed: 'Domestic Shorthair',
    species: 'Cat',
    claimType: 'Emergency Endoscopic Gastrointestinal Intervention',
    treatment: 'Foreign Body Gastrointestinal Endoscopy',
    amountInr: 28400,
    date: '2024-10-02',
    status: 'Under Review',
    anomalyScore: 22,
    anomalyLevel: 'LOW CONCERN',
    indicators: [
      {
        name: 'Treatment frequency',
        status: 'Normal',
        detail: 'Acute foreign body extraction.'
      },
      {
        name: 'Invoice deviation',
        status: 'Low',
        detail: 'Emergency out-of-hours endoscopy surcharge within 10% of Hyderabad regional average.'
      },
      {
        name: 'Previous claim pattern',
        status: 'Normal',
        detail: 'First filed claim.'
      },
      {
        name: 'Medical consistency',
        status: 'Normal',
        detail: 'Endoscopic camera footage confirms retrieved textile strand.'
      }
    ],
    invoiceDetails: {
      invoiceNumber: 'INV-OLIVE-2024-9011',
      clinicGstNumber: '36AAACP4411D1Z9',
      clinicName: 'Olive Pet Hospital, Jubilee Hills',
      procedureCodes: ['VET-ENDO-GI-01', 'VET-EMERG-NIGHT-01'],
      medicationBilled: 4200,
      surgicalBilled: 18000,
      diagnosticBilled: 4200,
      roomCharges: 2000,
      totalBilledInr: 28400,
      standardMarketRangeInr: [24000, 30000]
    },
    medicalEvidence: [
      {
        id: 'ev-41',
        title: 'Endoscopy Photographic Record',
        type: 'Prescription',
        date: '2024-10-02',
        source: 'Olive Pet Hospital Endoscopy Unit',
        verified: true,
        notes: 'Color still frames of gastric lumen and extraction snare.',
        fileSize: '5.2 MB JPEG'
      }
    ],
    imageUrl: PET_IMAGES.milo
  },
  {
    id: 'cl-20841',
    claimNumber: 'CL-20841',
    petId: 'pet-7',
    petName: 'Coco',
    breed: 'Beagle',
    species: 'Dog',
    claimType: 'Outpatient Otic Therapeutics',
    treatment: 'Bilateral Otitis Externa Cytology & Treatment',
    amountInr: 9200,
    date: '2024-08-10',
    status: 'Settled',
    anomalyScore: 9,
    anomalyLevel: 'LOW CONCERN',
    indicators: [
      {
        name: 'Treatment frequency',
        status: 'Normal',
        detail: 'Standard outpatient consultation.'
      },
      {
        name: 'Invoice deviation',
        status: 'Normal',
        detail: 'Itemized standard consultation and topical pharmacy.'
      },
      {
        name: 'Previous claim pattern',
        status: 'Normal',
        detail: 'Regular claim history with routine resolution.'
      },
      {
        name: 'Medical consistency',
        status: 'Normal',
        detail: 'Direct in-clinic microscopic cytology report attached.'
      }
    ],
    invoiceDetails: {
      invoiceNumber: 'INV-JEEYO-2024-3012',
      clinicGstNumber: '06AAACJ9912E1Z7',
      clinicName: 'Jeeyo Pet Clinic, Gurugram',
      procedureCodes: ['VET-OUTPAT-01', 'VET-CYTO-EAR-01'],
      medicationBilled: 3800,
      surgicalBilled: 0,
      diagnosticBilled: 2900,
      roomCharges: 2500,
      totalBilledInr: 9200,
      standardMarketRangeInr: [8000, 11000]
    },
    medicalEvidence: [
      {
        id: 'ev-71',
        title: 'Cytopathology Ear Swab Laboratory Report',
        type: 'Pathology Report',
        date: '2024-08-10',
        source: 'Jeeyo Diagnostic Lab',
        verified: true,
        notes: 'Malassezia pachydermatis 4+ organism score.',
        fileSize: '410 KB PDF'
      }
    ],
    imageUrl: PET_IMAGES.coco
  }
];

export const MOCK_PORTFOLIO_METRICS: PortfolioMetrics = {
  totalApplications: 24,
  requireAttention: 7,
  claimsUnderReview: 18,
  informationGaps: 13,
  riskDistribution: {
    low: 48,
    medium: 38,
    high: 14
  },
  claimsActivity: [
    { month: 'May', submitted: 42, approved: 38, flagged: 4, averagePayoutInr: 28400 },
    { month: 'Jun', submitted: 56, approved: 51, flagged: 5, averagePayoutInr: 31200 },
    { month: 'Jul', submitted: 68, approved: 62, flagged: 6, averagePayoutInr: 29800 },
    { month: 'Aug', submitted: 74, approved: 65, flagged: 9, averagePayoutInr: 34500 },
    { month: 'Sep', submitted: 89, approved: 80, flagged: 9, averagePayoutInr: 33900 },
    { month: 'Oct (MTD)', submitted: 64, approved: 52, flagged: 7, averagePayoutInr: 36200 }
  ],
  speciesBreakdown: [
    { species: 'Canine (Dogs)', percentage: 68, count: 1640 },
    { species: 'Feline (Cats)', percentage: 29, count: 698 },
    { species: 'Exotics & Avian', percentage: 3, count: 72 }
  ],
  breedRiskTrends: [
    { breed: 'French Bulldog', avgRiskScore: 78, claimRatio: 4.2, sampleSize: 180 },
    { breed: 'Golden Retriever', avgRiskScore: 61, claimRatio: 2.8, sampleSize: 420 },
    { breed: 'Persian Cat', avgRiskScore: 56, claimRatio: 2.4, sampleSize: 260 },
    { breed: 'German Shepherd', avgRiskScore: 49, claimRatio: 1.9, sampleSize: 310 },
    { breed: 'Beagle', avgRiskScore: 46, claimRatio: 1.7, sampleSize: 240 },
    { breed: 'Labrador Retriever', avgRiskScore: 32, claimRatio: 1.2, sampleSize: 580 },
    { breed: 'Siamese Cat', avgRiskScore: 30, claimRatio: 1.1, sampleSize: 190 }
  ]
};

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: "Max's medical information request received",
    description: 'Dr. Rohan Nambiar (Cessna Lifeline) uploaded operative notes regarding right stifle joint stability.',
    timestamp: '18 minutes ago',
    read: false,
    priority: 'high',
    link: '/assessments/asm-1',
    type: 'assessment'
  },
  {
    id: 'notif-2',
    title: '3 assessments require underwriting review',
    description: 'New applications for Milo, Rocky, and Luna have completed ML feature pipeline extraction.',
    timestamp: '1 hour ago',
    read: false,
    priority: 'high',
    link: '/assessments',
    type: 'assessment'
  },
  {
    id: 'notif-3',
    title: 'Claim #CL-20835 flagged for secondary scrutiny',
    description: 'Soft palate resection invoice deviation of +25% detected compared to regional institutional benchmarks.',
    timestamp: '3 hours ago',
    read: false,
    priority: 'medium',
    link: '/claims/cl-20835',
    type: 'claim'
  },
  {
    id: 'notif-4',
    title: 'Model version 2.4.1 calibrated on canine orthopedic risks',
    description: 'Retrained SHAP explanation baseline incorporates 3,400 new clinical outcome records across Indian tier-1 veterinary hospitals.',
    timestamp: '1 day ago',
    read: true,
    priority: 'low',
    link: '/analytics',
    type: 'system'
  },
  {
    id: 'notif-5',
    title: 'Information request resolved: Bruno (PT-09823)',
    description: 'Bilateral hip screening radiographs authenticated with zero evidence of dysplasia.',
    timestamp: '2 days ago',
    read: true,
    priority: 'low',
    link: '/assessments/asm-3',
    type: 'info_request'
  }
];
