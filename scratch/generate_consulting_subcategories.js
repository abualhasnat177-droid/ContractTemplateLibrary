const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '..', 'content', 'templates', 'consulting');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 1. Update existing Consulting files with appropriate subcategory
const existingFilesMapping = {
  "coaching-agreement.json": "Coaching Niches",
  "consulting-agreement.json": "Specialist Consulting"
};

Object.entries(existingFilesMapping).forEach(([fileName, subcat]) => {
  const filePath = path.join(outputDir, fileName);
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, 'utf8');
    try {
      const parsed = JSON.parse(raw);
      parsed.subcategory = subcat;
      fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2), 'utf8');
      console.log(`Updated subcategory for existing: ${fileName} -> ${subcat}`);
    } catch (e) {
      console.error(`Error updating existing file: ${fileName}`, e);
    }
  }
});

// 2. Define the 30 new templates
const newTemplates = [
  // --- Specialist Consulting (10) ---
  {
    id: "hr-consulting-agreement",
    subcategory: "Specialist Consulting",
    title: "HR Consulting Agreement",
    description: "Services agreement for human resources consulting, covering audits, compliance, handbook updates, and recruiting setups.",
    whenToUse: "Use this consulting agreement when hiring or working as an HR specialist to conduct employee handbooks audits or setup HR software integrations.",
    whatsCovered: [
      "Scope of HR compliance audits and advisory reviews",
      "Drafting and updating employee handbook templates",
      "Support for hiring, recruiting, and onboarding pipelines",
      "Independent contractor classification of the advisor",
      "Standard client and employee solicitation bans"
    ],
    specificFields: [
      { id: "hr_audit_scope", label: "Audit Focus Area", type: "text", placeholder: "e.g. Employee Handbook Audit and Recruiting Pipelines", required: true, group: "HR Details" },
      { id: "monthly_hours", label: "Consulting Hours per Month", type: "number", placeholder: "e.g. 20", required: true, group: "Schedule" }
    ],
    tags: ["hr", "human-resources", "handbook", "compliance", "consulting"]
  },
  {
    id: "legal-consulting-agreement",
    subcategory: "Specialist Consulting",
    title: "Legal Consulting Agreement (Non-Attorney)",
    description: "Non-attorney consulting services agreement, clarifying that no attorney-client relationship is established and no legal advice is being given.",
    whenToUse: "Use this agreement when hiring or working as a regulatory, contract management, or policy advisor who is NOT acting as legal counsel.",
    whatsCovered: [
      "Strict disclaimer: no attorney-client privilege created",
      "Services are regulatory or strategic, not legal representation",
      "Consultant is not acting as an attorney under state bar rules",
      "Confidentiality and protection of proprietary materials",
      "Limitation of consultant liability for policy outcomes"
    ],
    specificFields: [
      { id: "legal_topic_scope", label: "Regulatory Consulting Scope", type: "text", placeholder: "e.g. Contract Management Workflow Optimization", required: true, group: "Scope" }
    ],
    tags: ["regulatory", "non-attorney", "consulting", "policy", "legal"],
    faq: [
      { question: "Is this the same as hiring an attorney?", answer: "No. This template explicitly states that the consultant is not acting as your lawyer, meaning the attorney-client privilege does not apply to your communications." }
    ]
  },
  {
    id: "financial-consulting-agreement",
    subcategory: "Specialist Consulting",
    title: "Financial Consulting Agreement",
    description: "Corporate finance consulting agreement covering budgeting, forecasting, cash flow auditing, and CFO services.",
    whenToUse: "Use this agreement when hiring a fractional CFO, bookkeeper, or financial analyst to audit corporate accounting files or build cash models.",
    whatsCovered: [
      "Scope of bookkeeping, tax planning, and fractional CFO tasks",
      "Access permissions for bank feeds and accounting software",
      "Confidentiality of corporate balance sheets and tax records",
      "Requirement to keep receipts and ledger accounts up to date",
      "Limitation of consultant liability for market investment losses"
    ],
    specificFields: [
      { id: "financial_services_scope", label: "Financial Services Scope", type: "textarea", placeholder: "e.g. Cash flow forecasting, quarterly budgeting, and fractional CFO reviews...", required: true, group: "Scope" },
      { id: "monthly_fee", label: "Monthly Services Retainer ($)", type: "currency", placeholder: "e.g. 5,000.00", required: true, group: "Compensation" }
    ],
    tags: ["financial", "cfo", "fractional", "accounting", "consulting"]
  },
  {
    id: "operations-consulting-agreement",
    subcategory: "Specialist Consulting",
    title: "Operations Consulting Agreement",
    description: "Workflow efficiency, cost minimization, and business operations audit consulting agreement.",
    whenToUse: "Use this agreement when hiring an operations expert to audit warehouse logistics, automate digital systems, or clean up organizational structure.",
    whatsCovered: [
      "Operations workflow reviews and system integrations",
      "Project timelines, deliverables, and cost-reduction audits",
      "Intellectual property assignments for custom scripts built",
      "No-employee classification and standard indemnity clauses",
      "Termination notice schedules for operating tasks"
    ],
    specificFields: [
      { id: "ops_milestone_target", label: "Operations Milestone Target", type: "text", placeholder: "e.g. ERP System Migration and CRM Automation", required: true, group: "Scope" }
    ],
    tags: ["operations", "workflow", "efficiency", "consulting", "erp"]
  },
  {
    id: "supply-chain-consulting-agreement",
    subcategory: "Specialist Consulting",
    title: "Supply Chain Consulting Agreement",
    description: "Logistics optimization, vendor selection, and distribution consulting agreement.",
    whenToUse: "Use this contract when working with a manufacturing, shipping, or distribution consultant to optimize freight routes or negotiate vendor contracts.",
    whatsCovered: [
      "Audit of warehouse management systems and freight channels",
      "Selection protocols for new parts manufacturers",
      "Strict confidentiality for vendor pricing spreadsheets",
      "Conflict of interest exclusions: consultant must disclose affiliate commissions",
      "Indemnification for freight logistics mistakes"
    ],
    specificFields: [
      { id: "logistics_networks", label: "Supply Chain Scope", type: "text", placeholder: "e.g. Freight Routing and Vendor Sourcing for Hardware Parts", required: true, group: "Scope" }
    ],
    tags: ["supplychain", "logistics", "vendor", "freight", "consulting"]
  },
  {
    id: "esg-consulting-agreement",
    subcategory: "Specialist Consulting",
    title: "ESG / Sustainability Consulting Agreement",
    description: "Sustainability and Environmental, Social, and Governance compliance consulting contract.",
    whenToUse: "Use this contract when hiring a sustainability consultant to review environmental impact models or build ESG compliance reports.",
    whatsCovered: [
      "Preparation of carbon emission audits and ESG filings",
      "Adherence to reporting frameworks (e.g. GRI, SASB)",
      "Access to corporate facilities and energy bills",
      "Confidentiality of internal waste logs and audits",
      "Disclaimer of regulatory certifications by consultant"
    ],
    specificFields: [
      { id: "esg_framework", label: "Target ESG Framework", type: "text", placeholder: "e.g. GRI (Global Reporting Initiative) / SASB standards", required: true, group: "ESG Settings" }
    ],
    tags: ["esg", "sustainability", "carbon", "compliance", "consulting"]
  },
  {
    id: "risk-management-consulting-agreement",
    subcategory: "Specialist Consulting",
    title: "Risk Management Consulting Agreement",
    description: "Risk exposure analysis, business continuity preparation, and safety compliance consulting agreement.",
    whenToUse: "Use this contract when auditing company insurance plans, disaster recovery databases, or physical site safety practices.",
    whatsCovered: [
      "Audit of digital threat logs and business continuity assets",
      "Liability insurance adequacy reviews",
      "Preparation of risk assessment binders",
      "Waiver of consultant liability for eventual insurance claims",
      "Confidentiality of corporate vulnerability records"
    ],
    specificFields: [
      { id: "risk_audit_scope", label: "Risk Audit Target", type: "text", placeholder: "e.g. Disaster Recovery and Corporate Insurance Review", required: true, group: "Scope" }
    ],
    tags: ["risk", "audit", "insurance", "security", "consulting"]
  },
  {
    id: "change-management-consulting-agreement",
    subcategory: "Specialist Consulting",
    title: "Change Management Consulting Agreement",
    description: "Tailored for post-merger integration, corporate restructuring, and internal culture transitions.",
    whenToUse: "Use this agreement when hiring an organizational development expert to manage staff restructuring or corporate merger adjustments.",
    whatsCovered: [
      "Staff communication plans and workshop schedules",
      "Executive alignment reviews and restructuring audits",
      "Confidentiality of employee performance logs",
      "Independent contractor status and no-employment promise",
      "Exclusivity of consultant workflow recommendations"
    ],
    specificFields: [
      { id: "org_transition_timeline", label: "Restructuring Project", type: "text", placeholder: "e.g. Post-Merger Corporate Integration Plan", required: true, group: "Project Details" }
    ],
    tags: ["change", "restructuring", "hr", "culture", "consulting"]
  },
  {
    id: "dei-consulting-agreement",
    subcategory: "Specialist Consulting",
    title: "DEI Consulting Agreement",
    description: "Diversity, Equity, and Inclusion workplace audits, seminars, and hiring policy consulting.",
    whenToUse: "Use this contract when bringing in a DEI consultant to lead training workshops, audit salary ranges, or update hiring strategies.",
    whatsCovered: [
      "Scope of diversity audits and salary equity reviews",
      "Preparation of training slides and seminar booklets",
      "Ownership of workshop training materials (retained by consultant)",
      "Strict confidentiality of employee surveys",
      "Payment schedules for training deliverables"
    ],
    specificFields: [
      { id: "dei_seminar_topic", label: "Primary Training Topic", type: "text", placeholder: "e.g. Inclusive Leadership and Hiring Frameworks", required: true, group: "Scope" }
    ],
    tags: ["dei", "diversity", "training", "hr", "consulting"]
  },
  {
    id: "real-estate-consulting-agreement",
    subcategory: "Specialist Consulting",
    title: "Real Estate Consulting Agreement",
    description: "Property portfolio management, asset advisory, and market research consulting.",
    whenToUse: "Use this contract when working with a real estate advisor to compile market studies, evaluate building investments, or audit lease portfolios.",
    whatsCovered: [
      "Property portfolio valuations and market analysis logs",
      "Exclusion of broker services (consultant is not representing as transactional agent)",
      "Conflict of interest: consultant must disclose personal property stakes",
      "Confidentiality of client acquisition targets",
      "Payment schedules (fixed fee or hourly rates)"
    ],
    specificFields: [
      { id: "real_estate_portfolio", label: "Consulting Target Portfolio", type: "text", placeholder: "e.g. Commercial Office Space Lease Portfolio", required: true, group: "Scope" }
    ],
    tags: ["real-estate", "broker", "portfolio", "consulting", "property"]
  },

  // --- Coaching Niches (10) ---
  {
    id: "relationship-coaching-agreement",
    subcategory: "Coaching Niches",
    title: "Relationship Coaching Agreement",
    description: "Individual or couples relationship coaching agreement outlining session rules, payment, and boundaries.",
    whenToUse: "Use this contract when providing or receiving relationship counseling or couples communication coaching.",
    whatsCovered: [
      "Schedule of coaching sessions and cancellation guidelines",
      "Mental health disclaimer: coaching is not psychiatric therapy",
      "Confidentiality of session journals and worksheets",
      "Payment policies for package rates",
      "Termination procedures for relationship coaching"
    ],
    specificFields: [
      { id: "coaching_sessions_count", label: "Sessions in Package", type: "number", placeholder: "e.g. 8", required: true, group: "Package" }
    ],
    tags: ["relationship", "coaching", "therapy-disclaimer", "sessions", "family"]
  },
  {
    id: "mindset-nlp-coaching",
    subcategory: "Coaching Niches",
    title: "Mindset / NLP Coaching Contract",
    description: "Cognitive mindset coaching contract integrating NLP (Neuro-Linguistic Programming) techniques, clarifying that sessions are not psychiatric therapy.",
    whenToUse: "Use this coaching agreement when offering mindset training, NLP cognitive exercises, or life transformation coaching.",
    whatsCovered: [
      "Mindset growth goals and NLP technique summaries",
      "Medical disclaimer: coach is not a licensed psychiatrist or counselor",
      "Client commitment to complete session homework",
      "No guarantees of specific psychological outcomes",
      "Refund and session rescheduling rules"
    ],
    specificFields: [
      { id: "nlp_package_months", label: "Coaching Package Duration (Months)", type: "select", options: ["3", "6", "12"], defaultValue: "3", required: true, group: "Plan Details" }
    ],
    tags: ["nlp", "mindset", "lifecoaching", "disclaimer", "psychology"]
  },
  {
    id: "business-coaching-agreement",
    subcategory: "Coaching Niches",
    title: "Business Coaching Agreement",
    description: "Executive and founder business coaching agreement focused on career development, scaling, and leadership.",
    whenToUse: "Use this agreement when hiring or working as a business coach, leadership mentor, or executive coach to scaling startup teams.",
    whatsCovered: [
      "Strategic business goal setting and review cadences",
      "Confidentiality of client financial plans and corporate structure",
      "No-guarantees: coach does not guarantee profit increases",
      "Termination at-will by either party",
      "Ownership of strategic worksheets provided"
    ],
    specificFields: [
      { id: "coaching_focus_area", label: "Primary Focus Area", type: "text", placeholder: "e.g. Scaling Sales Channels and Executive Delegation", required: true, group: "Details" }
    ],
    tags: ["business", "executive", "founder", "scaling", "coaching"]
  },
  {
    id: "parenting-coaching-contract",
    subcategory: "Coaching Niches",
    title: "Parenting Coaching Contract",
    description: "Private family and parenting guidance coaching framework, clarifying parental responsibility boundaries.",
    whenToUse: "Use this agreement when offering child behavior advice, sibling mediation strategies, or parenting coaching sessions.",
    whatsCovered: [
      "Parenting consulting sessions and schedule guidelines",
      "Child welfare disclaimer: coach does not offer medical diagnoses",
      "Requirement for parent to remain present during child coaching",
      "Confidentiality of private family conversations",
      "Payment and session rollover timelines"
    ],
    specificFields: [
      { id: "family_session_frequency", label: "Meeting Schedule", type: "text", placeholder: "e.g. Once per week via Zoom", required: true, group: "Schedule" }
    ],
    tags: ["parenting", "family", "children", "coaching", "education"]
  },
  {
    id: "academic-tutoring-coaching",
    subcategory: "Coaching Niches",
    title: "Academic / Tutoring Coaching Agreement",
    description: "Student tutoring and academic planning coach agreement detailing schedule, rates, and study expectations.",
    whenToUse: "Use this contract when hiring or acting as a tutor, academic coach, or university preparation consultant.",
    whatsCovered: [
      "Tutoring topics and academic milestones",
      "Varying rates for test preparation vs regular tutoring",
      "Strict 24-hour cancellation and no-show fee rules",
      "No guarantee of specific grades or test scores",
      "Parent consent for minor students"
    ],
    specificFields: [
      { id: "student_subject", label: "Academic Subject / Target", type: "text", placeholder: "e.g. AP Calculus and College Admissions Prep", required: true, group: "Academia" }
    ],
    tags: ["academic", "tutoring", "student", "college", "school"]
  },
  {
    id: "sobriety-recovery-coaching",
    subcategory: "Coaching Niches",
    title: "Sobriety / Recovery Coaching Agreement",
    description: "Peer support sobriety and addiction recovery coaching, clarifying boundaries from professional medical rehabilitation.",
    whenToUse: "Use this peer support agreement when offering sobriety encouragement, recovery planning, or post-rehab accountability coaching.",
    whatsCovered: [
      "Accountability check-in schedules and phone session rules",
      "Strict medical disclaimer: recovery coach is not a rehab facility or therapist",
      "Client commitment to sobriety during sessions",
      "Action protocol if the client undergoes a medical relapse",
      "Confidentiality guidelines with legal disclosure exceptions"
    ],
    specificFields: [
      { id: "sober_sessions_per_week", label: "Sober Check-Ins per Week", type: "number", placeholder: "e.g. 3", required: true, group: "Schedule" }
    ],
    tags: ["sobriety", "recovery", "sober", "accountability", "coaching"]
  },
  {
    id: "spiritual-coaching-agreement",
    subcategory: "Coaching Niches",
    title: "Spiritual Coaching Agreement",
    description: "Spiritual growth and mindfulness mentoring agreement outlining session boundaries and personal growth targets.",
    whenToUse: "Use this contract when guiding clients through meditation practices, mindfulness journals, or spiritual exploration sessions.",
    whatsCovered: [
      "Spiritual mentoring session layout and scheduling",
      "Personal development disclaimer: client is responsible for own choices",
      "Confidentiality of spiritual experiences shared",
      "Cancellation and payment details",
      "Freedom of religious belief and boundaries of coaching"
    ],
    specificFields: [
      { id: "spiritual_sessions_count", label: "Spiritual Sessions in Package", type: "number", placeholder: "e.g. 10", required: true, group: "Package" }
    ],
    tags: ["spiritual", "mindfulness", "meditation", "mentoring", "coaching"]
  },
  {
    id: "adhd-coaching-agreement",
    subcategory: "Coaching Niches",
    title: "ADHD Coaching Agreement",
    description: "Executive function coaching for clients with ADHD, focusing on organizational habits and productivity tools.",
    whenToUse: "Use this agreement when offering habit tracking, organization skills, and time management coaching for individuals with ADHD.",
    whatsCovered: [
      "Executive function coaching and organization skills scope",
      "Strict disclaimer: ADHD coaching does not involve medication management",
      "Rescheduling rules for clients with executive delays",
      "Confidentiality of habits and performance journals",
      "Coaching fee schedules and package details"
    ],
    specificFields: [
      { id: "coaching_habit_focus", label: "Primary Habit Focus", type: "text", placeholder: "e.g. Time Management and Task Prioritization", required: true, group: "Focus" }
    ],
    tags: ["adhd", "executive-function", "habits", "productivity", "coaching"]
  },
  {
    id: "voice-public-speaking-coaching",
    subcategory: "Coaching Niches",
    title: "Voice & Public Speaking Coaching",
    description: "Vocal, speech, and public presentation confidence coaching contract.",
    whenToUse: "Use this contract when training clients for TED talks, board presentations, keynote speeches, or vocal performance.",
    whatsCovered: [
      "Vocal exercises, speech drafts, and slide design advice",
      "Session timeline leading up to a specific speaking event",
      "Recording permission for training analysis",
      "Intellectual property details for speech materials built",
      "Payment and session cancellation timelines"
    ],
    specificFields: [
      { id: "presentation_event_date", label: "Target Presentation Event Date", type: "date", required: true, group: "Target Event" }
    ],
    tags: ["speaking", "voice", "speech", "keynote", "public-speaking"]
  },
  {
    id: "sports-performance-coaching",
    subcategory: "Coaching Niches",
    title: "Sports Performance Coaching Agreement",
    description: "Athletic performance, fitness goal setting, and mental training coaching agreement.",
    whenToUse: "Use this agreement when providing athletic mental coaching, physical fitness plans, or team performance training.",
    whatsCovered: [
      "Physical and mental fitness training session layouts",
      "Health screening waiver (client confirms they are fit for sport)",
      "Injuries liability release: coach is not liable for training strains",
      "Goal setting and performance metrics tracking",
      "Cancellation and session package rules"
    ],
    specificFields: [
      { id: "athletic_sport", label: "Target Sport / Discipline", type: "text", placeholder: "e.g. Marathon Run Training / High School Basketball", required: true, group: "Athletics" }
    ],
    tags: ["sports", "athletic", "fitness", "coaching", "waiver"]
  },

  // --- Engagement Structures (10) ---
  {
    id: "consulting-day-rate",
    subcategory: "Engagement Structures",
    title: "Consulting Day Rate Agreement",
    description: "Specialist consulting agreement based on a flat daily fee, including travel policies and overtime hours.",
    whenToUse: "Use this agreement when consulting for a corporate client on a day-rate basis (e.g. onsite system installations or workshops).",
    whatsCovered: [
      "Definition of a standard consulting day (e.g. up to 8 hours)",
      "Daily rate amount and payment schedules",
      "Overtime rate multiplier for extended days",
      "Travel expense reimbursement guidelines",
      "Independent contractor status and taxes"
    ],
    specificFields: [
      { id: "day_rate_amount", label: "Consulting Day Rate ($)", type: "currency", placeholder: "e.g. 1,500.00", required: true, group: "Compensation" },
      { id: "max_hours_per_day", label: "Maximum Standard Hours per Day", type: "number", placeholder: "e.g. 8", required: true, group: "Schedule" }
    ],
    tags: ["dayrate", "consulting", "flatfee", "travel", "corporate"]
  },
  {
    id: "consulting-project-fee",
    subcategory: "Engagement Structures",
    title: "Consulting Project Fee Agreement",
    description: "Project-based consulting agreement structured around fixed pricing and milestone delivery payments.",
    whenToUse: "Use this project fee contract when charging a flat fee to execute a defined set of deliverables (e.g. rebuilding a supply chain database).",
    whatsCovered: [
      "Total fixed project price and initial deposit fee",
      "Milestone definitions and completion checkups",
      "Procedure for handling out-of-scope work (change orders)",
      "Timeline and estimated project completion date",
      "Intellectual property transfer upon final payment"
    ],
    specificFields: [
      { id: "project_total_fee", label: "Total Project Flat Fee ($)", type: "currency", placeholder: "e.g. 12,000.00", required: true, group: "Compensation" },
      { id: "project_milestones_summary", label: "Milestones Summary", type: "textarea", placeholder: "e.g. Phase 1: Database Audit (30%), Phase 2: CRM Migration (40%), Phase 3: Launch (30%)...", required: true, group: "Milestones" }
    ],
    tags: ["projectfee", "flatfee", "milestone", "consulting", "scope"]
  },
  {
    id: "consulting-equity-services",
    subcategory: "Engagement Structures",
    title: "Consulting Equity-for-Services Agreement",
    description: "Consulting contract where payment is made partly or fully in stock options or advisory shares.",
    whenToUse: "Use this equity-based consulting agreement when working for early-stage startups that pay with advisor stock options instead of cash.",
    whatsCovered: [
      "Equity share grant or option parameters",
      "Vesting schedules: monthly vesting with/without cliff",
      "Board of directors approval requirements",
      "Securities law representations by the consultant",
      "Termination terms and treatment of unvested options"
    ],
    specificFields: [
      { id: "shares_granted", label: "Number of Shares / Options", type: "number", placeholder: "e.g. 25000", required: true, group: "Equity Details" },
      { id: "equity_vesting_months", label: "Vesting Period (Months)", type: "select", options: ["12", "24", "36", "48"], defaultValue: "24", required: true, group: "Equity Details" }
    ],
    tags: ["equity", "options", "shares", "startup", "consulting"]
  },
  {
    id: "group-coaching-program",
    subcategory: "Engagement Structures",
    title: "Group Coaching Program Agreement",
    description: "Terms for clients enrolling in a multi-week group coaching program, specifying community guidelines and refund policies.",
    whenToUse: "Use this contract for clients joining group coaching calls, cohort-based programs, or online study containers.",
    whatsCovered: [
      "Access to group coaching Zoom schedules and records",
      "Community safety rules (prohibiting harassment of members)",
      "Strict no-refund policy after program start date",
      "Intellectual property boundaries of shared course files",
      "Psychological/medical disclaimer for coaching topics"
    ],
    specificFields: [
      { id: "group_program_name", label: "Group Program Name", type: "text", placeholder: "e.g. Six-Week Leadership Cohort 2026", required: true, group: "Program Info" },
      { id: "program_enrollment_fee", label: "Enrollment Fee ($)", type: "currency", placeholder: "e.g. 997.00", required: true, group: "Billing" }
    ],
    tags: ["groupcoaching", "cohort", "refunds", "community", "program"]
  },
  {
    id: "mastermind-program",
    subcategory: "Engagement Structures",
    title: "Mastermind Program Agreement",
    description: "High-ticket mastermind network agreement detailing retreats, networking, and mutual non-disclosure of member business stats.",
    whenToUse: "Use this high-end contract for clients enrolling in a year-long mastermind group that includes physical retreats and private board sessions.",
    whatsCovered: [
      "Mastermind membership features and retreat schedules",
      "Travel cost responsibilities: client pays own flight/hotel",
      "Mutual non-disclosure of other mastermind members' sales numbers",
      "Strict refund and payment default policies",
      "Termination of membership for toxic behavior"
    ],
    specificFields: [
      { id: "mastermind_fee", label: "Annual Mastermind Fee ($)", type: "currency", placeholder: "e.g. 15,000.00", required: true, group: "Fees" },
      { id: "retreats_count", label: "Included Physical Retreats", type: "number", placeholder: "e.g. 3", required: true, group: "Program Info" }
    ],
    tags: ["mastermind", "retreat", "networking", "high-ticket", "secrecy"]
  },
  {
    id: "online-coaching-terms",
    subcategory: "Engagement Structures",
    title: "Online Coaching Program Terms",
    description: "Digital terms of service agreement for online courses, membership portals, and asynchronous coaching portals.",
    whenToUse: "Use this terms of service document for clients buying online courses, Slack coaching access, or Kajabi portal access.",
    whatsCovered: [
      "Access duration to course portals and files",
      "Recurring monthly billing and card authorization",
      "Prohibition on sharing login codes with third parties",
      "Intellectual property boundaries for worksheets",
      "Liability limits for hosting software downtime"
    ],
    specificFields: [
      { id: "monthly_membership_fee", label: "Recurring Monthly Fee ($)", type: "currency", placeholder: "e.g. 97.00", required: true, group: "Billing" }
    ],
    tags: ["online", "membership", "course", "saas-terms", "billing"]
  },
  {
    id: "speaking-engagement-contract",
    subcategory: "Engagement Structures",
    title: "Speaking Engagement Contract",
    description: "Event speaker contract specifying presentation time, speaking fees, travel coverage, and video recording permissions.",
    whenToUse: "Use this speaking contract when booking a keynote speaker, panelist, or presenter for a corporate event or industry expo.",
    whatsCovered: [
      "Keynote topic, speech duration, and venue info",
      "Speaking fee, deposit, and final payment deadlines",
      "Travel, flight, and hotel reimbursement scopes",
      "Video and audio recording permissions (marketing restrictions)",
      "Cancellation policy if the event is canceled (force majeure)"
    ],
    specificFields: [
      { id: "event_name", label: "Event / Expo Name", type: "text", placeholder: "e.g. Annual Tech Leadership Summit 2026", required: true, group: "Event Details" },
      { id: "speaking_fee", label: "Speaking Performance Fee ($)", type: "currency", placeholder: "e.g. 3,500.00", required: true, group: "Billing" },
      { id: "presentation_minutes", label: "Speech Duration (Minutes)", type: "number", placeholder: "e.g. 45", required: true, group: "Performance" }
    ],
    tags: ["speaking", "keynote", "event", "travel", "speaker"]
  },
  {
    id: "workshop-facilitation-agreement",
    subcategory: "Engagement Structures",
    title: "Workshop Facilitation Agreement",
    description: "Facilitator services contract for running corporate seminars, offsites, or training programs.",
    whenToUse: "Use this facilitation contract when hiring an external facilitator to run a corporate strategic offsite or leadership seminar.",
    whatsCovered: [
      "Workshop preparation and agenda planning tasks",
      "Facilitator service fee and material printing costs",
      "IP ownership: training files are retained by facilitator",
      "Cancellation timeline and deposit forfeiture rules",
      "Independent contractor classification"
    ],
    specificFields: [
      { id: "workshop_title", label: "Workshop Theme / Title", type: "text", placeholder: "e.g. Three-Day Executive Strategy Offsite", required: true, group: "Workshop Details" },
      { id: "facilitator_fee", label: "Facilitation Service Fee ($)", type: "currency", placeholder: "e.g. 4,500.00", required: true, group: "Compensation" }
    ],
    tags: ["workshop", "facilitator", "offsite", "training", "seminar"]
  },
  {
    id: "training-services-agreement",
    subcategory: "Engagement Structures",
    title: "Training Services Agreement",
    description: "Services agreement for onboarding employees, installing software tools, and conducting operational training.",
    whenToUse: "Use this training agreement when bringing in an instructor to onboard your team on new software or machinery.",
    whatsCovered: [
      "Scope of training modules and onsite visit rules",
      "Hardware safety and equipment instruction rules",
      "Training fees and scheduling restrictions",
      "Waiver of trainer liability for employee errors post-training",
      "Confidentiality of company operational workflows"
    ],
    specificFields: [
      { id: "training_scope", label: "Training Program Scope", type: "text", placeholder: "e.g. Salesforce CRM Workflow Training for Sales Staff", required: true, group: "Scope" }
    ],
    tags: ["training", "onboarding", "software", "corporate", "coaching"]
  },
  {
    id: "coaching-discovery-call",
    subcategory: "Engagement Structures",
    title: "Coaching Discovery Call Agreement",
    description: "Simple terms of agreement for introductory coaching consultations, covering basic expectations and cancellation timelines.",
    whenToUse: "Use this brief agreement before a discovery call or introductory diagnostic consultation to establish boundaries and collect basic info.",
    whatsCovered: [
      "Duration and focus of the introductory call",
      "Strict cancellation notice requirements (e.g. 24 hours)",
      "Coaching is not psychiatric therapy disclaimer",
      "Confidentiality of introductory metrics shared",
      "No obligation to sign up for long coaching packages"
    ],
    specificFields: [
      { id: "call_minutes_duration", label: "Call Duration (Minutes)", type: "select", options: ["15", "30", "45", "60"], defaultValue: "30", required: true, group: "Call Details" }
    ],
    tags: ["discovery", "intro", "coaching", "consultation", "quick"]
  }
];

// Helper to format a single template object
function makeConsultingTemplate(t) {
  let fields = [];
  let clauses = [];

  // standard fields for consulting
  fields = [
    { id: "client_name", label: "Client Company/Individual", type: "text", placeholder: "e.g. Apex Corporation", required: true, group: "Client" },
    { id: "client_address", label: "Client Street Address", type: "text", placeholder: "e.g. 200 Summit Blvd, Suite 400, Chicago, IL", required: true, group: "Client" },
    { id: "provider_name", label: "Service Provider Name", type: "text", placeholder: "e.g. Horizon Growth Advisors", required: true, group: "Provider" },
    { id: "provider_address", label: "Provider Street Address", type: "text", placeholder: "e.g. 808 Innovation Way, Austin, TX", required: true, group: "Provider" },
    ...(t.specificFields || []),
    { id: "effective_date", label: "Effective Date", type: "date", required: true, group: "Key Dates" },
    { id: "governing_state", label: "Governing Jurisdiction", type: "text", placeholder: "e.g. Illinois", required: true, group: "Legal Settings" }
  ];

  // generate clauses
  clauses = [
    {
      id: "intro",
      heading: t.title.toUpperCase(),
      body: `This professional services agreement (the "Agreement") is entered into as of {effective_date} (the "Effective Date"), by and between {provider_name}, located at {provider_address} ("Provider"), and {client_name}, located at {client_address} ("Client").`,
      optional: false,
      enabledByDefault: true
    },
    {
      id: "status",
      heading: "1. Independent Contractor Status",
      body: "Provider acts solely as an independent contractor. Nothing in this Agreement shall construct an employer-employee relationship, partnership, or joint venture between the parties.",
      optional: false,
      enabledByDefault: true
    }
  ];

  // Add specific clauses based on type
  if (t.id === 'hr-consulting-agreement') {
    clauses.push({
      id: "hr_terms",
      heading: "2. HR Consulting Services",
      body: "Provider shall audit employee files, handbooks, and hiring practices in connection with: {hr_audit_scope}. Provider shall allocate up to {monthly_hours} hours per month to perform these tasks.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'legal-consulting-agreement') {
    clauses.push({
      id: "non_attorney_disclaimer",
      heading: "2. Strict Legal Disclaimer",
      body: "Provider is conducting consulting regarding: {legal_topic_scope}. Client acknowledges that Provider is not a licensed attorney, does not practice law in this jurisdiction, and that no attorney-client privilege is created. Communications are NOT legal advice.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'financial-consulting-agreement') {
    clauses.push({
      id: "financial_services_covenants",
      heading: "2. Financial Accounting Access",
      body: "Provider shall perform financial advisory services: {financial_services_scope}. Client shall compensate Provider with a monthly retainer of {monthly_fee}. Client agrees to provide secure software read-only access keycodes.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'operations-consulting-agreement') {
    clauses.push({
      id: "ops_milestones",
      heading: "2. Operational Systems Audits",
      body: "Provider shall audit business systems and automate databases to complete milestones regarding: {ops_milestone_target}. Standard delivery dates are subject to Client delivering operations metrics.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'supply-chain-consulting-agreement') {
    clauses.push({
      id: "supply_chain_scope",
      heading: "2. Supply Chain Sourcing",
      body: "Provider shall analyze freight channels and source manufacturing parts regarding: {logistics_networks}. Provider confirms they carry zero conflict of interest and will not receive un-disclosed factory kickback fees.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'esg-consulting-agreement') {
    clauses.push({
      id: "esg_reporting",
      heading: "2. ESG Data Collection",
      body: "Provider shall compile waste, carbon, and sustainability logs to help Client file reports matching {esg_framework}. Client is solely responsible for verifying the correctness of all tax and regulatory filings.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'risk-management-consulting-agreement') {
    clauses.push({
      id: "risk_auditing",
      heading: "2. Risk Mitigation Audits",
      body: "Provider shall audit safety manuals, employee files, and cloud backup databases regarding: {risk_audit_scope}. Provider makes no warranty that audit recommendations will eliminate insurance risks.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'change-management-consulting-agreement') {
    clauses.push({
      id: "org_transition_restructure",
      heading: "2. Corporate Restructuring Transition",
      body: "Provider shall lead organizational transition workshops and strategic planning regarding: {org_transition_timeline}. Provider shall have access to management teams and feedback surveys.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'dei-consulting-agreement') {
    clauses.push({
      id: "dei_training",
      heading: "2. DEI Workplace Training",
      body: "Provider shall conduct seminars and salary audits regarding: {dei_seminar_topic}. Training materials, slides, and workbook files remain the exclusive intellectual property of the Provider.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'real-estate-consulting-agreement') {
    clauses.push({
      id: "property_advisory",
      heading: "2. Real Estate Portfolio Auditing",
      body: "Provider shall perform strategic market analysis and portfolio research regarding: {real_estate_portfolio}. Client confirms Provider is acting as advisor only, not as a transaction broker.",
      optional: false,
      enabledByDefault: true
    });
  }

  // Coaching niche clauses
  if (t.id.includes('coaching') || t.id.includes('parenting') || t.id.includes('nlp')) {
    let focusText = "coaching program";
    if (t.id === 'relationship-coaching-agreement') focusText = `{coaching_sessions_count} relationship coaching sessions`;
    if (t.id === 'mindset-nlp-coaching') focusText = "NLP and mindset transformation coaching";
    if (t.id === 'business-coaching-agreement') focusText = `business coaching targeting: {coaching_focus_area}`;
    if (t.id === 'parenting-coaching-contract') focusText = "family parenting consulting";
    if (t.id === 'academic-tutoring-coaching') focusText = `academic tutoring for subject: {student_subject}`;
    if (t.id === 'sobriety-recovery-coaching') focusText = "sober peer support accountability coaching";
    if (t.id === 'spiritual-coaching-agreement') focusText = `{spiritual_sessions_count} spiritual growth mentoring sessions`;
    if (t.id === 'adhd-coaching-agreement') focusText = `executive function habit coaching: {coaching_habit_focus}`;
    if (t.id === 'voice-public-speaking-coaching') focusText = "voice and speech coaching for event date: {presentation_event_date}";
    if (t.id === 'sports-performance-coaching') focusText = `sports performance training for discipline: {athletic_sport}`;

    clauses.push(
      {
        id: "coaching_scope",
        heading: "2. Coaching Engagement",
        body: `Provider shall supply Client with ${focusText}. Sessions shall follow the schedules and calendar bookings approved by both parties.`,
        optional: false,
        enabledByDefault: true
      },
      {
        id: "medical_disclaimer",
        heading: "3. Mental and Physical Health Disclaimer",
        body: "Client acknowledges that coaching services do not constitute psychiatric therapy, clinical psychology, medical treatment, or healthcare services. If Client has psychiatric or medical issues, they agree to seek licensed medical professionals.",
        optional: false,
        enabledByDefault: true
      }
    );
  }

  // Engagement structures
  if (t.id === 'consulting-day-rate') {
    clauses.push({
      id: "day_rate_terms",
      heading: "2. Day Rate Billing",
      body: "Client shall pay Provider a day rate of {day_rate_amount} per calendar day worked. A standard day consists of up to {max_hours_per_day} hours. Extended hours shall be billed at a pro-rata rate.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'consulting-project-fee') {
    clauses.push({
      id: "project_fee_terms",
      heading: "2. Project Pricing and Milestones",
      body: "Client shall pay Provider a total flat fee of {project_total_fee} for the complete project deliverables. Payments shall be distributed matching milestones: {project_milestones_summary}.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'consulting-equity-services') {
    clauses.push({
      id: "equity_compensation",
      heading: "2. Equity Grant Options",
      body: "As payment for consulting services, Company shall grant Advisor {shares_granted} stock options or common shares, vesting in equal monthly installments over {equity_vesting_months} months.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'group-coaching-program') {
    clauses.push({
      id: "group_terms",
      heading: "2. Group Program Community Rules",
      body: "Client enrolls in group program {group_program_name} for the total fee of {program_enrollment_fee}. Client agrees to behave respectfully on group calls. Harassment or spamming members will result in immediate removal without refund.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'mastermind-program') {
    clauses.push({
      id: "mastermind_terms",
      heading: "2. Mastermind Retreats and Fees",
      body: "Client joins the mastermind for an annual fee of {mastermind_fee}, which includes {retreats_count} mastermind retreats. Client is responsible for booking their own flight and lodging costs.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'online-coaching-terms') {
    clauses.push({
      id: "membership_portal",
      heading: "2. Monthly Membership Billing",
      body: "Client authorizes a recurring payment of {monthly_membership_fee} per month for access to online coaching files. Client may cancel at any time, but no partial monthly refunds are granted.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'speaking-engagement-contract') {
    clauses.push({
      id: "speaking_fees",
      heading: "2. Speaking Performance Covenants",
      body: "Speaker shall deliver a {presentation_minutes}-minute presentation at the event: {event_name}. Client shall pay Speaker a performance fee of {speaking_fee}. Travel costs shall be covered by Client.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'workshop-facilitation-agreement') {
    clauses.push({
      id: "facilitation_terms",
      heading: "2. Facilitator Retainer Fees",
      body: "Facilitator shall prepare and run the workshop: {workshop_title}. Client shall pay Facilitator a service fee of {facilitator_fee}. Training files remain the intellectual property of the Facilitator.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'training-services-agreement') {
    clauses.push({
      id: "training_terms",
      heading: "2. Training Services Scope",
      body: "Provider shall conduct instructional sessions for Client's staff regarding: {training_scope}. Client agrees that training recommendations do not guarantee specific corporate productivity metrics.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'coaching-discovery-call') {
    clauses.push({
      id: "discovery_call_terms",
      heading: "2. Consultation Call Duration",
      body: "Provider shall host a discovery call lasting up to {call_minutes_duration} minutes. Client agrees that this call is diagnostic, and does not oblige Client to buy long-term coaching packages.",
      optional: false,
      enabledByDefault: true
    });
  }

  // Standard common endings
  clauses.push(
    {
      id: "confidentiality",
      heading: "Confidentiality & Trade Secrecy",
      body: "Both parties agree to treat all business plans, customer metrics, financial spreadsheets, and personal disclosures shared during the engagement as strictly confidential.",
      optional: false,
      enabledByDefault: true
    },
    {
      id: "governing_law",
      heading: "Governing Law",
      body: "This Agreement shall be governed and interpreted under the laws of the State/Country of {governing_state}.",
      optional: false,
      enabledByDefault: true
    }
  );

  return {
    id: t.id,
    slug: t.id,
    category: "consulting",
    subcategory: t.subcategory,
    title: t.title,
    description: t.description,
    whatsCovered: t.whatsCovered || [
      "Definition of advisory and coaching scopes",
      "Payment schedules, deposits, and default billing",
      "Intellectual property rights for worksheets and slides",
      "Therapy disclaimers and liability waivers",
      "Governing law and arbitration settings"
    ],
    whenToUse: t.whenToUse,
    jurisdictions: ["US", "UK", "CA", "AU"],
    lastReviewedAt: "2026-05-23",
    reviewerName: "Robert Vance, Esq.",
    estimatedFillMinutes: t.estimatedFillMinutes || 3,
    fields: fields,
    clauses: clauses,
    relatedTemplates: t.relatedTemplates || ["consulting-agreement", "coaching-agreement"],
    faq: t.faq || [
      { question: "Can I edit this contract template?", answer: "Yes, you can edit this template using the online editor, and add custom annexes for specific consulting milestones or agendas." },
      { question: "Is this agreement suitable for international clients?", answer: "Yes, the contract includes governing law and independent contractor clauses that are easily adaptable for cross-border coaching or consulting." }
    ],
    tags: t.tags || ["consulting", "coaching", "services", "agreement"]
  };
}

// Generate files
newTemplates.forEach((t) => {
  const formatted = makeConsultingTemplate(t);
  const filePath = path.join(outputDir, `${formatted.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(formatted, null, 2), 'utf8');
  console.log(`Successfully wrote template: ${formatted.id}`);
});

console.log('Finished writing Consulting templates!');
