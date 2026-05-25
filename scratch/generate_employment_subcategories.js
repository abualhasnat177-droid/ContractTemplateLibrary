const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '..', 'content', 'templates', 'employment');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 1. Update existing Employment files with appropriate subcategory
const existingFilesMapping = {
  "employment-contract.json": "Specialized Employment Types",
  "independent-contractor-agreement.json": "Specialized Employment Types"
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

// 2. Define the 35 new templates
const newTemplates = [
  // --- Onboarding Documents (8) ---
  {
    id: "background-check-auth",
    subcategory: "Onboarding Documents",
    title: "Background Check Authorization",
    description: "Authorization form permitting the employer to perform credit checks, criminal background screening, and reference verification.",
    whenToUse: "Use this authorization form during the hiring or onboarding process to obtain candidate consent for running background checks.",
    whatsCovered: [
      "Consent for criminal, credit, and education background verification",
      "Compliance with the Fair Credit Reporting Act (FCRA)",
      "Candidate information details (SSN, Date of Birth)",
      "Acknowledge of candidate rights to review the report",
      "Signature and date of applicant authorization"
    ],
    specificFields: [
      { id: "applicant_dob", label: "Applicant Date of Birth", type: "date", required: true, group: "Applicant Details" },
      { id: "screening_agency", label: "Background Screening Agency Name", type: "text", placeholder: "e.g. Checkr Inc.", required: true, group: "Screening Info" }
    ],
    tags: ["background-check", "fcra", "onboarding", "screening", "consent"]
  },
  {
    id: "direct-deposit-auth",
    subcategory: "Onboarding Documents",
    title: "Direct Deposit Authorization",
    description: "Authorization form to set up direct payroll deposit into the employee's designated checking or savings accounts.",
    whenToUse: "Use this payroll form during employee onboarding to gather bank account numbers, routing numbers, and deposit splits.",
    whatsCovered: [
      "Authorization for electronic funds transfers (EFT)",
      "Checking and savings account routing details",
      "Allocation options (100% to single account or percentage split)",
      "Procedure for correcting payment deposit errors",
      "Authorization termination guidelines"
    ],
    specificFields: [
      { id: "bank_name", label: "Bank Institution Name", type: "text", placeholder: "e.g. Chase Bank", required: true, group: "Bank Details" },
      { id: "account_type", label: "Account Type", type: "select", options: ["Checking", "Savings", "Split Account"], defaultValue: "Checking", required: true, group: "Bank Details" }
    ],
    tags: ["direct-deposit", "payroll", "onboarding", "bank", "directdeposit"]
  },
  {
    id: "drug-testing-consent",
    subcategory: "Onboarding Documents",
    title: "Drug Testing Consent Form",
    description: "Consent form for pre-employment, random, or post-accident substance abuse screening.",
    whenToUse: "Use this consent form to document candidate or employee agreement to undergo company-required drug or alcohol tests.",
    whatsCovered: [
      "Consent to provide urine, saliva, or blood samples",
      "Authorized labs and test facilities",
      "Consequences of a positive test or refusal to test",
      "Confidentiality of medical test records",
      "Compliance with federal and state drug testing standards"
    ],
    specificFields: [
      { id: "testing_lab", label: "Authorized Drug Testing Lab", type: "text", placeholder: "e.g. Quest Diagnostics", required: true, group: "Testing Info" }
    ],
    tags: ["drug-testing", "consent", "screening", "onboarding", "hr"]
  },
  {
    id: "emergency-contact-form",
    subcategory: "Onboarding Documents",
    title: "Emergency Contact Form",
    description: "Onboarding form to collect employee emergency contacts, allergies, and medical release authorizations.",
    whenToUse: "Use this standard HR form during employee onboarding to collect key contact details in case of a medical emergency.",
    whatsCovered: [
      "Primary and secondary emergency contact names and phone numbers",
      "Medical release authorization in urgent situations",
      "Disclosure of life-threatening allergies or conditions (optional)",
      "Confidentiality of personal medical details",
      "Employee responsibility to keep contacts updated"
    ],
    specificFields: [
      { id: "primary_contact_name", label: "Primary Contact Name", type: "text", placeholder: "e.g. Mary Jane Watson", required: true, group: "Emergency Contact" },
      { id: "relationship", label: "Relationship to Employee", type: "text", placeholder: "e.g. Spouse / Parent / Sibling", required: true, group: "Emergency Contact" }
    ],
    tags: ["emergency", "contact", "onboarding", "medical-release", "hr"]
  },
  {
    id: "equipment-loan-agreement",
    subcategory: "Onboarding Documents",
    title: "Equipment Loan Agreement",
    description: "Agreement governing the loan of company-owned laptops, monitors, keys, and phones to employees.",
    whenToUse: "Use this loan agreement when issuing company equipment to an employee, establishing care expectations and return obligations.",
    whatsCovered: [
      "Detailed list of loaned company assets and serial numbers",
      "Standards of care, security, and authorized usage",
      "Responsibility for repairs due to gross negligence",
      "Requirement to return equipment immediately upon termination",
      "Right to deduct replacement costs from final paycheck (where legal)"
    ],
    specificFields: [
      { id: "equipment_list", label: "Loaned Equipment & Serial Numbers", type: "textarea", placeholder: "e.g. Apple MacBook Pro 16\" (S/N: C02XX123XX), Dell 27\" Monitor...", required: true, group: "Assets" },
      { id: "replacement_value", label: "Estimated Replacement Value ($)", type: "currency", placeholder: "e.g. 2,500.00", required: true, group: "Assets" }
    ],
    tags: ["equipment", "asset", "loan", "laptop", "onboarding"]
  },
  {
    id: "remote-work-equipment",
    subcategory: "Onboarding Documents",
    title: "Remote Work Equipment Agreement",
    description: "Governs remote employee workspace stipends, internet speed requirements, and company hardware policies.",
    whenToUse: "Use this agreement when onboarding remote or hybrid employees who will work from home and require equipment support.",
    whatsCovered: [
      "Stipends for home office furniture and internet setups",
      "Required minimum internet bandwidth standards",
      "Workplace safety expectations for home offices",
      "Ownership and maintenance of remote corporate hardware",
      "Virtual security rules (VPN use, screen privacy)"
    ],
    specificFields: [
      { id: "internet_speed", label: "Minimum Download Speed (Mbps)", type: "number", placeholder: "e.g. 100", required: true, group: "Tech Standards" },
      { id: "office_stipend", label: "One-Time Setup Stipend ($)", type: "currency", placeholder: "e.g. 500.00", required: true, group: "Stipends" }
    ],
    tags: ["remote", "work-from-home", "stipend", "internet", "equipment"]
  },
  {
    id: "confidentiality-acknowledgment",
    subcategory: "Onboarding Documents",
    title: "Confidentiality Acknowledgment",
    description: "A summary agreement signed by employees upon hire, reaffirming their commitment to protect company secrets.",
    whenToUse: "Use this quick acknowledgment form during onboarding to reinforce the non-disclosure terms of their employment contract.",
    whatsCovered: [
      "Definition of company confidential plans and trade secrets",
      "Agreement not to copy or export company source files",
      "Survival of confidentiality terms after termination",
      "Immediate reporting of accidental data leaks",
      "Acknowledgment of disciplinary actions for breach"
    ],
    specificFields: [
      { id: "handbook_version", label: "Confidentiality Policy Reference", type: "text", placeholder: "e.g. Section 4 of Employee Handbook v2026", required: true, group: "Policy Info" }
    ],
    tags: ["confidentiality", "secrecy", "onboarding", "nda", "employee"]
  },
  {
    id: "social-media-policy-ack",
    subcategory: "Onboarding Documents",
    title: "Social Media Policy Acknowledgment",
    description: "Acknowledgment form detailing employee guidelines for posting about the company on social networks.",
    whenToUse: "Use this form to ensure employees understand what they can and cannot post online regarding company products and operations.",
    whatsCovered: [
      "Prohibition on disclosing unreleased company software online",
      "Rules for using personal social accounts during work hours",
      "Clear disclaimer that employees do not speak for the brand",
      "Protection of colleague privacy and customer records",
      "Consequences for defamatory or offensive online posts"
    ],
    specificFields: [
      { id: "policy_date", label: "Social Media Policy Date", type: "date", required: true, group: "Policy Info" }
    ],
    tags: ["socialmedia", "policy", "onboarding", "pr", "marketing"]
  },

  // --- Specialized Employment Types (8) ---
  {
    id: "zero-hours-contract",
    subcategory: "Specialized Employment Types",
    title: "Zero-Hours Contract (UK)",
    description: "Employment contract under UK law where the employer is not obliged to provide work, and the worker is not obliged to accept it.",
    whenToUse: "Use this UK-specific contract for hiring casual staff, event support, or seasonal workers on an as-needed basis.",
    whatsCovered: [
      "No guarantee of weekly work hours",
      "Hourly pay rate and statutory holiday accumulation",
      "Worker freedom to work for other companies (exclusivity ban)",
      "Right to decline offered work shifts",
      "UK employment rights (pension enrollment triggers)"
    ],
    specificFields: [
      { id: "hourly_rate_gbp", label: "Hourly Pay Rate (£)", type: "text", placeholder: "e.g. 12.50", required: true, group: "Compensation" }
    ],
    tags: ["zero-hours", "uk-law", "casual", "hourly", "employment"]
  },
  {
    id: "casual-employment-agreement",
    subcategory: "Specialized Employment Types",
    title: "Casual Employment Agreement (AU)",
    description: "Employment contract under Australian law incorporating casual loading and Fair Work Act standards.",
    whenToUse: "Use this contract when hiring casual employees in Australia, specifying casual loading rates and Fair Work Info Statements.",
    whatsCovered: [
      "Casual loading rates (standard 25% addition)",
      "Work hours variability and lack of firm advance commitment",
      "Australian Fair Work Act compliance and information guide",
      "Superannuation contribution details",
      "Casual conversion rights after 12 months"
    ],
    specificFields: [
      { id: "casual_loading", label: "Casual Loading Percentage (%)", type: "text", placeholder: "e.g. 25.00", required: true, group: "Compensation" },
      { id: "award_name", label: "Fair Work Modern Award Title", type: "text", placeholder: "e.g. Clerks Private Sector Award 2020", required: true, group: "Compliance" }
    ],
    tags: ["casual", "australia", "fair-work", "loading", "employment"]
  },
  {
    id: "seasonal-employment-contract",
    subcategory: "Specialized Employment Types",
    title: "Seasonal Employment Contract",
    description: "Fixed-term employment agreement for seasonal operations, specifying start and automatic end dates.",
    whenToUse: "Use this seasonal contract when hiring employees for specific peak times (e.g. summer camps, holiday retail, harvesting).",
    whatsCovered: [
      "Fixed start date and automatic termination date",
      "Specific seasonal tasks and work locations",
      "Varying hourly rates and peak-overtime rules",
      "No expectation of renewal or permanent employment",
      "Return of seasonal uniforms or equipment"
    ],
    specificFields: [
      { id: "seasonal_end_date", label: "Automatic End Date", type: "date", required: true, group: "Contract Term" },
      { id: "seasonal_duties", label: "Seasonal Role Description", type: "text", placeholder: "e.g. Holiday Retail Sales and Inventory Staff", required: true, group: "Role Info" }
    ],
    tags: ["seasonal", "fixed-term", "retail", "summer", "employment"]
  },
  {
    id: "probationary-period-agreement",
    subcategory: "Specialized Employment Types",
    title: "Probationary Period Agreement",
    description: "An agreement setting out evaluation milestones, performance targets, and shortened notice periods during a trial period.",
    whenToUse: "Use this agreement when placing a new hire on a trial period (typically 90 days) to evaluate their suitability for a permanent role.",
    whatsCovered: [
      "Duration of the trial probationary period",
      "Performance evaluation milestones and targets",
      "Shortened notice period for termination during trial",
      "Transition criteria to permanent employee status",
      "Exclusion of certain benefits during the trial phase"
    ],
    specificFields: [
      { id: "probation_days", label: "Probation Duration (Days)", type: "select", options: ["30", "60", "90", "180"], defaultValue: "90", required: true, group: "Trial Details" },
      { id: "trial_notice_days", label: "Trial Notice Period (Days)", type: "number", placeholder: "e.g. 5", required: true, group: "Termination" }
    ],
    tags: ["probation", "trial", "hiring", "onboarding", "employment"]
  },
  {
    id: "rehire-agreement",
    subcategory: "Specialized Employment Types",
    title: "Rehire Agreement",
    description: "Re-employment contract specifying seniority restoration, adjusted vesting dates, and prior IP integration.",
    whenToUse: "Use this contract when rehiring a former employee to define if their prior years of service affect their vacation rates and option vesting.",
    whatsCovered: [
      "Restoration of seniority rights and benefit levels",
      "Prior intellectual property assignments verification",
      "Adjusted stock option vesting start dates",
      "New job responsibilities and salary structures",
      "Termination of prior severance obligations"
    ],
    specificFields: [
      { id: "prior_exit_date", label: "Prior Departure Date", type: "date", required: true, group: "Prior Service" },
      { id: "seniority_restored", label: "Restore Seniority?", type: "select", options: ["Yes - Full Restoration", "No - Treat as New Hire"], defaultValue: "No - Treat as New Hire", required: true, group: "Prior Service" }
    ],
    tags: ["rehire", "seniority", "vesting", "hr", "employment"]
  },
  {
    id: "dual-employment-agreement",
    subcategory: "Specialized Employment Types",
    title: "Dual Employment Agreement",
    description: "Governs situations where an employee works in two distinct roles or divisions within the same corporate group.",
    whenToUse: "Use this contract to split an employee's hours, compensation, and supervisor chains between two affiliate companies.",
    whatsCovered: [
      "Allocation of working hours between two divisions",
      "Dual supervisor hierarchy and reporting setups",
      "Salary splitting and allocation across tax entities",
      "Overtime calculation coordination across roles",
      "Procedure if one role is terminated"
    ],
    specificFields: [
      { id: "subsidiary_b_name", label: "Secondary Affiliate Entity", type: "text", placeholder: "e.g. CyberFlow UK Ltd", required: true, group: "Affiliates" },
      { id: "hours_split", label: "Hours Split (Primary % / Secondary %)", type: "text", placeholder: "e.g. 60% / 40%", required: true, group: "Schedule" }
    ],
    tags: ["dual-employment", "affiliates", "payroll-split", "governance", "employment"]
  },
  {
    id: "secondment-agreement",
    subcategory: "Specialized Employment Types",
    title: "Secondment Agreement",
    description: "Agreement detailing the temporary transfer of an employee to an affiliate company or international client.",
    whenToUse: "Use this agreement when loaning an employee to a partner firm or overseas subsidiary for a temporary period.",
    whatsCovered: [
      "Duration of secondment and target host company",
      "Preservation of salary, benefits, and home company status",
      "Host company workplace rules and supervision",
      "IP rights in works created during secondment (assigned to host or home)",
      "Return process to home job post-secondment"
    ],
    specificFields: [
      { id: "host_company", label: "Host Company Name", type: "text", placeholder: "e.g. Global Tech Partners Ltd", required: true, group: "Secondment Details" },
      { id: "secondment_months", label: "Secondment Duration (Months)", type: "number", placeholder: "e.g. 6", required: true, group: "Secondment Details" }
    ],
    tags: ["secondment", "expat", "affiliate", "temporary", "employment"]
  },
  {
    id: "job-sharing-agreement",
    subcategory: "Specialized Employment Types",
    title: "Job Sharing Agreement",
    description: "Structured agreement where two part-time employees share the responsibilities of a single full-time role.",
    whenToUse: "Use this agreement to define the handoff schedules, vacation planning, and pay structures when splitting one job between two staff.",
    whatsCovered: [
      "Allocation of days and hours between sharing employees",
      "Weekly handoff meeting and communication expectations",
      "Splitting of benefits and holiday allocations",
      "Performance evaluation criteria for shared roles",
      "Impact of one sharing employee resigning"
    ],
    specificFields: [
      { id: "partner_employee_name", label: "Job Share Partner Name", type: "text", placeholder: "e.g. Rachel Green", required: true, group: "Partners" },
      { id: "schedule_split_details", label: "Schedule Hand-Off Plan", type: "text", placeholder: "e.g. Employee A: Mon-Wed AM; Employee B: Wed PM-Fri", required: true, group: "Schedule" }
    ],
    tags: ["jobsharing", "part-time", "schedule-split", "hr", "employment"]
  },

  // --- Compensation & Benefits (7) ---
  {
    id: "commission-plan-agreement",
    subcategory: "Compensation & Benefits",
    title: "Commission Plan Agreement",
    description: "Sales commission structure outlining targets, payout calculations, and rules for earned vs. unearned accounts.",
    whenToUse: "Use this agreement when hiring or configuring a sales representative who receives commissions based on closed deals.",
    whatsCovered: [
      "Sales targets, quotas, and commission tiers",
      "Definition of when a commission is officially earned",
      "Draw accounts (recoverable vs non-recoverable)",
      "Impact of product returns or customer defaults",
      "Commission payouts following employee termination"
    ],
    specificFields: [
      { id: "commission_rate_sales", label: "Base Commission Rate (%)", type: "text", placeholder: "e.g. 10.00", required: true, group: "Commission Details" },
      { id: "target_quota", label: "Quarterly Sales Quota ($)", type: "currency", placeholder: "e.g. 100,000.00", required: true, group: "Commission Details" }
    ],
    tags: ["commission", "sales", "bonus", "quota", "compensation"]
  },
  {
    id: "bonus-agreement",
    subcategory: "Compensation & Benefits",
    title: "Performance Bonus Agreement",
    description: "Agreement outlining key performance indicators (KPIs) and annual cash bonus metrics.",
    whenToUse: "Use this bonus letter to specify cash incentives tied to corporate revenue targets or individual employee milestones.",
    whatsCovered: [
      "Target bonus amount and KPI milestones",
      "Discretionary vs non-discretionary bonus rules",
      "Financial auditing and calculation approval processes",
      "Requirement to remain employed on the payout date",
      "Tax withholding guidelines for bonus checks"
    ],
    specificFields: [
      { id: "target_bonus", label: "Target Bonus Amount ($)", type: "currency", placeholder: "e.g. 15,000.00", required: true, group: "Bonus Details" },
      { id: "kpi_target", label: "Performance KPI Target", type: "text", placeholder: "e.g. Company achieving $2M ARR by Q4", required: true, group: "Bonus Details" }
    ],
    tags: ["bonus", "performance", "incentive", "kpi", "compensation"]
  },
  {
    id: "car-allowance-agreement",
    subcategory: "Compensation & Benefits",
    title: "Car Allowance Agreement",
    description: "Car allowance policy outlining monthly stipends, insurance criteria, and mileage log audits.",
    whenToUse: "Use this contract for staff (such as field sales reps) who must drive personal vehicles for business operations.",
    whatsCovered: [
      "Monthly car allowance stipend size",
      "Required minimum auto liability insurance coverage",
      "Mileage tracking logs and audit submissions",
      "Employee responsibility for vehicle maintenance and fuel",
      "Limitation of company liability for driving accidents"
    ],
    specificFields: [
      { id: "monthly_allowance", label: "Monthly Car Allowance ($)", type: "currency", placeholder: "e.g. 450.00", required: true, group: "Allowance" },
      { id: "min_insurance", label: "Minimum Liability Coverage ($)", type: "currency", placeholder: "e.g. 300,000.00", required: true, group: "Insurance" }
    ],
    tags: ["car-allowance", "vehicle", "mileage", "reimbursement", "compensation"]
  },
  {
    id: "expense-reimbursement-policy",
    subcategory: "Compensation & Benefits",
    title: "Expense Reimbursement Policy",
    description: "Reimbursement guidelines detailing eligible business costs, receipt rules, and approval deadlines.",
    whenToUse: "Use this policy agreement to define what travel, food, and lodging costs the company will refund to employees.",
    whatsCovered: [
      "Eligible business expense categories and daily caps",
      "Receipt requirements (minimum spending to require receipt)",
      "Expense report submission timelines (e.g. within 30 days)",
      "Corporate credit card rules and billing audits",
      "Disallowance of personal costs or alcohol caps"
    ],
    specificFields: [
      { id: "daily_meal_cap", label: "Daily Meal Reimbursement Cap ($)", type: "currency", placeholder: "e.g. 75.00", required: true, group: "Caps" }
    ],
    tags: ["expense", "reimbursement", "travel", "receipt", "compensation"]
  },
  {
    id: "relocation-assistance-agreement",
    subcategory: "Compensation & Benefits",
    title: "Relocation Assistance Agreement",
    description: "Relocation package agreement containing moving stipends, temporary housing rules, and clawback clauses.",
    whenToUse: "Use this relocation contract when paying to move a new hire or existing employee to a different office city.",
    whatsCovered: [
      "Authorized moving expenses (freight, flight, packing)",
      "Temporary corporate housing limits",
      "Maximum relocation funding caps",
      "Clawback rule: employee must repay if they quit within 1 year",
      "Taxation of moving assistance payments"
    ],
    specificFields: [
      { id: "relocation_cap", label: "Maximum Relocation Budget ($)", type: "currency", placeholder: "e.g. 8,000.00", required: true, group: "Budget" },
      { id: "retention_months", label: "Clawback Period (Months)", type: "select", options: ["12", "18", "24"], defaultValue: "12", required: true, group: "Clawback" }
    ],
    tags: ["relocation", "moving", "clawback", "stipend", "compensation"]
  },
  {
    id: "sign-on-bonus-clawback",
    subcategory: "Compensation & Benefits",
    title: "Sign-on Bonus (with Clawback)",
    description: "Sign-on cash bonus agreement containing a strict clawback repayment schedule if the employee resigns early.",
    whenToUse: "Use this bonus letter when issuing a sign-on cash bonus, protecting the company from immediate candidate departures.",
    whatsCovered: [
      "Sign-on bonus size and pay timing (e.g. 1st paycheck)",
      "Clawback repayment triggers (resignation or termination with cause)",
      "Pro-rata clawback calculation based on months of service",
      "Paycheck deduction authorization for clawback",
      "Tax treatment of recovered bonus cash"
    ],
    specificFields: [
      { id: "sign_on_bonus_amount", label: "Sign-On Bonus ($)", type: "currency", placeholder: "e.g. 10,000.00", required: true, group: "Bonus" },
      { id: "required_service_months", label: "Required Service (Months)", type: "select", options: ["12", "24"], defaultValue: "12", required: true, group: "Clawback" }
    ],
    tags: ["sign-on", "bonus", "clawback", "recruiting", "compensation"]
  },
  {
    id: "deferred-compensation-agreement",
    subcategory: "Compensation & Benefits",
    title: "Deferred Compensation Agreement",
    description: "Non-qualified deferred compensation plan outlining payment schedules, tax options, and Section 409A compliance.",
    whenToUse: "Use this agreement for high-level executives who wish to defer a portion of their salary to future tax years.",
    whatsCovered: [
      "Election parameters for deferring salary or bonus",
      "Maturity payout dates (retirement, termination, specified date)",
      "Compliance with IRS Section 409A distribution laws",
      "Unfunded status of the plan (general corporate creditor liability)",
      "Impact of change in corporate control (acquisition)"
    ],
    specificFields: [
      { id: "deferral_percentage", label: "Salary Deferral Cap (%)", type: "text", placeholder: "e.g. 50.00", required: true, group: "Plan Details" }
    ],
    tags: ["deferred", "tax", "409a", "executive", "compensation"]
  },

  // --- Offboarding & Disputes (7) ---
  {
    id: "mutual-separation-agreement",
    subcategory: "Offboarding & Disputes",
    title: "Mutual Separation Agreement",
    description: "Severance contract specifying release of employment claims, payout amounts, and offboarding schedules.",
    whenToUse: "Use this separation agreement during employee layoffs or mutual departures to guarantee a legal release in exchange for severance.",
    whatsCovered: [
      "Final departure date and outstanding pay calculations",
      "Severance cash details and health coverage extensions",
      "General release of claims under federal/state laws (ADEA, Title VII)",
      "Return of all company laptops and data room files",
      "Older Workers Benefit Protection Act (OWBPA) review periods"
    ],
    specificFields: [
      { id: "severance_weeks", label: "Severance Pay (Weeks)", type: "number", placeholder: "e.g. 8", required: true, group: "Severance Package" },
      { id: "review_days", label: "Legal Review Window (Days)", type: "select", options: ["7", "21", "45"], defaultValue: "21", required: true, group: "Compliance" }
    ],
    tags: ["separation", "severance", "release", "offboarding", "layoff"]
  },
  {
    id: "redundancy-layoff-notice",
    subcategory: "Offboarding & Disputes",
    title: "Redundancy / Layoff Notice",
    description: "Formal corporate notification letter advising an employee that their role is being eliminated.",
    whenToUse: "Use this layoff notice to formally document the termination of an employee due to budget cuts or corporate downsizing.",
    whatsCovered: [
      "Reason for role elimination (redundancy/downsizing)",
      "Effective termination date and final payroll date",
      "Instructions for returning company files and laptops",
      "Information on unused accrued vacation payouts",
      "Contact details for unemployment insurance filings"
    ],
    specificFields: [
      { id: "final_work_date", label: "Final Work Date", type: "date", required: true, group: "Layoff Info" }
    ],
    tags: ["layoff", "redundancy", "notice", "offboarding", "hr"]
  },
  {
    id: "exit-interview-acknowledgment",
    subcategory: "Offboarding & Disputes",
    title: "Exit Interview Acknowledgment",
    description: "Summary form signed by departing staff confirming the return of assets, clearing of IP, and ongoing NDA duties.",
    whenToUse: "Use this offboarding form on the employee's final day to double-check asset returns and remind them of post-exit NDA compliance.",
    whatsCovered: [
      "Confirmation that all laptops and access cards were returned",
      "Reaffirmation of ongoing non-disclosure and non-solicit covenants",
      "Employee statement that they have returned all proprietary codes",
      "Acknowledge of final paycheck correctness",
      "Departure address updates for tax filing (W2s)"
    ],
    specificFields: [
      { id: "handover_date", label: "Asset Handover Date", type: "date", required: true, group: "Offboarding Details" }
    ],
    tags: ["exit", "interview", "offboarding", "checklist", "hr"]
  },
  {
    id: "reference-letter-template",
    subcategory: "Offboarding & Disputes",
    title: "Employment Reference Letter",
    description: "Professional reference letter template confirming an employee's role, tenure, and positive contributions.",
    whenToUse: "Use this template when writing a recommendation or reference letter for a departing employee who left in good standing.",
    whatsCovered: [
      "Verification of job title and employment dates",
      "Description of employee duties and accomplishments",
      "Positive review of work ethic and team performance",
      "Signer's professional contact information",
      "Standard disclaimer of company liability for future performance"
    ],
    specificFields: [
      { id: "former_role", label: "Former Job Title", type: "text", placeholder: "e.g. Lead Frontend Developer", required: true, group: "Reference Details" },
      { id: "years_worked", label: "Years of Service", type: "text", placeholder: "e.g. 4", required: true, group: "Reference Details" }
    ],
    tags: ["reference", "recommendation", "offboarding", "career", "hr"]
  },
  {
    id: "cobra-continuation-notice",
    subcategory: "Offboarding & Disputes",
    title: "COBRA Continuation Notice",
    description: "Health insurance continuation notice outlining coverage options, rates, and enrollment deadlines under COBRA.",
    whenToUse: "Use this regulatory notice template to inform departing staff of their federal rights to extend health insurance coverage.",
    whatsCovered: [
      "Explanation of COBRA health insurance extension rights",
      "Qualifying event description (termination of employment)",
      "Premium payment details (employee pays up to 102% of cost)",
      "Strict 60-day enrollment window timeline",
      "Coverage duration details (standard 18 months)"
    ],
    specificFields: [
      { id: "enrollment_deadline_days", label: "Enrollment Window (Days)", type: "select", options: ["30", "60", "90"], defaultValue: "60", required: true, group: "Timeline" }
    ],
    tags: ["cobra", "insurance", "health", "offboarding", "compliance"]
  },
  {
    id: "non-disparagement-agreement",
    subcategory: "Offboarding & Disputes",
    title: "Non-Disparagement Agreement",
    description: "Post-employment agreement preventing either party from making negative public statements about the other.",
    whenToUse: "Use this agreement during employee offboarding to ensure the departing employee does not defame the brand or its officers.",
    whatsCovered: [
      "Definition of disparaging comments (online, verbal, written)",
      "Ban on posting negative reviews on Glassdoor or Google Reviews",
      "Mutual covenant (company agrees not to disparage employee)",
      "Exceptions for government investigations or court testimonies",
      "Liquidated damages for proven breach of agreement"
    ],
    specificFields: [
      { id: "liquidated_damages_amount", label: "Breach Liquidated Damages ($)", type: "currency", placeholder: "e.g. 5,000.00", required: true, group: "Remedies" }
    ],
    tags: ["disparagement", "offboarding", "reputation", "glassdoor", "defamation"]
  },
  {
    id: "whistleblower-policy-ack",
    subcategory: "Offboarding & Disputes",
    title: "Whistleblower Policy Acknowledgment",
    description: "Policy acknowledgment detailing anonymous reporting pathways for unethical or illegal corporate activities.",
    whenToUse: "Use this policy document during onboarding to establish reporting paths and protect employees who report corporate waste or fraud.",
    whatsCovered: [
      "Authorized channels for reporting illegal acts (hotlines, portals)",
      "Definition of reportable conduct (fraud, safety violations)",
      "Strict anti-retaliation protections for reporting workers",
      "Investigation procedures and board review paths",
      "Confidentiality of the whistleblower's identity"
    ],
    specificFields: [
      { id: "reporting_hotline", label: "Compliance Reporting Hotline", type: "text", placeholder: "e.g. 1-800-555-SAFE (Anonymous)", required: true, group: "Reporting" }
    ],
    tags: ["whistleblower", "compliance", "ethics", "reporting", "policy"]
  },

  // --- Compliance & Policies (5) ---
  {
    id: "equal-opportunity-policy",
    subcategory: "Compliance & Policies",
    title: "Equal Opportunity Policy",
    description: "Corporate policy declaring equal opportunity employment compliance, prohibiting discrimination in hiring and pay.",
    whenToUse: "Use this policy in your employee handbook to establish EEOC compliance and define discrimination reporting channels.",
    whatsCovered: [
      "Definition of protected classes (race, gender, age, disability, religion)",
      "EEOC compliance statement and zero-tolerance discrimination rules",
      "Accommodation requests for pregnancy, religion, or disability",
      "Reporting channels for filing internal discrimination complaints",
      "Strict prohibition on retaliation against reporting employees"
    ],
    specificFields: [
      { id: "eeo_officer", label: "EEO Compliance Officer Name", type: "text", placeholder: "e.g. Sarah Jenkins (HR Director)", required: true, group: "Compliance" }
    ],
    tags: ["eeoc", "discrimination", "policy", "handbook", "compliance"]
  },
  {
    id: "anti-harassment-policy",
    subcategory: "Compliance & Policies",
    title: "Anti-Harassment Policy",
    description: "Workplace anti-harassment policy detailing definitions of sexual and non-sexual harassment, and investigation rules.",
    whenToUse: "Use this policy during employee onboarding to define and prohibit sexual and verbal harassment in the office or remote channels.",
    whatsCovered: [
      "Definition of hostile work environments and sexual harassment",
      "Online harassment guidelines (Slack, Zoom, email rules)",
      "Step-by-step reporting protocols for victims",
      "Investigation timelines and disciplinary actions",
      "Third-party harassment rules (vendors, clients)"
    ],
    specificFields: [
      { id: "investigation_days", label: "Max Investigation Timeline (Days)", type: "number", placeholder: "e.g. 10", required: true, group: "Investigation" }
    ],
    tags: ["harassment", "anti-harassment", "handbook", "policy", "compliance"]
  },
  {
    id: "workplace-safety-agreement",
    subcategory: "Compliance & Policies",
    title: "Workplace Safety Agreement",
    description: "Agreement outlining OSHA safety compliance rules, protective equipment (PPE) guidelines, and injury reporting.",
    whenToUse: "Use this safety agreement when onboarding warehouse, lab, or manufacturing employees to mandate compliance with safety protocols.",
    whatsCovered: [
      "Required personal protective equipment (PPE) rules",
      "Emergency evacuation routes and fire safety setups",
      "Procedure for reporting workplace injuries (OSHA rules)",
      "Prohibition on operating machinery under substance influence",
      "Right to stop work if conditions are hazardous"
    ],
    specificFields: [
      { id: "osha_rep", label: "OSHA Safety Coordinator", type: "text", placeholder: "e.g. Frank Castle (Facilities Lead)", required: true, group: "Safety Info" }
    ],
    tags: ["safety", "osha", "factory", "ppe", "compliance"]
  },
  {
    id: "employee-data-privacy-ack",
    subcategory: "Compliance & Policies",
    title: "Employee Data Privacy Acknowledgment",
    description: "Acknowledgment outlining how the company collects, processes, and protects employee personal data.",
    whenToUse: "Use this privacy agreement during onboarding to comply with CCPA, GDPR, or state privacy laws regarding worker data.",
    whatsCovered: [
      "Categories of personal data collected (health logs, bank accounts)",
      "Authorized uses of worker data (payroll, benefits planning)",
      "Data security standards and firewall protection protocols",
      "Employee rights to request, review, or correct data logs",
      "Breach notification timelines for employee datasets"
    ],
    specificFields: [
      { id: "privacy_framework", label: "Applicable Privacy Regulation", type: "text", placeholder: "e.g. CCPA / CPRA / GDPR", required: true, group: "Compliance" }
    ],
    tags: ["privacy", "gdpr", "ccpa", "data", "compliance"]
  },
  {
    id: "acceptable-use-policy",
    subcategory: "Compliance & Policies",
    title: "Acceptable Use Policy (Company Devices)",
    description: "Device policy detailing allowed personal use, data backup, and company monitoring rights on corporate computers.",
    whenToUse: "Use this acceptable use contract during onboarding to inform staff that they have no expectation of privacy on company laptops.",
    whatsCovered: [
      "No expectation of privacy on company-owned computers and networks",
      "Company right to monitor emails, Slack channels, and browser histories",
      "Prohibition on downloading un-approved programs or hacking utilities",
      "Security standards (screen lock enforcement, secure passwords)",
      "Consequences for using company devices for illegal activities"
    ],
    specificFields: [
      { id: "device_auditor_team", label: "Monitoring Security Team", type: "text", placeholder: "e.g. IT Security & Compliance Division", required: true, group: "IT Control" }
    ],
    tags: ["acceptableuse", "it-policy", "monitoring", "laptop", "compliance"]
  }
];

// Helper to format a single template object
function makeEmploymentTemplate(t) {
  let fields = [];
  let clauses = [];

  // standard fields for employment
  fields = [
    { id: "company_name", label: "Company Name", type: "text", placeholder: "e.g. CyberFlow Technologies Inc.", required: true, group: "Company Info" },
    { id: "company_address", label: "Company Address", type: "text", placeholder: "e.g. 100 Innovation Way, San Francisco, CA", required: true, group: "Company Info" },
    { id: "employee_name", label: "Employee / Worker Name", type: "text", placeholder: "e.g. Sarah Connor", required: true, group: "Employee Info" },
    { id: "employee_address", label: "Employee Address", type: "text", placeholder: "e.g. 742 Evergreen Terrace, Springfield, OR", required: true, group: "Employee Info" },
    ...(t.specificFields || []),
    { id: "effective_date", label: "Effective Date", type: "date", required: true, group: "Key Dates" },
    { id: "governing_state", label: "Governing Jurisdiction", type: "text", placeholder: "e.g. California", required: true, group: "Legal Settings" }
  ];

  // generate clauses
  clauses = [
    {
      id: "intro",
      heading: t.title.toUpperCase(),
      body: `This corporate document (the "Agreement" or "Acknowledgment") is executed as of {effective_date} (the "Effective Date"), by and between {company_name}, located at {company_address} (the "Company"), and {employee_name}, residing at {employee_address} ("Employee" or "Applicant").`,
      optional: false,
      enabledByDefault: true
    },
    {
      id: "general_terms",
      heading: "1. Scope & Acknowledgment",
      body: `This document establishes compliance policies, compensation, onboarding, or offboarding parameters for ${t.title}. Employee agrees to review the policies and adhere to the guidelines set out herein.`,
      optional: false,
      enabledByDefault: true
    }
  ];

  // Add specific clauses based on type
  if (t.id === 'background-check-auth') {
    clauses.push({
      id: "screening_consent",
      heading: "2. Screening Authorization",
      body: "Employee authorizes the Company and its screening agency, {screening_agency}, to conduct criminal background audits, education checks, and credit reviews. Employee is born on {applicant_dob} for verification.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'direct-deposit-auth') {
    clauses.push({
      id: "bank_auth",
      heading: "2. Electronic Funds Transfer",
      body: "Employee authorizes payroll funds to be sent directly to {bank_name} under account type: {account_type}. This authorization remains in effect until terminated in writing.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'drug-testing-consent') {
    clauses.push({
      id: "test_consent",
      heading: "2. Substance Testing Covenants",
      body: "Employee consents to undergo drug testing administered by {testing_lab}. Employee understands positive tests or refusal to test may result in immediate revocation of job offers or termination.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'emergency-contact-form') {
    clauses.push({
      id: "emergency_info",
      heading: "2. Urgent Medical Release",
      body: "In the event of medical emergencies, Company is authorized to contact {primary_contact_name} (Relationship: {relationship}) and release medical details to emergency responders.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'equipment-loan-agreement') {
    clauses.push({
      id: "asset_details",
      heading: "2. Loaned Assets & Replacement Costs",
      body: "Employee takes responsibility for the company equipment: {equipment_list}. If equipment is lost due to gross negligence, Employee authorizes a deduction up to its value of {replacement_value} from final payroll.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'remote-work-equipment') {
    clauses.push({
      id: "remote_stipends",
      heading: "2. Home Office Stipends",
      body: "Company shall supply a remote setup stipend of {office_stipend}. Employee agrees to maintain a home internet download speed of at least {internet_speed} Mbps for work operations.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'confidentiality-acknowledgment') {
    clauses.push({
      id: "secrecy_covenants",
      heading: "2. Confidentiality Requirements",
      body: "Employee agrees to protect all trade secrets and customer logs. This acknowledgment integrates with the policies defined in: {handbook_version}.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'social-media-policy-ack') {
    clauses.push({
      id: "social_media_rules",
      heading: "2. Social Media Guidelines",
      body: "Employee agrees not to disclose corporate secrets, unreleased software code, or customer profiles on social platforms, adhering to the policy updated on {policy_date}.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'zero-hours-contract') {
    clauses.push({
      id: "uk_casual_terms",
      heading: "2. Zero-Hours UK Covenants",
      body: "Employee shall be paid an hourly rate of {hourly_rate_gbp}. The parties agree that no hours of work are guaranteed, and the Worker is free to accept or decline shifts.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'casual-employment-agreement') {
    clauses.push({
      id: "au_casual_loading",
      heading: "2. Australian Casual Loading",
      body: "Employee is hired under the award: {award_name}. Employee shall receive a casual loading of {casual_loading}% in addition to base pay rates, in lieu of paid leave benefits.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'seasonal-employment-contract') {
    clauses.push({
      id: "seasonal_term",
      heading: "2. Fixed-Term Seasonal Duties",
      body: "Employee is hired to perform seasonal duties: {seasonal_duties}. This contract terminates automatically without notice on the end date: {seasonal_end_date}.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'probationary-period-agreement') {
    clauses.push({
      id: "probation_trial_details",
      heading: "2. Trial Period Parameters",
      body: "Employee shall undergo a trial period of {probation_days} days. During this probationary phase, either party can terminate the contract with a shortened notice of {trial_notice_days} days.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'rehire-agreement') {
    clauses.push({
      id: "rehire_seniority_rules",
      heading: "2. Seniority Status",
      body: "Employee is rehired following prior departure on {prior_exit_date}. Seniority and option vesting adjustments: {seniority_restored}.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'dual-employment-agreement') {
    clauses.push({
      id: "dual_hours_allocations",
      heading: "2. Affiliate Hours Split",
      body: "Employee shall divide working hours between Company and Affiliate {subsidiary_b_name} matching split: {hours_split}. Overtime counts across the combined entities.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'secondment-agreement') {
    clauses.push({
      id: "secondment_host",
      heading: "2. Secondment Timeline",
      body: "Employee is seconded to Host Company {host_company} for a duration of {secondment_months} months. Employment contract with home Company remains active.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'job-sharing-agreement') {
    clauses.push({
      id: "job_share_details",
      heading: "2. Job Sharing Schedules",
      body: "Employee shares the full-time role with {partner_employee_name}. Working days and handoffs shall follow the plan: {schedule_split_details}.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'commission-plan-agreement') {
    clauses.push({
      id: "commission_rates",
      heading: "2. Sales Commission Quotas",
      body: "Employee is eligible for a commission rate of {commission_rate_sales}% on sales. Quarterly quota targets are established at {target_quota}.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'bonus-agreement') {
    clauses.push({
      id: "bonus_details",
      heading: "2. Performance Milestones",
      body: "Employee is eligible for a target bonus of {target_bonus} contingent on reaching corporate or individual KPI milestone: {kpi_target}.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'car-allowance-agreement') {
    clauses.push({
      id: "car_allowance_details",
      heading: "2. Vehicle Allowance Stipends",
      body: "Company shall supply a monthly car allowance of {monthly_allowance}. Employee agrees to carry vehicle liability insurance of at least {min_insurance}.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'expense-reimbursement-policy') {
    clauses.push({
      id: "expense_caps",
      heading: "2. Daily Expense Caps",
      body: "Employee shall be reimbursed for valid business expenses. Daily meal and travel cost limits are capped at {daily_meal_cap}.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'relocation-assistance-agreement') {
    clauses.push({
      id: "relocation_clawback",
      heading: "2. Relocation Budget and Clawbacks",
      body: "Company shall pay relocation expenses up to {relocation_cap}. If Employee resigns within {retention_months} months, they must repay moving stipends in full.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'sign-on-bonus-clawback') {
    clauses.push({
      id: "signon_bonus_repayment",
      heading: "2. Clawback Timelines",
      body: "Employee receives a sign-on bonus of {sign_on_bonus_amount}. If Employee resigns or is terminated with cause before completing {required_service_months} months, the bonus must be repaid.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'deferred-compensation-agreement') {
    clauses.push({
      id: "deferred_payouts",
      heading: "2. Deferred Salary Percentage",
      body: "Employee elects to defer up to {deferral_percentage}% of salary, which shall be held in corporate accounts and paid at maturity matching Section 409A rules.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'mutual-separation-agreement') {
    clauses.push({
      id: "separation_severance",
      heading: "2. Severance Packages & Reviews",
      body: "Company shall pay Employee {severance_weeks} weeks of severance in exchange for a general release of claims. Review window is set at {review_days} days.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'redundancy-layoff-notice') {
    clauses.push({
      id: "layoff_effective_date",
      heading: "2. Effective Layoff Date",
      body: "Employee's role is redundant and employment shall terminate on {final_work_date}. Company shall pay out all accrued unused vacation.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'exit-interview-acknowledgment') {
    clauses.push({
      id: "asset_handover_details",
      heading: "2. Equipment Return Check",
      body: "Employee confirms that all company assets were returned on {handover_date} and that they will protect company secrets post-exit.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'reference-letter-template') {
    clauses.push({
      id: "reference_text",
      heading: "2. Employment Recommendation",
      body: "Company confirms that Employee served as {former_role} for {years_worked} years. We confirm their positive team contributions.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'cobra-continuation-notice') {
    clauses.push({
      id: "cobra_timeline",
      heading: "2. Health Coverage Continuation",
      body: "Employee has the right to extend health insurance coverage under COBRA. Notice window to enroll is set at {enrollment_deadline_days} days.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'non-disparagement-agreement') {
    clauses.push({
      id: "disparagement_liquidated",
      heading: "2. Negative Comment Restrictions",
      body: "Neither party shall make disparaging remarks. If either party defames or disparages the other, proven breaches carry liquidated damages of {liquidated_damages_amount}.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'whistleblower-policy-ack') {
    clauses.push({
      id: "whistleblower_hotline_info",
      heading: "2. Compliance Reporting Paths",
      body: "Employee agrees to report unethical conduct via hotline: {reporting_hotline}. Company guarantees anti-retaliation protections.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'equal-opportunity-policy') {
    clauses.push({
      id: "eeo_officer_details",
      heading: "2. EEO Compliance Officers",
      body: "Company guarantees equal opportunity. Accommodation requests or reports shall be filed with EEO Officer: {eeo_officer}.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'anti-harassment-policy') {
    clauses.push({
      id: "harassment_investigations",
      heading: "2. Harassment Incident Reviews",
      body: "Workplace harassment is prohibited. Company shall complete investigations of reports within {investigation_days} business days.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'workplace-safety-agreement') {
    clauses.push({
      id: "safety_coordinators",
      heading: "2. Workplace Safety Coordinators",
      body: "Employee agrees to follow safety instructions and wear PPE. Report safety incidents to OSHA Coordinator: {osha_rep}.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'employee-data-privacy-ack') {
    clauses.push({
      id: "privacy_frameworks",
      heading: "2. Data Privacy Regulations",
      body: "Company shall collect and protect employee data in compliance with: {privacy_framework}. Employees have rights to request data reports.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'acceptable-use-policy') {
    clauses.push({
      id: "device_monitoring",
      heading: "2. IT Device Monitoring Rights",
      body: "Employee has no expectation of privacy on company computers. System monitoring is performed by the security team: {device_auditor_team}.",
      optional: false,
      enabledByDefault: true
    });
  }

  // Standard common endings
  clauses.push(
    {
      id: "termination",
      heading: "Compliance & Dispute Resolution",
      body: "Any disputes regarding this policy, benefit calculation, or onboarding agreement shall be resolved through the Company's internal HR procedures or under the laws of the governing jurisdiction.",
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
    category: "employment",
    subcategory: t.subcategory,
    title: t.title,
    description: t.description,
    whatsCovered: t.whatsCovered || [
      "Regulatory compliance with federal and state labor standards",
      "Scope of compensation payouts or policy restrictions",
      "Confidentiality requirements for corporate software and files",
      "Standard governing law and dispute resolution details"
    ],
    whenToUse: t.whenToUse,
    jurisdictions: ["US", "UK", "CA", "AU"],
    lastReviewedAt: "2026-05-23",
    reviewerName: "Robert Vance, Esq.",
    estimatedFillMinutes: t.estimatedFillMinutes || 3,
    fields: fields,
    clauses: clauses,
    relatedTemplates: t.relatedTemplates || ["employment-contract", "independent-contractor-agreement"],
    faq: t.faq || [
      { question: "Is this agreement template binding?", answer: "Yes, once signed by both the employee and authorized company representative, it becomes part of the employment record and is contractually binding." },
      { question: "Can I customize this template?", answer: "Yes, you can add custom annexes or clauses using the online editor to match your local state requirements." }
    ],
    tags: t.tags || ["employment", "hr", "onboarding", "policy"]
  };
}

// Generate files
newTemplates.forEach((t) => {
  const formatted = makeEmploymentTemplate(t);
  const filePath = path.join(outputDir, `${formatted.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(formatted, null, 2), 'utf8');
  console.log(`Successfully wrote template: ${formatted.id}`);
});

console.log('Finished writing Employment templates!');
