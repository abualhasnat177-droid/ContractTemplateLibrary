const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '..', 'content', 'templates', 'startup');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 1. Update existing Startup files with appropriate subcategory
const existingFilesMapping = {
  "advisor-agreement.json": "Operations & Governance",
  "co-founder-agreement.json": "Operations & Governance",
  "safe-agreement.json": "Fundraising & Investment"
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
  // --- Fundraising & Investment (10) ---
  {
    id: "series-b-term-sheet",
    subcategory: "Fundraising & Investment",
    title: "Series B Term Sheet",
    description: "An outline specifying terms for a Series B preferred stock financing round, covering valuation, liquidation preferences, and board seats.",
    whenToUse: "Use this term sheet outline when negotiating a Series B equity financing round with venture capital firms or lead institutional investors.",
    whatsCovered: [
      "Series B investment size and pre-money valuation",
      "Dividend preferences and standard liquidation rights",
      "Voting agreements, protective provisions, and board seats",
      "Exclusivity period and closing transaction costs",
      "Governing law and non-binding status of the document"
    ],
    specificFields: [
      { id: "investor_name", label: "Investor Group / Lead VC", type: "text", placeholder: "e.g. Apex Venture Partners Fund II", required: true, group: "Investment Info" },
      { id: "investment_amount", label: "Investment Amount ($)", type: "currency", placeholder: "e.g. 15,000,000.00", required: true, group: "Investment Info" },
      { id: "pre_money_valuation", label: "Pre-Money Valuation ($)", type: "currency", placeholder: "e.g. 85,000,000.00", required: true, group: "Investment Info" },
      { id: "board_seats", label: "Investor Board Representative", type: "text", placeholder: "e.g. Sarah Sterling", required: true, group: "Governance" }
    ],
    tags: ["series-b", "term-sheet", "vc", "investment", "equity"],
    faq: [
      { question: "Is this term sheet legally binding?", answer: "No, except for clauses regarding confidentiality, expenses, and exclusivity, term sheets are non-binding outlines subject to final diligence." },
      { question: "What is a 1x liquidation preference?", answer: "It ensures Series B investors get their full investment back first before common shareholders receive proceeds during a liquidation event." }
    ]
  },
  {
    id: "bridge-loan-agreement",
    subcategory: "Fundraising & Investment",
    title: "Bridge Loan Agreement",
    description: "A convertible promissory note structured as a bridge loan to fund operations until a major priced equity round closes.",
    whenToUse: "Use this bridge loan agreement when securing interim funding from existing investors or angels prior to a larger Series A or B round.",
    whatsCovered: [
      "Loan principal amount and interest accumulation rules",
      "Automatic conversion terms into future priced equity",
      "Maturity date and repayment parameters",
      "Subordination of loan to primary bank lending",
      "Default terms and acceleration of loan maturity"
    ],
    specificFields: [
      { id: "lender_name", label: "Lender / Investor Name", type: "text", placeholder: "e.g. Sierra Capital LLC", required: true, group: "Lender Info" },
      { id: "loan_principal", label: "Principal Amount ($)", type: "currency", placeholder: "e.g. 500,000.00", required: true, group: "Loan Details" },
      { id: "interest_rate", label: "Interest Rate (Annual %)", type: "text", placeholder: "e.g. 6.00", required: true, group: "Loan Details" },
      { id: "maturity_date", label: "Maturity Date", type: "date", required: true, group: "Loan Details" }
    ],
    tags: ["bridgeloan", "convertible", "note", "debt", "funding"],
    faq: [
      { question: "What is a conversion discount?", answer: "It gives the bridge lender a discount (typically 10-20%) on the share price of the future priced round when their debt converts to stock." },
      { question: "What happens if maturity is reached without conversion?", answer: "The loan becomes due and payable unless the lender agrees to extend the maturity or convert into common stock." }
    ]
  },
  {
    id: "grant-agreement-startup",
    subcategory: "Fundraising & Investment",
    title: "Startup Grant Agreement",
    description: "An agreement between a grantor and a startup, outlining milestone achievements, report cycles, and funding disbursement schedules.",
    whenToUse: "Use this grant agreement when receiving non-dilutive funding from government agencies, research foundations, or corporate accelerators.",
    whatsCovered: [
      "Total grant award size and fund distribution schedules",
      "Performance milestones and progress report cycles",
      "Authorized use of grant funds (eligible expenses)",
      "Grantor audit rights and research reports",
      "Termination of grant for underperformance"
    ],
    specificFields: [
      { id: "grantor_name", label: "Grantor Entity Name", type: "text", placeholder: "e.g. Foundation for Green Tech Research", required: true, group: "Grantor Info" },
      { id: "grant_amount", label: "Grant Award Amount ($)", type: "currency", placeholder: "e.g. 150,000.00", required: true, group: "Grant Details" },
      { id: "reporting_cycle", label: "Reporting Frequency", type: "select", options: ["Monthly", "Quarterly", "Bi-Annually", "On Milestone Complete"], defaultValue: "Quarterly", required: true, group: "Reporting" },
      { id: "project_milestones", label: "Key Performance Milestone", type: "textarea", placeholder: "Describe the technical milestone required to unlock the funding...", required: true, group: "Milestones" }
    ],
    tags: ["grant", "nondilutive", "funding", "accelerator", "milestone"],
    faq: [
      { question: "Do grants dilute my equity?", answer: "No, grant agreements are non-dilutive, meaning you receive funds without giving up ownership shares or voting seats." },
      { question: "What happens if we fail to hit a milestone?", answer: "Depending on the terms, the grantor may pause future disbursements, terminate the grant, or demand return of unspent funds." }
    ]
  },
  {
    id: "crowdfunding-campaign-agreement",
    subcategory: "Fundraising & Investment",
    title: "Crowdfunding Campaign Agreement",
    description: "A promotional services agreement for managing and launching reward-based or equity crowdfunding campaigns.",
    whenToUse: "Use this agreement when hiring an agency, advisor, or marketing firm to run a Kickstarter, Indiegogo, or Wefunder campaign.",
    whatsCovered: [
      "Scope of campaign launch and promotional design services",
      "Campaign timeline, launch date, and goal requirements",
      "Service fee, retainer, and commission percentage splits",
      "Ownership of campaign video assets and email lists",
      "Indemnification for platform policy violations"
    ],
    specificFields: [
      { id: "agency_name", label: "Marketing Agency / Manager Name", type: "text", placeholder: "e.g. LaunchPad Crowdfunding Group", required: true, group: "Agency Info" },
      { id: "campaign_platform", label: "Target Platform", type: "text", placeholder: "e.g. Kickstarter", required: true, group: "Campaign Details" },
      { id: "retainer_fee", label: "Monthly Retainer Fee ($)", type: "currency", placeholder: "e.g. 3,500.00", required: true, group: "Fees" },
      { id: "commission_rate", label: "Campaign Revenue Split (%)", type: "text", placeholder: "e.g. 5.00", required: true, group: "Fees" }
    ],
    tags: ["crowdfunding", "marketing", "kickstarter", "equity", "commission"],
    faq: [
      { question: "Are platform fees included in the agency commission?", answer: "No, standard platforms (Kickstarter, Wefunder) deduct their fees (usually 5%) separately from any agency commissions." },
      { question: "Who owns the email list collected during the campaign?", answer: "This template ensures the startup owns the subscriber list and backer database post-campaign." }
    ]
  },
  {
    id: "spv-agreement",
    subcategory: "Fundraising & Investment",
    title: "SPV Participation Agreement",
    description: "An agreement for investors joining a Special Purpose Vehicle to pool capital for a single startup investment.",
    whenToUse: "Use this participation agreement when setting up or joining a syndicate SPV (e.g. AngelList syndicate) to invest in a specific target startup.",
    whatsCovered: [
      "Investor capital contribution to the SPV",
      "SPV management fees and carry distribution splits",
      "Syndicate manager authority and proxy voting rules",
      "Transfer restrictions on SPV membership units",
      "Indemnification for SPV administrators"
    ],
    specificFields: [
      { id: "spv_manager", label: "SPV Manager / Syndicate Lead", type: "text", placeholder: "e.g. Blue Lake Capital Syndicate Management LLC", required: true, group: "SPV Info" },
      { id: "spv_name", label: "SPV Entity Name", type: "text", placeholder: "e.g. Blue Lake SPV — CyberFlow Series A", required: true, group: "SPV Info" },
      { id: "contribution_amount", label: "Capital Contribution ($)", type: "currency", placeholder: "e.g. 25,000.00", required: true, group: "Investment Info" },
      { id: "carry_percentage", label: "Carried Interest Rate (%)", type: "text", placeholder: "e.g. 20.00", required: true, group: "Investment Info" }
    ],
    tags: ["spv", "syndicate", "pooling", "carry", "investor"],
    faq: [
      { question: "What is carried interest (carry)?", answer: "It is the percentage of profits (standard is 20%) paid to the SPV manager upon a successful exit of the target startup." },
      { question: "Do SPV investors get direct board seats?", answer: "No, the SPV manager represents the pooled entity, keeping the target startup's capitalization table clean." }
    ]
  },
  {
    id: "side-letter-investor",
    subcategory: "Fundraising & Investment",
    title: "Investor Side Letter Agreement",
    description: "An agreement offering special rights (like MFN, information rights, or board observation) to a major investor.",
    whenToUse: "Use this side letter when a major angel or VC investor demands custom terms that are not part of the standard Series Seed or Series A terms.",
    whatsCovered: [
      "Most Favored Nation (MFN) clause parameters",
      "Custom investor informational review deadlines",
      "Board observer invitation and audit access",
      "Vesting acceleration requirements for investor nominees",
      "Precedence over standard investor agreements"
    ],
    specificFields: [
      { id: "investor_name", label: "Investor Entity Name", type: "text", placeholder: "e.g. Vantage Point Capital Fund III", required: true, group: "Investor Info" },
      { id: "min_ownership", label: "Minimum Ownership for Rights (%)", type: "text", placeholder: "e.g. 5.00", required: true, group: "Investor Info" },
      { id: "mfn_cap", label: "MFN Valuation Cap Override ($)", type: "currency", placeholder: "e.g. 10,000,000.00", required: true, group: "MFN Clause" }
    ],
    tags: ["side-letter", "mfn", "investor", "seed", "equity"],
    faq: [
      { question: "What is a Most Favored Nation (MFN) clause?", answer: "It guarantees that if the startup issues convertible debt with better terms to later investors, those better terms automatically apply to the current investor." },
      { question: "When are side letters used?", answer: "Typically during seed rounds when lead investors want special tracking rights without drafting a brand new equity structure." }
    ]
  },
  {
    id: "pro-rata-rights-agreement",
    subcategory: "Fundraising & Investment",
    title: "Pro-Rata Rights Agreement",
    description: "Confirms an investor's right to maintain their percentage ownership in future priced funding rounds.",
    whenToUse: "Use this agreement to grant early-stage investors the contractual option to participate in future Series A, B, and C pricing rounds.",
    whatsCovered: [
      "Definition of investor pro-rata allocation options",
      "Notice timeline for new funding priced rounds",
      "Exclusions for employee stock pools and conversions",
      "Termination of rights upon IPO or acquisition",
      "Pro-rata rights assignment to affiliates"
    ],
    specificFields: [
      { id: "investor_name", label: "Investor Name", type: "text", placeholder: "e.g. Evelyn Reed Trust", required: true, group: "Investor Info" },
      { id: "notice_days", label: "Notice Period (Days)", type: "number", placeholder: "e.g. 15", required: true, group: "Notice Details" }
    ],
    tags: ["prorata", "participation", "funding", "dilution", "investor"],
    faq: [
      { question: "Why do investors want pro-rata rights?", answer: "It protects them from dilution, allowing them to purchase enough shares in later rounds to keep their ownership percentage constant." },
      { question: "When do pro-rata rights expire?", answer: "Typically, they terminate immediately prior to the closing of the company's Initial Public Offering (IPO) or a major acquisition." }
    ]
  },
  {
    id: "information-rights-agreement",
    subcategory: "Fundraising & Investment",
    title: "Information Rights Agreement",
    description: "Details corporate information disclosures (financial audits, quarterly boards) guaranteed to major equity holders.",
    whenToUse: "Use this agreement to establish the reporting schedule and audit files that the startup must supply to major investors.",
    whatsCovered: [
      "Requirement to deliver quarterly and annual financial statements",
      "Annual budget and business plan delivery timelines",
      "Investor inspection rights of facilities and corporate books",
      "Confidentiality requirements for shared financials",
      "Threshold of share ownership to qualify for rights"
    ],
    specificFields: [
      { id: "investor_name", label: "Major Investor Name", type: "text", placeholder: "e.g. Summit Ventures LP", required: true, group: "Investor Info" },
      { id: "annual_report_days", label: "Annual Report Delivery (Days)", type: "number", placeholder: "e.g. 90", required: true, group: "Reporting Timeline" },
      { id: "quarterly_report_days", label: "Quarterly Report Delivery (Days)", type: "number", placeholder: "e.g. 45", required: true, group: "Reporting Timeline" }
    ],
    tags: ["information-rights", "financials", "disclosure", "reporting", "audits"],
    faq: [
      { question: "What is a major investor threshold?", answer: "It is the minimum number of shares or percentage (e.g. 10%) an investor must hold to be legally entitled to information rights." },
      { question: "Are financial summaries confidential?", answer: "Yes, all data received under information rights is protected by strict non-disclosure obligations." }
    ]
  },
  {
    id: "board-observer-agreement",
    subcategory: "Fundraising & Investment",
    title: "Board Observer Agreement",
    description: "Grants an investor or institutional representative the right to attend board meetings as a non-voting observer.",
    whenToUse: "Use this agreement when a venture fund invests heavily and wants to sit in on board discussions without taking on director fiduciary duties.",
    whatsCovered: [
      "Observer right to receive board packages and notices",
      "Non-voting status and exclusion from executive board votes",
      "Withholding rights for attorney-client privilege files",
      "Exclusion from meetings involving competitor audits",
      "Confidentiality of board deliberations"
    ],
    specificFields: [
      { id: "observer_name", label: "Board Observer Full Name", type: "text", placeholder: "e.g. Marcus Vance", required: true, group: "Observer Info" },
      { id: "investor_firm", label: "Representing Investor Firm", type: "text", placeholder: "e.g. Vanguard Venture Fund IV", required: true, group: "Observer Info" },
      { id: "observer_scope", label: "Observer Exclusions", type: "textarea", placeholder: "Describe topics where the observer must leave the room (e.g. competitor acquisitions, salary discussions)...", required: true, group: "Exclusions" }
    ],
    tags: ["board", "observer", "governance", "nonvoting", "director"],
    faq: [
      { question: "Does a board observer vote?", answer: "No. Observers have no voting authority and are not considered directors under corporate law." },
      { question: "Can observers be excluded from meetings?", answer: "Yes. The board can exclude observers to protect attorney-client privilege or during highly sensitive competitor reviews." }
    ]
  },
  {
    id: "drag-tag-along-rights",
    subcategory: "Fundraising & Investment",
    title: "Drag-Along / Tag-Along Agreement",
    description: "Specifies co-sale tag-along protections and drag-along obligations during a corporate acquisition.",
    whenToUse: "Use this agreement within a shareholder setup to govern how minority and majority shareholders must act during a potential sale of the company.",
    whatsCovered: [
      "Drag-along obligation: minority forced to sell in major deal",
      "Tag-along protection: minority can join founder sales",
      "Calculation of share purchase prices across classes",
      "Voting agreements to approve acquisition transactions",
      "Liability limits for minority holders in sales"
    ],
    specificFields: [
      { id: "drag_percentage", label: "Drag-Along Approval Threshold (%)", type: "text", placeholder: "e.g. 51.00", required: true, group: "Thresholds" },
      { id: "tag_notice_days", label: "Co-Sale Notice Period (Days)", type: "number", placeholder: "e.g. 20", required: true, group: "Notice Details" }
    ],
    tags: ["dragalong", "tagalong", "co-sale", "acquisition", "shareholders"],
    faq: [
      { question: "What is drag-along rights?", answer: "If a majority of shareholders approve a sale, drag-along rights force the minority shareholders to sell their stock under the same terms." },
      { question: "What is tag-along rights?", answer: "If founders sell their shares, tag-along rights protect minority holders by allowing them to participate in the sale and avoid being left behind." }
    ]
  },

  // --- Equity & Compensation (8) ---
  {
    id: "phantom-equity-plan",
    subcategory: "Equity & Compensation",
    title: "Phantom Equity Plan",
    description: "Sets up cash bonus tracking units that mimic stock price performance, offering upside without issuing actual voting shares.",
    whenToUse: "Use this phantom stock agreement to incentivize key employees without diluting capital or granting voting power in your startup or LLC.",
    whatsCovered: [
      "Phantom stock unit awards and value calculations",
      "Vesting schedules matching standard option schedules",
      "Payout events (acquisition, IPO, scheduled maturity)",
      "Exclusion of voting or shareholder governance rights",
      "Tax treatment of cash distributions (W2 income)"
    ],
    specificFields: [
      { id: "employee_name", label: "Employee Name", type: "text", placeholder: "e.g. Jacob Wright", required: true, group: "Employee Info" },
      { id: "phantom_units", label: "Phantom Stock Units Awarded", type: "number", placeholder: "e.g. 10000", required: true, group: "Award Details" },
      { id: "vesting_years", label: "Vesting Period (Years)", type: "select", options: ["1", "2", "3", "4"], defaultValue: "4", required: true, group: "Award Details" }
    ],
    tags: ["phantom", "equity", "bonus", "compensation", "incentive"],
    faq: [
      { question: "What is phantom stock?", answer: "It is a contractual agreement that gives the employee the right to receive cash equal to the value of a specific number of shares, without owning stock." },
      { question: "Is phantom stock taxed on grant?", answer: "No. Unlike options or restricted stock, phantom units are only taxed as ordinary income when the cash payment is actually distributed." }
    ]
  },
  {
    id: "profit-interest-agreement",
    subcategory: "Equity & Compensation",
    title: "Profit Interest Agreement (LLC)",
    description: "Awards profit interests in an LLC, giving recipients rights to future appreciation and distributions.",
    whenToUse: "Use this agreement to grant equity incentive awards in a startup organized as a partnership or LLC rather than a corporation.",
    whatsCovered: [
      "Definition of partnership profit interests",
      "Hurdle amount (distribution threshold) configurations",
      "Vesting and forfeiture terms upon member exit",
      "Capital account allocations and tax filings",
      "Adherence to the LLC Operating Agreement"
    ],
    specificFields: [
      { id: "member_name", label: "Recipient Member Name", type: "text", placeholder: "e.g. Clara Oswald", required: true, group: "Recipient Info" },
      { id: "hurdle_amount", label: "Distribution Hurdle Amount ($)", type: "currency", placeholder: "e.g. 5,000,000.00", required: true, group: "Interest Details" },
      { id: "percentage_interest", label: "Profit Interest Percentage (%)", type: "text", placeholder: "e.g. 1.50", required: true, group: "Interest Details" }
    ],
    tags: ["profit-interest", "llc", "partnership", "equity", "hurdle"],
    faq: [
      { question: "What is a distribution hurdle?", answer: "It ensures the recipient only profits from the value created AFTER the date of their grant, preventing them from taking historical value." },
      { question: "Is a profit interest taxed upon grant?", answer: "If drafted properly (meeting IRS Safe Harbor rules), the grant is non-taxable, and gains are treated as capital gains rather than W2 income." }
    ]
  },
  {
    id: "employee-stock-purchase-plan",
    subcategory: "Equity & Compensation",
    title: "Employee Stock Purchase Plan (ESPP)",
    description: "Details payroll deductions and stock purchase discounts for employees participating in the company's ESPP.",
    whenToUse: "Use this enrollment form to document employee participation, discount rates, and payroll deduction caps in a public or late-stage startup's ESPP.",
    whatsCovered: [
      "Authorization of payroll deduction percentages",
      "Stock discount rates and lookback pricing terms",
      "Purchase period dates and enrollment rules",
      "IRS annual maximum purchase caps ($25k limit)",
      "Withdrawal and refund policies from the plan"
    ],
    specificFields: [
      { id: "employee_name", label: "Employee Full Name", type: "text", placeholder: "e.g. Lucas Miller", required: true, group: "Employee Details" },
      { id: "deduction_percentage", label: "Payroll Deduction Cap (%)", type: "text", placeholder: "e.g. 10.00", required: true, group: "Deduction Details" },
      { id: "discount_rate", label: "Stock Discount (%)", type: "select", options: ["5", "10", "15"], defaultValue: "15", required: true, group: "Plan Details" }
    ],
    tags: ["espp", "stock", "payroll", "discount", "compensation"],
    faq: [
      { question: "How does Lookback Pricing work?", answer: "It sets the stock purchase price based on the lower of the stock's price at the beginning or the end of the offering period, maximizing the employee's discount." },
      { question: "What is the IRS annual limit?", answer: "Employees cannot purchase more than $25,000 worth of stock (valued at the start of the offering period) per calendar year." }
    ]
  },
  {
    id: "cliff-vesting-agreement",
    subcategory: "Equity & Compensation",
    title: "Cliff Vesting Agreement",
    description: "An equity grant agreement establishing a standard 1-year cliff before monthly vesting commences.",
    whenToUse: "Use this restricted stock or option agreement when onboarding new team members to ensure they must stay a full year before earning any equity.",
    whatsCovered: [
      "Total share grant size and option strike price",
      "One-year cliff date and subsequent vesting schedule",
      "Forfeiture of unvested shares upon termination",
      "Repurchase rights of unvested shares",
      "Transfer restrictions prior to full vesting"
    ],
    specificFields: [
      { id: "grantee_name", label: "Grantee Name", type: "text", placeholder: "e.g. Derek Shepherd", required: true, group: "Grantee Info" },
      { id: "shares_amount", label: "Total Shares Granted", type: "number", placeholder: "e.g. 50000", required: true, group: "Equity Details" },
      { id: "cliff_date", label: "Cliff Completion Date", type: "date", required: true, group: "Vesting Dates" }
    ],
    tags: ["cliff", "vesting", "equity", "options", "retention"],
    faq: [
      { question: "What is a 1-year cliff?", answer: "It is a trial period during which no shares vest. On the 1st anniversary, exactly 25% of the equity vests, and the remaining 75% vests monthly over 3 years." },
      { question: "What happens if the employee leaves at 11 months?", answer: "They forfeit all rights to the equity, and they receive zero shares or options." }
    ]
  },
  {
    id: "accelerated-vesting-agreement",
    subcategory: "Equity & Compensation",
    title: "Accelerated Vesting Agreement",
    description: "Outlines 'single trigger' or 'double trigger' acceleration of stock option vesting in M&A scenarios.",
    whenToUse: "Use this executive option addendum to define vesting acceleration rights if the startup is acquired or the executive is terminated.",
    whatsCovered: [
      "Single-trigger acceleration details (on acquisition)",
      "Double-trigger acceleration rules (acquisition + termination)",
      "Vesting acceleration percentages (e.g. 50% or 100%)",
      "Notice timelines during acquisition cycles",
      "Integration with Board option plans"
    ],
    specificFields: [
      { id: "executive_name", label: "Executive Full Name", type: "text", placeholder: "e.g. Harvey Specter", required: true, group: "Executive Info" },
      { id: "acceleration_trigger", label: "Acceleration Trigger Type", type: "select", options: ["Single Trigger", "Double Trigger", "Custom Board Approval"], defaultValue: "Double Trigger", required: true, group: "Acceleration Details" },
      { id: "acceleration_percentage", label: "Vesting Acceleration (%)", type: "text", placeholder: "e.g. 100.00", required: true, group: "Acceleration Details" }
    ],
    tags: ["acceleration", "vesting", "double-trigger", "exit", "executive"],
    faq: [
      { question: "What is a double-trigger acceleration?", answer: "It requires two events to trigger acceleration: (1) the company is acquired, AND (2) the executive is terminated without cause within a year." },
      { question: "Why is double-trigger preferred over single-trigger?", answer: "Acquirers prefer double-triggers because it incentivizes the executive team to stay and assist with the post-acquisition integration." }
    ]
  },
  {
    id: "equity-buyback-agreement",
    subcategory: "Equity & Compensation",
    title: "Equity Buyback Agreement",
    description: "Governs the company's repurchase of vested or unvested founder/employee shares upon departure.",
    whenToUse: "Use this contract to execute the startup's right to repurchase shares from a departing founder or executive to clean up the cap table.",
    whatsCovered: [
      "Purchase price calculation for vested shares",
      "Automatic return of unvested stock options",
      "Right of first refusal (ROFR) parameters",
      "Release of claims against the company by shareholder",
      "Tax reporting of stock repurchase events"
    ],
    specificFields: [
      { id: "departing_holder", label: "Departing Shareholder", type: "text", placeholder: "e.g. Peter Gregory", required: true, group: "Shareholder Info" },
      { id: "shares_repurchased", label: "Number of Shares Repurchased", type: "number", placeholder: "e.g. 150000", required: true, group: "Transaction Details" },
      { id: "repurchase_price", label: "Total Buyback Cost ($)", type: "currency", placeholder: "e.g. 75,000.00", required: true, group: "Transaction Details" }
    ],
    tags: ["buyback", "repurchase", "founder-exit", "equity", "cap-table"],
    faq: [
      { question: "Why do startups have buyback agreements?", answer: "To prevent departed founders or employees from holding onto large, voting equity stakes while no longer contributing to the company's growth." },
      { question: "At what price does the company buy back unvested stock?", answer: "Unvested stock is typically bought back at the lower of its original purchase price or its current fair market value." }
    ]
  },
  {
    id: "option-exercise-agreement",
    subcategory: "Equity & Compensation",
    title: "Option Exercise Agreement",
    description: "Document executed by an option holder to exercise vested options and purchase company stock.",
    whenToUse: "Use this agreement when an employee or advisor wants to exercise their vested stock options and convert them into common shares.",
    whatsCovered: [
      "Exercise notice and total shares being purchased",
      "Strike price calculation and cash payment methods",
      "Tax withholding elections and representations",
      "Adherence to Company shareholder agreements",
      "Lock-up period consent for future IPOs"
    ],
    specificFields: [
      { id: "holder_name", label: "Option Holder Name", type: "text", placeholder: "e.g. Peter Parker", required: true, group: "Holder Info" },
      { id: "options_exercised", label: "Vested Options Exercised", type: "number", placeholder: "e.g. 5000", required: true, group: "Exercise Details" },
      { id: "strike_price", label: "Strike Price ($/Share)", type: "text", placeholder: "e.g. 0.15", required: true, group: "Exercise Details" }
    ],
    tags: ["exercise", "stock-options", "equity", "vested", "shares"],
    faq: [
      { question: "What is the window to exercise options after leaving?", answer: "Most startup option plans give departed employees exactly 90 days to exercise vested options before they expire." },
      { question: "What is an early-exercise option?", answer: "Some plans allow employees to buy unvested shares, starting the capital gains tax clock early (requires an 83b election)." }
    ]
  },
  {
    id: "83b-election-letter",
    subcategory: "Equity & Compensation",
    title: "83(b) Election Letter",
    description: "The standard IRS filing letter to report income on unvested restricted stock grants in the tax year of the grant.",
    whenToUse: "Use this IRS template letter within 30 days of receiving a restricted stock grant (e.g. during founder incorporation) to optimize your taxes.",
    whatsCovered: [
      "Taxpayer identification and Social Security details",
      "Description of the restricted property / share grant",
      "Fair Market Value of shares on grant date",
      "Tax election statement under Section 83(b)",
      "IRS filing instructions and certified mail guidelines"
    ],
    specificFields: [
      { id: "taxpayer_name", label: "Taxpayer / Shareholder Name", type: "text", placeholder: "e.g. Richard Hendricks", required: true, group: "Taxpayer Info" },
      { id: "shares_acquired", label: "Restricted Shares Acquired", type: "number", placeholder: "e.g. 2000000", required: true, group: "Grant Info" },
      { id: "fair_market_value", label: "Fair Market Value of Shares ($)", type: "currency", placeholder: "e.g. 2,000.00", required: true, group: "Grant Info" }
    ],
    tags: ["83b", "tax", "irs", "restricted-stock", "founder"],
    faq: [
      { question: "What is the 83(b) filing deadline?", answer: "You must file the letter with the IRS within exactly 30 days of the stock grant date. There are no extensions or exceptions." },
      { question: "Why is an 83(b) election beneficial?", answer: "It allows you to pay taxes on the value of the shares at the time of grant (low value) rather than paying taxes as they vest (high value)." }
    ]
  },

  // --- Operations & Governance (7) ---
  {
    id: "startup-operating-agreement",
    subcategory: "Operations & Governance",
    title: "Startup Operating Agreement (LLC)",
    description: "A multi-member operating agreement for tech startups forming as LLCs, detailing member interests and voting majorities.",
    whenToUse: "Use this LLC operating agreement when forming a multi-member startup LLC to structure equity distributions, officer roles, and capital calls.",
    whatsCovered: [
      "LLC capital contributions and initial member splits",
      "Voting classes, manager appointments, and majorities",
      "Capital call requirements and dilution terms",
      "Tax distributions and allocation calculations",
      "Buy-sell rights and LLC dissolution clauses"
    ],
    specificFields: [
      { id: "llc_name", label: "LLC Entity Name", type: "text", placeholder: "e.g. CyberFlow Solutions LLC", required: true, group: "LLC Info" },
      { id: "member_count", label: "Initial Member Count", type: "number", placeholder: "e.g. 3", required: true, group: "LLC Info" },
      { id: "voting_threshold", label: "Major Action Voting Threshold (%)", type: "text", placeholder: "e.g. 66.67", required: true, group: "Governance" }
    ],
    tags: ["operating", "llc", "members", "governance", "voting"],
    faq: [
      { question: "Why do we need an operating agreement?", answer: "It prevents internal disputes by contractually setting out voting rules, capital requirements, and what happens if a partner quits." },
      { question: "Is this suitable for a Delaware LLC?", answer: "Yes, it contains standard provisions aligned with Delaware LLC law, which is the preferred choice for venture-backed startups." }
    ]
  },
  {
    id: "unanimous-written-consent",
    subcategory: "Operations & Governance",
    title: "Board Unanimous Written Consent",
    description: "A board resolution template for taking corporate action without convening a formal meeting.",
    whenToUse: "Use this template when the Board of Directors needs to approve stock grants, hire executives, or open bank accounts rapidly.",
    whatsCovered: [
      "Formal corporate board resolutions and actions",
      "Waiver of meeting requirements by directors",
      "Record of board member digital signatures",
      "Filing guidelines in the corporate minute book",
      "Exhibits for board action attachments"
    ],
    specificFields: [
      { id: "board_resolution_date", label: "Resolution Date", type: "date", required: true, group: "Board Info" },
      { id: "board_actions", label: "Approved Corporate Actions", type: "textarea", placeholder: "e.g. Resolved, that the Board hereby approves the appointment of Jane Doe as Chief Technical Officer...", required: true, group: "Resolutions" }
    ],
    tags: ["consent", "writtenconsent", "board", "resolution", "corporate"],
    faq: [
      { question: "Do all board members need to sign?", answer: "Yes, a written consent in lieu of a meeting must be signed by 100% of the active board directors to be legally valid." },
      { question: "What actions require board consent?", answer: "Major actions: option pool changes, corporate fundraising, hiring C-level officers, and selling company assets." }
    ]
  },
  {
    id: "indemnification-agreement-officer-director",
    subcategory: "Operations & Governance",
    title: "Director Indemnification Agreement",
    description: "Protects startup directors and officers from personal liability, guaranteeing expense advancement and indemnity.",
    whenToUse: "Use this agreement when appointing new board members or C-level officers to protect their personal assets from company litigation.",
    whatsCovered: [
      "Indemnification for legal fees, settlements, and judgments",
      "Right to advancement of legal defense expenses",
      "Fiduciary duty liability boundaries and D&O insurance",
      "Procedures for claiming indemnification rights",
      "Governing law and arbitration of disputes"
    ],
    specificFields: [
      { id: "indemnitee_name", label: "Indemnitee Director / Officer", type: "text", placeholder: "e.g. Gregory House", required: true, group: "Indemnitee Info" },
      { id: "d_o_insurance_limit", label: "D&O Insurance Minimum Coverage ($)", type: "currency", placeholder: "e.g. 2,000,000.00", required: true, group: "Insurance" }
    ],
    tags: ["indemnity", "director", "officer", "liability", "insurance"],
    faq: [
      { question: "What is expense advancement?", answer: "It requires the company to pay the director's legal defense bills as they arrive, rather than waiting for the final trial verdict." },
      { question: "Does this protect against fraud?", answer: "No, indemnification agreements explicitly exclude coverage for willful misconduct, criminal acts, or deliberate fraud." }
    ]
  },
  {
    id: "corporate-secretary-agreement",
    subcategory: "Operations & Governance",
    title: "Corporate Secretary Agreement",
    description: "Outlines the duties, minutes preservation, and board support services provided by a corporate secretary.",
    whenToUse: "Use this agreement when hiring or outsourcing your corporate secretary role to handle compliance filing, board minutes, and cap table audits.",
    whatsCovered: [
      "Scope of secretary duties, meeting minutes, and compliance",
      "Corporate record-keeping and cap table tracking",
      "Compensation retainer and invoice dates",
      "Confidentiality of corporate board disclosures",
      "Notice timeline for contract termination"
    ],
    specificFields: [
      { id: "secretary_name", label: "Corporate Secretary Name / Agency", type: "text", placeholder: "e.g. Apex Corporate Governance Services LLC", required: true, group: "Secretary Info" },
      { id: "secretary_retainer", label: "Annual Retainer Fee ($)", type: "currency", placeholder: "e.g. 12,000.00", required: true, group: "Compensation" }
    ],
    tags: ["secretary", "minutes", "compliance", "board", "governance"],
    faq: [
      { question: "Is the secretary a member of the Board?", answer: "The corporate secretary can be a board member, but is often an officer or third-party service provider who records minutes without voting." },
      { question: "What records does the secretary maintain?", answer: "The corporate charter, bylaws, board meeting minutes, written consents, and shareholder registries." }
    ]
  },
  {
    id: "data-room-nda",
    subcategory: "Operations & Governance",
    title: "Data Room NDA",
    description: "A restrictive confidentiality agreement safeguarding access to the online virtual data room during M&A/funding rounds.",
    whenToUse: "Use this NDA before providing prospective investors or corporate buyers with access to your virtual data room (VDR) containing your cap table, audits, and source code.",
    whatsCovered: [
      "Access control credentials and user log tracking",
      "Prohibition on copying, printing, or exporting data files",
      "Mandatory destruction of data room files upon demand",
      "Responsibility for subcontractor security leaks",
      "Injunctive remedies for database breach"
    ],
    specificFields: [
      { id: "receiving_investor", label: "Reviewing Investor / Firm", type: "text", placeholder: "e.g. Sierra Peak Partners", required: true, group: "Recipient" },
      { id: "data_room_url", label: "Virtual Data Room Address / URL", type: "text", placeholder: "e.g. https://dataroom.cyberflow.io/vdr-1", required: true, group: "Data Room Details" }
    ],
    tags: ["dataroom", "vdr", "due-diligence", "investor", "secrecy"],
    faq: [
      { question: "Why do we need a data room NDA?", answer: "It places strict rules on the digital data space, prohibiting downloading, copying, or forwarding the proprietary documents inside." },
      { question: "Does this agreement track user logs?", answer: "Yes, it contractually permits the company to monitor IP logs and document views within the VDR platform." }
    ]
  },
  {
    id: "incubator-accelerator-participation",
    subcategory: "Operations & Governance",
    title: "Accelerator Participation Agreement",
    description: "Terms for a startup joining an incubator/accelerator program, exchanging workspace and mentoring for a small equity percentage.",
    whenToUse: "Use this agreement to structure terms when a startup joins an accelerator program that provides funding, office space, and advisors.",
    whatsCovered: [
      "Accelerator funding cash grant and equity transfer splits",
      "Program participation guidelines, workshops, and demo day",
      "Accelerator rights to participate in future rounds",
      "Intellectual property preservation by the startup",
      "Termination from program for failure to participate"
    ],
    specificFields: [
      { id: "accelerator_name", label: "Accelerator Name", type: "text", placeholder: "e.g. Apex Tech Launchpad Accelerator", required: true, group: "Program Info" },
      { id: "program_months", label: "Program Duration (Months)", type: "select", options: ["3", "6", "9", "12"], defaultValue: "3", required: true, group: "Program Info" },
      { id: "equity_grant", label: "Equity Transferred to Accelerator (%)", type: "text", placeholder: "e.g. 7.00", required: true, group: "Equity Exchange" }
    ],
    tags: ["accelerator", "incubator", "program", "equity", "funding"],
    faq: [
      { question: "What is a standard equity exchange for accelerators?", answer: "Most top accelerators take between 5% and 10% of common stock in exchange for program access, workspace, and initial cash." },
      { question: "Does the accelerator own my IP?", answer: "No, the startup retains 100% of its intellectual property. The accelerator only receives equity shares." }
    ]
  },
  {
    id: "startup-mentorship-agreement",
    subcategory: "Operations & Governance",
    title: "Startup Mentorship Agreement",
    description: "Mentorship framework outlining advisory meetings, session durations, and standard confidentiality covenants.",
    whenToUse: "Use this agreement when establishing a formal relationship with a startup mentor who provides coaching without taking direct equity.",
    whatsCovered: [
      "Scope of mentorship coaching and monthly schedules",
      "Mentee confidentiality obligations regarding business metrics",
      "No-employee and independent contractor status of mentor",
      "Liability waiver for advisor business recommendations",
      "Easy termination parameters (at-will by either party)"
    ],
    specificFields: [
      { id: "mentor_name", label: "Mentor Full Name", type: "text", placeholder: "e.g. Arthur Kirkland", required: true, group: "Mentor Details" },
      { id: "monthly_sessions", label: "Monthly Meeting Count", type: "number", placeholder: "e.g. 2", required: true, group: "Schedule" }
    ],
    tags: ["mentorship", "advisor", "coaching", "startup", "education"],
    faq: [
      { question: "Is a mentor liable for poor business results?", answer: "No, this agreement contains a strict liability waiver stating that the mentor offers advice but is not responsible for the startup's financial success." },
      { question: "Can this convert into an advisory board role?", answer: "Yes, if the partnership works, founders often upgrade mentors to advisors using a Board Advisor template with equity." }
    ]
  },

  // --- Exits & Acquisitions (5) ---
  {
    id: "letter-of-intent-acquisition",
    subcategory: "Exits & Acquisitions",
    title: "Letter of Intent (Acquisition)",
    description: "A non-binding letter outlining purchase terms, exclusivity periods, and due diligence rules for acquiring a startup.",
    whenToUse: "Use this Letter of Intent (LOI) to initiate acquisition negotiations with a buyer who wants to purchase your startup.",
    whatsCovered: [
      "Proposed purchase price and cash vs stock transaction splits",
      "Exclusivity (no-shop) period rules for the startup",
      "Due diligence schedules and data access keys",
      "Retained employee agreements and founder payouts",
      "Confidentiality of negotiation details"
    ],
    specificFields: [
      { id: "buyer_name", label: "Acquiring Buyer Company", type: "text", placeholder: "e.g. Titan Software Holdings Inc.", required: true, group: "Buyer Info" },
      { id: "purchase_price", label: "Proposed Purchase Price ($)", type: "currency", placeholder: "e.g. 10,000,000.00", required: true, group: "Proposed Deal" },
      { id: "exclusivity_days", label: "Exclusivity Period (Days)", type: "number", placeholder: "e.g. 45", required: true, group: "No-Shop Clause" }
    ],
    tags: ["loi", "acquisition", "exit", "merger", "noshop"],
    faq: [
      { question: "What is a 'no-shop' exclusivity clause?", answer: "It legally bars the startup from talking to or soliciting offers from other potential buyers during the exclusivity period (e.g. 45 days)." },
      { question: "Is the purchase price in the LOI final?", answer: "No, the purchase price is non-binding and can be adjusted down based on discoveries made during due diligence." }
    ]
  },
  {
    id: "asset-purchase-agreement",
    subcategory: "Exits & Acquisitions",
    title: "Asset Purchase Agreement",
    description: "A purchase contract for acquiring the specific physical and digital intellectual property assets of a startup.",
    whenToUse: "Use this agreement when selling or buying the software code, brand assets, and customer databases of a startup without acquiring the corporate entity.",
    whatsCovered: [
      "Detailed list of purchased assets (IP, software, code)",
      "Excluded liabilities: buyer does not inherit old debts",
      "Purchase price allocation and escrow details",
      "Representations and warranties regarding intellectual property",
      "Post-closing transition assistance timelines"
    ],
    specificFields: [
      { id: "buyer_name", label: "Buyer Company", type: "text", placeholder: "e.g. Zenith Media Corp", required: true, group: "Parties" },
      { id: "seller_name", label: "Seller Company", type: "text", placeholder: "e.g. CyberFlow Technologies LLC", required: true, group: "Parties" },
      { id: "purchase_price", label: "Purchase Price ($)", type: "currency", placeholder: "e.g. 1,200,000.00", required: true, group: "Transaction Details" },
      { id: "assets_purchased", label: "Acquired Assets Summary", type: "textarea", placeholder: "e.g. All software source code, customer registries, domain names, and trademarks...", required: true, group: "Transaction Details" }
    ],
    tags: ["asset-purchase", "acquisition", "ip-sale", "code", "exit"],
    faq: [
      { question: "Why choose an asset sale over a stock sale?", answer: "Asset sales allow buyers to choose the specific assets they want and leave behind corporate liabilities and old tax disputes." },
      { question: "What happens to old contracts in an asset sale?", answer: "Contracts do not transfer automatically. They must be explicitly assigned to and assumed by the buyer." }
    ]
  },
  {
    id: "share-purchase-agreement",
    subcategory: "Exits & Acquisitions",
    title: "Share Purchase Agreement",
    description: "Governs the purchase and transfer of all corporate share capital from founders/investors to an acquiring entity.",
    whenToUse: "Use this share purchase agreement (SPA) to execute a full startup exit where the buyer purchases 100% of the company's outstanding stock.",
    whatsCovered: [
      "Purchase price per share and total deal payouts",
      "Representations and warranties about startup operations",
      "Indemnification caps and escrow baskets for buyer protection",
      "Closing conditions and regulatory filings",
      "Termination of option plans prior to closing"
    ],
    specificFields: [
      { id: "buyer_name", label: "Buyer Entity", type: "text", placeholder: "e.g. Globex Conglomerates Inc.", required: true, group: "Parties" },
      { id: "purchase_price", label: "Total Acquisition Cost ($)", type: "currency", placeholder: "e.g. 25,000,000.00", required: true, group: "Transaction Details" },
      { id: "escrow_amount", label: "Indemnity Escrow Holdback ($)", type: "currency", placeholder: "e.g. 2,500,000.00", required: true, group: "Transaction Details" }
    ],
    tags: ["share-purchase", "spa", "acquisition", "exit", "stock-sale"],
    faq: [
      { question: "What is an indemnity escrow holdback?", answer: "It is a portion of the purchase price (standard is 10%) held in third-party escrow for 12-18 months to cover buyer losses if company reps prove false." },
      { question: "Does a stock sale transfer company debts?", answer: "Yes, the buyer acquires the corporate entity, meaning all historical liabilities, contracts, and debts remain with the target company." }
    ]
  },
  {
    id: "non-compete-post-acquisition",
    subcategory: "Exits & Acquisitions",
    title: "Post-Acquisition Non-Compete",
    description: "Restricted covenant signed by departing founders preventing them from competing with the acquired startup entity.",
    whenToUse: "Use this non-compete contract to ensure that selling founders do not launch a similar product right after receiving their buyout check.",
    whatsCovered: [
      "Scope of prohibited competitive operations",
      "Post-closing non-compete duration (e.g. 3-5 years)",
      "Geographic region boundaries (frequently global)",
      "Exceptions for minor passive public stock investments",
      "Injunction pathways and enforcement rules"
    ],
    specificFields: [
      { id: "founder_name", label: "Selling Founder Full Name", type: "text", placeholder: "e.g. Bruce Wayne", required: true, group: "Restricted Party" },
      { id: "buyer_name", label: "Acquiring Buyer Company", type: "text", placeholder: "e.g. Wayne Enterprises Holdings", required: true, group: "Buyer Info" },
      { id: "noncompete_years", label: "Non-Compete Term (Years)", type: "select", options: ["1", "2", "3", "5"], defaultValue: "3", required: true, group: "Covenants" },
      { id: "geographic_scope", label: "Geographic Boundary", type: "text", placeholder: "e.g. Worldwide", required: true, group: "Covenants" }
    ],
    tags: ["noncompete", "acquisition", "founder-exit", "exit", "restrictive"],
    faq: [
      { question: "Are post-acquisition non-competes easier to enforce?", answer: "Yes. While employment non-competes are heavily restricted in places like California, non-competes signed in connection with the SALE of a business are highly enforceable." },
      { question: "Can founders work as consultants in the same industry?", answer: "Generally no, unless explicitly carved out as an exception in this agreement." }
    ]
  },
  {
    id: "earn-out-agreement",
    subcategory: "Exits & Acquisitions",
    title: "Acquisition Earn-Out Agreement",
    description: "Details additional post-acquisition cash payments to founders contingent on meeting future revenue or user milestones.",
    whenToUse: "Use this earn-out agreement when there is a valuation gap between the buyer and selling founders to link payouts to future performance.",
    whatsCovered: [
      "Calculation of post-closing financial performance metrics",
      "Earn-out payout targets and payment dates",
      "Buyer obligation to run the startup in good faith",
      "Audit and dispute rights for financial reports",
      "Acceleration of earn-out on subsequent sale of buyer"
    ],
    specificFields: [
      { id: "founder_name", label: "Selling Founder Name", type: "text", placeholder: "e.g. Tony Stark", required: true, group: "Parties" },
      { id: "buyer_name", label: "Buyer Company", type: "text", placeholder: "e.g. Stark Industries Acquisitions", required: true, group: "Parties" },
      { id: "milestone_revenue", label: "Target Revenue Milestone ($)", type: "currency", placeholder: "e.g. 5,000,000.00", required: true, group: "Earn-Out Details" },
      { id: "earnout_payment", label: "Earn-Out Payout ($)", type: "currency", placeholder: "e.g. 1,000,000.00", required: true, group: "Earn-Out Details" }
    ],
    tags: ["earnout", "acquisition", "exit", "milestone", "payout"],
    faq: [
      { question: "What is an earn-out agreement?", answer: "It is an acquisition payment method where the buyer pays part of the purchase price only if the acquired business hits specific financial goals in the future." },
      { question: "What is the biggest risk of an earn-out?", answer: "The buyer might change management or reduce the budget, making it impossible for the founders to hit the milestone (this template requires the buyer to run the business in good faith)." }
    ]
  }
];

// Helper to format a single template object
function makeStartupTemplate(t) {
  let fields = [];
  let clauses = [];

  // standard fields for startup
  fields = [
    { id: "company_name", label: "Startup Company Name", type: "text", placeholder: "e.g. CyberFlow Technologies Inc.", required: true, group: "Company Info" },
    { id: "company_address", label: "Company Office Address", type: "text", placeholder: "e.g. 100 Innovators Blvd, San Francisco, CA", required: true, group: "Company Info" },
    ...(t.specificFields || []),
    { id: "effective_date", label: "Effective Date", type: "date", required: true, group: "Key Dates" },
    { id: "governing_state", label: "Governing Jurisdiction", type: "text", placeholder: "e.g. Delaware", required: true, group: "Legal Settings" }
  ];

  // generate clauses
  clauses = [
    {
      id: "intro",
      heading: t.title.toUpperCase(),
      body: `This startup agreement (the "Agreement") is entered into as of {effective_date} (the "Effective Date"), by and between {company_name}, located at {company_address} (the "Company"), and the counterparty or stakeholders executing this document below.`,
      optional: false,
      enabledByDefault: true
    },
    {
      id: "subject",
      heading: "1. Core Agreement Terms",
      body: `This agreement sets out the transaction and operational terms for ${t.title}. The parties agree to coordinate in good faith to complete milestones, share resources, or grant rights as specified.`,
      optional: false,
      enabledByDefault: true
    }
  ];

  // Add specific clauses based on type
  if (t.id === 'series-b-term-sheet') {
    clauses.push({
      id: "investment_terms",
      heading: "2. Investment and Valuation Covenants",
      body: "Investor shall purchase Series B Preferred Stock for an aggregate amount of {investment_amount}. The pre-money valuation of the Company is established at {pre_money_valuation}. Board seat representations shall invite {board_seats} as director nominee.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'bridge-loan-agreement') {
    clauses.push({
      id: "loan_terms",
      heading: "2. Convertible Debt Parameters",
      body: "Lender agrees to supply a principal loan of {loan_principal} carrying interest at {interest_rate}% per annum. This principal and interest shall convert to equity on maturity date {maturity_date} if priced round hasn't closed.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'grant-agreement-startup') {
    clauses.push({
      id: "grant_terms",
      heading: "2. Grant Disbursement Conditions",
      body: "Grantor shall distribute {grant_amount} contingent on the milestones: {project_milestones}. Startups shall provide progress reports on a {reporting_cycle} schedule.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'crowdfunding-campaign-agreement') {
    clauses.push({
      id: "crowdfunding_fees",
      heading: "2. Agency Fees and Commissions",
      body: "Startup Client shall pay Agency a retainer of {retainer_fee} per month, plus a success commission fee of {commission_rate}% of the total funds raised on {campaign_platform}.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'spv-agreement') {
    clauses.push({
      id: "spv_allocations",
      heading: "2. Capital Pool and Carry Fees",
      body: "Investor agrees to contribute {contribution_amount} to {spv_name}. SPV Manager {spv_manager} shall receive carried interest equal to {carry_percentage}% of SPV investment profits.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'side-letter-investor') {
    clauses.push({
      id: "side_letter_rights",
      heading: "2. Investor Protective Covenants",
      body: "Investor {investor_name} is granted MFN status. If subsequent convertible debt is issued with a valuation cap below {mfn_cap}, Investor shall be granted such Cap.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'pro-rata-rights-agreement') {
    clauses.push({
      id: "prorata_rights",
      heading: "2. Pro-Rata Dilution Protections",
      body: "Investor {investor_name} is granted pro-rata rights to buy shares in future funding rounds. Notice of new rounds must be given at least {notice_days} days before closing.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'information-rights-agreement') {
    clauses.push({
      id: "info_disclosure",
      heading: "2. Information Disclosure Deadlines",
      body: "Company shall deliver annual audits to {investor_name} within {annual_report_days} days of year-end, and quarterly statements within {quarterly_report_days} days of quarter-end.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'board-observer-agreement') {
    clauses.push({
      id: "observer_rights",
      heading: "2. Board Meetings Access",
      body: "Observer {observer_name} representing {investor_firm} is invited to attend board meetings. Observer shall be excluded from discussions concerning: {observer_scope}.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'drag-drag-along-rights') {
    clauses.push({
      id: "drag_tag_terms",
      heading: "2. Drag-Along Thresholds",
      body: "In the event of a sale approved by {drag_percentage}% of share classes, all shareholders must participate. Co-sale notice period is set at {tag_notice_days} days.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'phantom-equity-plan') {
    clauses.push({
      id: "phantom_equity_units",
      heading: "2. Phantom Option Grant",
      body: "Company grants Employee {phantom_units} phantom stock units, which shall vest over a period of {vesting_years} years, tracking standard share price appreciation.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'profit-interest-agreement') {
    clauses.push({
      id: "profit_interest_terms",
      heading: "2. LLC Partnership Allocations",
      body: "Recipient {member_name} is awarded a profit interest of {percentage_interest}% in LLC. Recipient shall share in LLC appreciation above the hurdle value of {hurdle_amount}.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'employee-stock-purchase-plan') {
    clauses.push({
      id: "espp_deductions",
      heading: "2. Payroll Deductions",
      body: "Employee {employee_name} authorizes payroll deduction of {deduction_percentage}% of compensation to purchase company stock at a {discount_rate}% plan discount.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'cliff-vesting-agreement') {
    clauses.push({
      id: "cliff_vesting_terms",
      heading: "2. Vesting Cliff Dates",
      body: "Grantee {grantee_name} receives {shares_amount} shares. Shares shall carry a strict 1-year cliff expiring on {cliff_date}, prior to which zero shares vest.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'accelerated-vesting-agreement') {
    clauses.push({
      id: "acceleration_covenants",
      heading: "2. Vesting Acceleration Rules",
      body: "Executive {executive_name} is granted {acceleration_percentage}% vesting acceleration upon the occurrence of: {acceleration_trigger}.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'equity-buyback-agreement') {
    clauses.push({
      id: "buyback_financials",
      heading: "2. Repurchase Covenants",
      body: "Company shall buy back {shares_repurchased} shares from Departing Shareholder {departing_holder} for the total repurchase price of {repurchase_price}.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'option-exercise-agreement') {
    clauses.push({
      id: "exercise_payment",
      heading: "2. Strike Price Payment",
      body: "Holder {holder_name} exercises {options_exercised} options to buy common stock at the strike price of {strike_price} per share, enclosing full payment.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === '83b-election-letter') {
    clauses.push({
      id: "election_statement",
      heading: "2. IRS Section 83(b) Declaration",
      body: "Taxpayer {taxpayer_name} elects to report the restricted grant of {shares_acquired} shares carrying a fair market value of {fair_market_value} in the current year.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'startup-operating-agreement') {
    clauses.push({
      id: "llc_governance",
      heading: "2. Member Voting majorities",
      body: "LLC {llc_name} has {member_count} initial members. Major decisions regarding sales or capital calls require a voting majority of {voting_threshold}%.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'unanimous-written-consent') {
    clauses.push({
      id: "written_resolutions",
      heading: "2. Board Resolutions",
      body: "Board approves the corporate resolutions dated {board_resolution_date} regarding actions: {board_actions}.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'indemnification-agreement-officer-director') {
    clauses.push({
      id: "indemnity_covenants",
      heading: "2. Officer Defense Advancement",
      body: "Company shall advance all legal expenses of {indemnitee_name} and maintain D&O liability insurance of at least {d_o_insurance_limit}.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'corporate-secretary-agreement') {
    clauses.push({
      id: "secretary_retainer_fees",
      heading: "2. Annual Retainer Fees",
      body: "Secretary {secretary_name} shall manage corporate records and receive an annual service fee retainer of {secretary_retainer}.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'data-room-nda') {
    clauses.push({
      id: "vdr_restrictions",
      heading: "2. Virtual Data Room Restrictions",
      body: "Investor {receiving_investor} is granted access to data room at {data_room_url}. Copying, downloading, or sharing files is strictly prohibited.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'incubator-accelerator-participation') {
    clauses.push({
      id: "accelerator_equity",
      heading: "2. Accelerator Program Equity",
      body: "Startup joins Accelerator {accelerator_name} for a {program_months}-month incubator program, transferring {equity_grant}% common stock in exchange.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'startup-mentorship-agreement') {
    clauses.push({
      id: "mentorship_schedule",
      heading: "2. Coaching Schedules",
      body: "Mentor {mentor_name} shall provide mentorship to startup, coordinating at least {monthly_sessions} meetings per month.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'letter-of-intent-acquisition') {
    clauses.push({
      id: "loi_acquisitions",
      heading: "2. Exclusivity and Proposed Cost",
      body: "Buyer {buyer_name} proposes to buy Company for {purchase_price}. Target Company agrees to a {exclusivity_days}-day no-shop exclusivity period.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'asset-purchase-agreement') {
    clauses.push({
      id: "asset_sale",
      heading: "2. Purchase Price Allocation",
      body: "Buyer {buyer_name} buys the assets: {assets_purchased} from Seller {seller_name} for {purchase_price}.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'share-purchase-agreement') {
    clauses.push({
      id: "share_sale",
      heading: "2. Stock Sale and Escrow holdbacks",
      body: "Buyer {buyer_name} buys 100% of outstanding share capital for {purchase_price}. Buyer shall hold {escrow_amount} in escrow for indemnity protection.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'non-compete-post-acquisition') {
    clauses.push({
      id: "post_acq_noncompete",
      heading: "2. Restricted Competition",
      body: "Founder {founder_name} agrees not to engage in competing business with {buyer_name} for a period of {noncompete_years} years within {geographic_scope}.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'earn-out-agreement') {
    clauses.push({
      id: "earnout_milestones",
      heading: "2. Earn-Out Performance Milestones",
      body: "Buyer {buyer_name} shall pay Founder {founder_name} an earn-out sum of {earnout_payment} contingent on startup reaching the target of {milestone_revenue}.",
      optional: false,
      enabledByDefault: true
    });
  }

  // Standard common endings
  clauses.push(
    {
      id: "confidentiality",
      heading: "3. Proprietary Information and Secrecy",
      body: "Both parties agree to treat all financial metrics, corporate plans, cap tables, and research files received during the execution of this Agreement as confidential and proprietary.",
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
  );

  return {
    id: t.id,
    slug: t.id,
    category: "startup",
    subcategory: t.subcategory,
    title: t.title,
    description: t.description,
    whatsCovered: t.whatsCovered || [
      "Clear definition of stock rights and equity ownership",
      "Corporate governance, voting, and boards guidelines",
      "Taxation elections and filing compliance procedures",
      "Confidentiality safeguards for strategic business files",
      "Standard governing law and venue settings"
    ],
    whenToUse: t.whenToUse,
    jurisdictions: ["US", "CA"],
    lastReviewedAt: "2026-05-23",
    reviewerName: "Robert Vance, Esq.",
    estimatedFillMinutes: t.estimatedFillMinutes || 4,
    fields: fields,
    clauses: clauses,
    relatedTemplates: t.relatedTemplates || ["safe-agreement", "co-founder-agreement"],
    faq: t.faq || [
      { question: "Why is a formal contract needed for this equity grant?", answer: "Failing to document equity grants formally can result in major disputes over ownership percentages, vesting triggers, or IRS tax reporting." },
      { question: "Can we use this for international team members?", answer: "This template is built under US and CA corporate standards. For other countries, check local securities laws before granting stock options." }
    ],
    tags: t.tags || ["startup", "equity", "finance"]
  };
}

// Generate files
newTemplates.forEach((t) => {
  const formatted = makeStartupTemplate(t);
  const filePath = path.join(outputDir, `${formatted.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(formatted, null, 2), 'utf8');
  console.log(`Successfully wrote template: ${formatted.id}`);
});

console.log('Finished writing Startup templates!');
