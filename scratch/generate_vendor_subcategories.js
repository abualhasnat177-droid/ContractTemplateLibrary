const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '..', 'content', 'templates', 'vendor');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 1. Update existing Vendor files with appropriate subcategory
const existingFilesMapping = {
  "vendor-agreement.json": "Supplier & Sourcing",
  "service-level-agreement.json": "Technology & SaaS"
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
  // --- Supplier & Sourcing (8) ---
  {
    id: "sole-source-justification",
    subcategory: "Supplier & Sourcing",
    title: "Sole Source Justification",
    description: "An administrative agreement justifying purchasing from a single sole supplier, bypassing the standard bidding process.",
    whenToUse: "Use this justification agreement when procuring highly specialized components or services where only one vendor is qualified or capable of supplying them.",
    whatsCovered: [
      "Technical details and reasoning for single-source procurement",
      "Declaration of unique manufacturing or patent rights",
      "Analysis of alternative suppliers and reasons for rejection",
      "Fairness review of proposed pricing structures",
      "Compliance audits for municipal/corporate procurement bylaws"
    ],
    specificFields: [
      { id: "unique_specifications", label: "Unique Supplier Capabilities", type: "textarea", placeholder: "Describe the proprietary technology or certifications that justify a sole source contract...", required: true, group: "Justification" },
      { id: "estimated_contract_value", label: "Estimated Contract Value ($)", type: "currency", placeholder: "e.g. 150,000.00", required: true, group: "Contract Details" }
    ],
    tags: ["sole-source", "procurement", "sourcing", "compliance", "vendor"]
  },
  {
    id: "rfp-template",
    subcategory: "Supplier & Sourcing",
    title: "Request for Proposal (RFP)",
    description: "A comprehensive RFP template detailing technical specifications, submission guidelines, and evaluation criteria for vendor bidding.",
    whenToUse: "Use this RFP document when inviting multiple vendors or agencies to bid on custom development, consulting, or manufacturing projects.",
    whatsCovered: [
      "Corporate overview and project scope objectives",
      "Technical and software functional requirements",
      "Submission guidelines, file formats, and closing dates",
      "RFP evaluation criteria, weighting scores, and board reviews",
      "Exclusion of binding commitment to purchase"
    ],
    specificFields: [
      { id: "proposal_deadline", label: "Proposal Submission Deadline", type: "date", required: true, group: "Timeline" },
      { id: "project_scope", label: "Brief Scope Overview", type: "text", placeholder: "e.g. Enterprise Cloud Database Migration and Integration", required: true, group: "Scope" }
    ],
    tags: ["rfp", "proposal", "bidding", "sourcing", "vendor"]
  },
  {
    id: "supplier-code-of-conduct",
    subcategory: "Supplier & Sourcing",
    title: "Supplier Code of Conduct",
    description: "Covenant detailing social, environmental, ethical, and labor compliance standards required of all active suppliers.",
    whenToUse: "Use this code of conduct to bind manufacturing or service vendors to standard ESG, anti-bribery, and labor guidelines.",
    whatsCovered: [
      "Fair labor standards, child labor bans, and wage compliance",
      "Environmental waste controls and recycling certifications",
      "Anti-corruption, anti-kickback, and business ethics rules",
      "Audit permissions for supplier manufacturing facilities",
      "Termination of all agreements for code breaches"
    ],
    specificFields: [
      { id: "audit_notice_hours", label: "Audit Notice Period (Hours)", type: "number", placeholder: "e.g. 48", required: true, group: "Audit Info" }
    ],
    tags: ["code-of-conduct", "ethics", "supplier", "compliance", "esg"]
  },
  {
    id: "raw-materials-supply",
    subcategory: "Supplier & Sourcing",
    title: "Raw Materials Supply Agreement",
    description: "Supply contract establishing volume requirements, price indexes, quality control, and shipping rules for raw components.",
    whenToUse: "Use this contract when securing ongoing shipments of battery metals, wood, chemicals, or agricultural products for manufacturing.",
    whatsCovered: [
      "Minimum annual raw materials purchase volume",
      "Price index formulas (tying prices to market commodity rates)",
      "Quality assurance and reject protocols for defective shipments",
      "Incoterms shipping rules and liability transfers",
      "Force majeure clauses for weather or freight delays"
    ],
    specificFields: [
      { id: "material_description", label: "Description of Raw Materials", type: "text", placeholder: "e.g. Lithium-Ion Battery Grade Cells", required: true, group: "Materials" },
      { id: "incoterms_type", label: "Shipping Incoterms", type: "select", options: ["FOB", "CIF", "EXW", "DDP"], defaultValue: "FOB", required: true, group: "Logistics" }
    ],
    tags: ["rawmaterials", "supply", "manufacturing", "incoterms", "freight"]
  },
  {
    id: "import-export-agreement",
    subcategory: "Supplier & Sourcing",
    title: "Import / Export Agreement",
    description: "Cross-border distribution agreement detailing customs clearances, tariff rates, and international trade compliance.",
    whenToUse: "Use this agreement when distributing or importing finished items across international borders, establishing custom clearance tasks.",
    whatsCovered: [
      "Customs clearing tasks, broker selection, and documentation",
      "Responsibility for import tariffs, customs duties, and taxes",
      "Adherence to export controls and sanctions lists",
      "Inspection guidelines at port of entry",
      "International arbitration for cross-border shipping conflicts"
    ],
    specificFields: [
      { id: "origin_country", label: "Exporter Country of Origin", type: "text", placeholder: "e.g. South Korea", required: true, group: "Trade Details" },
      { id: "dest_country", label: "Importer Destination Country", type: "text", placeholder: "e.g. United States", required: true, group: "Trade Details" }
    ],
    tags: ["import", "export", "customs", "tariffs", "trade"]
  },
  {
    id: "drop-shipping-agreement",
    subcategory: "Supplier & Sourcing",
    title: "Drop-Shipping Agreement",
    description: "Agreement between an e-commerce retailer and a supplier for direct fulfillment of product orders to end-customers.",
    whenToUse: "Use this drop-shipping contract when selling items online that are stored, packed, and shipped directly by a third-party manufacturer.",
    whatsCovered: [
      "Order transfer protocols (API/CSV feed sync details)",
      "Fulfillment and packing turnaround deadlines (SLA)",
      "Supplier whitelist requirements (packing slips must bear retailer brand)",
      "Customer return policies and restocking fee percentages",
      "Minimum retail price (MAP) restrictions"
    ],
    specificFields: [
      { id: "fulfillment_sla_hours", label: "Shipment SLA (Hours)", type: "number", placeholder: "e.g. 24", required: true, group: "Fulfillment" },
      { id: "restocking_fee_rate", label: "Restocking Fee (%)", type: "text", placeholder: "e.g. 15.00", required: true, group: "Returns" }
    ],
    tags: ["dropshipping", "ecommerce", "fulfillment", "retail", "supplier"]
  },
  {
    id: "consignment-agreement",
    subcategory: "Supplier & Sourcing",
    title: "Consignment Agreement",
    description: "Agreement where a consignor delivers goods to a retailer (consignee) who pays only after the items are sold.",
    whenToUse: "Use this contract when stocking physical retail inventory on consignment, detailing how sales proceeds are split and when unsold goods are returned.",
    whatsCovered: [
      "Inventory tracking and physical display space commitments",
      "Title of ownership (remains with consignor until sold)",
      "Commission rates and payout schedules for sold inventory",
      "Responsibility for lost, stolen, or damaged displays",
      "Recall schedules for slow-moving consignment stock"
    ],
    specificFields: [
      { id: "consignment_commission", label: "Consignee Sales Commission (%)", type: "text", placeholder: "e.g. 30.00", required: true, group: "Commission" },
      { id: "inventory_limit", label: "Maximum Display Units", type: "number", placeholder: "e.g. 500", required: true, group: "Inventory" }
    ],
    tags: ["consignment", "retail", "inventory", "consignee", "sourcing"]
  },
  {
    id: "vendor-performance-review",
    subcategory: "Supplier & Sourcing",
    title: "Vendor Performance Review",
    description: "Structured scorecard and audit framework to evaluate supplier quality, delivery speed, and service levels.",
    whenToUse: "Use this review template to conduct annual or quarterly performance scoring for key suppliers, determining contract renewals.",
    whatsCovered: [
      "Delivery delay margins and quality rejection metrics",
      "Service response speed scorecard",
      "Corrective Action Plan (CAP) protocols for underperforming vendors",
      "Supplier feedback meeting schedules",
      "Renegotiation triggers for repeating failed audits"
    ],
    specificFields: [
      { id: "review_cycle", label: "Review Frequency", type: "select", options: ["Quarterly", "Semi-Annually", "Annually"], defaultValue: "Annually", required: true, group: "Timeline" }
    ],
    tags: ["vendor-review", "scorecard", "audit", "quality", "supplier"]
  },

  // --- Technology & SaaS (8) ---
  {
    id: "eula-agreement",
    subcategory: "Technology & SaaS",
    title: "End-User License Agreement (EULA)",
    description: "Terms governing end-user installations of desktop, mobile, or proprietary software clients.",
    whenToUse: "Use this EULA when distributing downloadable software applications to clients, preventing reverse engineering.",
    whatsCovered: [
      "Grant of a revocable, non-exclusive license to use the app",
      "Prohibition on copying, decompiling, or reverse engineering code",
      "User data tracking privacy guidelines",
      "Software warranty disclaimers (app is provided 'as is')",
      "Automatic license termination for policy violations"
    ],
    specificFields: [
      { id: "software_app_name", label: "Software Application Name", type: "text", placeholder: "e.g. CyberFlow Client Engine v4.0", required: true, group: "App Details" }
    ],
    tags: ["eula", "license", "software", "app", "saas"]
  },
  {
    id: "api-terms-of-use",
    subcategory: "Technology & SaaS",
    title: "API Terms of Use",
    description: "Terms and developer rate limits governing third-party API integration and data requests.",
    whenToUse: "Use this terms agreement when exposing corporate application APIs to external software developer integrations.",
    whatsCovered: [
      "API developer key authorization and security rules",
      "Rate limits and bandwidth restriction parameters",
      "Prohibition on caching developer data indefinitely",
      "Compliance with data privacy policies",
      "Right to revoke API access credentials without prior notice"
    ],
    specificFields: [
      { id: "rate_limit_calls", label: "API Rate Limit (Calls/Min)", type: "number", placeholder: "e.g. 60", required: true, group: "Developer Limits" }
    ],
    tags: ["api", "developer", "integration", "software", "terms"]
  },
  {
    id: "beta-software-testing",
    subcategory: "Technology & SaaS",
    title: "Beta Software Testing Agreement",
    description: "Agreement for developers testing pre-release software, protecting feature designs and collecting bug reports.",
    whenToUse: "Use this beta test agreement to invite developers to test unreleased software builds and protect system interface details.",
    whatsCovered: [
      "Early software access grant and testing scopes",
      "Strict confidentiality: no screenshots, reviews, or stream posts",
      "Ownership of tester feedback and system bug reports",
      "Disclaimer of software stability (pre-release crash warnings)",
      "Automatic expiration of beta access on official launch date"
    ],
    specificFields: [
      { id: "beta_software_title", label: "Beta Software Name", type: "text", placeholder: "e.g. CyberFlow Studio Beta Build v5.1", required: true, group: "App Details" }
    ],
    tags: ["beta", "software", "tester", "bug-report", "saas"]
  },
  {
    id: "open-source-contribution",
    subcategory: "Technology & SaaS",
    title: "Open-Source Contributor Agreement",
    description: "Contributor License Agreement (CLA) defining copyright and patent grants for open-source code contributions.",
    whenToUse: "Use this CLA when accepting source code patches, fixes, or documentation from external open-source contributors.",
    whatsCovered: [
      "Grant of copyright license for code contributions",
      "Grant of patent license to use contributed features",
      "Contributor representation that the code is their original work",
      "Disclaimer of contribution warranty (code is provided as-is)",
      "Agreement that contributions are voluntary and unpaid"
    ],
    specificFields: [
      { id: "project_repo", label: "Open Source Project / Repo Name", type: "text", placeholder: "e.g. CyberFlow OpenCore Github Repository", required: true, group: "Project" }
    ],
    tags: ["open-source", "cla", "contributor", "github", "license"]
  },
  {
    id: "technology-transfer-agreement",
    subcategory: "Technology & SaaS",
    title: "Technology Transfer Agreement",
    description: "Agreement governing the assignment or licensing of proprietary technology, designs, and patents to another business.",
    whenToUse: "Use this contract when selling or licensing university research, software architectures, or manufacturing formulas to an industry partner.",
    whatsCovered: [
      "Definition of transferred technology files and patents",
      "License scopes: exclusive vs non-exclusive, territorial caps",
      "Upfront license fees, milestones, and royalty percentage splits",
      "Technical training and documentation delivery support",
      "Infringement indemnity and patent defense tasks"
    ],
    specificFields: [
      { id: "patent_reference", label: "Patent / Technology Reference", type: "text", placeholder: "e.g. Molecular Compound Patent #US123456B2", required: true, group: "Technology" },
      { id: "royalty_rate", label: "Royalty Rate (%)", type: "text", placeholder: "e.g. 3.50", required: true, group: "Royalties" }
    ],
    tags: ["tech-transfer", "patent", "licensing", "royalties", "university"]
  },
  {
    id: "cloud-hosting-agreement",
    subcategory: "Technology & SaaS",
    title: "Cloud Hosting Agreement",
    description: "Infrastructure hosting agreement detailing server uptime SLA, data backup, and server migration guidelines.",
    whenToUse: "Use this contract when leasing private server racks, VPS cloud space, or hosting infrastructure from a specialized provider.",
    whatsCovered: [
      "Server CPU, RAM, and storage specifications",
      "Uptime SLA percentage guarantees and credits",
      "Weekly and daily server data backup schedules",
      "Cybersecurity protocols, DDOS protection, and encryption",
      "Migration support if hosting is terminated"
    ],
    specificFields: [
      { id: "uptime_sla", label: "Uptime SLA Guarantee (%)", type: "select", options: ["99.9", "99.95", "99.99", "99.999"], defaultValue: "99.99", required: true, group: "SLA Metrics" },
      { id: "backup_cycle", label: "Backup Schedule", type: "select", options: ["Hourly", "Daily", "Weekly"], defaultValue: "Daily", required: true, group: "Backups" }
    ],
    tags: ["hosting", "server", "sla", "uptime", "backups"]
  },
  {
    id: "managed-it-services",
    subcategory: "Technology & SaaS",
    title: "Managed IT Services Agreement",
    description: "Managed Services Provider (MSP) agreement outlining network support, workstation setup, and system monitoring.",
    whenToUse: "Use this agreement when outsourcing workstation management, VPN maintenance, and corporate network security to an MSP.",
    whatsCovered: [
      "MSP scope of support (helpdesk hours, network configs)",
      "Workstation hardware setup and software installation rules",
      "Response times for critical, medium, and low security tickets",
      "Client network access permissions and encryption requirements",
      "Monthly flat retainer and support hour caps"
    ],
    specificFields: [
      { id: "msp_monthly_retainer", label: "MSP Monthly Fee ($)", type: "currency", placeholder: "e.g. 3,500.00", required: true, group: "Compensation" },
      { id: "support_hours", label: "Included Support Hours / Month", type: "number", placeholder: "e.g. 50", required: true, group: "Scope" }
    ],
    tags: ["msp", "it-support", "helpdesk", "network", "managed-services"]
  },
  {
    id: "disaster-recovery-services",
    subcategory: "Technology & SaaS",
    title: "Disaster Recovery Services",
    description: "Data backup, cloud failover testing, and emergency system restoration services agreement.",
    whenToUse: "Use this agreement when retaining a vendor to manage your disaster failover servers and backup restore testing.",
    whatsCovered: [
      "Recovery Point Objective (RPO) and Recovery Time Objective (RTO) metrics",
      "Server replication schedule and secure storage locations",
      "Annual or semi-annual failover test drills",
      "Emergency declaration procedures and network routing",
      "Confidentiality of customer data stored on backup servers"
    ],
    specificFields: [
      { id: "rto_hours", label: "Target Recovery Time (RTO Hours)", type: "number", placeholder: "e.g. 4", required: true, group: "Metrics" }
    ],
    tags: ["disaster-recovery", "rto", "backup", "failover", "saas"]
  },

  // --- Compliance & Data (7) ---
  {
    id: "gdpr-dpa",
    subcategory: "Compliance & Data",
    title: "GDPR Data Processing Addendum (DPA)",
    description: "Data processor addendum conforming to GDPR Article 28 requirements for vendor data processing.",
    whenToUse: "Use this addendum when hiring a vendor (subprocessor) who will process personal data of EU residents on your behalf.",
    whatsCovered: [
      "Conforming data processor roles under GDPR Article 28",
      "Authorized categories of data and data subject groups",
      "Subprocessor approval guidelines and notification rules",
      "Technical and organizational security measures (TOMs)",
      "Audit access permissions for compliance reviews"
    ],
    specificFields: [
      { id: "data_types_processed", label: "Data Categories Processed", type: "textarea", placeholder: "e.g. Employee names, email addresses, billing coordinates, and usage logs...", required: true, group: "Data Scope" }
    ],
    tags: ["gdpr", "dpa", "data-privacy", "subprocessor", "compliance"]
  },
  {
    id: "ccpa-compliance",
    subcategory: "Compliance & Data",
    title: "CCPA Vendor Compliance Agreement",
    description: "Data addendum restricting vendor use of California consumer personal data to conform to CCPA/CPRA.",
    whenToUse: "Use this addendum to bind vendors to California CCPA consumer privacy requirements, prohibiting the sale of shared data.",
    whatsCovered: [
      "Strict CCPA 'Service Provider' designation",
      "Prohibition on selling or sharing customer personal data",
      "Data deletion request fulfillment protocols",
      "Certification that vendor understands and will comply",
      "Compliance audit permissions for data logs"
    ],
    specificFields: [
      { id: "ccpa_framework_ref", label: "CCPA Policy Section Reference", type: "text", placeholder: "e.g. Section 1798.140 of California Civil Code", required: true, group: "Compliance" }
    ],
    tags: ["ccpa", "cpra", "california", "privacy", "compliance"]
  },
  {
    id: "iso-compliance-vendor",
    subcategory: "Compliance & Data",
    title: "ISO Compliance Vendor Agreement",
    description: "Vendor agreement mandating adherence to ISO standards (such as ISO 9001 or ISO 27001) during services delivery.",
    whenToUse: "Use this agreement to ensure your supplier maintains certified quality controls or cyber security frameworks.",
    whatsCovered: [
      "Mandatory ISO 27001 (Security) or ISO 9001 (Quality) certificates",
      "Audit schedule and requirements to supply certificate copies",
      "Non-conformance reports and Corrective Action Plan (CAP) rules",
      "Security standards for data transmission and processing",
      "Termination of contract for certificate expiration or loss"
    ],
    specificFields: [
      { id: "iso_standard", label: "Required ISO Certificate", type: "select", options: ["ISO 27001 (InfoSec)", "ISO 9001 (Quality)", "ISO 14001 (Environmental)"], defaultValue: "ISO 27001 (InfoSec)", required: true, group: "ISO Certification" }
    ],
    tags: ["iso", "iso27001", "iso9001", "certification", "compliance"]
  },
  {
    id: "cybersecurity-vendor-agreement",
    subcategory: "Compliance & Data",
    title: "Cybersecurity Vendor Agreement",
    description: "Contract mandating specific encryption standards, data firewall rules, and security metrics for suppliers.",
    whenToUse: "Use this agreement when onboarding vendors that will access your database network or handle proprietary code repositories.",
    whatsCovered: [
      "Required minimum encryption standard (AES-256 at rest, TLS 1.3 in transit)",
      "Multi-factor authentication (MFA) requirements for vendor staff",
      "Regular vulnerability scanning and third-party pentest audits",
      "Immediate reporting of security incidents or suspicious alerts",
      "Vetting guidelines for vendor employees"
    ],
    specificFields: [
      { id: "pentest_cycle", label: "Required Pentest Frequency", type: "select", options: ["Semi-Annually", "Annually"], defaultValue: "Annually", required: true, group: "Audits" }
    ],
    tags: ["cybersecurity", "encryption", "mfa", "audit", "compliance"]
  },
  {
    id: "third-party-audit-agreement",
    subcategory: "Compliance & Data",
    title: "Third-Party Audit Agreement",
    description: "Agreement outlining audit rights, schedules, and costs for inspecting vendor facilities or systems.",
    whenToUse: "Use this contract to coordinate a third-party auditor's access to vendor premises or database networks.",
    whatsCovered: [
      "Authorized auditor selection and conflict checks",
      "Audit scope limits (no access to other client data files)",
      "Audit costs allocation (who pays for the audit team)",
      "Audit reports classification and non-disclosure",
      "Deadline to fix issues found in audit notes"
    ],
    specificFields: [
      { id: "remediation_days", label: "Remediation Window (Days)", type: "number", placeholder: "e.g. 30", required: true, group: "Remediation" }
    ],
    tags: ["audit", "compliance", "inspection", "finance", "supplier"]
  },
  {
    id: "data-breach-notification",
    subcategory: "Compliance & Data",
    title: "Data Breach Notification Addendum",
    description: "Agreement establishing strict timelines (e.g., 24-72 hours) for a vendor to report database breaches to the company.",
    whenToUse: "Use this addendum to bind vendors to reporting windows if customer or corporate data is leaked or compromised.",
    whatsCovered: [
      "Strict data breach notification timelines (24-72 hours)",
      "Required information to include in breach notices (scope, impact)",
      "Vendor obligation to mitigate the security incident",
      "Coordination of public PR statements regarding the leak",
      "Vendor liability for notification costs and credit monitoring"
    ],
    specificFields: [
      { id: "breach_notice_hours", label: "Breach Notification Window (Hours)", type: "select", options: ["24", "48", "72"], defaultValue: "72", required: true, group: "Timeline" }
    ],
    tags: ["databreach", "notification", "security-incident", "liability", "compliance"]
  },
  {
    id: "information-security-agreement",
    subcategory: "Compliance & Data",
    title: "Information Security Agreement",
    description: "Detailed security specifications and technical safeguards vendor must maintain on corporate datasets.",
    whenToUse: "Use this security agreement (ISA) during vendor onboarding to define physical and network safety requirements.",
    whatsCovered: [
      "Physical office keycard and server rack locks",
      "Access control restrictions (least privilege access model)",
      "Employee security training requirements",
      "Secure data destruction policies (DoD standards)",
      "System log keeping and security reviews"
    ],
    specificFields: [
      { id: "log_retention_years", label: "Log Retention Period (Years)", type: "number", placeholder: "e.g. 3", required: true, group: "Logs" }
    ],
    tags: ["infosec", "security", "data-destruction", "it-policy", "compliance"]
  },

  // --- Financial & Payment (7) ---
  {
    id: "invoice-factoring-agreement",
    subcategory: "Financial & Payment",
    title: "Invoice Factoring Agreement",
    description: "Agreement where a business sells accounts receivable invoices to a factoring company to secure cash flow.",
    whenToUse: "Use this factoring agreement to unlock immediate cash from outstanding client invoices at a discount rate.",
    whatsCovered: [
      "Selling accounts receivable invoices to factor",
      "Upfront cash advance rates (standard 80-90% of value)",
      "Factoring fee percentages and reserve account rules",
      "Recourse vs non-recourse options for defaulted invoices",
      "Directing clients to pay the factoring firm directly"
    ],
    specificFields: [
      { id: "advance_rate", label: "Cash Advance Rate (%)", type: "text", placeholder: "e.g. 85.00", required: true, group: "Factoring Details" },
      { id: "factoring_fee", label: "Factoring Fee Rate (%)", type: "text", placeholder: "e.g. 2.50", required: true, group: "Factoring Details" }
    ],
    tags: ["factoring", "invoice", "cashflow", "finance", "debt"]
  },
  {
    id: "revenue-based-financing",
    subcategory: "Financial & Payment",
    title: "Revenue-Based Financing Agreement",
    description: "Financing contract establishing capital funding repaid through a percentage of monthly startup revenue.",
    whenToUse: "Use this non-dilutive funding agreement when borrowing capital that is repaid directly from monthly revenues.",
    whatsCovered: [
      "Funding amount and repayment cap multiplier (e.g. 1.3x)",
      "Monthly repayment percentage splits (e.g. 4-8% of sales)",
      "Definition of monthly gross revenue and reporting access",
      "No equity transfer or board seat rights",
      "Default terms: acceleration of repayment cap"
    ],
    specificFields: [
      { id: "financing_principal", label: "Principal Funding ($)", type: "currency", placeholder: "e.g. 250,000.00", required: true, group: "Financing" },
      { id: "repayment_percentage", label: "Monthly Repayment Rate (%)", type: "text", placeholder: "e.g. 5.00", required: true, group: "Financing" },
      { id: "repayment_cap_multiplier", label: "Repayment Cap Multiplier", type: "select", options: ["1.1x", "1.2x", "1.3x", "1.5x"], defaultValue: "1.3x", required: true, group: "Financing" }
    ],
    tags: ["revenue-based", "financing", "capital", "repayment", "funding"]
  },
  {
    id: "net-60-payment-terms",
    subcategory: "Financial & Payment",
    title: "Net-60 Payment Terms Agreement",
    description: "Payment addendum establishing a net-60 day billing schedule and late payment fee structures.",
    whenToUse: "Use this payment addendum when negotiating extended 60-day billing schedules with suppliers.",
    whatsCovered: [
      "60-day invoice payment deadline timeline",
      "Late payment interest fees (standard 1.5% per month)",
      "Procedures for disputing invoice amounts",
      "Suspension of work for overdue balances",
      "Credit limit reviews and adjustments"
    ],
    specificFields: [
      { id: "late_interest_rate", label: "Late Payment Interest (Annual %)", type: "text", placeholder: "e.g. 18.00", required: true, group: "Late Fees" }
    ],
    tags: ["net-60", "payment", "invoice", "billing", "credit"]
  },
  {
    id: "early-payment-discount",
    subcategory: "Financial & Payment",
    title: "Early Payment Discount Agreement",
    description: "Discount structure offering price deductions (e.g., 2/10 Net 30) for early invoice settlement.",
    whenToUse: "Use this payment term agreement to offer or receive discounts (e.g., 2% off if paid within 10 days) to accelerate cash flow.",
    whatsCovered: [
      "Early payment discount options (e.g., 2% off if paid in 10 days)",
      "Standard payment deadline (Net 30) if discount is missed",
      "Authorized payment methods and verification schedules",
      "Procedures for adjusting credit memos on invoices",
      "Applicability to partial invoice payments"
    ],
    specificFields: [
      { id: "early_discount_rate", label: "Early Payment Discount (%)", type: "text", placeholder: "e.g. 2.00", required: true, group: "Discount Details" },
      { id: "early_discount_days", label: "Required Pay Window (Days)", type: "number", placeholder: "e.g. 10", required: true, group: "Discount Details" }
    ],
    tags: ["discount", "earlypayment", "invoice", "cashflow", "billing"]
  },
  {
    id: "purchase-order-agreement",
    subcategory: "Financial & Payment",
    title: "Purchase Order Agreement",
    description: "Standard terms and conditions governing corporate purchase orders (POs) sent to suppliers.",
    whenToUse: "Use this PO agreement template to bind suppliers to standard terms when issuing corporate purchase orders.",
    whatsCovered: [
      "Integration of purchase orders with vendor agreements",
      "Delivery schedules, packaging, and shipping rules",
      "Inspection, rejection, and product return timelines",
      "Warranty requirements for supplied hardware units",
      "Termination of purchase orders for delivery failures"
    ],
    specificFields: [
      { id: "po_delivery_days", label: "Maximum Delivery Window (Days)", type: "number", placeholder: "e.g. 30", required: true, group: "Timeline" }
    ],
    tags: ["purchaseorder", "po", "procurement", "sourcing", "vendor"]
  },
  {
    id: "credit-application-terms",
    subcategory: "Financial & Payment",
    title: "Credit Application & Terms",
    description: "Application form to check vendor business credit and establish trade credit limits.",
    whenToUse: "Use this credit application when offering credit terms to corporate buyers, allowing credit history checks.",
    whatsCovered: [
      "Consent to audit business credit history (D&B logs)",
      "Personal guarantee options for small business owners",
      "Default terms, debt recovery fees, and collection costs",
      "Interest rate for overdue accounts receivable",
      "Suspension of trade credit terms for late payments"
    ],
    specificFields: [
      { id: "initial_credit_limit", label: "Initial Credit Limit ($)", type: "currency", placeholder: "e.g. 25,000.00", required: true, group: "Limits" }
    ],
    tags: ["credit", "application", "dnb", "tradecredit", "finance"]
  },
  {
    id: "debt-repayment-agreement",
    subcategory: "Financial & Payment",
    title: "Debt Repayment Agreement",
    description: "Payment plan contract settling past-due invoices with structured weekly or monthly payments.",
    whenToUse: "Use this repayment plan contract when settling overdue balances with a vendor or customer to avoid litigation.",
    whatsCovered: [
      "Acknowledge of total outstanding debt amount",
      "Repayment schedules, installments, and payment methods",
      "Waiver of interest if repayments are made on schedule",
      "Acceleration clause: total debt becomes due on payment default",
      "Release of litigation claims upon final payment"
    ],
    specificFields: [
      { id: "total_debt_owed", label: "Total Outstanding Debt Owed ($)", type: "currency", placeholder: "e.g. 45,000.00", required: true, group: "Debt Details" },
      { id: "monthly_installment", label: "Monthly Repayment Amount ($)", type: "currency", placeholder: "e.g. 3,750.00", required: true, group: "Repayment Details" }
    ],
    tags: ["debt", "repayment", "paymentplan", "collection", "settlement"]
  },

  // --- Outsourcing & Operations (5) ---
  {
    id: "bpo-agreement",
    subcategory: "Outsourcing & Operations",
    title: "Business Process Outsourcing (BPO)",
    description: "Outsourcing agreement for back-office operations, detailing data handling rules and SLA metrics.",
    whenToUse: "Use this BPO agreement when outsourcing customer service, billing operations, or data entry tasks to a partner firm.",
    whatsCovered: [
      "Scope of outsourced business processes (billing, data entry)",
      "Quality assurance and performance SLA targets",
      "Data security compliance and CCPA/GDPR safety rules",
      "Office infrastructure and workforce redundancy plans",
      "Billing rate calculations (hourly or per-transaction)"
    ],
    specificFields: [
      { id: "bpo_scope", label: "Outsourced Business Scope", type: "textarea", placeholder: "e.g. Customer Billing Operations, Inbound Ticket Categorization, and Data Entry...", required: true, group: "Scope" }
    ],
    tags: ["bpo", "outsourcing", "backoffice", "sla", "vendor"]
  },
  {
    id: "call-center-services",
    subcategory: "Outsourcing & Operations",
    title: "Call Center Services Agreement",
    description: "Inbound or outbound call center services agreement outlining call quality SLA, handling times, and payment schedules.",
    whenToUse: "Use this contract when hiring a call center vendor to manage client telephone support or lead generation calls.",
    whatsCovered: [
      "Inbound call routing and average speed of answer (ASA) SLA",
      "Call script approval and training schedules",
      "Video/audio recording storage and quality audits",
      "Payment schedules based on minutes or ticket volume",
      "Prohibition on soliciting call center customer records"
    ],
    specificFields: [
      { id: "average_answer_seconds", label: "ASA SLA Guarantee (Seconds)", type: "number", placeholder: "e.g. 30", required: true, group: "SLA Metrics" }
    ],
    tags: ["callcenter", "support", "telephony", "customer-service", "outsourcing"]
  },
  {
    id: "logistics-shipping-agreement",
    subcategory: "Outsourcing & Operations",
    title: "Logistics & Shipping Agreement",
    description: "Freight forwarding and logistics contract detailing cargo weights, shipping rates, and liability for damaged freight.",
    whenToUse: "Use this logistics contract when hiring a freight carrier or logistics firm to move raw materials or finished products.",
    whatsCovered: [
      "Freight shipping rates, fuel surcharges, and weights",
      "Transit timeline SLA guarantees and delivery delay fees",
      "Cargo damage liability limits and cargo insurance requirements",
      "Incoterms coordination for customs entry points",
      "Freight claims procedures for lost packages"
    ],
    specificFields: [
      { id: "freight_liability_cap", label: "Freight Liability Cap ($/lb)", type: "text", placeholder: "e.g. 5.00", required: true, group: "Liability" }
    ],
    tags: ["logistics", "shipping", "freight", "cargo", "incoterms"]
  },
  {
    id: "warehousing-services-agreement",
    subcategory: "Outsourcing & Operations",
    title: "Warehousing Services Agreement",
    description: "Warehousing contract detailing storage dimensions, inventory tracking, and warehouse safety rules.",
    whenToUse: "Use this warehousing contract when leasing storage room or hiring a warehouse provider to store inventory.",
    whatsCovered: [
      "Warehouse storage dimensions and temperature requirements",
      "Inventory tracking records and audit access permissions",
      "Warehouse keeper's liability limits for lost goods",
      "Receiving and shipping processing turnaround SLA",
      "Insurance requirements for warehouse fire and theft"
    ],
    specificFields: [
      { id: "warehouse_keeper_liability_limit", label: "Keeper Liability Limit ($)", type: "currency", placeholder: "e.g. 100,000.00", required: true, group: "Liability" }
    ],
    tags: ["warehousing", "storage", "inventory", "liability", "logistics"]
  },
  {
    id: "fulfillment-services-agreement",
    subcategory: "Outsourcing & Operations",
    title: "Fulfillment Services Agreement",
    description: "Fulfillment contract for pick-and-pack services, shipping integrations, and product return processing.",
    whenToUse: "Use this fulfillment agreement when hiring a 3PL (Third-Party Logistics) firm to pack and ship e-commerce orders.",
    whatsCovered: [
      "Pick-and-pack fulfillment timelines and accuracy SLA",
      "Integration of e-commerce channels (Shopify, Amazon API)",
      "Shipping carrier coordination and discount rates",
      "Customer return processing and inspection guidelines",
      "Monthly storage rates and box packing fees"
    ],
    specificFields: [
      { id: "fulfillment_accuracy_sla", label: "Fulfillment Accuracy SLA (%)", type: "select", options: ["99.5", "99.8", "99.9"], defaultValue: "99.8", required: true, group: "SLA Metrics" }
    ],
    tags: ["fulfillment", "3pl", "ecommerce", "pick-pack", "logistics"]
  }
];

// Helper to format a single template object
function makeVendorTemplate(t) {
  let fields = [];
  let clauses = [];

  // standard fields for vendor
  fields = [
    { id: "company_name", label: "Purchasing Company Name", type: "text", placeholder: "e.g. CyberFlow Technologies Inc.", required: true, group: "Company Info" },
    { id: "company_address", label: "Company Office Address", type: "text", placeholder: "e.g. 100 Innovation Way, San Francisco, CA", required: true, group: "Company Info" },
    { id: "vendor_name", label: "Vendor / Supplier Name", type: "text", placeholder: "e.g. Globex Manufacturing Solutions", required: true, group: "Vendor Info" },
    { id: "vendor_address", label: "Vendor Address", type: "text", placeholder: "e.g. 500 Industrial Pkwy, Cleveland, OH", required: true, group: "Vendor Info" },
    ...(t.specificFields || []),
    { id: "effective_date", label: "Effective Date", type: "date", required: true, group: "Key Dates" },
    { id: "governing_state", label: "Governing Jurisdiction", type: "text", placeholder: "e.g. Delaware", required: true, group: "Legal Settings" }
  ];

  // generate clauses
  clauses = [
    {
      id: "intro",
      heading: t.title.toUpperCase(),
      body: `This procurement agreement (the "Agreement") is entered into as of {effective_date} (the "Effective Date"), by and between {company_name}, located at {company_address} (the "Company"), and {vendor_name}, located at {vendor_address} ("Vendor" or "Supplier").`,
      optional: false,
      enabledByDefault: true
    },
    {
      id: "general_provisions",
      heading: "1. Scope of Services & Materials",
      body: `This agreement sets out the supply specifications, technology licensing, financial payment terms, or compliance frameworks for ${t.title}. Vendor agrees to perform services or deliver goods matching the quality standards set out herein.`,
      optional: false,
      enabledByDefault: true
    }
  ];

  // Add specific clauses based on type
  if (t.id === 'sole-source-justification') {
    clauses.push({
      id: "justification_text",
      heading: "2. Technical Justification Covenants",
      body: "Company approves the sole source contract valued at {estimated_contract_value} due to unique supplier qualifications: {unique_specifications}. Standard bidding is waived.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'rfp-template') {
    clauses.push({
      id: "rfp_scope_timeline",
      heading: "2. Bid Submission Deadlines",
      body: "Vendors must submit proposals regarding: {project_scope} before the deadline {proposal_deadline}. Late bids will be disqualified. This RFP does not constitute an offer to buy.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'supplier-code-of-conduct') {
    clauses.push({
      id: "conduct_audits",
      heading: "2. Supplier Facility Audits",
      body: "Supplier agrees to ethical standards and child labor bans. Company reserves the right to audit Supplier's manufacturing facilities upon {audit_notice_hours} hours notice.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'raw-materials-supply') {
    clauses.push({
      id: "raw_supply_logistics",
      heading: "2. Material Shipments & Incoterms",
      body: "Supplier shall deliver raw materials: {material_description}. Shipping terms shall follow Incoterms: {incoterms_type}. Risk of loss transfers matching Incoterms rules.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'import-export-agreement') {
    clauses.push({
      id: "customs_tariffs_duties",
      heading: "2. International Trade Clearances",
      body: "Goods shall be exported from {origin_country} to {dest_country}. Exporter is responsible for custom clearances, and Importer shall pay all customs duties and tariffs.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'drop-shipping-agreement') {
    clauses.push({
      id: "fulfillment_turnaround",
      heading: "2. Dropshipping Turnaround SLAs",
      body: "Supplier shall fulfill customer orders within {fulfillment_sla_hours} hours. Returns sent back due to product defects carry a restocking fee of {restocking_fee_rate}%.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'consignment-agreement') {
    clauses.push({
      id: "consignment_commissions",
      heading: "2. Consignment Commision Splits",
      body: "Consignee shall display goods up to a limit of {inventory_limit} units. For each item sold, Consignee shall retain a commission of {consignment_commission}% of retail cost.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'vendor-performance-review') {
    clauses.push({
      id: "scorecard_reviews",
      heading: "2. Performance Audits",
      body: "Company shall perform vendor score audits on a {review_cycle} basis. Failure to meet quality targets triggers corrective action plans.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'eula-agreement') {
    clauses.push({
      id: "eula_license_terms",
      heading: "2. Revocable Application License",
      body: "Licensee is granted a revocable, non-exclusive license to use the app {software_app_name}. Copying or reverse engineering the software client is strictly prohibited.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'api-terms-of-use') {
    clauses.push({
      id: "api_rate_limiting",
      heading: "2. Developer Key Rate Limits",
      body: "Developer agrees to secure their API key. Integration calls are subject to rate limits of {rate_limit_calls} calls per minute. Excess calls may be throttled.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'beta-software-testing') {
    clauses.push({
      id: "beta_test_secrecy",
      heading: "2. Software Secrecy Covenants",
      body: "Tester agrees to test the pre-release software: {beta_software_title}. Tester is barred from posting screenshots, stream recordings, or reviews.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'open-source-contribution') {
    clauses.push({
      id: "contribution_clauses",
      heading: "2. Copyright and Patent Grants",
      body: "Contributor grants Company a permanent, non-exclusive copyright and patent license to distribute code contributions submitted to repo: {project_repo}.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'technology-transfer-agreement') {
    clauses.push({
      id: "patent_licensing_royalties",
      heading: "2. Technology License Royalty Fees",
      body: "Company licenses technology patent reference: {patent_reference}. Company shall pay Supplier a royalty of {royalty_rate}% on gross retail sales of licensed products.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'cloud-hosting-agreement') {
    clauses.push({
      id: "cloud_sla_backups",
      heading: "2. Cloud Uptime SLAs",
      body: "Provider guarantees a cloud server uptime SLA of {uptime_sla}%. System data backups shall be run on a {backup_cycle} schedule by the provider.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'managed-it-services') {
    clauses.push({
      id: "msp_scope_retainer",
      heading: "2. MSP Workstation Support Hours",
      body: "MSP shall perform network monitoring for a monthly fee of {msp_monthly_retainer}. Scope includes up to {support_hours} support hours per month.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'disaster-recovery-services') {
    clauses.push({
      id: "rto_metrics",
      heading: "2. Failover Restoration Targets",
      body: "Provider shall manage failover servers to meet a target Recovery Time Objective (RTO) of {rto_hours} hours. Failover test drills shall be run annually.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'gdpr-dpa') {
    clauses.push({
      id: "gdpr_processor_scope",
      heading: "2. EU GDPR Article 28 Standards",
      body: "Processor shall handle personal data categories: {data_types_processed}. Processor shall notify Controller of any subprocessor changes.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'ccpa-compliance') {
    clauses.push({
      id: "ccpa_restrictions",
      heading: "2. California CPRA Service Provider Rules",
      body: "Vendor certifies they act as Service Provider under {ccpa_framework_ref}. Vendor is prohibited from selling or sharing consumer personal data.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'iso-compliance-vendor') {
    clauses.push({
      id: "iso_requirements",
      heading: "2. ISO Quality Control Certificates",
      body: "Vendor shall maintain active certification matching: {iso_standard}. Vendor shall supply copies of certificate audit logs upon request.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'cybersecurity-vendor-agreement') {
    clauses.push({
      id: "cyber_auditing",
      heading: "2. MFA and Vulnerability Auditing",
      body: "Vendor shall enforce MFA and encrypt data at rest. Vendor shall undergo third-party penetration testing on a {pentest_cycle} basis.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'third-party-audit-agreement') {
    clauses.push({
      id: "audit_remediations",
      heading: "2. Remediation Timelines",
      body: "Auditors shall inspect vendor networks. Vendor agrees to remediate critical security alerts within {remediation_days} days of receiving audit reports.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'data-breach-notification') {
    clauses.push({
      id: "breach_notice_sla",
      heading: "2. Incident Reporting Hours",
      body: "Vendor shall notify Company of database breaches within {breach_notice_hours} hours of discovery. Vendor is responsible for notification costs.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'information-security-agreement') {
    clauses.push({
      id: "security_log_retention",
      heading: "2. Information Security Log Retention",
      body: "Vendor shall enforce least privilege access controls. Network access logs shall be stored for a minimum retention of {log_retention_years} years.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'invoice-factoring-agreement') {
    clauses.push({
      id: "factoring_advance_rates",
      heading: "2. Receivables Factoring Advance Fees",
      body: "Factor shall buy receivables invoices, providing an advance of {advance_rate}% of value. Factoring fee rate is established at {factoring_fee}%.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'revenue-based-financing') {
    clauses.push({
      id: "rbf_repayment_caps",
      heading: "2. Revenue Repayment Rates",
      body: "Funder provides capital of {financing_principal}. Startup shall repay the capital at a monthly rate of {repayment_percentage}% of gross sales up to the cap: {repayment_cap_multiplier}.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'net-60-payment-terms') {
    clauses.push({
      id: "net_60_interest",
      heading: "2. Late Payment Interest Penalties",
      body: "Invoice payment terms are Net 60 days. Overdue invoice balances carry late payment interest at {late_interest_rate}% per annum.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'early-payment-discount') {
    clauses.push({
      id: "early_pay_terms",
      heading: "2. Invoice Early Pay Discounts",
      body: "Client is eligible for a discount of {early_discount_rate}% on invoices if payment is settled within {early_discount_days} days of invoice date.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'purchase-order-agreement') {
    clauses.push({
      id: "po_delivery_deadlines",
      heading: "2. Purchase Order Fulfillment Timelines",
      body: "Supplier shall fulfill issued corporate purchase orders within a maximum delivery window of {po_delivery_days} days of PO receipt.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'credit-application-terms') {
    clauses.push({
      id: "credit_limits",
      heading: "2. Trade Credit Limits",
      body: "Company approves trade credit application, establishing an initial credit limit of {initial_credit_limit}. Overdue accounts suspend credit privileges.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'debt-repayment-agreement') {
    clauses.push({
      id: "debt_instalments",
      heading: "2. Structured Debt Installments",
      body: "Client acknowledges total outstanding debt of {total_debt_owed}. Client agrees to pay monthly installments of {monthly_installment} until settled.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'bpo-agreement') {
    clauses.push({
      id: "bpo_scope_details",
      heading: "2. Outsourced Processes",
      body: "Provider shall manage business processes: {bpo_scope}. Provider shall follow data processing and billing schedules outlined in the appendices.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'call-center-services') {
    clauses.push({
      id: "call_center_sla",
      heading: "2. Speed of Answer SLAs",
      body: "Call center shall answer customer support calls to meet average speed of answer (ASA) SLA of {average_answer_seconds} seconds.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'logistics-shipping-agreement') {
    clauses.push({
      id: "logistics_freight_liability",
      heading: "2. Cargo Damage Liability Caps",
      body: "Carrier shall forward cargo shipments. Cargo damage liability limits are capped at {freight_liability_cap} per pound of cargo weight.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'warehousing-services-agreement') {
    clauses.push({
      id: "warehouse_insurance_limits",
      heading: "2. Warehouse Keeper Liability Limits",
      body: "Warehouse keeper shall store inventory shipments. Keeper's liability limit for fire/theft damage is capped at {warehouse_keeper_liability_limit}.",
      optional: false,
      enabledByDefault: true
    });
  }

  if (t.id === 'fulfillment-services-agreement') {
    clauses.push({
      id: "fulfillment_sla_targets",
      heading: "2. Fulfillment Pick and Pack Accuracy",
      body: "Fulfillment provider shall pack e-commerce shipments to meet pick-and-pack accuracy SLA of {fulfillment_accuracy_sla}%.",
      optional: false,
      enabledByDefault: true
    });
  }

  // Standard common endings
  clauses.push(
    {
      id: "compliance_checks",
      heading: "Compliance & Dispute Resolution",
      body: "Both parties agree to handle transactions in compliance with local commercial codes. Disputes shall be resolved through binding arbitration under the rules of the American Arbitration Association.",
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
    category: "vendor",
    subcategory: t.subcategory,
    title: t.title,
    description: t.description,
    whatsCovered: t.whatsCovered || [
      "Technical specifications, milestones, and deliverables",
      "Payment schedules, invoice billing, and default fees",
      "Data privacy compliance under CCPA and GDPR addendums",
      "Workplace security, hosting SLAs, and liability limits",
      "Standard governing law and dispute arbitration paths"
    ],
    whenToUse: t.whenToUse,
    jurisdictions: ["US", "UK", "CA", "EU"],
    lastReviewedAt: "2026-05-23",
    reviewerName: "Robert Vance, Esq.",
    estimatedFillMinutes: t.estimatedFillMinutes || 3,
    fields: fields,
    clauses: clauses,
    relatedTemplates: t.relatedTemplates || ["vendor-agreement", "service-level-agreement"],
    faq: t.faq || [
      { question: "How do I customize this procurement template?", answer: "You can edit this template online and append custom schedules detailing material spec sheets or IT SLA metrics." },
      { question: "Is this agreement binding?", answer: "Yes, once signed by authorized corporate procurement officers, it becomes a legally binding commercial contract." }
    ],
    tags: t.tags || ["vendor", "procurement", "sourcing", "sla"]
  };
}

// Generate files
newTemplates.forEach((t) => {
  const formatted = makeVendorTemplate(t);
  const filePath = path.join(outputDir, `${formatted.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(formatted, null, 2), 'utf8');
  console.log(`Successfully wrote template: ${formatted.id}`);
});

console.log('Finished writing Vendor templates!');
