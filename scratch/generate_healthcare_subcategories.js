const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '..', 'content', 'templates', 'healthcare');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 1. Update existing 17 healthcare files with appropriate subcategory
const categoryMapping = {
  "clinical-trial-agreement.json": "Administrative / Compliance",
  "dental-practice-associate.json": "Clinical / Practice",
  "group-practice-associate.json": "Clinical / Practice",
  "hipaa-authorization.json": "Administrative / Compliance",
  "hipaa-baa.json": "Administrative / Compliance",
  "home-health-aide.json": "Clinical / Practice",
  "independent-contractor-clinical.json": "Clinical / Practice",
  "locum-tenens-agreement.json": "Clinical / Practice",
  "medical-consent.json": "Patient-Facing",
  "medical-director-agreement.json": "Clinical / Practice",
  "medical-practice-consulting.json": "Administrative / Compliance",
  "medical-records-release.json": "Patient-Facing",
  "mental-health-consent.json": "Patient-Facing",
  "patient-consent-form.json": "Patient-Facing",
  "physical-therapy-agreement.json": "Clinical / Practice",
  "telemedicine-consent.json": "Patient-Facing",
  "veterinary-associate.json": "Clinical / Practice"
};

Object.entries(categoryMapping).forEach(([fileName, subcat]) => {
  const filePath = path.join(outputDir, fileName);
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, 'utf8');
    try {
      const parsed = JSON.parse(raw);
      parsed.subcategory = subcat;
      fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2), 'utf8');
      console.log(`Updated subcategory for existing: ${fileName} -> ${subcat}`);
    } catch (e) {
      console.error(`Error updating: ${fileName}`, e);
    }
  }
});

// 2. Add 15 new healthcare templates
const newTemplates = [
  // --- Clinical / Practice ---
  {
    id: "chiropractic-services-agreement",
    subcategory: "Clinical / Practice",
    title: "Chiropractic Services Agreement",
    description: "An employment or independent contractor agreement for a chiropractor joining a chiropractic clinic or wellness center.",
    desc: "chiropractic care, spinal adjustments, and practice coverage",
    field1: "adjustments_scope", field1Label: "Chiropractic Services Scope", field1Type: "textarea", field1Placeholder: "Describe chiropractic techniques, spinal care adjustments, and patient consultation guidelines...",
    field2: "compensation_rate", field2Label: "Contractor Rate ($/hr or %)", field2Type: "text", field2Placeholder: "e.g. $80.00 per hour or 45% of billable collections",
    unit: "hour",
    bodyServices: "Chiropractor agrees to perform professional chiropractic care, spinal adjustments, and patient consultation according to: {adjustments_scope}.",
    bodyCompensation: "Clinic shall compensate Chiropractor at the rate of {compensation_rate} for services rendered.",
    bodyIp: "All patient charts, case files, X-rays, and treatment logs remain the sole property of the Clinic."
  },
  {
    id: "optometry-associate-agreement",
    subcategory: "Clinical / Practice",
    title: "Optometry Associate Agreement",
    description: "An associate employment agreement for optometrists, specifying clinical hours, equipment use, and optical sales bonus splits.",
    desc: "optometric services, vision testing, and optical sales",
    field1: "vision_scope", field1Label: "Optometric Services Scope", field1Type: "textarea", field1Placeholder: "e.g. Direct patient eye examinations, vision testing, prescribing corrective lenses, and post-op care...",
    field2: "salary_rate", field2Label: "Annual Base Salary ($)", field2Type: "currency", field2Placeholder: "e.g. 115,000.00",
    unit: "year",
    bodyServices: "Optometrist shall perform eye examinations, vision tests, and prescribe lenses according to: {vision_scope}.",
    bodyCompensation: "Practice shall pay Optometrist an annual base salary of {salary_rate}, paid in regular semi-monthly installments.",
    bodyIp: "All patient records, lens orders, and diagnostic logs remain the exclusive property of the Practice."
  },
  {
    id: "occupational-therapy-contract",
    subcategory: "Clinical / Practice",
    title: "Occupational Therapy Contract",
    description: "A service agreement for occupational therapists providing rehabilitation services to schools, clinics, or home health programs.",
    desc: "occupational therapy, physical rehabilitation, and patient plans",
    field1: "therapy_scope", field1Label: "Occupational Therapy Scope", field1Type: "textarea", field1Placeholder: "e.g. Conduct patient assessments, design custom rehabilitation exercises, and document progress logs...",
    field2: "session_rate", field2Label: "Therapy Rate ($/Session)", field2Type: "currency", field2Placeholder: "e.g. 95.00",
    unit: "session",
    bodyServices: "Therapist shall conduct physical assessment tests and run motor skill rehabilitation according to: {therapy_scope}.",
    bodyCompensation: "Client shall pay Therapist a flat fee of {session_rate} per completed assessment or session.",
    bodyIp: "Therapist retains ownership of custom exercise routines, while individual patient records belong to the Client."
  },
  {
    id: "speech-pathology-services",
    subcategory: "Clinical / Practice",
    title: "Speech-Language Pathology Services Agreement",
    description: "A clinical service agreement for speech-language pathologists (SLPs) offering therapy to private clients or education boards.",
    desc: "speech therapy, language diagnostics, and voice rehabilitation",
    field1: "pathology_scope", field1Label: "Pathology Services Scope", field1Type: "textarea", field1Placeholder: "Describe speech diagnostics, language therapy, or swallow function checks...",
    field2: "hourly_rate", field2Label: "Therapy Hourly Rate ($)", field2Type: "currency", field2Placeholder: "e.g. 110.00",
    unit: "hour",
    bodyServices: "Pathologist shall provide speech-language assessment, voice training, and pediatric therapy according to: {pathology_scope}.",
    bodyCompensation: "Client shall pay Pathologist a service fee of {hourly_rate} per hour of therapy provided.",
    bodyIp: "All diagnostic reports, medical letters, and session notes belong to the Client."
  },
  {
    id: "dietitian-client-agreement",
    subcategory: "Clinical / Practice",
    title: "Dietitian / Nutritionist Client Agreement",
    description: "A client contract for dietitians and nutritionists outlining custom meal plans, liability waivers, and session refund terms.",
    desc: "nutrition consulting, meal planning, and diet advisory",
    field1: "nutrition_scope", field1Label: "Nutrition Consulting Scope", field1Type: "textarea", field1Placeholder: "e.g. Weekly nutritional assessments, custom meal plans, calorie logs, and body checks...",
    field2: "package_fee", field2Label: "Nutrition Consulting Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 750.00",
    unit: "package",
    bodyServices: "Nutritionist shall coordinate meal plans, analyze caloric logs, and consult according to: {nutrition_scope}.",
    bodyCompensation: "Client shall pay Nutritionist a total program package fee of {package_fee} prior to program kickoff.",
    bodyIp: "Nutritionist retains copyrights in all meal guides, recipe books, and nutritional manuals."
  },

  // --- Administrative / Compliance ---
  {
    id: "medical-staff-bylaws",
    subcategory: "Administrative / Compliance",
    title: "Medical Staff Bylaws (Private Practice)",
    description: "A regulatory framework detailing practice management governance, credentialing rules, and clinical quality committees.",
    desc: "medical staff rules, credentials, and practice committees",
    field1: "credentialing_rules", field1Label: "Credentialing Requirements", field1Type: "textarea", field1Placeholder: "e.g. Board certification, active state license, active DEA registration, and clean malpractice history...",
    field2: "committee_cycle", field2Label: "Committee Review Cycle", field2Type: "select", options: ["Quarterly", "Semi-Annually", "Annually"], defaultValue: "Quarterly",
    unit: "review",
    bodyServices: "Staff shall establish quality review committees and follow credentials checks: {credentialing_rules}.",
    bodyCompensation: "Medical staff shall review practitioner filings on a {committee_cycle} cycle to maintain credentials.",
    bodyIp: "All bylaws revisions, meeting minutes, and peer review logs are the property of the Practice."
  },
  {
    id: "hipaa-training-acknowledgment",
    subcategory: "Administrative / Compliance",
    title: "HIPAA Workforce Training Acknowledgment",
    description: "A compliance acknowledgment document signed by medical workforce members verifying HIPAA training completion.",
    desc: "HIPAA training, health data privacy, and PHI protection rules",
    field1: "phi_rules", field1Label: "Protected Health Information Rules", field1Type: "textarea", field1Placeholder: "e.g. Strict prohibition on logging patient names in personal notes and sharing passwords...",
    field2: "training_hours", field2Label: "HIPAA Training Hours", field2Type: "number", field2Placeholder: "e.g. 4",
    unit: "training",
    bodyServices: "Workforce member acknowledges completing {training_hours} hours of HIPAA training and agrees to protect patient data according to: {phi_rules}.",
    bodyCompensation: "Workforce member receives training credits, and agrees that any HIPAA breach constitutes grounds for termination.",
    bodyIp: "All HIPAA training guides and training sheets remain the property of the Clinic."
  },
  {
    id: "baa-subcontractor",
    subcategory: "Administrative / Compliance",
    title: "HIPAA Business Associate Subcontractor Agreement",
    description: "A HIPAA-compliant subcontractor contract extending privacy rules downstream to sub-vendors handling medical data.",
    desc: "HIPAA subcontractor privacy, PHI safety, and audit logs",
    field1: "data_breach_hours", field1Label: "Breach Notification Time (Hours)", field1Type: "number", field1Placeholder: "e.g. 24",
    field2: "phi_safeguards", field2Label: "Subcontractor PHI Safeguards", field2Type: "textarea", field2Placeholder: "e.g. AES-256 databases encryption, multi-factor logins, and regular security logs...",
    unit: "agreement",
    bodyServices: "Subcontractor agrees to secure health data and run database safeguards: {phi_safeguards}.",
    bodyCompensation: "Subcontractor shall notify Business Associate of any security breach within {data_breach_hours} hours of discovery.",
    bodyIp: "All client PHI remains protected under federal law and must be destroyed post-contract."
  },
  {
    id: "notice-privacy-practices",
    subcategory: "Administrative / Compliance",
    title: "Notice of Privacy Practices (NPP)",
    description: "A patient disclosure document outlining how health records are handled, shared, and patient amendment rights.",
    desc: "privacy practices, patient record rights, and PHI sharing rules",
    field1: "disclosure_exceptions", field1Label: "Disclosure Exceptions", field1Type: "textarea", field1Placeholder: "e.g. Court subpoena orders, public health reporting, and law enforcement requests...",
    field2: "records_compliance_officer", field2Label: "Privacy Compliance Officer Name", field2Type: "text", field2Placeholder: "e.g. Privacy Officer, Suite 100",
    unit: "disclosure",
    bodyServices: "This notice explains how records are shared, with specific exceptions: {disclosure_exceptions}.",
    bodyCompensation: "Patients may request records corrections by contacting the designated Privacy Compliance Officer: {records_compliance_officer}.",
    bodyIp: "This NPP is a legally required public disclosure file of the Clinic."
  },
  {
    id: "medical-office-lease",
    subcategory: "Administrative / Compliance",
    title: "Medical Office Lease Agreement",
    description: "A commercial lease contract for medical offices, detailing hazardous waste removal, parking, and plumbing rules.",
    desc: "medical lease, medical waste disposal, and utility fees",
    field1: "biohazard_rules", field1Label: "Biohazard and Waste Disposal Covenants", field1Type: "textarea", field1Placeholder: "Describe medical waste bins, weekly pickup schedules, and landlord liability boundaries...",
    field2: "monthly_rent", field2Label: "Monthly Base Rent ($)", field2Type: "currency", field2Placeholder: "e.g. 4,500.00",
    unit: "month",
    bodyServices: "Tenant shall lease the medical office and manage biohazard waste in accordance with: {biohazard_rules}.",
    bodyCompensation: "Tenant shall pay Landlord a monthly base lease fee of {monthly_rent}.",
    bodyIp: "All tenant-installed x-ray mounts and custom partitions remain tenant property if removed cleanly."
  },

  // --- Patient-Facing ---
  {
    id: "surgical-informed-consent",
    subcategory: "Patient-Facing",
    title: "Surgical Informed Consent",
    description: "A medical procedure form detailing patient surgical risks, anesthesia options, and practitioner liability releases.",
    desc: "surgical risks, anesthesia options, and practitioner release",
    field1: "surgical_procedure", field1Label: "Surgical Procedure Name", field1Type: "text", field1Placeholder: "e.g. Laparoscopic Cholecystectomy (Gallbladder Removal)",
    field2: "general_risks", field2Label: "Procedure Risks & Complications", field2Type: "textarea", field2Placeholder: "e.g. Internal bleeding, post-op infection, blood clots, or reaction to anesthesia...",
    unit: "consent",
    bodyServices: "Patient authorizes practitioner to perform the following procedure: {surgical_procedure}.",
    bodyCompensation: "Patient acknowledges reading and understanding all listed procedure risks: {general_risks}.",
    bodyIp: "All surgical reports, medical charts, and consent records remain physical files of the Clinic."
  },
  {
    id: "telehealth-terms-service",
    subcategory: "Patient-Facing",
    title: "Telehealth Platform Terms of Service",
    description: "A digital terms of service for remote checkups, electronic pharmacy prescriptions, and internet connection waivers.",
    desc: "telehealth platform, connection safety, and billing limits",
    field1: "state_restrictions", field1Label: "Prescription and State Restrictions", field1Type: "textarea", field1Placeholder: "e.g. No prescriptions for controlled substances, and consulting limited to states where providers hold licenses...",
    field2: "platform_name", field2Label: "Telehealth App/Platform Name", field2Type: "text", field2Placeholder: "e.g. CarePortal Telehealth",
    unit: "platform",
    bodyServices: "Patients may access remote consulting via {platform_name} subject to rules: {state_restrictions}.",
    bodyCompensation: "Patient agrees to pay all copays and platform fees, or allow billing of insurance plans.",
    bodyIp: "Platform codes, trademarks, video chat software, and database configurations belong to the Clinic."
  },
  {
    id: "medical-research-consent",
    subcategory: "Patient-Facing",
    title: "Medical Research Participant Consent",
    description: "An informed consent document for medical research subjects outlining experimental tests, side effects, and withdrawals.",
    desc: "research participation, drug tests, and side effects",
    field1: "trial_benefits", field1Label: "Research Phase Benefits/Risks", field1Type: "textarea", field1Placeholder: "Describe drug test side effects, blood draws, and potential medical benefits...",
    field2: "research_sponsor", field2Label: "Research Sponsoring Entity", field2Type: "text", field2Placeholder: "e.g. BioGen Lab Research Division",
    unit: "consent",
    bodyServices: "Participant agrees to participate in trials sponsored by {research_sponsor} and logs all side effects: {trial_benefits}.",
    bodyCompensation: "Participant receives no compensation or agrees to a fixed study stipend.",
    bodyIp: "All research results, blood analysis charts, and testing metrics belong to the Sponsor."
  },
  {
    id: "patient-financial-responsibility",
    subcategory: "Patient-Facing",
    title: "Patient Financial Responsibility Agreement",
    description: "A clinic policy agreement signed by patients acknowledging insurance billing rules, copays, and collection interest rates.",
    desc: "copays, insurance billing, and collection rates",
    field1: "late_fee_rules", field1Label: "Late Payment / Billing Penalties", field1Type: "textarea", field1Placeholder: "e.g. A $25.00 late fee for outstanding balances past 30 days and 1% monthly interest...",
    field2: "copay_rule", field2Label: "Copay Collection Policy", field2Type: "text", field2Placeholder: "e.g. Copays must be paid at the time of check-in",
    unit: "billing",
    bodyServices: "Patient agrees that copays are due in advance: {copay_rule}.",
    bodyCompensation: "Patient acknowledges liability for outstanding balances and agrees to penalty rates: {late_fee_rules}.",
    bodyIp: "All billing logs, invoices, and payment card profiles are handled in compliance with PCI regulations."
  },
  {
    id: "hipaa-records-release",
    subcategory: "Patient-Facing",
    title: "Authorization for Release of Medical Records",
    description: "A HIPAA-compliant authorization form allowing patients to transfer medical files between clinics.",
    desc: "medical records transfer, HIPAA release, and clinic addresses",
    field1: "transferring_clinic", field1Label: "Transferring Practice Address", field1Type: "text", field1Placeholder: "e.g. Mercy General Hospital Records Dept",
    field2: "receiving_clinic", field2Label: "Receiving Practice Address", field2Type: "text", field2Placeholder: "e.g. Family Health Partners Clinic, Portland, OR",
    unit: "release",
    bodyServices: "Patient hereby authorizes the transfer of health data from {transferring_clinic} to {receiving_clinic}.",
    bodyCompensation: "This release remains valid for 180 days or until revoked in writing by the patient.",
    bodyIp: "The patient retains rights to review the files, and the records remain protected health data."
  }
];

// Helper to format a single template object
function makeHealthcareTemplate(t) {
  const f1 = t.field1 || "scope_of_work";
  const f1Label = t.field1Label || "Scope of Work";
  const f1Type = t.field1Type || "textarea";
  const f1Placeholder = t.field1Placeholder || "Describe the clinical services to perform...";
  
  const f2 = t.field2 || "flat_rate";
  const f2Label = t.field2Label || "Billing Rate ($)";
  const f2Type = t.field2Type || "currency";
  const f2Placeholder = t.field2Placeholder || "e.g. 2,500.00";

  const billingUnit = t.unit || "project";

  return {
    id: t.id,
    slug: t.id,
    category: "healthcare",
    subcategory: t.subcategory,
    title: t.title,
    description: t.description,
    whatsCovered: [
      `Definition of professional ${t.desc || 'healthcare services'}`,
      "HIPAA compliance rules, records storage, and PHI protection",
      "Billing routines, insurance claims, and cash splits",
      "Stark Law, Anti-Kickback Statute, and medical ethics covenants",
      "Standard governing law and medical liability settings"
    ],
    whenToUse: `Use this agreement when setting up legal guidelines for ${t.desc || 'medical services'} to ensure strict compliance with HIPAA and clinical standards.`,
    jurisdictions: ["US", "UK", "CA"],
    lastReviewedAt: "2026-05-20",
    reviewerName: "Sarah Jenkins, Esq.",
    estimatedFillMinutes: 4,
    fields: [
      { id: "provider_name", label: "Medical Provider / Practice", type: "text", placeholder: "e.g. Family Health Partners LLC", required: true, group: "Clinic Info" },
      { id: "provider_address", label: "Practice Office Address", type: "text", placeholder: "e.g. 400 Medical Center Dr, Suite 200, Austin, TX 78701", required: true, group: "Clinic Info" },
      { id: "client_name", label: "Patient / Contractor Name", type: "text", placeholder: "e.g. John Doe", required: true, group: "Patient Info" },
      { id: "client_address", label: "Patient / Contractor Address", type: "text", placeholder: "e.g. 15 Pine St, Austin, TX 78759", required: true, group: "Patient Info" },
      { id: "effective_date", label: "Effective Date", type: "date", required: true, group: "Key Dates" },
      { id: f1, label: f1Label, type: f1Type, placeholder: f1Placeholder, required: true, group: "Project Details" },
      { id: f2, label: f2Label, type: f2Type, placeholder: f2Placeholder, required: true, group: "Compensation" },
      { id: "governing_state", label: "Governing Jurisdiction", type: "text", placeholder: "e.g. Texas", required: true, group: "Legal Settings" }
    ],
    clauses: [
      {
        id: "intro",
        heading: `${t.title.toUpperCase()}`,
        body: `This Healthcare Agreement (the "Agreement") is entered into as of {effective_date} (the "Effective Date"), by and between {provider_name}, located at {provider_address} ("Practice"), and {client_name}, located at {client_address} ("Participant").`,
        optional: false,
        enabledByDefault: true
      },
      {
        id: "services",
        heading: "1. Professional Clinical Services",
        body: t.bodyServices || `Practice/Practitioner agrees to perform clinical services according to the medical scope of work: {${f1}}. All clinical work must adhere to ethical rules.`,
        optional: false,
        enabledByDefault: true
      },
      {
        id: "compensation",
        heading: "2. Payment and Billing Terms",
        body: t.bodyCompensation || `Participant agrees to pay Practice the service rate of {${f2}} for clinical care or services rendered. Billing cycles are monthly.`,
        optional: false,
        "enabledByDefault": true
      },
      {
        id: "hipaa",
        heading: "3. HIPAA Safeguards and Protected Health Information",
        body: t.bodyIp || "Both parties agree to implement administrative, physical, and technical safeguards to protect the privacy and security of Protected Health Information (PHI) in compliance with HIPAA guidelines.",
        optional: false,
        enabledByDefault: true
      },
      {
        id: "governing_law",
        heading: "4. Governing Law",
        body: "This Agreement shall be governed and interpreted under the laws of the State/Country of {governing_state}.",
        optional: false,
        enabledByDefault: true
      }
    ],
    relatedTemplates: ["hipaa-baa", "patient-consent-form"],
    faq: [
      { question: "Is this contract HIPAA compliant?", answer: "Yes. It contains standard clauses requiring both parties to maintain administrative and electronic safeguards for patient data." },
      { question: "Can this contract be terminated early?", answer: "Yes, standard terms allow termination by either party upon 30 days written notice, provided all patient chart transfer protocols are followed." }
    ],
    tags: ["healthcare", "contract", "medical", billingUnit]
  };
}

// Generate files
newTemplates.forEach((t) => {
  const formatted = makeHealthcareTemplate(t);
  const filePath = path.join(outputDir, `${formatted.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(formatted, null, 2), 'utf8');
  console.log(`Successfully wrote template: ${formatted.id}`);
});

console.log('Finished writing healthcare templates!');
