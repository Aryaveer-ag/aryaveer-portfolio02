export interface WorkExperience {
  id: string;
  company: string;
  role: string;
  projectTitle: string;
  period: string;
  location: string;
  summary: string;
  bullets: string[];
  metrics: { label: string; value: string }[];
  technologies: string[];
}

export interface LeadershipRole {
  id: string;
  organization: string;
  role: string;
  period: string;
  location: string;
  summary: string;
  bullets: string[];
  metrics: { label: string; value: string }[];
}

export interface Certification {
  id: string;
  title: string;
  issuer: "Google Cloud" | "Microsoft" | "Amazon Web Services" | "freeCodeCamp";
  skillsCovered: string;
  badgeVariant: "cyan" | "emerald" | "indigo" | "amber";
}

export interface PriorEducation {
  institution: string;
  level: string;
  board: string;
  year: string;
  location: string;
}

export const workExperienceData: WorkExperience[] = [
  {
    id: "infosys-springboard",
    company: "Infosys Springboard",
    role: "Machine Learning Intern",
    projectTitle: "AI-NutriCare: AI/ML-Based Personalized Diet Plan Generator",
    period: "Nov 2025 – Jan 2026",
    location: "Virtual / Industry Internship",
    summary:
      "Engineered an end-to-end ML platform leveraging NLP and GenAI to convert unstructured clinical records into evidence-based personalized nutrition recommendations.",
    bullets: [
      "Engineered an ML platform using NLP and GenAI techniques to analyze unstructured clinical notes, prescriptions, and numeric medical reports, converting messy real-world clinical data into structured, actionable insights.",
      "Processed 500,000+ time-series patient records from the MIMIC-IV clinical database (50+ GB) to extract health-nutrition correlations for evidence-based recommendations.",
      "Designed a personalization engine that dynamically adapts dietary recommendations across 20+ specific clinical conditions, allergies, and patient preferences, validating outputs against clinical guidelines before delivery.",
      "Followed an Agile, iterative build-test-refine delivery cycle in collaboration with cross-functional engineering mentors.",
    ],
    metrics: [
      { label: "MIMIC-IV Records", value: "500K+ Time-Series" },
      { label: "Clinical Dataset", value: "50+ GB" },
      { label: "Adapted Conditions", value: "20+ Conditions" },
      { label: "Pipeline Delivery", value: "Agile CI/CD" },
    ],
    technologies: [
      "Python",
      "Jupyter Notebook",
      "NLP",
      "GenAI",
      "Machine Learning",
      "Pandas",
      "NumPy",
      "Clinical Data Modeling",
    ],
  },
];

export const leadershipRolesData: LeadershipRole[] = [
  {
    id: "cultural-council-dtu",
    organization: "Cultural Council DTU",
    role: "Public Relations Head",
    period: "Jan 2024 – Present",
    location: "Delhi Technological University, Delhi",
    summary:
      "Full ownership of large-scale execution and corporate relations for university festivals, directing operations and brand partnerships.",
    bullets: [
      "Took full ownership of planning and operations for 10+ large-scale university events, including Engifest (North India’s largest cultural festival with 150,000+ total attendees).",
      "Forged strategic corporate partnerships, securing 50+ sponsors (including OnePlus and Intel) and managing sponsor deliverables end-to-end.",
      "Doubled digital channel engagement through targeted marketing campaigns and data-driven communications, demonstrating consultant-style stakeholder management.",
    ],
    metrics: [
      { label: "Event Footfall", value: "150,000+ Attendees" },
      { label: "Corporate Sponsors", value: "50+ (OnePlus, Intel)" },
      { label: "Events Directed", value: "10+ Major Festivals" },
      { label: "Audience Growth", value: "2x Digital Engagement" },
    ],
  },
  {
    id: "kalakriti-art-society",
    organization: "Kalakriti Art Society DTU",
    role: "Corporate Relations Lead",
    period: "Jan 2024 – Present",
    location: "Delhi Technological University, Delhi",
    summary:
      "Led corporate partnerships, festival budgeting, and inter-institutional coordination for Delhi-NCR's premier collegiate art festival.",
    bullets: [
      "Led execution of Delhi-NCR’s largest collegiate art festival spanning 70+ participating colleges and universities.",
      "Managed an operating festival budget exceeding INR 15 Lakhs in coordination with university authorities, faculty, and corporate partners.",
      "Spearheaded outreach, corporate sponsorship pitching, and contract execution with zero compliance infractions.",
    ],
    metrics: [
      { label: "Institutions Covered", value: "70+ Colleges" },
      { label: "Operating Budget", value: "₹15+ Lakhs" },
      { label: "Regional Scale", value: "Delhi-NCR Largest" },
    ],
  },
];

export const certificationsData: Certification[] = [
  {
    id: "gcp-genai",
    title: "Generative AI Fundamentals",
    issuer: "Google Cloud",
    skillsCovered: "Large Language Models, Prompt Engineering, Responsible AI Guardrails, Transformer Architectures",
    badgeVariant: "cyan",
  },
  {
    id: "azure-genai",
    title: "Generative AI Solutions on Azure",
    issuer: "Microsoft",
    skillsCovered: "Microsoft Applied Skills: Building, configuring, and deploying enterprise GenAI workflows",
    badgeVariant: "indigo",
  },
  {
    id: "aws-cloud-ai",
    title: "Cloud Essentials & AI Foundations",
    issuer: "Amazon Web Services",
    skillsCovered: "AWS Knowledge Badge: Core cloud infrastructure, automated application deployment, serverless architectures",
    badgeVariant: "amber",
  },
  {
    id: "fcc-sql",
    title: "Relational Database (SQL)",
    issuer: "freeCodeCamp",
    skillsCovered: "Relational schema design, complex query structures, PostgreSQL database administration",
    badgeVariant: "cyan",
  },
  {
    id: "fcc-ml-python",
    title: "Machine Learning with Python",
    issuer: "freeCodeCamp",
    skillsCovered: "Supervised/unsupervised algorithms, neural networks, model evaluation metrics, TensorFlow workflows",
    badgeVariant: "emerald",
  },
  {
    id: "fcc-react",
    title: "Front End Development Libraries (React JS)",
    issuer: "freeCodeCamp",
    skillsCovered: "Dynamic web applications, state management, component architecture for MVPs",
    badgeVariant: "indigo",
  },
  {
    id: "fcc-data-analysis",
    title: "Data Analysis with Python",
    issuer: "freeCodeCamp",
    skillsCovered: "Hands-on data cleaning, statistical processing with Pandas/NumPy, analytical insight generation",
    badgeVariant: "amber",
  },
];

export const priorEducationData: PriorEducation[] = [
  {
    institution: "Delhi Technological University (DTU)",
    level: "B.Tech, Electronics and Communications Engineering",
    board: "University Degree",
    year: "2023 – 2027",
    location: "Delhi, India",
  },
  {
    institution: "HeeraLal Public School",
    level: "Senior Secondary (Class XII)",
    board: "CBSE Board",
    year: "2023",
    location: "Delhi, India",
  },
  {
    institution: "Don Bosco School",
    level: "Secondary School (Class X)",
    board: "ICSE Board",
    year: "2021",
    location: "Siliguri, West Bengal, India",
  },
];

