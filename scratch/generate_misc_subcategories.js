const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '..', 'content', 'templates', 'miscellaneous');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 1. Update existing Miscellaneous files with appropriate subcategory
const existingFilesMapping = {
  "general-release.json": "Dispute & Resolution",
  "mutual-release.json": "Dispute & Resolution"
};

Object.entries(existingFilesMapping).forEach(([fileName, subcat]) => {
  const filePath = path.join(outputDir, fileName);
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, 'utf8');
    try {
      const parsed = JSON.parse(raw);
      parsed.subcategory = subcat;
      // Set correct title/slug references if needed, but let's keep the existing files intact
      fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2), 'utf8');
      console.log(`Updated subcategory for existing: ${fileName} -> ${subcat}`);
    } catch (e) {
      console.error(`Error updating existing file: ${fileName}`, e);
    }
  }
});

// 2. Define the 33 new templates
const newTemplates = [
  // --- Business Structures (8) ---
  {
    id: "s-corp-shareholder",
    subcategory: "Business Structures",
    title: "S-Corp Shareholder Agreement",
    description: "Agreement governing S-Corporation stock transfer restrictions, S-status preservation, and shareholder rights.",
    whenToUse: "Use this agreement for an S-Corporation to prevent shareholders from selling stock to ineligible entities (which would destroy S-Corp tax status).",
    whatsCovered: [
      "Preservation of Subchapter S tax classification",
      "Restricted stock transfers (ineligible shareholder blocks)",
      "Right of first refusal (ROFR) for corporation shares",
      "Shareholder voting agreements and board representation",
      "S-Corp dividend payout coordination for shareholder taxes"
    ],
    specificFields: [
      { id: "share_count", label: "Authorized Shares", type: "number", placeholder: "e.g. 10000", required: true, group: "Equity" },
      { id: "tax_distribution_pct", label: "Tax Distribution Percentage (%)", type: "text", placeholder: "e.g. 40.00", required: true, group: "Taxes" }
    ],
    tags: ["s-corp", "shareholder", "stock", "tax-status", "corporate"]
  },
  {
    id: "c-corp-shareholder",
    subcategory: "Business Structures",
    title: "C-Corp Shareholder Agreement",
    description: "Governs C-Corporation shares, investor voting rights, board compositions, and drag-along / tag-along privileges.",
    whenToUse: "Use this shareholder agreement when establishing a standard C-Corporation with venture investors or multiple founders.",
    whatsCovered: [
      "Board of directors election allocations",
      "Preemptive rights for future capital raises",
      "Drag-along and tag-along stock sale rights",
      "Information rights and corporate audit access",
      "Share vesting schedules and founder departures"
    ],
    specificFields: [
      { id: "board_seats", label: "Total Board Seats", type: "number", placeholder: "e.g. 5", required: true, group: "Governance" }
    ],
    tags: ["c-corp", "shareholder", "investor", "drag-along", "corporate"]
  },
  {
    id: "series-llc-operating",
    subcategory: "Business Structures",
    title: "Series LLC Operating Agreement",
    description: "Operating agreement establishing parent Series LLC structure, separating assets and liabilities between independent cells.",
    whenToUse: "Use this Series LLC agreement (e.g. in Delaware, Texas, Wyoming) to hold multiple distinct properties or businesses under separate liability cells.",
    whatsCovered: [
      "Establishment of separate series cell networks",
      "Liability segregation: cell assets are protected from other cell debts",
      "Manager allocation for parent LLC and individual series",
      "Capital contributions and profit splits per series",
      "Creation procedure for adding new series cells"
    ],
    specificFields: [
      { id: "initial_series_name", label: "First Series Cell Name", type: "text", placeholder: "e.g. Series A - 123 Main St Property", required: true, group: "Series Setup" }
    ],
    tags: ["series-llc", "operating-agreement", "asset-protection", "real-estate", "corporate"]
  },
  {
    id: "pllc-operating",
    subcategory: "Business Structures",
    title: "Professional LLC (PLLC) Agreement",
    description: "Operating agreement for licensed professionals (doctors, lawyers, CPAs) complying with state professional licensing boards.",
    whenToUse: "Use this PLLC operating agreement when forming an LLC for licensed practices where members must hold specific state licenses.",
    whatsCovered: [
      "Licensing criteria for all PLLC members",
      "Compliance with state professional licensing board bylaws",
      "Restrictions on transferring ownership to unlicensed individuals",
      "Malpractice insurance guidelines",
      "Procedures if a member's state license is suspended or revoked"
    ],
    specificFields: [
      { id: "professional_service_type", label: "Licensed Professional Service", type: "text", placeholder: "e.g. Licensed Medical Practice / Legal Services", required: true, group: "Practice Details" },
      { id: "licensing_board", label: "State Licensing Board", type: "text", placeholder: "e.g. California State Medical Board", required: true, group: "Compliance" }
    ],
    tags: ["pllc", "professional", "doctor", "lawyer", "operating-agreement"]
  },
  {
    id: "sole-proprietor-dba",
    subcategory: "Business Structures",
    title: "Sole Proprietor DBA Agreement",
    description: "Agreement establishing sole proprietor business guidelines, DBA registrations, and liability separation statements.",
    whenToUse: "Use this contract when operating as an unregistered sole proprietor under a Doing Business As (DBA) trade name.",
    whatsCovered: [
      "DBA registration declarations and county locations",
      "Ownership of trade names, logos, and digital domains",
      "Separation of business banking and personal accounting files",
      "Acknowledgment of unlimited personal liability of owner",
      "Tax filing designations (Schedule C / Form 1040)"
    ],
    specificFields: [
      { id: "dba_trade_name", label: "DBA / Trade Name", type: "text", placeholder: "e.g. Horizon Consulting Services", required: true, group: "DBA Details" }
    ],
    tags: ["dba", "sole-proprietor", "trade-name", "startup", "corporate"]
  },
  {
    id: "nonprofit-bylaws",
    subcategory: "Business Structures",
    title: "Nonprofit Bylaws",
    description: "Governance bylaws for 501(c)(3) tax-exempt nonprofit organizations, outlining board roles, committees, and compliance.",
    whenToUse: "Use this bylaws template when incorporating a charitable nonprofit, establishing IRS-compliant conflict-of-interest policies.",
    whatsCovered: [
      "Tax-exempt nonprofit purpose statement (501c3 guidelines)",
      "Board of directors size, election terms, and meeting frequencies",
      "Officer duties (President, Secretary, Treasurer roles)",
      "IRS conflict of interest policy provisions",
      "Dissolution clause: transferring assets to other charities upon closing"
    ],
    specificFields: [
      { id: "nonprofit_purpose", label: "Charitable Purpose Summary", type: "textarea", placeholder: "Describe the educational, charitable, or scientific mission of the nonprofit...", required: true, group: "Mission" },
      { id: "board_quorum", label: "Board Quorum Requirement (%)", type: "number", placeholder: "e.g. 51", required: true, group: "Governance" }
    ],
    tags: ["nonprofit", "bylaws", "501c3", "board", "charity"]
  },
  {
    id: "hoa-bylaws",
    subcategory: "Business Structures",
    title: "HOA Bylaws",
    description: "Homeowners Association bylaws defining board elections, dues collection, and common area maintenance rules.",
    whenToUse: "Use this HOA bylaws template to establish or update the governance framework for a residential neighborhood or condo association.",
    whatsCovered: [
      "HOA board of directors voting, meetings, and term limits",
      "Annual dues assessments, collection schedules, and lien options",
      "Common area maintenance, landscaping, and safety tasks",
      "Architectural control committee review processes",
      "Fines and penalty structures for neighborhood violations"
    ],
    specificFields: [
      { id: "hoa_dues_cycle", label: "HOA Assessment Cycle", type: "select", options: ["Monthly", "Quarterly", "Annually"], defaultValue: "Annually", required: true, group: "Finance" },
      { id: "community_name", label: "Residential Community Name", type: "text", placeholder: "e.g. Whispering Pines Subdivision", required: true, group: "Community" }
    ],
    tags: ["hoa", "bylaws", "condo", "property", "neighborhood"]
  },
  {
    id: "church-bylaws",
    subcategory: "Business Structures",
    title: "Church / Religious Bylaws",
    description: "Bylaws governing religious organizations, defining elder boards, pastor hiring, and ecclesiastical disputes.",
    whenToUse: "Use this bylaws template to incorporate a church, synagogue, mosque, or other religious organization, conforming to religious exemption laws.",
    whatsCovered: [
      "Religious statement of faith and organization mission",
      "Ecclesiastical board governance (elders, vestry, or trustees)",
      "Pastor/Clergy appointment, compensation, and removal paths",
      "Membership criteria, rights, and congregation votes",
      "Religious dispute resolution (forbidding external secular lawsuits)"
    ],
    specificFields: [
      { id: "statement_of_faith_ref", label: "Statement of Faith Annex Name", type: "text", placeholder: "e.g. Exhibit A: Apostles Creed / Core Beliefs", required: true, group: "Mission" }
    ],
    tags: ["church", "religious", "bylaws", "nonprofit", "faith"]
  },

  // --- Personal Legal (8) ---
  {
    id: "cohabitation-agreement",
    subcategory: "Personal Legal",
    title: "Cohabitation Agreement",
    description: "Agreement for unmarried couples living together, separating individual assets from shared household items.",
    whenToUse: "Use this cohabitation contract before moving in with a partner to define how rent, bills, and property divisions are handled if the relationship ends.",
    whatsCovered: [
      "Division of lease or mortgage payments",
      "Separate ownership of pre-existing bank balances and assets",
      "Joint bank account setup and monthly contribution targets",
      "Division of household items bought during cohabitation",
      "Waiver of palimony or post-separation financial claims"
    ],
    specificFields: [
      { id: "joint_expense_split", label: "Household Expense Split (Party A% / Party B%)", type: "text", placeholder: "e.g. 50% / 50%", required: true, group: "Finances" }
    ],
    tags: ["cohabitation", "unmarried", "property-split", "family", "personal"]
  },
  {
    id: "prenuptial-agreement",
    subcategory: "Personal Legal",
    title: "Prenuptial Agreement (Simple)",
    description: "Premarital agreement specifying asset division, debt separation, and waiver of alimony in the event of divorce.",
    whenToUse: "Use this prenuptial agreement before marriage to protect pre-existing inheritances, family businesses, or real estate assets.",
    whatsCovered: [
      "Retention of premarital separate assets and cash balances",
      "Protection from partner's pre-existing credit/loan debts",
      "Limitation or waiver of spousal support (alimony)",
      "Inheritance rights for children from prior marriages",
      "Requirement to disclose all financial assets before execution"
    ],
    specificFields: [
      { id: "disclosure_date", label: "Financial Disclosure Date", type: "date", required: true, group: "Disclosures" }
    ],
    tags: ["prenup", "marriage", "divorce", "alimony", "personal"]
  },
  {
    id: "postnuptial-agreement",
    subcategory: "Personal Legal",
    title: "Postnuptial Agreement (Simple)",
    description: "Agreement executed after marriage, defining asset separation and marital property allocations.",
    whenToUse: "Use this postnuptial agreement to clarify asset ownership or split business holdings during marriage, prior to any separation.",
    whatsCovered: [
      "Redefining joint marital assets as separate property",
      "Allocation of debts accumulated during the marriage",
      "Provisions for estate planning and wills",
      "Alimony limitation or waiver agreements",
      "Affirmation that the agreement is signed voluntarily"
    ],
    specificFields: [
      { id: "marriage_date", label: "Marriage Date", type: "date", required: true, group: "Marital Info" }
    ],
    tags: ["postnup", "marriage", "asset-division", "alimony", "personal"]
  },
  {
    id: "child-support-private",
    subcategory: "Personal Legal",
    title: "Child Support Agreement (Private)",
    description: "Private settlement between parents specifying monthly child support amounts and health expense allocations.",
    whenToUse: "Use this private agreement to document child support payments without going through court systems (subject to court approval).",
    whatsCovered: [
      "Monthly base child support cash details",
      "Direct payment of school tuition and childcare costs",
      "Health insurance premium coverage allocations",
      "Extraordinary medical expense splits",
      "Periodic payment review cycles based on income changes"
    ],
    specificFields: [
      { id: "monthly_support_cash", label: "Monthly Base Child Support ($)", type: "currency", placeholder: "e.g. 800.00", required: true, group: "Payments" },
      { id: "children_names", label: "Children Names & Ages", type: "text", placeholder: "e.g. Tommy (6) and Billy (4)", required: true, group: "Family" }
    ],
    tags: ["child-support", "parenting", "family", "payments", "personal"]
  },
  {
    id: "pet-custody-agreement",
    subcategory: "Personal Legal",
    title: "Pet Custody Agreement",
    description: "Cohabitation or post-breakup agreement detailing pet visitation schedules, veterinary splits, and custody rights.",
    whenToUse: "Use this contract to coordinate custody and veterinary costs for a shared pet if partners separate.",
    whatsCovered: [
      "Primary physical custody and ownership designation",
      "Visitation schedules and holiday handoffs",
      "Split of veterinary invoices and surgical costs",
      "Daily care, food, and boarding cost allocations",
      "Procedures if one partner must relocate"
    ],
    specificFields: [
      { id: "pet_name", label: "Pet Name & Breed", type: "text", placeholder: "e.g. Winston (Golden Retriever)", required: true, group: "Pet Info" },
      { id: "vet_cost_split", label: "Vet Bill Split (Party A% / Party B%)", type: "text", placeholder: "e.g. 50% / 50%", required: true, group: "Finances" }
    ],
    tags: ["pet", "custody", "visitation", "veterinary", "personal"]
  },
  {
    id: "debt-settlement-agreement",
    subcategory: "Personal Legal",
    title: "Debt Settlement Agreement",
    description: "Settlement agreement releasing a debtor from their obligation in exchange for a flat discount payment.",
    whenToUse: "Use this settlement agreement when settling a personal or business debt for a discount cash payment.",
    whatsCovered: [
      "Total outstanding debt validation",
      "Settlement payment size and installment timelines",
      "Direct release of further collection actions",
      "Agreement to update credit reporting files to 'Paid in Full'",
      "Confidentiality of the settlement terms"
    ],
    specificFields: [
      { id: "debt_settlement_cash", label: "Settlement Payment ($)", type: "currency", placeholder: "e.g. 5,000.00", required: true, group: "Settlement" },
      { id: "original_debt", label: "Original Outstanding Debt ($)", type: "currency", placeholder: "e.g. 12,000.00", required: true, group: "Debt Details" }
    ],
    tags: ["debt", "settlement", "collection", "repayment", "personal"]
  },
  {
    id: "gift-letter-financial",
    subcategory: "Personal Legal",
    title: "Financial Gift Letter",
    description: "Declaration confirming that transferred cash is a financial gift, not a loan, often required for home mortgage loans.",
    whenToUse: "Use this gift letter to certify to bank underwriters that down-payment cash provided by family is a gift and does not need to be repaid.",
    whatsCovered: [
      "Total gift cash value and date of transfer",
      "Declaration that no repayment is expected or required",
      "Source of funds and relationship of donor to receiver",
      "Mortgage underwriting compliance text",
      "Donor address and signature verification"
    ],
    specificFields: [
      { id: "gift_amount", label: "Gift Cash Value ($)", type: "currency", placeholder: "e.g. 20,000.00", required: true, group: "Gift Details" },
      { id: "donor_relationship", label: "Donor Relationship", type: "text", placeholder: "e.g. Mother / Father", required: true, group: "Donor Details" }
    ],
    tags: ["gift-letter", "mortgage", "bank", "family", "personal"]
  },
  {
    id: "personal-loan-agreement",
    subcategory: "Personal Legal",
    title: "Personal Loan Agreement",
    description: "Loan agreement for friends and family, containing interest rate settings, monthly payments, and default terms.",
    whenToUse: "Use this loan agreement to document a personal loan between friends or family members, ensuring clear repayment paths.",
    whatsCovered: [
      "Loan principal size and date of transfer",
      "Interest rate calculation (annual percentage rate - APR)",
      "Monthly or weekly repayment schedules",
      "Late payment penalties and grace periods",
      "Acceleration of balance due upon default"
    ],
    specificFields: [
      { id: "loan_principal", label: "Loan Principal ($)", type: "currency", placeholder: "e.g. 10,000.00", required: true, group: "Loan Details" },
      { id: "apr_interest", label: "Annual Interest Rate (%)", type: "text", placeholder: "e.g. 4.00", required: true, group: "Loan Details" }
    ],
    tags: ["loan", "family", "friend", "repayment", "personal"]
  },

  // --- IP & Digital (7) ---
  {
    id: "trademark-assignment",
    subcategory: "IP & Digital",
    title: "Trademark Assignment Agreement",
    description: "Agreement transferring registered trademarks, logos, and associated goodwill to a new owner.",
    whenToUse: "Use this trademark assignment to officially transfer brand rights to a corporate buyer or parent company.",
    whatsCovered: [
      "List of registered trademark names and serial numbers",
      "Assignment of brand goodwill to new owner",
      "Transfer fee / purchase price details",
      "Seller representation that the trademark is active and unencumbered",
      "Filing authorization with the USPTO"
    ],
    specificFields: [
      { id: "trademark_reg_number", label: "Trademark Registration Number", type: "text", placeholder: "e.g. Reg. No. 4,567,890", required: true, group: "Trademark Details" }
    ],
    tags: ["trademark", "uspto", "ip-transfer", "logo", "branding"]
  },
  {
    id: "patent-license",
    subcategory: "IP & Digital",
    title: "Patent License Agreement",
    description: "Patent license contract establishing royalty splits, territorial limits, and patent defense rights.",
    whenToUse: "Use this patent license contract when permitting another business to manufacture your patented hardware or use your patented methods.",
    whatsCovered: [
      "Patent description and registration numbers",
      "License type: exclusive, non-exclusive, or co-exclusive",
      "Royalty fees percentage and minimum annual sales caps",
      "Territorial restrictions (countries where licensee can sell)",
      "Responsibility for defending patents from infringers"
    ],
    specificFields: [
      { id: "patent_number", label: "Patent Registration Number", type: "text", placeholder: "e.g. Patent No. US 9,876,543 B2", required: true, group: "Patent Details" },
      { id: "license_type_select", label: "License Exclusivity", type: "select", options: ["Exclusive License", "Non-Exclusive License"], defaultValue: "Non-Exclusive License", required: true, group: "Licensing" }
    ],
    tags: ["patent", "license", "royalties", "ip", "patent-office"]
  },
  {
    id: "trade-secret-protection",
    subcategory: "IP & Digital",
    title: "Trade Secret Protection Agreement",
    description: "Agreement establishing protection protocols and strict access controls for corporate formulas, source codes, and algorithms.",
    whenToUse: "Use this agreement to bind advisors, partners, or developers to strict trade secrecy protections regarding core tech.",
    whatsCovered: [
      "Definition of trade secrets (formulas, source codes, database models)",
      "Strict physical and digital access controls",
      "Ban on exporting or caching files on private devices",
      "Survival of secrecy: trade secret duties do not expire",
      "Injunctive relief and financial damages for leaks"
    ],
    specificFields: [
      { id: "trade_secret_topic", label: "Trade Secret Category", type: "text", placeholder: "e.g. Proprietary Machine Learning Algorithms", required: true, group: "Scope" }
    ],
    tags: ["trade-secret", "formula", "ip", "secrecy", "injunction"]
  },
  {
    id: "domain-name-transfer",
    subcategory: "IP & Digital",
    title: "Domain Name Transfer Agreement",
    description: "Agreement transferring domain name ownership, registrar credentials, and associated branding.",
    whenToUse: "Use this contract when selling or buying high-value internet domains, securing domain transfer codes (EPP keys).",
    whatsCovered: [
      "Domain URL names and registrar details",
      "Purchase price and escrow transaction structures",
      "Delivery of domain authorization EPP codes",
      "Representations that domain has no active UDRP disputes",
      "Transition of email records and host names"
    ],
    specificFields: [
      { id: "domain_url", label: "Domain Name (URL)", type: "text", placeholder: "e.g. cyberflow.com", required: true, group: "Domain Details" },
      { id: "domain_price", label: "Domain Purchase Price ($)", type: "currency", placeholder: "e.g. 5,000.00", required: true, group: "Billing" }
    ],
    tags: ["domain", "url", "escrow", "registrar", "epp-key"]
  },
  {
    id: "social-media-transfer",
    subcategory: "IP & Digital",
    title: "Social Media Account Transfer",
    description: "Agreement transferring ownership and login credentials of Facebook, Instagram, X, or YouTube accounts.",
    whenToUse: "Use this contract when buying an online influencer account, brand page, or community channel, protecting account transition steps.",
    whatsCovered: [
      "Listing of handle names, followers, and social networks",
      "Delivery of admin logins and email resets",
      "Prohibition on seller attempting to recover account using security codes",
      "Purchase price details and escrow structures",
      "Transfer of associated sponsorships and advertising accounts"
    ],
    specificFields: [
      { id: "social_handles", label: "Social Media Handles & Networks", type: "text", placeholder: "e.g. @cyberflow (Instagram) and YouTube.com/c/CyberFlow", required: true, group: "Accounts" }
    ],
    tags: ["socialmedia", "influencer", "instagram", "youtube", "account-transfer"]
  },
  {
    id: "dmca-policy",
    subcategory: "IP & Digital",
    title: "DMCA Policy Template",
    description: "Digital Millennium Copyright Act policy, establishing website copyright notice paths and takedown rules.",
    whenToUse: "Use this legal page on your website or app platform to qualify for DMCA safe harbor protections against user copyright violations.",
    whatsCovered: [
      "Copyright infringement notice reporting requirements",
      "Designated DMCA agent contact coordinates",
      "Required elements of a valid takedown notice",
      "Counter-notice procedures for wrongly flagged users",
      "Repeat infringer policy (banning repeat violators)"
    ],
    specificFields: [
      { id: "dmca_agent_name", label: "Designated DMCA Agent Name", type: "text", placeholder: "e.g. Legal Dept - DMCA Agent", required: true, group: "Agent Info" },
      { id: "dmca_email", label: "Designated DMCA Email", type: "text", placeholder: "e.g. dmca@cyberflow.com", required: true, group: "Agent Info" }
    ],
    tags: ["dmca", "copyright", "takedown", "website-terms", "compliance"]
  },
  {
    id: "open-source-acknowledgment",
    subcategory: "IP & Digital",
    title: "Open-Source Acknowledgment",
    description: "Onboarding acknowledgment form ensuring developers comply with GPL, MIT, and Apache licenses, preventing copyleft contamination.",
    whenToUse: "Use this developer compliance form to forbid employees from compiling copyleft code (GPL) into proprietary products.",
    whatsCovered: [
      "Approved open-source licenses list (MIT, Apache, BSD)",
      "Prohibition on using copyleft licenses (GPL/AGPL) without review",
      "Procedure for documenting software library credits",
      "Developer compliance training requirements",
      "Auditing of codebases using dependency trackers"
    ],
    specificFields: [
      { id: "compliance_audit_team", label: "Compliance Audit Division", type: "text", placeholder: "e.g. Software Architecture Review Board", required: true, group: "Compliance" }
    ],
    tags: ["open-source", "copyleft", "gpl", "mit-license", "compliance"]
  },

  // --- Dispute & Resolution (4 of 6: 2 already exist) ---
  {
    id: "mediation-agreement",
    subcategory: "Dispute & Resolution",
    title: "Mediation Agreement",
    description: "Agreement to submit an ongoing dispute to mediation, establishing mediator neutrality and confidentiality.",
    whenToUse: "Use this mediation contract before starting mediation sessions to ensure all disclosures remain strictly inadmissible in court.",
    whatsCovered: [
      "Appointment of mediator and session schedules",
      "Mediator neutrality: mediator cannot act as counsel for either party",
      "Strict confidentiality: mediation files are inadmissible in lawsuits",
      "Split of mediator retainer and facility fees",
      "Procedure for drafting binding settlement agreements"
    ],
    specificFields: [
      { id: "mediator_name", label: "Appointed Mediator Name", type: "text", placeholder: "e.g. Hon. Arthur Pendelton (Ret.)", required: true, group: "Mediation Details" },
      { id: "mediator_fee_split", label: "Fee Split (Party A% / Party B%)", type: "text", placeholder: "e.g. 50% / 50%", required: true, group: "Billing" }
    ],
    tags: ["mediation", "dispute", "settlement", "confidentiality", "arbitration"]
  },
  {
    id: "arbitration-agreement",
    subcategory: "Dispute & Resolution",
    title: "Arbitration Agreement",
    description: "Agreement to resolve disputes through binding arbitration, waiving rights to court trials and jury reviews.",
    whenToUse: "Use this arbitration contract to settle a commercial conflict privately, bypassing public court systems.",
    whatsCovered: [
      "Waiver of right to jury trial and class action lawsuits",
      "Arbitration rules framework selection (AAA, JAMS, ICC)",
      "Number of arbitrators and selection processes",
      "Location and venue of the arbitration hearings",
      "Finality of arbitrator's decision (binding nature)"
    ],
    specificFields: [
      { id: "arbitration_rules", label: "Arbitration Agency & Rules", type: "select", options: ["AAA (American Arbitration Association)", "JAMS Rules", "ICC Rules (International)"], defaultValue: "AAA (American Arbitration Association)", required: true, group: "Legal Settings" },
      { id: "arbitration_location", label: "Arbitration Venue Location", type: "text", placeholder: "e.g. New York County, New York", required: true, group: "Legal Settings" }
    ],
    tags: ["arbitration", "jams", "aaa", "dispute", "litigation"]
  },
  {
    id: "cease-and-desist",
    subcategory: "Dispute & Resolution",
    title: "Cease and Desist Letter",
    description: "Formal legal letter demanding a party halt infringing activities, defamation, or breach of contract.",
    whenToUse: "Use this letter template to warn individuals to stop trademark infringement, harassment, or copying your website code.",
    whatsCovered: [
      "Detailed description of infringing activities or breaches",
      "Legal citations supporting the sender's rights",
      "Demand to immediately stop activities and destroy copies",
      "Response deadline (typically 7-14 days)",
      "Declaration of intent to sue if demands are ignored"
    ],
    specificFields: [
      { id: "infringement_activity", label: "Description of Violation", type: "text", placeholder: "e.g. Copying layout design and logo of our website", required: true, group: "Violation Details" },
      { id: "response_deadline_days", label: "Response Window (Days)", type: "number", placeholder: "e.g. 10", required: true, group: "Timeline" }
    ],
    tags: ["cease-desist", "notice", "infringement", "lawsuit-warning", "litigation"]
  },
  {
    id: "demand-letter",
    subcategory: "Dispute & Resolution",
    title: "Demand Letter",
    description: "Official demand letter for unpaid invoice settlements, outlining overdue debts and warning of collections.",
    whenToUse: "Use this demand letter to formally request payment for overdue invoices before sending accounts to collection firms.",
    whatsCovered: [
      "Itemized statement of unpaid invoices and interest",
      "Description of services performed and client acceptance",
      "Deadline for payment to avoid legal action",
      "Methods of paying the outstanding balance",
      "Warning of credit reporting impact and collections referral"
    ],
    specificFields: [
      { id: "overdue_balance", label: "Overdue Balance Owed ($)", type: "currency", placeholder: "e.g. 15,200.00", required: true, group: "Financial" },
      { id: "payment_deadline_date", label: "Payment Deadline Date", type: "date", required: true, group: "Timeline" }
    ],
    tags: ["demand", "payment", "collections", "overdue", "billing"]
  },

  // --- Events & Activities (6) ---
  {
    id: "event-venue-agreement",
    subcategory: "Events & Activities",
    title: "Event Venue Agreement",
    description: "Venue rental agreement detailing booking fees, security deposits, safety rules, and cancellation terms.",
    whenToUse: "Use this venue lease contract when renting a hall, conference room, or hotel event space for corporate parties or wedding events.",
    whatsCovered: [
      "Rental dates, load-in hours, and load-out hours",
      "Booking fee retainer, deposit amounts, and cleanup rules",
      "Cancellation refund schedules (forfeiture windows)",
      "Maximum occupancy restrictions and security guidelines",
      "Liability insurance requirements for the event host"
    ],
    specificFields: [
      { id: "venue_rental_fee", label: "Venue Rental Fee ($)", type: "currency", placeholder: "e.g. 3,500.00", required: true, group: "Fees" },
      { id: "event_date", label: "Scheduled Event Date", type: "date", required: true, group: "Event Details" }
    ],
    tags: ["venue", "event", "rental", "lease", "booking"]
  },
  {
    id: "photography-video-release",
    subcategory: "Events & Activities",
    title: "Photography & Video Release",
    description: "Release permitting event hosts to photograph and record participants, using media for commercial advertising.",
    whenToUse: "Use this media release form at conferences, workshops, or video shoots to obtain permission to use attendee recordings in marketing.",
    whatsCovered: [
      "Consent to be photographed and recorded on video",
      "Irrevocable grant to publish media for promotional advertising",
      "Waiver of compensation or royalty rights for media use",
      "Release of photographer/videographer from defamation claims",
      "Applicability to minor children (with parent consent)"
    ],
    specificFields: [
      { id: "event_name_release", label: "Event Name", type: "text", placeholder: "e.g. Annual Tech Summit 2026", required: true, group: "Event Details" }
    ],
    tags: ["photo-release", "video", "marketing", "media", "event"]
  },
  {
    id: "participant-waiver-release",
    subcategory: "Events & Activities",
    title: "Participant Waiver & Release",
    description: "Liability waiver releasing organizers from injury claims during events, sports, or physical activities.",
    whenToUse: "Use this liability waiver for gyms, events, or workshops to protect organizers from customer injury lawsuits.",
    whatsCovered: [
      "Assumption of risk for physical and outdoor activities",
      "Release of organizers from claims of general negligence",
      "Agreement not to sue the event hosts for injury or loss",
      "Emergency medical treatment authorizations",
      "Signer certifies physical fitness to participate"
    ],
    specificFields: [
      { id: "activity_description", label: "Activity / Sport Description", type: "text", placeholder: "e.g. Outdoor Rock Climbing and Hiking Course", required: true, group: "Activity" }
    ],
    tags: ["waiver", "liability-release", "injury", "fitness", "event"]
  },
  {
    id: "sponsorship-agreement",
    subcategory: "Events & Activities",
    title: "Event Sponsorship Agreement",
    description: "Sponsorship contract specifying sponsor logo placements, banner sizes, fees, and ticketing allocations.",
    whenToUse: "Use this contract when booking corporate sponsors for festivals, tech conferences, or community sporting events.",
    whatsCovered: [
      "Sponsor payment amounts and payout schedules",
      "Logo placements on site banners, emails, and folders",
      "Number of complimentary entry tickets for sponsor staff",
      "Cancellation rules (options if event is postponed)",
      "Exclusive vendor categories (protecting sponsor from competitors)"
    ],
    specificFields: [
      { id: "sponsorship_fee", label: "Sponsorship Funding ($)", type: "currency", placeholder: "e.g. 10,000.00", required: true, group: "Fees" },
      { id: "sponsor_tier", label: "Sponsorship Tier", type: "select", options: ["Platinum", "Gold", "Silver", "Bronze"], defaultValue: "Gold", required: true, group: "Tier Details" }
    ],
    tags: ["sponsorship", "sponsor", "logo", "advertising", "event"]
  },
  {
    id: "volunteer-waiver",
    subcategory: "Events & Activities",
    title: "Volunteer Waiver & Release",
    description: "Waiver form for volunteer support, clarifying lack of compensation and releasing organizers from liability.",
    whenToUse: "Use this waiver when bringing volunteers to support charity drives, public events, or construction builds.",
    whatsCovered: [
      "Waiver of salary, benefits, and worker compensation rights",
      "Assumption of safety risks during volunteer work",
      "Release of organization from general negligence claims",
      "Use of volunteer photos in marketing materials",
      "Volunteer agreement to follow safety coordinator instructions"
    ],
    specificFields: [
      { id: "organization_name", label: "Charity / Organization Name", type: "text", placeholder: "e.g. City Food Bank Foundation", required: true, group: "Organization" }
    ],
    tags: ["volunteer", "waiver", "charity", "liability", "onboarding"]
  },
  {
    id: "minor-activity-consent",
    subcategory: "Events & Activities",
    title: "Minor Activity Consent Form",
    description: "Parental consent and medical release form authorizing minors to participate in field trips, events, or classes.",
    whenToUse: "Use this consent form for children under 18 participating in camps, field trips, or minor athletic programs.",
    whatsCovered: [
      "Parental consent for minor to participate in activities",
      "Medical authorization for emergency hospital visits",
      "Waiver of minor injury liability claims",
      "Emergency contact phone numbers and allergy logs",
      "Responsibility for transportation costs"
    ],
    specificFields: [
      { id: "minor_name", label: "Child / Minor Full Name", type: "text", placeholder: "e.g. John Watson Jr.", required: true, group: "Minor Info" },
      { id: "parent_name", label: "Parent / Guardian Name", type: "text", placeholder: "e.g. Mary Watson", required: true, group: "Parent Info" }
    ],
    tags: ["minor", "child", "consent", "parental-permission", "medical-release"]
  }
];

// Helper to format a single template object
function makeMiscTemplate(t) {
  let fields = [];
  let clauses = [];

  // standard fields for miscellaneous
  fields = [
    { id: "party_a_name", label: "First Party Name", type: "text", placeholder: "e.g. John Doe", required: true, group: "First Party" },
    { id: "party_a_address", label: "First Party Address", type: "text", placeholder: "e.g. 101 Pine St, Seattle, WA", required: true, group: "First Party" },
    { id: "party_b_name", label: "Second Party Name", type: "text", placeholder: "e.g. Jane Smith", required: true, group: "Second Party" },
    { id: "party_b_address", label: "Second Party Address", type: "text", placeholder: "e.g. 202 Maple Ave, Portland, OR", required: true, group: "Second Party" },
    ...(t.specificFields || []),
    { id: "effective_date", label: "Effective Date", type: "date", required: true, group: "Key Dates" },
    { id: "governing_state", label: "Governing Jurisdiction", type: "text", placeholder: "e.g. Washington", required: true, group: "Legal Settings" }
  ];

  // generate clauses
  clauses = [
    {
      id: "intro",
      heading: t.title.toUpperCase(),
      body: `This agreement or policy (the "Agreement") is executed as of {effective_date} (the "Effective Date"), by and between {party_a_name}, residing/located at {party_a_address} ("First Party"), and {party_b_name}, residing/located at {party_b_address} ("Second Party").`,
      optional: false,
      enabledByDefault: true
    },
    {
      id: "scope_misc",
      heading: "1. Core Framework",
      body: `This agreement establishes the legal rights, bylaws, transfers, waivers, or consent structures for the ${t.title}. The parties agree to adhere to the terms and declarations set out below.`,
      optional: false,
      enabledByDefault: true
    }
  ];

  // Add specific clauses based on type
  if (t.id === 's-corp-shareholder') {
    clauses.push({
      id: "scorp_tax_covenants",
      heading: "2. S-Corp Status Preservation",
      body: "Shareholders hold {share_count} stock. Shareholders agree to vote in alignment to preserve Subchapter S classification. Tax distribution rate is set at {tax_distribution_pct}%.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'c-corp-shareholder') {
    clauses.push({
      id: "ccorp_board_seats",
      heading: "2. Board Elections",
      body: "Shareholders agree to vote to establish a Board of Directors containing {board_seats} seats. Preemptive rights apply to all future rounds of funding.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'series-llc-operating') {
    clauses.push({
      id: "series_cell_definitions",
      heading: "2. Series Cell Isolation",
      body: "Company establishes a Series LLC structure. The initial liability cell is named: {initial_series_name}. Cell assets are isolated from parent liabilities.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'pllc-operating') {
    clauses.push({
      id: "pllc_licensing",
      heading: "2. State Board Licensing",
      body: "Members must maintain licenses to practice {professional_service_type} under the authority of {licensing_board}. Loss of license results in member withdrawal.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'sole-proprietor-dba') {
    clauses.push({
      id: "dba_registrations",
      heading: "2. Trade Name Usage",
      body: "Owner operates as a sole proprietor using Doing Business As (DBA) trade name: {dba_trade_name}. Owner has sole rights to trade names.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'nonprofit-bylaws') {
    clauses.push({
      id: "nonprofit_purposes",
      heading: "2. IRS 501c3 Compliance Purposes",
      body: "Nonprofit is organized for: {nonprofit_purpose}. Board quorum requirement for votes is established at {board_quorum}%. Assets transfer to charity upon dissolution.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'hoa-bylaws') {
    clauses.push({
      id: "hoa_dues",
      heading: "2. Homeowners Dues Assessments",
      body: "Homeowners in subdivision {community_name} shall pay assessments on a {hoa_dues_cycle} schedule. Overdue assessments carry lien options on the property.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'church-bylaws') {
    clauses.push({
      id: "faith_church_governance",
      heading: "2. Ecclesiastical Governance",
      body: "The church shall be governed by the elder board. The congregation adheres to core beliefs in: {statement_of_faith_ref}. Disputes shall be resolved ecclesiastically.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'cohabitation-agreement') {
    clauses.push({
      id: "cohab_finances",
      heading: "2. Shared Household Expenses",
      body: "Unmarried partners agree to share rent and food costs matching split: {joint_expense_split}. Pre-existing assets remain separate property.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'prenuptial-agreement') {
    clauses.push({
      id: "prenup_financials",
      heading: "2. Premarital Disclosures",
      body: "Both parties disclose separate assets on {disclosure_date}. Premarital property remains separate and spousal support is waived/limited in divorce.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'postnuptial-agreement') {
    clauses.push({
      id: "postnup_details",
      heading: "2. Marital Asset Redefinition",
      body: "Married partners (marriage date: {marriage_date}) agree to redefine joint marital assets as separate property to clarify estate planning.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'child-support-private') {
    clauses.push({
      id: "child_support_payments",
      heading: "2. Monthly Support Payments",
      body: "First Party shall pay monthly child support of {monthly_support_cash} for children: {children_names}. Health insurance splits shall be split equally.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'pet-custody-agreement') {
    clauses.push({
      id: "pet_custody_sharing",
      heading: "2. Pet Ownership Splits",
      body: "Ownership of pet {pet_name} is assigned to First Party. Future veterinary bills shall be shared matching split: {vet_cost_split}.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'debt-settlement-agreement') {
    clauses.push({
      id: "debt_discounts",
      heading: "2. Debt Settlement Payments",
      body: "First Party accepts a settlement payment of {debt_settlement_cash} to discharge original debt of {original_debt}. Creditor shall cease collections.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'gift-letter-financial') {
    clauses.push({
      id: "gift_letter_terms",
      heading: "2. Non-Repayment Gift Covenants",
      body: "Donor certifies downpayment cash of {gift_amount} is a financial gift to receiver (relationship: {donor_relationship}). No repayment is expected.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'personal-loan-agreement') {
    clauses.push({
      id: "personal_loan_repayment",
      heading: "2. Loan Repayments and Interest",
      body: "Lender advances principal of {loan_principal} at interest rate of {apr_interest}% APR. Borrower shall make structured monthly installments.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'trademark-assignment') {
    clauses.push({
      id: "trademark_reg",
      heading: "2. Registered Trademark Transfers",
      body: "Assignor transfers all rights, logos, and goodwill of trademark Reg No: {trademark_reg_number}. Assignee shall file transfer records with USPTO.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'patent-license') {
    clauses.push({
      id: "patent_licensing_exclusivity",
      heading: "2. Patent Exclusivity Licenses",
      body: "Patentee grants licensee a {license_type_select} for Patent: {patent_number}. Licensee shall pay royalties as outlined in the schedule.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'trade-secret-protection') {
    clauses.push({
      id: "trade_secrecy_safeguards",
      heading: "2. Secrecy Protections",
      body: "Recipient shall protect trade secrets regarding: {trade_secret_topic}. Digital copies are barred on private devices. Injunctive relief applies.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'domain-name-transfer') {
    clauses.push({
      id: "domain_epp_delivery",
      heading: "2. EPP Key Deliveries",
      body: "Seller shall sell domain {domain_url} for the purchase price of {domain_price}. Seller shall deliver registrar EPP authorization codes.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'social-media-transfer') {
    clauses.push({
      id: "social_logins_escrow",
      heading: "2. Account Admin Logins",
      body: "Seller transfers account ownership of handles: {social_handles}. Seller shall deliver admin email coordinates and waive recovery rights.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'dmca-policy') {
    clauses.push({
      id: "dmca_notices",
      heading: "2. Copyright Notice Agent",
      body: "Takedown notices must be sent to Designated Agent: {dmca_agent_name} via email: {dmca_email}. Counter-notices shall follow DMCA Safe Harbor rules.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'open-source-acknowledgment') {
    clauses.push({
      id: "copyleft_compliance",
      heading: "2. Copyleft Code Restrictions",
      body: "Developers are prohibited from using copyleft GPL code without review by: {compliance_audit_team}. All packages must follow approved lists.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'mediation-agreement') {
    clauses.push({
      id: "mediator_appointment",
      heading: "2. Mediator Retainers",
      body: "Parties appoint mediator: {mediator_name}. All mediation communication remains confidential. Mediator fees shall be shared matching split: {mediator_fee_split}.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'arbitration-agreement') {
    clauses.push({
      id: "arbitrator_rules_locations",
      heading: "2. Binding Arbitrator Rulings",
      body: "Disputes shall be submitted to binding arbitration under the rules of {arbitration_rules} in location: {arbitration_location}. Quorums are final.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'cease-and-desist') {
    clauses.push({
      id: "cease_demands",
      heading: "2. Legal Violations Takedowns",
      body: "Recipient must cease violation: {infringement_activity} within {response_deadline_days} days of notice. Failure triggers immediate litigation.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'demand-letter') {
    clauses.push({
      id: "overdue_demands",
      heading: "2. Unpaid Invoice Settlements",
      body: "Recipient must settle overdue balance of {overdue_balance} before deadline {payment_deadline_date} to avoid referral to collections.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'event-venue-agreement') {
    clauses.push({
      id: "venue_fee_timeline",
      heading: "2. Venue Rental Retainers",
      body: "Venue is rented on {event_date} for rental fee {venue_rental_fee}. Client is responsible for load-in, load-out, and cleaning costs.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'photography-video-release') {
    clauses.push({
      id: "media_releases",
      heading: "2. Photography Marketing Releases",
      body: "Participant grants event organizer right to record audio/video at event: {event_name_release} and use media in advertising.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'participant-waiver-release') {
    clauses.push({
      id: "waiver_liability",
      heading: "2. Physical Activity Negligence Releases",
      body: "Participant assumes all injury risks during activity: {activity_description}. Participant releases event hosts from negligence claims.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'sponsorship-agreement') {
    clauses.push({
      id: "sponsorship_tier_billing",
      heading: "2. Sponsorship Logo Placement",
      body: "Sponsor pays sponsorship funding of {sponsorship_fee} under tier: {sponsor_tier}. Organizer shall print logos on site banners.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'volunteer-waiver') {
    clauses.push({
      id: "volunteer_covenants",
      heading: "2. Worker Compensation Waivers",
      body: "Volunteer agrees to support {organization_name} on a voluntary unpaid basis. Volunteer waives worker compensation rights.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'minor-activity-consent') {
    clauses.push({
      id: "minor_release_treatment",
      heading: "2. Parental Consent Covenants",
      body: "Parent {parent_name} grants consent for minor child {minor_name} to participate. Parent releases organizers from injury claims.",
      optional: false,
      enabledByDefault: true
    });
  }

  // Standard common endings
  clauses.push(
    {
      id: "resolution",
      heading: "General Legal Terms",
      body: "This document constitutes the entire understanding between the parties. Any amendments must be made in writing and executed by both parties.",
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
    category: "miscellaneous",
    subcategory: t.subcategory,
    title: t.title,
    description: t.description,
    whatsCovered: t.whatsCovered || [
      "Governance bylaws, shares, and corporate setups",
      "Personal asset division and family cohabitation guidelines",
      "IP trademark or patent licensing assignments",
      "Dispute mediation, arbitration, or demand notices",
      "Waivers of injury liability or volunteer safety releases"
    ],
    whenToUse: t.whenToUse,
    jurisdictions: ["US", "UK", "CA", "AU"],
    lastReviewedAt: "2026-05-23",
    reviewerName: "Robert Vance, Esq.",
    estimatedFillMinutes: t.estimatedFillMinutes || 3,
    fields: fields,
    clauses: clauses,
    relatedTemplates: t.relatedTemplates || ["general-release", "mutual-release"],
    faq: t.faq || [
      { question: "Can I customize this legal template?", answer: "Yes, you can edit this template using the online editor, and add custom schedules or exhibits." },
      { question: "Is this agreement binding?", answer: "Yes, once signed by all parties, it becomes a legally binding contract under state laws." }
    ],
    tags: t.tags || ["miscellaneous", "legal", "personal", "corporate"]
  };
}

// Generate files
newTemplates.forEach((t) => {
  const formatted = makeMiscTemplate(t);
  const filePath = path.join(outputDir, `${formatted.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(formatted, null, 2), 'utf8');
  console.log(`Successfully wrote template: ${formatted.id}`);
});

console.log('Finished writing Miscellaneous templates!');
