const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '..', 'content', 'templates', 'healthcare');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const templates = [
  {
    "id": "independent-contractor-clinical",
    "slug": "independent-contractor-clinical",
    "category": "healthcare",
    "title": "Clinical Independent Contractor Agreement",
    "description": "A specialized employment agreement for medical practitioners, nurses, or clinicians providing contract services at a medical facility.",
    "whatsCovered": [
      "Clinician credentials, licensing, and liability insurance requirements",
      "Independent contractor tax status and billing exclusions",
      "Confidentiality of patient charts and HIPAA regulations",
      "Practice coverage schedules and emergency contact duty",
      "Termination terms (usually 30 days written notice)"
    ],
    "whenToUse": "Use this agreement when hiring a contract nurse, physician assistant, or medical specialist to support clinical care on an independent contractor basis.",
    "jurisdictions": ["US", "CA"],
    "lastReviewedAt": "2026-05-18",
    "reviewerName": "Sarah Jenkins, Esq.",
    "estimatedFillMinutes": 4,
    "fields": [
      { "id": "clinic_name", "label": "Facility / Clinic Name", "type": "text", "placeholder": "e.g. Oakridge Urgent Care LLC", "required": true, "group": "Facility Details" },
      { "id": "provider_name", "label": "Clinician / Provider Name", "type": "text", "placeholder": "e.g. Dr. Arthur Pendelton", "required": true, "group": "Clinician Details" },
      { "id": "provider_license", "label": "Medical License Number", "type": "text", "placeholder": "e.g. MD-9098765-FL", "required": true, "group": "Clinician Details" },
      { "id": "specialty", "label": "Clinical Specialty", "type": "text", "placeholder": "e.g. Family Medicine", "required": true, "group": "Clinician Details" },
      { "id": "hourly_rate", "label": "Contract Hourly Rate ($)", "type": "currency", "placeholder": "e.g. 120.00", "required": true, "group": "Financials" },
      { "id": "effective_date", "label": "Effective Date", "type": "date", "required": true, "group": "Key Dates" },
      { "id": "governing_state", "label": "Governing Jurisdiction", "type": "text", "placeholder": "e.g. Florida", "required": true, "group": "Legal Terms" }
    ],
    "clauses": [
      {
        "id": "intro",
        "heading": "CLINICAL CONTRACTOR AGREEMENT",
        "body": "This Clinical Independent Contractor Agreement (the \"Agreement\") is entered into as of {effective_date} (the \"Effective Date\"), by and between {clinic_name} (the \"Facility\"), and {provider_name}, licensed under number {provider_license} (\"Clinician\").",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "services",
        "heading": "1. Scope of Clinical Services",
        "body": "Clinician agrees to provide clinical services in the specialty of {specialty} at Facility. Clinician represents that they hold and will maintain a valid, active medical license to practice in this jurisdiction.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "compensation",
        "heading": "2. Hourly Compensation",
        "body": "Facility shall compensate Clinician at the rate of {hourly_rate} per hour for all hours of clinical service provided. Clinician shall submit monthly invoice logs for payment verification.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "insurance",
        "heading": "3. Professional Liability Insurance",
        "body": "Clinician shall maintain professional liability (malpractice) insurance coverage with limits of not less than $1,000,000 per claim and $3,000,000 in the aggregate, and shall provide proof of coverage to Facility.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "hipaa",
        "heading": "4. HIPAA Compliance",
        "body": "Clinician shall comply with the Health Insurance Portability and Accountability Act (HIPAA) and shall protect the privacy, security, and integrity of all patient protected health information (PHI).",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "governing_law",
        "heading": "5. Governing Law",
        "body": "This Agreement shall be governed and interpreted under the laws of the State/Country of {governing_state}.",
        "optional": false,
        "enabledByDefault": true
      }
    ],
    "relatedTemplates": ["hipaa-authorization", "independent-contractor-agreement"],
    "faq": [
      { "question": "Does this contract provide employee benefits?", "answer": "No. The clinician is classified as an independent contractor and is responsible for their own taxes, insurance, and retirement plans." },
      { "question": "Is malpractice insurance required under this contract?", "answer": "Yes. The clinician must provide proof of malpractice insurance meeting the specified coverage limits before providing care." }
    ],
    "tags": ["clinical", "doctor", "nurse", "contractor", "medical"]
  },
  {
    "id": "locum-tenens-agreement",
    "slug": "locum-tenens-agreement",
    "category": "healthcare",
    "title": "Locum Tenens Physician Agreement",
    "description": "A staffing agreement used to hire a temporary substitute physician to cover a medical practice during a staff physician's leave of absence.",
    "whatsCovered": [
      "Substitute physician duties, scheduling, and clinical coverage",
      "Daily or weekly flat compensation rates",
      "Travel, lodging, and credentialing cost reimbursements",
      "Liability insurance coverage provision details",
      "HIPAA patient data security covenants"
    ],
    "whenToUse": "Use this agreement to secure a locum tenens (temporary substitute) doctor to cover your clinic during a primary physician's vacation, maternity leave, or illness.",
    "jurisdictions": ["US", "UK", "CA"],
    "lastReviewedAt": "2026-05-14",
    "reviewerName": "Sarah Jenkins, Esq.",
    "estimatedFillMinutes": 4,
    "fields": [
      { "id": "clinic_name", "label": "Practice / Clinic Name", "type": "text", "placeholder": "e.g. Westside Pediatrics Group", "required": true, "group": "Practice Info" },
      { "id": "physician_name", "label": "Substitute Physician Name", "type": "text", "placeholder": "e.g. Dr. Evelyn Vance", "required": true, "group": "Physician Info" },
      { "id": "daily_rate", "label": "Daily Cover Rate ($)", "type": "currency", "placeholder": "e.g. 1,500.00", "required": true, "group": "Financials" },
      { "id": "start_date", "label": "Coverage Start Date", "type": "date", "required": true, "group": "Key Dates" },
      { "id": "end_date", "label": "Coverage End Date", "type": "date", "required": true, "group": "Key Dates" },
      { "id": "governing_state", "label": "Governing Jurisdiction", "type": "text", "placeholder": "e.g. California", "required": true, "group": "Legal Terms" }
    ],
    "clauses": [
      {
        "id": "intro",
        "heading": "LOCUM TENENS AGREEMENT",
        "body": "This Locum Tenens Agreement (the \"Agreement\") is entered into by and between {clinic_name} (\"Practice\"), and {physician_name} (\"Physician\").",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "term",
        "heading": "1. Term of Coverage",
        "body": "Physician shall provide temporary locum tenens clinical coverage for Practice starting on {start_date} and ending on {end_date}, unless extended by mutual written agreement.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "compensation",
        "heading": "2. Daily Compensation Rate",
        "body": "Practice shall pay Physician a daily rate of {daily_rate} for each day of clinical coverage provided. Payments are due within 15 days of receiving the coverage invoice.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "expenses",
        "heading": "3. Travel and Lodging Reimbursement",
        "body": "Practice agrees to reimburse Physician for reasonable, pre-approved travel and hotel lodging expenses incurred during the coverage period.",
        "optional": true,
        "optionalLabel": "Reimburse travel & lodging?",
        "enabledByDefault": true,
        "riskLevel": "low"
      },
      {
        "id": "governing_law",
        "heading": "4. Governing Law",
        "body": "This Agreement shall be governed by, and interpreted in accordance with, the laws of the State/Country of {governing_state}.",
        "optional": false,
        "enabledByDefault": true
      }
    ],
    "relatedTemplates": ["independent-contractor-clinical"],
    "faq": [
      { "question": "What is locum tenens?", "answer": "Locum tenens is a Latin phrase meaning 'to hold the place of.' It refers to a temporary practitioner filling in for a primary physician." },
      { "question": "Does this cover credentialing?", "answer": "The substitute physician must cooperate with the practice to complete facility credentialing before the coverage start date." }
    ],
    "tags": ["locum", "physician", "substitute", "temp", "doctor"]
  },
  {
    "id": "patient-consent-form",
    "slug": "patient-consent-form",
    "category": "healthcare",
    "title": "General Patient Treatment Consent",
    "description": "A standard patient intake consent form permitting healthcare professionals to administer diagnostic tests, physical exams, and basic clinical treatments.",
    "whatsCovered": [
      "Consent for physical examinations and diagnostic tests",
      "Financial responsibility for co-pays and insurance billing",
      "Acknowledgement of privacy practices and HIPAA rules",
      "Emergency treatment permissions",
      "Revocation rights parameters"
    ],
    "whenToUse": "Use this consent form as a standard document during patient onboarding or registration at a new medical or wellness practice.",
    "jurisdictions": ["US", "UK", "CA"],
    "lastReviewedAt": "2026-05-19",
    "reviewerName": "Sarah Jenkins, Esq.",
    "estimatedFillMinutes": 3,
    "fields": [
      { "id": "patient_name", "label": "Patient Full Name", "type": "text", "placeholder": "e.g. Samuel Green", "required": true, "group": "Patient Details" },
      { "id": "patient_dob", "label": "Patient Date of Birth", "type": "date", "required": true, "group": "Patient Details" },
      { "id": "clinic_name", "label": "Clinic / Provider Name", "type": "text", "placeholder": "e.g. Apex Medical Clinics Group", "required": true, "group": "Clinic Details" },
      { "id": "effective_date", "label": "Date of Consent", "type": "date", "required": true, "group": "Key Dates" },
      { "id": "governing_state", "label": "Governing Jurisdiction", "type": "text", "placeholder": "e.g. Oregon", "required": true, "group": "Legal Terms" }
    ],
    "clauses": [
      {
        "id": "intro",
        "heading": "PATIENT CONSENT AND OBLIGATION",
        "body": "This Patient Consent is signed by {patient_name}, DOB: {patient_dob} (\"Patient\"), in favor of {clinic_name} (\"Clinic\"), as of {effective_date}.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "consent",
        "heading": "1. Consent to Routine Care",
        "body": "Patient hereby authorizes Clinic's medical staff to perform physical examinations, diagnostic tests, lab draws, and routine clinical treatments as deemed necessary by Patient's providers.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "financial",
        "heading": "2. Financial Responsibility",
        "body": "Patient understands that they are ultimately responsible for all clinical charges, co-pays, and deductibles not covered by their health insurance provider.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "privacy",
        "heading": "3. Privacy Practices Acknowledgement",
        "body": "Patient acknowledges receiving Clinic's Notice of Privacy Practices, which describes how their medical information may be used and disclosed under HIPAA regulations.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "governing_law",
        "heading": "4. Governing Law",
        "body": "This consent document shall be interpreted and governed under the laws of the State/Country of {governing_state}.",
        "optional": false,
        "enabledByDefault": true
      }
    ],
    "relatedTemplates": ["medical-consent", "hipaa-authorization"],
    "faq": [
      { "question": "Can I refuse a specific test?", "answer": "Yes. This is a general consent. You always retain the right to refuse any specific test, draw, or treatment proposed by your physician." },
      { "question": "Who bills my insurance?", "answer": "The clinic will bill your insurance provider as a convenience, but any unpaid balances remain your financial responsibility." }
    ],
    "tags": ["consent", "patient", "intake", "medical", "clinic"]
  },
  {
    "id": "hipaa-baa",
    "slug": "hipaa-baa",
    "category": "healthcare",
    "title": "HIPAA Business Associate Agreement (BAA)",
    "description": "A mandatory HIPAA compliance agreement signed between a healthcare covered entity and a vendor who processes or accesses patient medical records (PHI).",
    "whatsCovered": [
      "Permitted and restricted uses of Protected Health Information (PHI)",
      "Technical safeguards and data breach notifications (72-hour window)",
      "Subcontractor compliance requirements",
      "Auditing rights by the DHHS (Department of Health and Human Services)",
      "Return or destruction of PHI upon agreement termination"
    ],
    "whenToUse": "Use this BAA when sharing medical records, billing data, or scheduling logs with a cloud host, software provider, or billing agency.",
    "jurisdictions": ["US"],
    "lastReviewedAt": "2026-05-20",
    "reviewerName": "Sarah Jenkins, Esq.",
    "estimatedFillMinutes": 5,
    "fields": [
      { "id": "covered_entity", "label": "Covered Entity (Clinic / Hospital)", "type": "text", "placeholder": "e.g. Metro Health Systems LLC", "required": true, "group": "Parties" },
      { "id": "business_associate", "label": "Business Associate (Vendor)", "type": "text", "placeholder": "e.g. Apex Cloud Solutions LLC", "required": true, "group": "Parties" },
      { "id": "effective_date", "label": "Effective Date", "type": "date", "required": true, "group": "Key Dates" },
      { "id": "breach_notice_hours", "label": "Breach Notification Deadline (Hours)", "type": "select", "options": ["24", "48", "72", "5 Days"], "defaultValue": "72", "required": true, "group": "Security Specs" },
      { "id": "governing_state", "label": "Governing Jurisdiction", "type": "text", "placeholder": "e.g. New York", "required": true, "group": "Legal Terms" }
    ],
    "clauses": [
      {
        "id": "intro",
        "heading": "BUSINESS ASSOCIATE AGREEMENT",
        "body": "This Business Associate Agreement (the \"BAA\") is entered into as of {effective_date} (the \"Effective Date\"), by and between {covered_entity} (\"Covered Entity\"), and {business_associate} (\"Business Associate\").",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "purpose",
        "heading": "1. Purpose and Scope",
        "body": "This BAA satisfies the requirements of the Health Insurance Portability and Accountability Act of 1996 (HIPAA) and the HITECH Act. Business Associate agrees to safeguard all Protected Health Information (PHI) created or accessed on behalf of Covered Entity.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "obligations",
        "heading": "2. Obligations of Business Associate",
        "body": "Business Associate shall not use or disclose PHI other than as permitted or required by this Agreement or as required by law. Business Associate shall implement administrative, physical, and technical safeguards to prevent unauthorized data access.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "breach",
        "heading": "3. Data Breach Notification",
        "body": "In the event of any unauthorized acquisition, access, use, or disclosure of PHI (a \"Breach\"), Business Associate shall notify Covered Entity in writing within {breach_notice_hours} hours of discovery.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "indemnity",
        "heading": "4. Security Indemnification",
        "body": "Business Associate agrees to indemnify, defend, and hold harmless Covered Entity from any fines, penalties, or damages arising from a breach of PHI caused directly by Business Associate's negligence.",
        "optional": true,
        "optionalLabel": "Include Breach Indemnification?",
        "enabledByDefault": true,
        "riskLevel": "high"
      },
      {
        "id": "governing_law",
        "heading": "5. Governing Law",
        "body": "This BAA shall be governed and interpreted under the laws of the State/Country of {governing_state}.",
        "optional": false,
        "enabledByDefault": true
      }
    ],
    "relatedTemplates": ["hipaa-authorization", "vendor-agreement"],
    "faq": [
      { "question": "Why is a BAA required under HIPAA?", "answer": "Federal law requires healthcare providers (Covered Entities) to secure written confidentiality assurances from third-party vendors (Business Associates) handling patient records." },
      { "question": "What happens if the BAA is violated?", "answer": "Violations carry substantial civil and criminal penalties from the Department of Health and Human Services (HHS) Office for Civil Rights (OCR)." }
    ],
    "tags": ["hipaa", "baa", "compliance", "medical", "vendor"]
  },
  {
    "id": "medical-practice-consulting",
    "slug": "medical-practice-consulting",
    "category": "healthcare",
    "title": "Medical Practice Consulting Agreement",
    "description": "A consulting agreement signed when an external advisor assists a medical practice with operational efficiency, billing, coding audits, or marketing.",
    "whatsCovered": [
      "Consulting scope of work (billing, compliance, or practice management)",
      "Hourly or monthly retainer billing terms",
      "HIPAA business associate compliance provisions",
      "Ownership of intellectual property (custom systems or reports)",
      "Standard dispute resolution and governing law"
    ],
    "whenToUse": "Use this agreement when hiring a consultant to audit medical coding, optimize billing, or advise on clinical operations.",
    "jurisdictions": ["US", "CA"],
    "lastReviewedAt": "2026-05-19",
    "reviewerName": "Sarah Jenkins, Esq.",
    "estimatedFillMinutes": 4,
    "fields": [
      { "id": "practice_name", "label": "Medical Practice Name", "type": "text", "placeholder": "e.g. Apex Family Clinics LLC", "required": true, "group": "Practice Info" },
      { "id": "consultant_name", "label": "Consultant Full Name / Firm", "type": "text", "placeholder": "e.g. Healthcare Advisors Group LLC", "required": true, "group": "Consultant Info" },
      { "id": "monthly_retainer", "label": "Monthly Consulting Fee ($)", "type": "currency", "placeholder": "e.g. 3,500.00", "required": true, "group": "Financials" },
      { "id": "effective_date", "label": "Effective Date", "type": "date", "required": true, "group": "Key Dates" },
      { "id": "governing_state", "label": "Governing Jurisdiction", "type": "text", "placeholder": "e.g. Texas", "required": true, "group": "Legal Terms" }
    ],
    "clauses": [
      {
        "id": "intro",
        "heading": "MEDICAL CONSULTING SERVICES AGREEMENT",
        "body": "This Consulting Agreement (the \"Agreement\") is entered into as of {effective_date} (the \"Effective Date\"), by and between {practice_name} (\"Practice\"), and {consultant_name} (\"Consultant\").",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "services",
        "heading": "1. Consulting Scope",
        "body": "Consultant shall provide strategic advisory services, practice management evaluations, and billing audit assistance to Practice. Consultant agrees to dedicate up to 20 hours per month to these tasks.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "compensation",
        "heading": "2. Retainer Fee",
        "body": "Practice shall pay Consultant a monthly flat retainer fee of {monthly_retainer}, payable in advance on the 1st of each month.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "hipaa",
        "heading": "3. HIPAA Safeguards",
        "body": "To the extent Consultant has access to patient charts, coding logs, or billing data, Consultant agrees to execute a separate HIPAA Business Associate Agreement (BAA) and safeguard all patient data.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "governing_law",
        "heading": "4. Governing Law",
        "body": "This Agreement shall be governed and interpreted according to the laws of the State/Country of {governing_state}.",
        "optional": false,
        "enabledByDefault": true
      }
    ],
    "relatedTemplates": ["consulting-agreement", "hipaa-baa"],
    "faq": [
      { "question": "Does this cover medical billing tasks?", "answer": "No. This is an advisory consulting agreement. Routine billing tasks require a dedicated Medical Billing Outsourcing Contract." },
      { "question": "Can either party cancel early?", "answer": "Yes. This contract supports early termination at-will upon providing 30 days written notice." }
    ],
    "tags": ["consulting", "medical", "practice", "billing", "advisor"]
  },
  {
    "id": "telemedicine-consent",
    "slug": "telemedicine-consent",
    "category": "healthcare",
    "title": "Telehealth & Telemedicine Consent Form",
    "description": "An informed consent document advising patients about the technology, privacy risks, and technical limitations of video consultations.",
    "whatsCovered": [
      "Explanation of interactive video, audio, and imaging tools",
      "Network security safeguards and encryption disclosures",
      "Limitations of remote exams (no physical touch, emergency exclusions)",
      "Technical failure plans (rescheduling or phone call backup)",
      "Billing details for remote telemedicine sessions"
    ],
    "whenToUse": "Use this form prior to providing remote clinical checkups, psychiatric consultations, or nutritional counseling sessions via video.",
    "jurisdictions": ["US", "UK", "CA"],
    "lastReviewedAt": "2026-05-21",
    "reviewerName": "Sarah Jenkins, Esq.",
    "estimatedFillMinutes": 3,
    "fields": [
      { "id": "patient_name", "label": "Patient Full Name", "type": "text", "placeholder": "e.g. Samuel Green", "required": true, "group": "Patient Info" },
      { "id": "patient_dob", "label": "Patient Date of Birth", "type": "date", "required": true, "group": "Patient Info" },
      { "id": "provider_name", "label": "Medical Clinic Name", "type": "text", "placeholder": "e.g. Apex Health Group LLC", "required": true, "group": "Clinic Info" },
      { "id": "effective_date", "label": "Effective Date", "type": "date", "required": true, "group": "Key Dates" },
      { "id": "governing_state", "label": "Governing Jurisdiction", "type": "text", "placeholder": "e.g. Washington", "required": true, "group": "Legal Terms" }
    ],
    "clauses": [
      {
        "id": "intro",
        "heading": "INFORMED TELEHEALTH CONSENT",
        "body": "This Telehealth Consent is signed by {patient_name}, DOB: {patient_dob} (\"Patient\"), in favor of {provider_name} (\"Provider\"), on {effective_date}.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "telehealth_definition",
        "heading": "1. What is Telemedicine?",
        "body": "Telemedicine involves the delivery of healthcare services using interactive audio, video, and digital communication tools. This allows Patient to consult with a provider remotely without a physical clinic visit.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "limitations",
        "heading": "2. Limits of Telemedicine Care",
        "body": "Patient understands that a remote video exam is not a complete physical exam. If the provider determines that an in-person diagnostic test or emergency intervention is necessary, Patient agrees to visit a local clinic or emergency room immediately.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "privacy",
        "heading": "3. Network Security & Encryption",
        "body": "All video interactions are encrypted and comply with HIPAA security guidelines. Patient agrees to use a private network and secure device to prevent eavesdropping during the consultation.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "technical_failure",
        "heading": "4. Technical Failures",
        "body": "If a technical glitch or internet disconnection blocks the video call, the provider shall attempt to call Patient's telephone number within 5 minutes to complete or reschedule the session.",
        "optional": true,
        "optionalLabel": "Include Technical Failure Protocol?",
        "enabledByDefault": true,
        "riskLevel": "low"
      },
      {
        "id": "governing_law",
        "heading": "5. Governing Law",
        "body": "This consent document shall be interpreted and governed under the laws of the State/Country of {governing_state}.",
        "optional": false,
        "enabledByDefault": true
      }
    ],
    "relatedTemplates": ["patient-consent-form", "medical-consent"],
    "faq": [
      { "question": "Does insurance cover telemedicine calls?", "answer": "Most health insurance providers cover telehealth sessions, but patients are responsible for verifying their specific coverage prior to scheduling." },
      { "question": "Can I get prescriptions during a video call?", "answer": "Yes. Providers can send prescriptions directly to your pharmacy, subject to regulatory laws governing controlled substances." }
    ],
    "tags": ["telehealth", "telemedicine", "video", "consent", "remote"]
  },
  {
    "id": "mental-health-consent",
    "slug": "mental-health-consent",
    "category": "healthcare",
    "title": "Mental Health Therapy Informed Consent",
    "description": "An informed consent document signed by clinical counseling or psychotherapy clients outlining confidentiality exceptions and emergency protocols.",
    "whatsCovered": [
      "Therapeutic methods, diagnostic evaluations, and target goals",
      "Strict confidentiality limits (abuse, self-harm, court orders)",
      "Hourly session rates and billing terms",
      "Session cancellation policies (24-hour notice rules)",
      "Emergency contact instructions and crisis line information"
    ],
    "whenToUse": "Use this consent form when onboarding a new patient for clinical psychology, counseling, or outpatient psychotherapy services.",
    "jurisdictions": ["US", "UK", "CA"],
    "lastReviewedAt": "2026-05-17",
    "reviewerName": "Robert Vance, Esq.",
    "estimatedFillMinutes": 4,
    "fields": [
      { "id": "patient_name", "label": "Client / Patient Full Name", "type": "text", "placeholder": "e.g. Samuel Green", "required": true, "group": "Client Info" },
      { "id": "therapist_name", "label": "Therapist Full Name", "type": "text", "placeholder": "e.g. Dr. Evelyn Vance, LMFT", "required": true, "group": "Therapist Info" },
      { "id": "session_rate", "label": "Session Hourly Rate ($)", "type": "currency", "placeholder": "e.g. 150.00", "required": true, "group": "Financials" },
      { "id": "effective_date", "label": "Effective Date", "type": "date", "required": true, "group": "Key Dates" },
      { "id": "governing_state", "label": "Governing Jurisdiction", "type": "text", "placeholder": "e.g. Florida", "required": true, "group": "Legal Terms" }
    ],
    "clauses": [
      {
        "id": "intro",
        "heading": "PSYCHOTHERAPY INFORMED CONSENT",
        "body": "This Informed Consent is entered into by {patient_name} (\"Client\"), in favor of {therapist_name} (\"Therapist\"), on {effective_date}.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "approach",
        "heading": "1. Therapeutic Approach",
        "body": "Therapist provides clinical evaluation, cognitive behavioral therapy, or psychotherapeutic counseling. Client understands that therapy requires active participation and can sometimes bring up difficult or painful feelings.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "confidentiality",
        "heading": "2. Limits of Confidentiality",
        "body": "All discussions, files, and progress logs are confidential. However, Therapist is legally required to breach confidentiality in the event of: (a) suspicion of abuse or neglect of a child, elder, or vulnerable adult; (b) clear threats of self-harm or suicide; (c) clear threats of violence to others; or (d) formal judicial court subpoenas.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "fees",
        "heading": "3. Fees & Cancel Rules",
        "body": "Client agrees to pay Therapist a flat fee of {session_rate} per 50-minute session. Client must provide at least 24 hours' notice to cancel or reschedule. Late cancellations shall be billed the full session rate.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "crisis",
        "heading": "4. Crisis Support Disclaimer",
        "body": "Therapist is not available for immediate emergency crisis support. In the event of a mental health emergency, Client agrees to call 911 or visit the nearest hospital emergency room.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "governing_law",
        "heading": "5. Governing Law",
        "body": "This Consent shall be governed by, and interpreted in accordance with, the laws of the State/Country of {governing_state}.",
        "optional": false,
        "enabledByDefault": true
      }
    ],
    "relatedTemplates": ["patient-consent-form", "medical-consent"],
    "faq": [
      { "question": "Can I stop therapy at any time?", "answer": "Yes. You have the right to withdraw from clinical treatment or seek a referral at any time." },
      { "question": "Does my health insurance cover therapy?", "answer": "Many plans cover outpatient psychotherapy. The clinic can provide billing statements (Superbills) for you to submit to your insurance." }
    ],
    "tags": ["psychotherapy", "therapy", "mentalhealth", "consent", "counseling"]
  },
  {
    "id": "group-practice-associate",
    "slug": "group-practice-associate",
    "category": "healthcare",
    "title": "Medical Group Practice Associate Agreement",
    "description": "An employment agreement for a physician joining an established group medical practice, defining duties, base salary, and professional overhead splits.",
    "whatsCovered": [
      "Associate medical duties, scheduling, and on-call schedules",
      "Base salary guarantees and collections-based performance bonuses",
      "Shared practice overhead deductions and staff allocation",
      "Malpractice insurance and licensing fee coverage",
      "Restrictive covenants (such as patient non-solicitation)"
    ],
    "whenToUse": "Use this agreement when you are an established group medical practice onboarding a new associate physician, surgeon, or clinical partner.",
    "jurisdictions": ["US", "CA"],
    "lastReviewedAt": "2026-05-18",
    "reviewerName": "Sarah Jenkins, Esq.",
    "estimatedFillMinutes": 5,
    "fields": [
      { "id": "practice_name", "label": "Group Practice Name", "type": "text", "placeholder": "e.g. Apex Medical Associates LLC", "required": true, "group": "Practice Info" },
      { "id": "physician_name", "label": "Associate Physician Name", "type": "text", "placeholder": "e.g. Dr. Arthur Pendelton", "required": true, "group": "Associate Info" },
      { "id": "base_salary", "label": "Annual Base Salary ($)", "type": "currency", "placeholder": "e.g. 180,000.00", "required": true, "group": "Financials" },
      { "id": "effective_date", "label": "Effective Date", "type": "date", "required": true, "group": "Key Dates" },
      { "id": "governing_state", "label": "Governing Jurisdiction", "type": "text", "placeholder": "e.g. Texas", "required": true, "group": "Legal Terms" }
    ],
    "clauses": [
      {
        "id": "intro",
        "heading": "ASSOCIATE PHYSICIAN AGREEMENT",
        "body": "This Group Practice Associate Agreement (the \"Agreement\") is entered into as of {effective_date} (the \"Effective Date\"), by and between {practice_name} (\"Practice\"), and {physician_name} (\"Associate\").",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "duties",
        "heading": "1. Associate Duties & Schedule",
        "body": "Associate shall provide clinical services at Practice locations. Associate agrees to dedicate full-time hours (approx. 40 hours per week) and participate in the Practice's shared rotation of evening/weekend on-call coverage.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "compensation",
        "heading": "2. Compensation and Bonuses",
        "body": "Practice shall pay Associate an annual base salary of {base_salary}, payable in semi-monthly installments. Associate may also be eligible for discretionary performance bonuses based on collections.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "restrictive_covenant",
        "heading": "3. Patient Non-Solicitation",
        "body": "Upon departure from the Practice for any reason, Associate agrees that for a period of 12 months, Associate shall not directly or indirectly contact or solicit patients seen at Practice to join a competing clinical office.",
        "optional": true,
        "optionalLabel": "Include Patient Non-Solicitation Clause?",
        "enabledByDefault": true,
        "riskLevel": "high"
      },
      {
        "id": "governing_law",
        "heading": "4. Governing Law",
        "body": "This Agreement shall be governed and interpreted according to the laws of the State/Country of {governing_state}.",
        "optional": false,
        "enabledByDefault": true
      }
    ],
    "relatedTemplates": ["independent-contractor-clinical", "medical-director-agreement"],
    "faq": [
      { "question": "Does this contract include partnership track details?", "answer": "No. This is an associate employment agreement. Equity partnership tracks require a separate Partnership Option Agreement." },
      { "question": "Who owns patient medical charts when I leave?", "answer": "All clinical records, charts, and billing databases remain the exclusive property of the group practice." }
    ],
    "tags": ["physician", "doctor", "associate", "grouppractice", "medical"]
  },
  {
    "id": "medical-director-agreement",
    "slug": "medical-director-agreement",
    "category": "healthcare",
    "title": "Medical Director Agreement",
    "description": "An administrative contract appointing a licensed physician to serve as the medical director overseeing clinical compliance, safety, and protocols.",
    "whatsCovered": [
      "Administrative oversight, staff credentialing, and clinical audit tasks",
      "Appointed physician licensing and board certification rules",
      "Director stipend payment schedules (complying with Stark/AKS laws)",
      "Time allocation specifications (typically 10-20 hours monthly)",
      "HIPAA data protection and practice safety covenants"
    ],
    "whenToUse": "Use this agreement when hiring a physician to oversee administrative compliance and set clinical protocols for an urgent care center, medspa, or nursing home.",
    "jurisdictions": ["US", "CA"],
    "lastReviewedAt": "2026-05-16",
    "reviewerName": "Sarah Jenkins, Esq.",
    "estimatedFillMinutes": 5,
    "fields": [
      { "id": "facility_name", "label": "Facility / Clinic Name", "type": "text", "placeholder": "e.g. Oakridge Recovery Center LLC", "required": true, "group": "Facility Info" },
      { "id": "director_name", "label": "Medical Director Full Name", "type": "text", "placeholder": "e.g. Dr. Arthur Pendelton", "required": true, "group": "Director Info" },
      { "id": "monthly_stipend", "label": "Monthly Director Fee ($)", "type": "currency", "placeholder": "e.g. 5,000.00", "required": true, "group": "Financials" },
      { "id": "effective_date", "label": "Effective Date", "type": "date", "required": true, "group": "Key Dates" },
      { "id": "governing_state", "label": "Governing Jurisdiction", "type": "text", "placeholder": "e.g. Florida", "required": true, "group": "Legal Terms" }
    ],
    "clauses": [
      {
        "id": "intro",
        "heading": "MEDICAL DIRECTOR AGREEMENT",
        "body": "This Medical Director Agreement (the \"Agreement\") is entered into as of {effective_date} (the \"Effective Date\"), by and between {facility_name} (\"Facility\"), and {director_name} (\"Medical Director\").",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "appointment",
        "heading": "1. Appointment & Duties",
        "body": "Facility hereby appoints Medical Director to perform clinical advisory, administrative supervision, and compliance audit tasks. Medical Director shall ensure that Facility's patient protocols comply with federal and state regulations.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "compensation",
        "heading": "2. Administrative Stipend",
        "body": "Facility shall pay Medical Director a monthly stipend of {monthly_stipend} for the administrative services. Both parties represent that this fee reflects Fair Market Value and is not linked to patient referrals.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "compliance",
        "heading": "3. Stark and Anti-Kickback Compliance",
        "body": "This Agreement is intended to comply with the Stark Law and federal Anti-Kickback Statutes. The compensation is set in advance, does not take into account the volume or value of referrals, and represents a safe harbor agreement.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "insurance",
        "heading": "4. Director Malpractice Liability Coverage",
        "body": "Facility shall maintain, at its sole cost, administrative liability insurance covering the Medical Director's advisory and supervision activities on behalf of the Facility.",
        "optional": true,
        "optionalLabel": "Provide Administrative Liability Insurance?",
        "enabledByDefault": true,
        "riskLevel": "low"
      },
      {
        "id": "governing_law",
        "heading": "5. Governing Law",
        "body": "This Agreement shall be governed and interpreted under the laws of the State/Country of {governing_state}.",
        "optional": false,
        "enabledByDefault": true
      }
    ],
    "relatedTemplates": ["independent-contractor-clinical", "group-practice-associate"],
    "faq": [
      { "question": "Why does this contract mention Stark and Anti-Kickback compliance?", "answer": "Federal health regulations (Stark Law/AKS) ban clinics from paying physicians in exchange for referring patients. The medical director stipend must represent Fair Market Value for actual administrative hours worked." },
      { "question": "Does this cover direct patient treatment?", "answer": "No. This agreement covers only administrative oversight and protocol setting. Direct patient care requires a separate clinical contract." }
    ],
    "tags": ["director", "medicaldirector", "compliance", "admin", "physician"]
  },
  {
    "id": "clinical-trial-agreement",
    "slug": "clinical-trial-agreement",
    "category": "healthcare",
    "title": "Clinical Trial Participant Consent",
    "description": "An informed consent and liability waiver for research study participants, explaining experimental drug details, schedules, and confidentiality.",
    "whatsCovered": [
      "Clinical study protocol and experimental treatment overview",
      "Potential research side-effects and safety hazard disclosures",
      "Participant compensation and tracking schedules",
      "Voluntary participation and withdrawal rules (anytime revocation)",
      "Strict data anonymization and privacy protections"
    ],
    "whenToUse": "Use this form when enrolling human subjects in clinical trials, research studies, pharmaceutical tests, or academic healthcare experiments.",
    "jurisdictions": ["US", "UK", "CA"],
    "lastReviewedAt": "2026-05-18",
    "reviewerName": "Sarah Jenkins, Esq.",
    "estimatedFillMinutes": 5,
    "fields": [
      { "id": "participant_name", "label": "Participant Full Name", "type": "text", "placeholder": "e.g. Samuel Green", "required": true, "group": "Participant Info" },
      { "id": "study_title", "label": "Research Study Title", "type": "text", "placeholder": "e.g. Phase II Study on CardioProtect Beta-3", "required": true, "group": "Study Details" },
      { "id": "principal_investigator", "label": "Principal Investigator Name", "type": "text", "placeholder": "e.g. Dr. Arthur Pendelton", "required": true, "group": "Study Details" },
      { "id": "stipend_amount", "label": "Completion Stipend ($)", "type": "currency", "placeholder": "e.g. 500.00", "required": true, "group": "Financials" },
      { "id": "effective_date", "label": "Effective Date", "type": "date", "required": true, "group": "Key Dates" },
      { "id": "governing_state", "label": "Governing Jurisdiction", "type": "text", "placeholder": "e.g. Maryland", "required": true, "group": "Legal Terms" }
    ],
    "clauses": [
      {
        "id": "intro",
        "heading": "INFORMED CONSENT FOR CLINICAL STUDY",
        "body": "This Consent and Waiver is signed on {effective_date} by {participant_name} (\"Participant\") in favor of Principal Investigator {principal_investigator} for the research study: {study_title}.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "protocol",
        "heading": "1. Study Objective & Procedure",
        "body": "Participant agrees to participate in the clinical trial. Participant will receive the experimental therapy and undergo clinical monitoring. The schedule of checks has been explained to the Participant.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "risks",
        "heading": "2. Research Risks & Disclaimers",
        "body": "Participant understands that this study involves experimental testing. Potential side-effects may include allergic reactions, nausea, dizziness, or other unexpected complications. Participant agrees to report all symptoms immediately.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "voluntary",
        "heading": "3. Voluntary Participation & Withdrawal",
        "body": "Participation is completely voluntary. Participant has the right to withdraw from the research study at any time, for any reason, without losing eligibility for routine medical care.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "compensation",
        "heading": "4. Participant Stipend",
        "body": "In exchange for complete participation in the study visits, Participant shall receive a total stipend of {stipend_amount}, payable upon completion of the final checkup visit.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "governing_law",
        "heading": "5. Governing Law",
        "body": "This consent document shall be interpreted and governed under the laws of the State/Country of {governing_state}.",
        "optional": false,
        "enabledByDefault": true
      }
    ],
    "relatedTemplates": ["patient-consent-form", "medical-consent"],
    "faq": [
      { "question": "Can I leave the study early if I feel sick?", "answer": "Yes. You have the right to withdraw from the clinical trial at any moment. Your safety and health always remain the highest priority." },
      { "question": "Will my name be shared in scientific papers?", "answer": "No. All participant data is anonymized and assigned a research code. Your name will never appear in any published research studies." }
    ],
    "tags": ["clinicaltrial", "research", "study", "consent", "participant"]
  },
  {
    "id": "home-health-aide",
    "slug": "home-health-aide",
    "category": "healthcare",
    "title": "Home Health Aide Services Agreement",
    "description": "A service contract detailing home care services, personal hygiene support, meal prep, hourly rates, and scheduling guidelines for elder care.",
    "whatsCovered": [
      "Definition of daily home care assistance duties and schedules",
      "Hourly compensation, overtime rates, and billing cycles",
      "Client medical emergency contacts and hospital preferences",
      "Liability release regarding client property and safety",
      "Mandatory client confidentiality and privacy protection"
    ],
    "whenToUse": "Use this agreement when hiring a personal home caregiver, nurse assistant, or home health aide to assist an elderly or disabled relative at home.",
    "jurisdictions": ["US", "UK", "CA"],
    "lastReviewedAt": "2026-05-15",
    "reviewerName": "Sarah Jenkins, Esq.",
    "estimatedFillMinutes": 4,
    "fields": [
      { "id": "client_name", "label": "Client / Patient Full Name", "type": "text", "placeholder": "e.g. Margaret Smith", "required": true, "group": "Client Info" },
      { "id": "aide_name", "label": "Aide / Caregiver Full Name", "type": "text", "placeholder": "e.g. Jane Doe", "required": true, "group": "Caregiver Info" },
      { "id": "hourly_rate", "label": "Aide Hourly Rate ($)", "type": "currency", "placeholder": "e.g. 25.00", "required": true, "group": "Financials" },
      { "id": "effective_date", "label": "Effective Date", "type": "date", "required": true, "group": "Key Dates" },
      { "id": "governing_state", "label": "Governing Jurisdiction", "type": "text", "placeholder": "e.g. Texas", "required": true, "group": "Legal Terms" }
    ],
    "clauses": [
      {
        "id": "intro",
        "heading": "HOME HEALTH CARE SERVICES AGREEMENT",
        "body": "This Home Care Agreement (the \"Agreement\") is entered into as of {effective_date} (the \"Effective Date\"), by and between {client_name} (\"Client\"), and {aide_name} (\"Caregiver\").",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "services",
        "heading": "1. Scope of Care Services",
        "body": "Caregiver agrees to provide non-medical home care assistance, including personal grooming support, meal preparation, medication reminders, light housekeeping, and local errand transportation.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "compensation",
        "heading": "2. Billing and Payments",
        "body": "Client shall pay Caregiver an hourly rate of {hourly_rate} for the home care services. Payments shall be submitted weekly based on timesheets signed by Client.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "emergency",
        "heading": "3. Emergency Procedures",
        "body": "In the event of a medical emergency, Caregiver shall call 911 immediately and then contact the Client's designated emergency contacts. Caregiver is authorized to release basic health details to first responders.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "liability",
        "heading": "4. Liability Waiver",
        "body": "Caregiver is not liable for accidents, falls, or deterioration of client health unless caused by gross negligence or willful misconduct.",
        "optional": true,
        "optionalLabel": "Include Caregiver Liability Limitation?",
        "enabledByDefault": true,
        "riskLevel": "low"
      },
      {
        "id": "governing_law",
        "heading": "5. Governing Law",
        "body": "This Agreement shall be governed and interpreted according to the laws of the State/Country of {governing_state}.",
        "optional": false,
        "enabledByDefault": true
      }
    ],
    "relatedTemplates": ["independent-contractor-clinical", "medical-consent"],
    "faq": [
      { "question": "Does this caretaker provide medical injections?", "answer": "No. This agreement covers only non-medical home care support. Registered nurse duties require a clinical nurse agreement." },
      { "question": "What is the cancellation policy?", "answer": "Either party can terminate this agreement upon providing at least 7 days written notice to the other." }
    ],
    "tags": ["homecare", "eldercare", "caregiver", "nursing", "homeaide"]
  },
  {
    "id": "physical-therapy-agreement",
    "slug": "physical-therapy-agreement",
    "category": "healthcare",
    "title": "Physical Therapy Services Agreement",
    "description": "A therapy services agreement defining treatment plans, physical therapy protocols, billing charges, and compliance waivers.",
    "whatsCovered": [
      "Definition of physical therapy treatments and progress reviews",
      "Therapist qualifications and professional certifications",
      "Hourly or session-based billing fees and co-pays",
      "Late cancellation fee schedules (typically 24-hour notice)",
      "Liability release for exercise and muscle rehabilitation risks"
    ],
    "whenToUse": "Use this service agreement when onboarding a patient for a rehabilitation, muscle therapy, or physical therapy treatment plan.",
    "jurisdictions": ["US", "UK", "CA"],
    "lastReviewedAt": "2026-05-19",
    "reviewerName": "Sarah Jenkins, Esq.",
    "estimatedFillMinutes": 4,
    "fields": [
      { "id": "patient_name", "label": "Patient Full Name", "type": "text", "placeholder": "e.g. Samuel Miller", "required": true, "group": "Patient Info" },
      { "id": "therapist_name", "label": "Therapist Full Name / Clinic", "type": "text", "placeholder": "e.g. Peak Motion Therapy Center", "required": true, "group": "Therapist Info" },
      { "id": "hourly_rate", "label": "Session Hourly Rate ($)", "type": "currency", "placeholder": "e.g. 110.00", "required": true, "group": "Financials" },
      { "id": "effective_date", "label": "Effective Date", "type": "date", "required": true, "group": "Key Dates" },
      { "id": "governing_state", "label": "Governing Jurisdiction", "type": "text", "placeholder": "e.g. Oregon", "required": true, "group": "Legal Terms" }
    ],
    "clauses": [
      {
        "id": "intro",
        "heading": "PHYSICAL THERAPY SERVICES AGREEMENT",
        "body": "This Therapy Agreement (the \"Agreement\") is entered into as of {effective_date} (the \"Effective Date\"), by and between {patient_name} (\"Patient\"), and {therapist_name} (\"Therapist\").",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "treatment",
        "heading": "1. Rehabilitation Treatment",
        "body": "Therapist shall perform evaluation and physical therapy sessions for Patient. The treatment plan will consist of exercises, stretches, and muscle training targets tailored to Patient's recovery.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "billing",
        "heading": "2. Fees & Payments",
        "body": "Patient shall pay Therapist a session fee of {hourly_rate} per hour of physical therapy. Payments are due at the time of each clinical visit unless covered by insurance billing agreements.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "waiver",
        "heading": "3. Physical Injury Waiver",
        "body": "Patient understands that physical therapy exercises carry a minor risk of muscle strain, fatigue, or soreness. Patient agrees to perform all exercises in accordance with instructions and waives claims for routine soreness.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "governing_law",
        "heading": "4. Governing Law",
        "body": "This Agreement shall be governed and interpreted according to the laws of the State/Country of {governing_state}.",
        "optional": false,
        "enabledByDefault": true
      }
    ],
    "relatedTemplates": ["patient-consent-form", "medical-consent"],
    "faq": [
      { "question": "What happens if I miss a scheduled session?", "answer": "You must cancel at least 24 hours in advance to avoid being charged a late cancellation fee." },
      { "question": "Do I need a physician referral first?", "answer": "Direct access laws allow physical therapy without a referral in many states, but your insurance may require a doctor referral to process payouts." }
    ],
    "tags": ["physicaltherapy", "rehab", "therapy", "exercise", "patient"]
  },
  {
    "id": "dental-practice-associate",
    "slug": "dental-practice-associate",
    "category": "healthcare",
    "title": "Dental Practice Associate Agreement",
    "description": "An employment agreement for a licensed dentist joining a dental group practice, defining clinical hours, collections-based compensation, and patient protection covenants.",
    "whatsCovered": [
      "Associate dentist duties, dental license requirements, and clinical hours",
      "Base salary guarantees and collections/production percentage bonuses",
      "Professional liability (malpractice) insurance obligations",
      "Restrictive covenants (such as patient and staff non-solicitation)",
      "Standard dispute resolution and governing law"
    ],
    "whenToUse": "Use this agreement when you are an established dental clinic or practice owner hiring an associate dentist to join your team.",
    "jurisdictions": ["US", "CA"],
    "lastReviewedAt": "2026-05-15",
    "reviewerName": "Sarah Jenkins, Esq.",
    "estimatedFillMinutes": 5,
    "fields": [
      { "id": "clinic_name", "label": "Dental Clinic Name", "type": "text", "placeholder": "e.g. Apex Family Dental Group", "required": true, "group": "Clinic Info" },
      { "id": "dentist_name", "label": "Associate Dentist Name", "type": "text", "placeholder": "e.g. Dr. Arthur Pendelton, DDS", "required": true, "group": "Associate Info" },
      { "id": "base_salary", "label": "Annual Base Salary ($)", "type": "currency", "placeholder": "e.g. 140,000.00", "required": true, "group": "Financials" },
      { "id": "production_percentage", "label": "Production Bonus Percentage (%)", "type": "text", "placeholder": "e.g. 30", "required": true, "group": "Financials" },
      { "id": "effective_date", "label": "Effective Date", "type": "date", "required": true, "group": "Key Dates" },
      { "id": "governing_state", "label": "Governing Jurisdiction", "type": "text", "placeholder": "e.g. California", "required": true, "group": "Legal Terms" }
    ],
    "clauses": [
      {
        "id": "intro",
        "heading": "ASSOCIATE DENTIST AGREEMENT",
        "body": "This Dental Practice Associate Agreement (the \"Agreement\") is entered into as of {effective_date} (the \"Effective Date\"), by and between {clinic_name} (\"Clinic\"), and {dentist_name} (\"Associate\").",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "duties",
        "heading": "1. Associate Dentist Duties",
        "body": "Associate shall provide professional dental care at Clinic offices. Associate represents that they hold and will maintain an active DDS or DMD dental license in this jurisdiction.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "compensation",
        "heading": "2. Base Salary and Production Bonus",
        "body": "Clinic shall pay Associate an annual base salary of {base_salary}. Additionally, Associate shall receive a performance bonus equal to {production_percentage}% of Associate's net collections/production exceeding the monthly threshold.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "restrictive_covenant",
        "heading": "3. Dental Patient Non-Solicitation",
        "body": "Upon departure from the Clinic for any reason, Associate agrees that for a period of 12 months, Associate shall not directly or indirectly contact or solicit patients seen at Clinic to join a competing dental office.",
        "optional": true,
        "optionalLabel": "Include Dental Patient Non-Solicitation?",
        "enabledByDefault": true,
        "riskLevel": "high"
      },
      {
        "id": "governing_law",
        "heading": "4. Governing Law",
        "body": "This Agreement shall be governed and interpreted according to the laws of the State/Country of {governing_state}.",
        "optional": false,
        "enabledByDefault": true
      }
    ],
    "relatedTemplates": ["independent-contractor-clinical", "group-practice-associate"],
    "faq": [
      { "question": "What is the difference between collections and production?", "answer": "Production is the dollar value of dental services performed. Collections is the actual cash collected from patients and insurance. Most practices calculate bonuses on collections to prevent bad debt losses." },
      { "question": "Does this cover dental supplies?", "answer": "Yes. The practice owner is responsible for providing all chair space, dental assistants, equipment, and lab materials." }
    ],
    "tags": ["dentist", "dental", "associate", "clinic", "dds"]
  },
  {
    "id": "veterinary-associate",
    "slug": "veterinary-associate",
    "category": "healthcare",
    "title": "Veterinary Associate Employment Agreement",
    "description": "An employment agreement for a veterinarian joining an established animal hospital, specifying clinical duties, salary, and professional liability insurance.",
    "whatsCovered": [
      "Associate veterinarian clinical duties and state licensing rules",
      "Base salary guarantees and Pro-Sal (commission-based) compensation",
      "Emergency night/weekend clinical coverage rosters",
      "Professional liability insurance and licensing fees coverage",
      "Standard dispute resolution and governing law"
    ],
    "whenToUse": "Use this agreement when hiring an associate veterinarian to join an animal hospital or veterinary clinic team.",
    "jurisdictions": ["US", "CA"],
    "lastReviewedAt": "2026-05-18",
    "reviewerName": "Sarah Jenkins, Esq.",
    "estimatedFillMinutes": 5,
    "fields": [
      { "id": "hospital_name", "label": "Animal Hospital / Clinic Name", "type": "text", "placeholder": "e.g. Apex Veterinary Hospital LLC", "required": true, "group": "Hospital Details" },
      { "id": "veterinarian_name", "label": "Associate Veterinarian Name", "type": "text", "placeholder": "e.g. Dr. Arthur Pendelton, DVM", "required": true, "group": "Associate Details" },
      { "id": "base_salary", "label": "Annual Base Salary ($)", "type": "currency", "placeholder": "e.g. 95,000.00", "required": true, "group": "Financials" },
      { "id": "effective_date", "label": "Effective Date", "type": "date", "required": true, "group": "Key Dates" },
      { "id": "governing_state", "label": "Governing Jurisdiction", "type": "text", "placeholder": "e.g. Florida", "required": true, "group": "Legal Terms" }
    ],
    "clauses": [
      {
        "id": "intro",
        "heading": "ASSOCIATE VETERINARIAN EMPLOYMENT AGREEMENT",
        "body": "This Veterinary Associate Agreement (the \"Agreement\") is entered into as of {effective_date} (the \"Effective Date\"), by and between {hospital_name} (\"Hospital\"), and {veterinarian_name} (\"Associate\").",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "duties",
        "heading": "1. Veterinarian Duties",
        "body": "Associate shall provide professional veterinary care, surgical procedures, and wellness examinations at Hospital locations. Associate represents that they hold and will maintain an active DVM veterinary license in this state.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "compensation",
        "heading": "2. Salary Compensation",
        "body": "Hospital shall pay Associate an annual base salary of {base_salary}, payable in semi-monthly installments. Associate may also participate in the Hospital's Pro-Sal commission plans.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "insurance",
        "heading": "3. Vet Liability Insurance",
        "body": "Hospital shall maintain, at its sole cost, professional liability (malpractice) insurance covering the clinical activities of Associate during the employment term.",
        "optional": true,
        "optionalLabel": "Provide Vet Malpractice Coverage?",
        "enabledByDefault": true,
        "riskLevel": "low"
      },
      {
        "id": "governing_law",
        "heading": "4. Governing Law",
        "body": "This Agreement shall be governed and interpreted according to the laws of the State/Country of {governing_state}.",
        "optional": false,
        "enabledByDefault": true
      }
    ],
    "relatedTemplates": ["independent-contractor-clinical", "group-practice-associate"],
    "faq": [
      { "question": "What is Pro-Sal compensation?", "answer": "Pro-Sal is a standard veterinarian compensation model combining a guaranteed base salary with a production commission percentage, incentivizing client volume." },
      { "question": "Who buys surgical supplies?", "answer": "The animal hospital is responsible for providing all medical supplies, veterinary tech support staff, and surgical suites." }
    ],
    "tags": ["veterinary", "veterinarian", "dvm", "animal", "clinic"]
  },
  {
    "id": "medical-records-release",
    "slug": "medical-records-release",
    "category": "healthcare",
    "title": "Authorization for Release of Medical Records",
    "description": "A HIPAA-compliant authorization form allowing patient medical charts, clinical history, and laboratory results to be shared between clinics.",
    "whatsCovered": [
      "Patient identification and disclosure authorization details",
      "Disclosing clinical entity (which hospital releases records)",
      "Receiving clinical entity (which clinic receives records)",
      "Specific record descriptions (imaging reports, chart summaries)",
      "HIPAA compliance validity dates and patient revocation terms"
    ],
    "whenToUse": "Use this release authorization form to formally request a transfer of a patient's historical medical records from their previous clinic or hospital.",
    "jurisdictions": ["US", "UK", "CA"],
    "lastReviewedAt": "2026-05-15",
    "reviewerName": "Sarah Jenkins, Esq.",
    "estimatedFillMinutes": 3,
    "fields": [
      { "id": "patient_name", "label": "Patient Full Name", "type": "text", "placeholder": "e.g. Samuel Green", "required": true, "group": "Patient Info" },
      { "id": "patient_dob", "label": "Patient Date of Birth", "type": "date", "required": true, "group": "Patient Info" },
      { "id": "disclosing_provider", "label": "Disclosing Practice (Sender)", "type": "text", "placeholder": "e.g. Westside Family Medical Group", "required": true, "group": "Release Details" },
      { "id": "receiving_provider", "label": "Receiving Practice (Recipient)", "type": "text", "placeholder": "e.g. Apex Specialty Center LLC", "required": true, "group": "Release Details" },
      { "id": "effective_date", "label": "Effective Date", "type": "date", "required": true, "group": "Key Dates" },
      { "id": "governing_state", "label": "Governing Jurisdiction", "type": "text", "placeholder": "e.g. Oregon", "required": true, "group": "Legal Terms" }
    ],
    "clauses": [
      {
        "id": "intro",
        "heading": "AUTHORIZATION FOR RECORD RELEASE",
        "body": "This Record Release Authorization is signed by {patient_name}, DOB: {patient_dob} (\"Patient\"), authorizing {disclosing_provider} to release records to {receiving_provider}, as of {effective_date}.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "release",
        "heading": "1. Records Released",
        "body": "Patient hereby authorizes the release of all medical charts, clinical history notes, lab results, imaging reports, and billing files generated during treatment at Disclosing Practice.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "psychotherapy_notes",
        "heading": "1.1 Psychotherapy Notes Consent",
        "body": "Patient explicitly authorizes the release of mental health psychotherapy notes, if any exist in the patient file.",
        "optional": true,
        "optionalLabel": "Include psychotherapy notes release?",
        "enabledByDefault": false,
        "riskLevel": "high"
      },
      {
        "id": "purpose",
        "heading": "2. Purpose of Release",
        "body": "The records are being released to facilitate continued medical evaluation, diagnostic consulting, or treatment planning at Receiving Practice.",
        "optional": false,
        "enabledByDefault": true
      },
      {
        "id": "governing_law",
        "heading": "3. Governing Law",
        "body": "This authorization is intended to comply with HIPAA guidelines and shall be interpreted under the laws of the State/Country of {governing_state}.",
        "optional": false,
        "enabledByDefault": true
      }
    ],
    "relatedTemplates": ["hipaa-authorization", "patient-consent-form"],
    "faq": [
      { "question": "Can I cancel this authorization later?", "answer": "Yes. You have the right to revoke this authorization in writing at any time, except to the extent that the disclosing practice has already released the files." },
      { "question": "Does the clinic charge for copy fees?", "answer": "Under HIPAA, clinics may only charge a reasonable, cost-based fee for printing or copying medical files." }
    ],
    "tags": ["release", "medicalrecords", "hipaa", "authorization", "charts"]
  }
];

templates.forEach((template) => {
  const filePath = path.join(outputDir, `${template.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(template, null, 2), 'utf8');
  console.log(`Successfully wrote template: ${template.id}`);
});

console.log('Finished writing all healthcare templates!');
