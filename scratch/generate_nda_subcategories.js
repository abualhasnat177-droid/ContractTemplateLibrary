const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '..', 'content', 'templates', 'nda');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 1. Update existing NDA files with "Standard NDAs" subcategory
const existingFiles = ["employee-nda.json", "mutual-nda.json", "unilateral-nda.json"];
existingFiles.forEach((fileName) => {
  const filePath = path.join(outputDir, fileName);
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, 'utf8');
    try {
      const parsed = JSON.parse(raw);
      parsed.subcategory = "Standard NDAs";
      fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2), 'utf8');
      console.log(`Updated subcategory for existing: ${fileName} -> Standard NDAs`);
    } catch (e) {
      console.error(`Error updating existing file: ${fileName}`, e);
    }
  }
});

// 2. Define the 25 new templates
const newTemplates = [
  // --- Industry-Specific ---
  {
    id: "real-estate-nda",
    subcategory: "Industry-Specific",
    title: "Real Estate NDA",
    description: "A unilateral confidentiality agreement designed specifically for real estate transactions, property evaluations, and negotiations.",
    whenToUse: "Use this confidentiality agreement when disclosing commercial or residential property financial statements, lease rolls, or blueprints to potential buyers, brokers, or investors.",
    whatsCovered: [
      "Definition of real estate assets and tenant lease records",
      "Protection of architectural blueprints and structural evaluations",
      "Non-circumvention of real estate brokers and agents",
      "Standard exclusions from confidentiality",
      "Injunction remedies for breach of secrecy"
    ],
    specificFields: [
      { id: "property_address", label: "Property Street Address", type: "text", placeholder: "e.g. 123 Commercial Pkwy, Suite A, New York, NY", required: true, group: "Property Info" }
    ],
    tags: ["real-estate", "nda", "property", "confidentiality", "broker"],
    faq: [
      { question: "What is a non-circumvention clause in a real estate NDA?", answer: "It prevents the receiving party from bypassing the broker or discloser to strike a direct deal with the property owner, seller, or lender." },
      { question: "Does this cover physical property inspections?", answer: "Yes, it protects any information, findings, or documents obtained during on-site structural inspections, environmental surveys, or tenant reviews." }
    ]
  },
  {
    id: "financial-services-nda",
    subcategory: "Industry-Specific",
    title: "Financial Services NDA",
    description: "A highly secure NDA tailored for financial institutions, investment funds, and bank deals protecting proprietary financial algorithms, modeling, and client assets.",
    whenToUse: "Use this agreement when sharing proprietary trading models, asset allocation algorithms, portfolio datasets, or client portfolios with prospective partners, auditors, or advisors.",
    whatsCovered: [
      "Protection of proprietary trading algorithms and financial data",
      "Restrictions on contacting financial clients and institutions",
      "Regulatory compliance with SEC and FINRA data standards",
      "Survival term of financial secrecy",
      "Injunctive relief for database breaches"
    ],
    specificFields: [
      { id: "financial_assets", label: "Financial Asset Class / Program", type: "text", placeholder: "e.g. Algorithmic High-Frequency Equity Trading Models", required: true, group: "Financial Details" }
    ],
    tags: ["financial", "banking", "investment", "sec", "nda"],
    faq: [
      { question: "What is MNPI?", answer: "Material Non-Public Information. In financial deals, leaking MNPI is a violation of federal securities laws (insider trading) and this NDA holds parties liable for such compliance." },
      { question: "How long should a financial services NDA last?", answer: "Due to the fast-moving nature of financial markets, 2 to 3 years is standard, though trade secret algorithms are protected indefinitely." }
    ]
  },
  {
    id: "manufacturing-nda",
    subcategory: "Industry-Specific",
    title: "Manufacturing NDA",
    description: "Tailored for product manufacturing agreements, protecting tool designs, raw material formulas, supplier lists, and production facility blueprints.",
    whenToUse: "Use this agreement when sending prototype designs, CAD files, material formulas, or factory assembly drawings to a third-party manufacturer or supplier.",
    whatsCovered: [
      "Blueprints, CAD drawings, and material spec sheets",
      "Patent-pending prototype design protections",
      "Tooling and factory floor assembly safeguards",
      "Prohibition on reverse-engineering components",
      "Dispute resolution venue for supply conflicts"
    ],
    specificFields: [
      { id: "product_prototype", label: "Prototype / Product Name", type: "text", placeholder: "e.g. Model X Solar Battery Case", required: true, group: "Product Details" }
    ],
    tags: ["manufacturing", "prototype", "hardware", "cad", "nda"],
    faq: [
      { question: "Why is a reverse-engineering ban important?", answer: "Without this clause, a manufacturer could buy your finished product, take it apart, and copy your design without breaching a simple non-disclosure agreement." },
      { question: "Does this cover mold tooling designs?", answer: "Yes. It specifically protects molds, casts, tooling files, and assembly line setups shared during pre-production." }
    ]
  },
  {
    id: "legal-services-nda",
    subcategory: "Industry-Specific",
    title: "Legal Services NDA",
    description: "Designed for legal consulting, co-counsel arrangements, or legal tech audits, highlighting attorney-client privilege boundaries.",
    whenToUse: "Use this NDA when hiring external legal advisors, co-counsel, or legal software vendors who will have access to sensitive client files or pending litigation plans.",
    whatsCovered: [
      "Preservation of attorney-client privilege and work-product",
      "Restrictions on sharing legal defense files",
      "Client case file protection protocols",
      "Ethical obligations and professional rules",
      "Remedies for unauthorized disclosure of litigation details"
    ],
    specificFields: [
      { id: "case_matter", label: "Legal Matter / Case Reference", type: "text", placeholder: "e.g. Client X Acquisition Dispute", required: true, group: "Legal Matter" }
    ],
    tags: ["legal", "attorney", "litigation", "privilege", "nda"],
    faq: [
      { question: "Does this replace the standard attorney-client privilege?", answer: "No, it acts as a supplementary contract to explicitly define case folders and safeguard files shared with non-lawyer legal tech services or consultants." },
      { question: "Can this be used for co-counsel relationships?", answer: "Yes, this is ideal for co-counsel sharing discovery documents or trial strategies in a joint defense agreement." }
    ]
  },
  {
    id: "government-contractor-nda",
    subcategory: "Industry-Specific",
    title: "Government Contractor NDA",
    description: "Structured for subcontractors working on municipal or federal agency projects, protecting government-controlled unclassified information.",
    whenToUse: "Use this contract when partner firms or subcontractors are bidding on or executing a government contract and will have access to sensitive agency data or bid rates.",
    whatsCovered: [
      "Federal and municipal bid pricing sheets",
      "Unclassified government-controlled datasets",
      "Compliance with FAR and DFARS regulations",
      "Subcontractor clearance checkups",
      "Security incident reporting protocols"
    ],
    specificFields: [
      { id: "gov_agency", label: "Government Agency & Contract #", type: "text", placeholder: "e.g. Department of Energy, Contract #DE-FOA-12345", required: true, group: "Government Contract" }
    ],
    tags: ["government", "far", "subcontractor", "contracting", "nda"],
    faq: [
      { question: "What is FAR compliance in this NDA?", answer: "It refers to the Federal Acquisition Regulation, which mandates strict procedures for subcontractors handling proprietary developer and government information." },
      { question: "Is this suitable for classified military information?", answer: "No, classified information requires official government clearance agreements (e.g., DD Form 254) rather than a commercial NDA." }
    ]
  },
  {
    id: "franchise-nda",
    subcategory: "Industry-Specific",
    title: "Franchise NDA",
    description: "Designed for prospective franchisees exploring purchase opportunities, protecting franchise operations manual and unit economics.",
    whenToUse: "Use this NDA before disclosing operations manuals, software licenses, local marketing formulas, or sales numbers to prospective franchise buyers.",
    whatsCovered: [
      "Franchise operations manuals and recipes",
      "Unit-level financial metrics and site analytics",
      "Territory mapping and zoning strategies",
      "Return of manuals upon evaluation termination",
      "Restrictions on opening competing units during evaluation"
    ],
    specificFields: [
      { id: "franchise_brand", label: "Franchise Brand / System", type: "text", placeholder: "e.g. QuickBite Coffee Franchise System", required: true, group: "Franchise Brand" }
    ],
    tags: ["franchise", "retail", "business", "manuals", "nda"],
    faq: [
      { question: "What parts of the operations manual are covered?", answer: "Everything: training schedules, recipes, vendor contacts, POS setups, and localized marketing plays." },
      { question: "How long should a franchise NDA last?", answer: "Usually 3 to 5 years, or indefinitely for core brand recipes, proprietary systems, and software configurations." }
    ]
  },
  {
    id: "entertainment-film-production-nda",
    subcategory: "Industry-Specific",
    title: "Entertainment / Film Production NDA",
    description: "Protects scripts, castings, concept art, and filming schedules from public leaks and social media disclosures.",
    whenToUse: "Use this agreement before sharing scripts, screenplays, concept art, cast files, or budget sheets with actors, directors, investors, or crew members.",
    whatsCovered: [
      "Script, screenplay, and storyboard secrecy",
      "Social media blackout and photo prohibition",
      "On-set filming locations and schedule details",
      "Liquidated damages for plot leaks",
      "Public relations and press release rules"
    ],
    specificFields: [
      { id: "production_title", label: "Project Screenplay / Title", type: "text", placeholder: "e.g. 'Project Starlight' Feature Film", required: true, group: "Production Info" }
    ],
    tags: ["film", "entertainment", "script", "socialmedia", "nda"],
    faq: [
      { question: "Why is a social media blackout clause necessary?", answer: "In the modern film industry, casual photos of sets, scripts, or costumes posted on Instagram or TikTok by crew members can ruin marketing campaigns and breach major studio contracts." },
      { question: "Does this cover casting auditions?", answer: "Yes. It protects audition dialogue (sides), casting results, and script details shared with actors during tryouts." }
    ]
  },
  {
    id: "pharmaceutical-nda",
    subcategory: "Industry-Specific",
    title: "Pharmaceutical NDA",
    description: "A high-grade NDA for drug discovery, clinical trial data, and proprietary chemical formulas.",
    whenToUse: "Use this NDA when sharing chemical syntheses, laboratory journals, raw assay results, or clinical trial documents with research organizations or manufacturing partners.",
    whatsCovered: [
      "Chemical compounds and molecular formulations",
      "Pre-clinical and clinical trial data charts",
      "FDA regulatory filing documents",
      "Strict intellectual property reservation",
      "Security protocols for lab records"
    ],
    specificFields: [
      { id: "compound_code", label: "Chemical Compound / Drug Code", type: "text", placeholder: "e.g. Molecular Compound PB-402", required: true, group: "Compound Info" }
    ],
    tags: ["pharmaceutical", "biotech", "fda", "science", "nda"],
    faq: [
      { question: "Does this NDA grant any patents or licensing rights?", answer: "No. It explicitly states that sharing information is for research/evaluation only and transfers no intellectual property." },
      { question: "Are lab notebooks protected?", answer: "Yes, physical lab notes, assay records, chemical structures, and digital server storage containing raw research data are protected." }
    ]
  },
  {
    id: "cybersecurity-nda",
    subcategory: "Industry-Specific",
    title: "Cybersecurity NDA",
    description: "Tailored for security audits, vulnerability scanning, and penetration testing, safeguarding network maps and security reports.",
    whenToUse: "Use this NDA when hiring external ethical hackers, security firms, or cloud auditors who will gain access to your internal networks, firewall settings, or server logs.",
    whatsCovered: [
      "Internal network topology and IP address lists",
      "Vulnerability reports and penetration test findings",
      "System credentials, API tokens, and access logs",
      "Encrypted storage requirements for audit files",
      "Immediate breach notifications"
    ],
    specificFields: [
      { id: "audit_scope", label: "Security Audit Target Network", type: "text", placeholder: "e.g. AWS Cloud Infrastructure and Corporate VPN", required: true, group: "Audit Scope" }
    ],
    tags: ["cybersecurity", "audit", "network", "penetration", "nda"],
    faq: [
      { question: "Why do we need a cybersecurity-specific NDA?", answer: "Because standard NDAs don't address network vulnerability reports, which are essentially blueprints of how to hack your business if leaked." },
      { question: "How must audit findings be stored?", answer: "This template requires auditors to encrypt all reports at rest and delete client system credentials immediately after auditing." }
    ]
  },
  {
    id: "nonprofit-nda",
    subcategory: "Industry-Specific",
    title: "Nonprofit NDA",
    description: "Protects donor lists, grant proposals, and volunteer data for charitable organizations.",
    whenToUse: "Use this NDA before sharing donor CRM profiles, grant writing blueprints, or volunteer contact files with advisors, fundraisers, or consultants.",
    whatsCovered: [
      "Donor names, contact details, and gift histories",
      "Proprietary grant writing proposals and strategies",
      "Compliance with charitable solicitation laws",
      "Exclusion for public tax declarations",
      "Non-solicitation of major donors"
    ],
    specificFields: [
      { id: "charity_program", label: "Charitable Program / Initiative", type: "text", placeholder: "e.g. 2026 Global Clean Water Initiative", required: true, group: "Nonprofit Info" }
    ],
    tags: ["nonprofit", "donor", "charity", "grant", "nda"],
    faq: [
      { question: "Why do nonprofits need a donor-specific NDA?", answer: "Donor databases are the most valuable assets of a charity. Leaked donor lists can result in rival charities soliciting your primary sponsors." },
      { question: "Are publicly disclosed tax documents covered?", answer: "No, IRS filings like Form 990, which are public documents under federal tax law, are excluded from confidentiality obligations." }
    ]
  },

  // --- Situation-Specific ---
  {
    id: "interview-hiring-process-nda",
    subcategory: "Situation-Specific",
    title: "Interview / Hiring Process NDA",
    description: "Signed by job candidates prior to interviewing, protecting sensitive pre-release products or company codebases discussed.",
    whenToUse: "Use this NDA when interviewing job candidates for roles that require reviewing your unreleased software, product roadmaps, or private repositories.",
    whatsCovered: [
      "Unreleased software features and code bases",
      "Company financial targets and roadmap schedules",
      "Prohibition on sharing technical interview challenges",
      "Standard confidentiality exemptions",
      "Immediate return of trial project details"
    ],
    specificFields: [
      { id: "candidate_role", label: "Target Candidate Role", type: "text", placeholder: "e.g. Senior Software Architect", required: true, group: "Candidate Details" }
    ],
    tags: ["interview", "hiring", "hr", "candidate", "nda"],
    faq: [
      { question: "Can candidates talk about their interview experience on Glassdoor?", answer: "They can discuss the general interview atmosphere, but this NDA strictly prohibits them from leaking the exact code challenges or secret product roadmaps they reviewed." },
      { question: "What happens to the homework trial project they submit?", answer: "This template confirms that company-specific trials or coding exercises are proprietary and cannot be published or shared online." }
    ]
  },
  {
    id: "board-member-nda",
    subcategory: "Situation-Specific",
    title: "Board Member NDA",
    description: "For newly appointed advisory or governing board members, protecting quarterly board decks and strategic planning documents.",
    whenToUse: "Use this agreement when appointing board directors, advisory members, or trustees who will review corporate financials, board decks, and strategy documents.",
    whatsCovered: [
      "Quarterly board decks and strategic planning files",
      "Merger, acquisition, and funding discussions",
      "Executive team performance reviews and salary lists",
      "Strict public relations blackout rules",
      "Immediate return of physical notebooks"
    ],
    specificFields: [
      { id: "board_company", label: "Company / Board Designation", type: "text", placeholder: "e.g. Acme Corp Board of Directors", required: true, group: "Board Info" }
    ],
    tags: ["board", "advisor", "corporate", "director", "nda"],
    faq: [
      { question: "Why do directors need a separate board NDA?", answer: "Board discussions cover highly confidential corporate decisions, M&A prospects, executive compensation, and audits, which are not protected under employee contracts." },
      { question: "Does this NDA expire after they leave the board?", answer: "No, confidentiality obligations survive the termination of their board membership, particularly for corporate trade secrets and financial archives." }
    ]
  },
  {
    id: "joint-venture-nda",
    subcategory: "Situation-Specific",
    title: "Joint Venture NDA",
    description: "A mutual confidentiality agreement signed before co-developing a new product line or launching a joint venture entity.",
    whenToUse: "Use this mutual NDA when two companies are exploring a joint venture, shared service line, or mutual technology integration.",
    whatsCovered: [
      "Bilateral exchange of corporate proprietary files",
      "Restrictions on hiring partner's project engineers",
      "IP rights in joint prototypes built during review",
      "Dispute resolution under AAA arbitration rules",
      "Joint venture setup timeline confidentiality"
    ],
    specificFields: [
      { id: "jv_project", label: "Joint Venture Project Name", type: "text", placeholder: "e.g. Project GreenEnergy Hydrogen Cells", required: true, group: "JV Details" }
    ],
    tags: ["jointventure", "mutual", "partnership", "integration", "nda"],
    faq: [
      { question: "Is this a one-way or mutual NDA?", answer: "This is a mutual (bilateral) NDA, protecting both parties as they exchange proprietary technologies and pricing spreadsheets." },
      { question: "Who owns the intellectual property created during the evaluation?", answer: "This agreement specifies that any technology or designs created while exploring the JV are jointly owned, preventing either side from running away with the ideas." }
    ]
  },
  {
    id: "white-label-nda",
    subcategory: "Situation-Specific",
    title: "White-Label NDA",
    description: "Protects the underlying source technology, branding secrets, and software architecture behind white-labeled product partnerships.",
    whenToUse: "Use this NDA when entering software or manufacturing white-label setups, where you license your technology to be rebranded by another party.",
    whatsCovered: [
      "Source technology and application codebases",
      "End-user pricing models and markup guidelines",
      "Anonymity of the software developers and hosting",
      "Prohibition on revealing the original brand",
      "Remedies for platform brand leaks"
    ],
    specificFields: [
      { id: "whitelabel_software", label: "White-Label Software / Product", type: "text", placeholder: "e.g. Zenith Cloud CRM Platform", required: true, group: "Product Details" }
    ],
    tags: ["whitelabel", "software", "reseller", "branding", "nda"],
    faq: [
      { question: "What is the primary goal of a white-label NDA?", answer: "To ensure that resellers or partners do not disclose the origin of the technology, protecting the developer's core brand and sales operations." },
      { question: "Can partners copy the underlying source code?", answer: "No, copying, decompiling, or hosting the source systems on unapproved servers constitutes a major contract breach." }
    ]
  },
  {
    id: "beta-tester-nda",
    subcategory: "Situation-Specific",
    title: "Beta Tester NDA",
    description: "Signed by beta users testing a pre-release application or hardware device, prohibiting screenshots, reviews, and feature leaks.",
    whenToUse: "Use this NDA when inviting external users, QA specialists, or focus groups to test your unreleased mobile app, website, or hardware prototype.",
    whatsCovered: [
      "Pre-release application screens and features",
      "Ban on screenshots, screen captures, or stream recordings",
      "Bug reports and platform diagnostic data",
      "Exclusion for public release announcements",
      "Tester waiver of compensation"
    ],
    specificFields: [
      { id: "beta_software", label: "Beta Software / Product Name", type: "text", placeholder: "e.g. InnovateApp iOS Beta v2.0", required: true, group: "Beta Details" }
    ],
    tags: ["betatester", "software", "qa", "screenshots", "nda"],
    faq: [
      { question: "Are testers allowed to publish blog reviews?", answer: "No. Under this agreement, they are strictly barred from posting screenshots, videos, or performance metrics on blogs or forums." },
      { question: "Does this agreement grant testers compensation?", answer: "No, this template states that testing is voluntary and does not imply employment or cash royalties unless added in an appendix." }
    ]
  },
  {
    id: "influencer-creator-nda",
    subcategory: "Situation-Specific",
    title: "Influencer / Creator NDA",
    description: "Safeguards upcoming product campaigns, video drafts, and launch timelines shared with influencers before public release.",
    whenToUse: "Use this NDA before sending prototype samples, unreleased promotional campaigns, or sponsor scripts to content creators or social media managers.",
    whatsCovered: [
      "Product launch schedules and pricing maps",
      "Campaign briefs, promotional scripts, and storyboards",
      "Raw video clips and unedited review files",
      "Social media publication blackout dates",
      "Strict brand messaging guidelines"
    ],
    specificFields: [
      { id: "campaign_name", label: "Campaign / Product Launch Name", type: "text", placeholder: "e.g. Summer Activewear 2026 Launch", required: true, group: "Campaign Details" }
    ],
    tags: ["influencer", "creator", "marketing", "embargo", "nda"],
    faq: [
      { question: "What is an embargo date?", answer: "It is the specific date and hour before which the creator is legally banned from posting or mentioning the sponsor's products on their social feeds." },
      { question: "Are creators allowed to share products with family?", answer: "No, they must treat the physical prototypes with strict secrecy and store them in secure, private rooms." }
    ]
  },
  {
    id: "client-onboarding-nda",
    subcategory: "Situation-Specific",
    title: "Client Onboarding NDA",
    description: "Built for service providers onboarding high-profile clients, ensuring client proprietary data remains secure during delivery.",
    whenToUse: "Use this agreement when onboarding a new consulting, marketing, or development client to assure them that their business details will remain secure.",
    whatsCovered: [
      "Onboarding questionnaires and business metrics",
      "Client databases, credentials, and source files",
      "Service provider employee security guidelines",
      "Return of client credentials upon exit",
      "Limitation of liability for server breaches"
    ],
    specificFields: [
      { id: "service_onboarding", label: "Onboarding Services Scope", type: "text", placeholder: "e.g. Enterprise SEO and Cloud Database Migration", required: true, group: "Service Details" }
    ],
    tags: ["onboarding", "client", "consulting", "agency", "nda"],
    faq: [
      { question: "Why should we sign this before the master services agreement?", answer: "Clients are hesitant to share details like database passwords, advertising accounts, and customer logs without this explicit protection in place." },
      { question: "Who on my team is bound by this NDA?", answer: "This template extends the confidentiality obligations downstream to your employees, contractors, and hosting engineers." }
    ]
  },
  {
    id: "exit-offboarding-nda",
    subcategory: "Situation-Specific",
    title: "Exit / Offboarding NDA",
    description: "Signed during employee separation to reinforce intellectual property transition and ongoing post-employment confidentiality.",
    whenToUse: "Use this document during employee offboarding to confirm the return of company property, remind them of post-employment NDA terms, and clear IP rights.",
    whatsCovered: [
      "Formal return of company laptops, cards, and logins",
      "Ongoing protection of corporate trade secrets",
      "Agreement not to disparage company products",
      "IP assignment reaffirmation",
      "Severance package eligibility guidelines"
    ],
    specificFields: [
      { id: "separation_date", label: "Final Separation Date", type: "date", required: true, group: "Separation Info" }
    ],
    tags: ["exit", "offboarding", "hr", "severance", "nda"],
    faq: [
      { question: "Does this replace their original hiring NDA?", answer: "No, it reinforces the original NDA, clarifies which trade secrets they accessed, and lists the company-owned hardware that must be returned." },
      { question: "Can this be tied to a severance payment?", answer: "Yes, signing this offboarding agreement is frequently a condition for releasing the employee's severance package." }
    ]
  },
  {
    id: "trade-show-event-nda",
    subcategory: "Situation-Specific",
    title: "Trade Show / Event NDA",
    description: "Protects proprietary designs and trade secrets shared with event staff or prospective buyers at trade shows and industry expos.",
    whenToUse: "Use this short, fast NDA at exhibitions, trade shows, or private event rooms before demonstrating unreleased products or prototypes.",
    whatsCovered: [
      "Product demo features and trade show displays",
      "Waiver of patent priority claiming for public display",
      "Prohibition on taking photos or recording demos",
      "Return of printed product brochures",
      "Standard governing law for event state"
    ],
    specificFields: [
      { id: "event_name", label: "Trade Show / Event Name", type: "text", placeholder: "e.g. CES 2026 Las Vegas", required: true, group: "Event Details" }
    ],
    tags: ["tradeshow", "event", "ces", "demo", "nda"],
    faq: [
      { question: "Why is a trade show NDA necessary?", answer: "If you show a new product to an un-contracted person at a public expo, it may count as a public disclosure, which can void your patent eligibility in foreign jurisdictions." },
      { question: "Is this template brief?", answer: "Yes, it is condensed into a high-speed format suitable for quick digital signatures on a tablet or mobile screen." }
    ]
  },
  {
    id: "due-diligence-nda",
    subcategory: "Situation-Specific",
    title: "Due Diligence NDA",
    description: "Protects sensitive books, tax records, and asset lists disclosed during M&A or business purchase negotiations.",
    whenToUse: "Use this high-security NDA before letting prospective buyers, investors, or accounting firms inspect your corporate books, tax filings, and code during due diligence.",
    whatsCovered: [
      "Corporate financial books, tax filings, and cap tables",
      "Client lists, sales rates, and employee salary sheets",
      "Data room access and copy restriction rules",
      "Destruction of files if deal falls through",
      "Non-solicitation of key managers during review"
    ],
    specificFields: [
      { id: "target_company", label: "Target Company for Acquisition", type: "text", placeholder: "e.g. InnovateTech Solutions Inc.", required: true, group: "M&A Details" }
    ],
    tags: ["duediligence", "ma", "acquisition", "funding", "nda"],
    faq: [
      { question: "What is a virtual data room (VDR) clause?", answer: "It dictates that all financial audit logs and source code audits must remain inside the secure web portal, restricting the recipient's ability to download copies." },
      { question: "What happens if M&A negotiations fail?", answer: "This NDA mandates that the receiving party must destroy or return all financial archives and tax logs within 10 days of discussions breaking off." }
    ]
  },

  // --- Format Variants ---
  {
    id: "multi-party-nda",
    subcategory: "Format Variants",
    title: "Multi-party NDA (3+ parties)",
    description: "A tripartite or multiparty NDA to protect confidential information shared among three or more participating entities.",
    whenToUse: "Use this NDA when three or more distinct businesses or individuals are participating in discussions together and sharing confidential data.",
    whatsCovered: [
      "Tripartite confidentiality covenants",
      "Equal protection for all disclosing and receiving parties",
      "Standard exclusions from confidentiality",
      "Term of protection and return of materials",
      "Joint and several liability for data leaks"
    ],
    specificFields: [
      { id: "party_c_name", label: "Party C Company/Individual Name", type: "text", placeholder: "e.g. Zenith Consulting LLC", required: true, group: "Parties" },
      { id: "party_c_address", label: "Party C Address", type: "text", placeholder: "e.g. 700 Summit Ave, Seattle, WA", required: true, group: "Parties" }
    ],
    tags: ["multiparty", "tripartite", "group", "nda"],
    faq: [
      { question: "What is the difference between a bilateral and multiparty NDA?", answer: "Bilateral is between 2 parties. Multiparty (tripartite) covers 3 or more parties, saving everyone from signing multiple separate agreements." },
      { question: "Does a breach by one party release the others?", answer: "No. If one party leaks files, the other parties remain bound to protect the discloser's secrets under this contract." }
    ]
  },
  {
    id: "nda-non-compete-clause",
    subcategory: "Format Variants",
    title: "NDA with Non-Compete Clause",
    description: "Protects sensitive secrets and includes a restricted covenants section preventing the recipient from direct competition.",
    whenToUse: "Use this contract when sharing a business plan or technology where it is vital that the receiving party cannot launch a competing business using your ideas.",
    whatsCovered: [
      "Confidentiality of proprietary business plans",
      "Non-compete covenant within specified regions",
      "Duration of non-compete restrictions",
      "Exceptions for pre-existing businesses",
      "Liquidated damages for competitive breach"
    ],
    specificFields: [
      { id: "compete_months", label: "Non-Compete Term (Months)", type: "number", placeholder: "e.g. 12", required: true, group: "Restrictive Covenants" },
      { id: "compete_region", label: "Geographic Scope", type: "text", placeholder: "e.g. North America", required: true, group: "Restrictive Covenants" }
    ],
    tags: ["noncompete", "covenant", "restrictive", "nda"],
    faq: [
      { question: "Is a non-compete clause in an NDA enforceable?", answer: "Enforceability depends on your state. Generally, courts require the duration to be short (e.g. 1 year) and the geographic region to be reasonable." },
      { question: "Can a contractor work for my competitor under this NDA?", answer: "Under this specific template, they are restricted from engaging with direct competitors in the designated region for the contract term." }
    ]
  },
  {
    id: "nda-non-solicitation-clause",
    subcategory: "Format Variants",
    title: "NDA with Non-Solicitation Clause",
    description: "Confidentiality agreement containing a strict non-solicitation clause for clients, suppliers, and personnel.",
    whenToUse: "Use this agreement when you are worried that the receiving party might try to hire your employees or contract your clients after reviewing your business details.",
    whatsCovered: [
      "Confidentiality of business operations",
      "Non-solicitation of employees and contractors",
      "Non-solicitation of clients and key accounts",
      "Liquidated damages per solicited employee",
      "Audit rights for hiring logs"
    ],
    specificFields: [
      { id: "solicit_months", label: "Non-Solicitation Term (Months)", type: "number", placeholder: "e.g. 12", required: true, group: "Restrictive Covenants" }
    ],
    tags: ["nonsolicit", "staff", "clients", "covenant", "nda"],
    faq: [
      { question: "What is employee poaching under this contract?", answer: "It refers to the receiving party directly or indirectly recruiting or hiring your engineers, designers, or consultants introduced during talks." },
      { question: "Can we still recruit each other's staff via public job postings?", answer: "Yes, standard non-solicitation clauses allow hires resulting from general, public employment ads that aren't targeted." }
    ]
  },
  {
    id: "short-form-nda",
    subcategory: "Format Variants",
    title: "Short-Form NDA (1-page)",
    description: "A simplified, single-page confidentiality agreement for fast-turnaround business discussions.",
    whenToUse: "Use this 1-page NDA when you need a quick, no-nonsense agreement signed by a contractor or advisor before a brief introductory call.",
    whatsCovered: [
      "Basic definition of confidential secrets",
      "Standard obligation of non-disclosure",
      "Term of 2 years confidentiality",
      "Simple return of materials request",
      "Governing law clause"
    ],
    specificFields: [
      { id: "discussion_topic", label: "Discussion Topic", type: "text", placeholder: "e.g. initial product pitch and marketing review", required: true, group: "Details" }
    ],
    tags: ["shortform", "onepage", "quick", "contractor", "nda"],
    faq: [
      { question: "Is a short-form NDA legally binding?", answer: "Yes, it has the same legal validity as a long NDA, but it excludes complex clauses like non-solicitation or detailed IP assignments to stay under one page." },
      { question: "When should I use a long NDA instead?", answer: "When exchanging source code, proprietary formulas, or corporate financials, a detailed long-form NDA is highly recommended." }
    ]
  },
  {
    id: "international-nda",
    subcategory: "Format Variants",
    title: "International NDA (cross-border)",
    description: "Designed for cross-border transactions, specifying international dispute resolution forums and cross-jurisdictional compliance.",
    whenToUse: "Use this NDA when sharing secrets with an international vendor, contractor, or business partner located in a different country.",
    whatsCovered: [
      "Cross-border data transfer protections",
      "International arbitration forum and seat selection",
      "Multilingual contract interpretation precedence",
      "Compliance with export control regulations",
      "Sovereign immunity waivers"
    ],
    specificFields: [
      { id: "arbitration_seat", label: "Arbitration Seat (City/Country)", type: "text", placeholder: "e.g. London, United Kingdom", required: true, group: "International" },
      { id: "disclosing_country", label: "Discloser Country", type: "text", placeholder: "e.g. United States", required: true, group: "Discloser Country" },
      { id: "receiving_country", label: "Recipient Country", type: "text", placeholder: "e.g. Germany", required: true, group: "Recipient Country" }
    ],
    tags: ["international", "crossborder", "arbitration", "icc", "nda"],
    faq: [
      { question: "Where are disputes settled in an international NDA?", answer: "Disputes are settled in international arbitration (e.g., ICC rules) at the designated seat city, avoiding local courts in either party's home country." },
      { question: "How does this NDA address translation disputes?", answer: "It dictates that the English version of the contract takes legal precedence over any translated copies." }
    ]
  }
];

// Helper to format a single template object
function makeNdaTemplate(t) {
  let fields = [];
  let clauses = [];

  if (t.id === 'multi-party-nda') {
    fields = [
      { id: "party_a_name", label: "Party A Company/Individual Name", type: "text", placeholder: "e.g. InnovateTech Inc.", required: true, group: "Parties" },
      { id: "party_a_address", label: "Party A Address", type: "text", placeholder: "e.g. 100 Innovation Way, San Jose, CA", required: true, group: "Parties" },
      { id: "party_b_name", label: "Party B Company/Individual Name", type: "text", placeholder: "e.g. Apex Ventures LLC", required: true, group: "Parties" },
      { id: "party_b_address", label: "Party B Address", type: "text", placeholder: "e.g. 500 Equity Towers, Boston, MA", required: true, group: "Parties" },
      ...(t.specificFields || []),
      { id: "effective_date", label: "Effective Date", type: "date", required: true, group: "Key Dates" },
      { id: "term_years", label: "Confidentiality Term (Years)", type: "select", options: ["1", "2", "3", "5", "Indefinite"], defaultValue: "3", required: true, group: "NDA Details" },
      { id: "governing_state", label: "Governing Jurisdiction", type: "text", placeholder: "e.g. Delaware", required: true, group: "Legal Terms" }
    ];
  } else {
    fields = [
      { id: "disclosing_party", label: "Disclosing Party (Owner of secrets)", type: "text", placeholder: "e.g. Phoenix Launch Technologies LLC", required: true, group: "Discloser" },
      { id: "disclosing_address", label: "Discloser Address", type: "text", placeholder: "e.g. 808 Aerospace Drive, Phoenix, AZ", required: true, group: "Discloser" },
      { id: "receiving_party", label: "Receiving Party (Reviewing secrets)", type: "text", placeholder: "e.g. John Miller Construction", required: true, group: "Recipient" },
      { id: "receiving_address", label: "Recipient Address", type: "text", placeholder: "e.g. 45 Landmark Blvd, Tempe, AZ", required: true, group: "Recipient" },
      ...(t.specificFields || []),
      { id: "effective_date", label: "Effective Date", type: "date", required: true, group: "Key Dates" },
      { id: "term_years", label: "Confidentiality Term (Years)", type: "select", options: ["1", "2", "3", "5", "Indefinite"], defaultValue: "3", required: true, group: "NDA Details" },
      { id: "governing_state", label: "Governing Jurisdiction", type: "text", placeholder: "e.g. California", required: true, group: "Legal Terms" }
    ];
  }

  // generate clauses
  if (t.id === 'multi-party-nda') {
    clauses = [
      {
        id: "intro",
        heading: "MULTI-PARTY NON-DISCLOSURE AGREEMENT",
        body: "This Multi-Party Non-Disclosure Agreement (the \"Agreement\") is entered into as of {effective_date} (the \"Effective Date\"), by and among {party_a_name}, located at {party_a_address}, {party_b_name}, located at {party_b_address}, and {party_c_name}, located at {party_c_address} (each a \"Party\" and collectively \"the Parties\").",
        optional: false,
        enabledByDefault: true
      },
      {
        id: "definition",
        heading: "1. Confidential Information",
        body: "Confidential Information refers to any proprietary information, technical data, trade secrets, software code, customer records, and product roadmaps disclosed by any Party to the other Parties during their joint evaluation of business opportunities.",
        optional: false,
        enabledByDefault: true
      },
      {
        id: "obligations",
        heading: "2. Obligations of Confidentiality",
        body: "Each Party agrees: (a) to hold all other Parties' Confidential Information in strict confidence, (b) to use such information solely to evaluate the prospective collaboration, and (c) to restrict access to employees or representatives who are bound by matching confidentiality terms. These obligations shall persist for a period of {term_years} years.",
        optional: false,
        enabledByDefault: true
      },
      {
        id: "exclusions",
        heading: "3. Exclusions from Confidentiality",
        body: "Confidential Information does not include information that: (a) is or becomes publicly available through no breach, (b) was already in the receiving party's possession, (c) is independently developed, or (d) is required to be disclosed by law.",
        optional: false,
        enabledByDefault: true
      },
      {
        id: "governing_law",
        heading: "4. Governing Law and Remedies",
        body: "This Agreement shall be governed and interpreted under the laws of the State/Country of {governing_state}.",
        optional: false,
        enabledByDefault: true
      }
    ];
  } else if (t.id === 'short-form-nda') {
    clauses = [
      {
        id: "intro",
        heading: "SHORT-FORM CONFIDENTIALITY AGREEMENT",
        body: "This Short-Form NDA is entered into as of {effective_date} by and between {disclosing_party} (\"Discloser\") and {receiving_party} (\"Recipient\").",
        optional: false,
        enabledByDefault: true
      },
      {
        id: "terms",
        heading: "1. Confidentiality Terms",
        body: "Recipient agrees to hold all business plans, software codes, and ideas shared in connection with {discussion_topic} in strict secrecy. Recipient shall not disclose them to third parties or use them for competitive purposes. This obligation shall persist for a term of {term_years} years from the Effective Date, after which it shall expire.",
        optional: false,
        enabledByDefault: true
      },
      {
        id: "return",
        heading: "2. Return of Materials",
        body: "Upon request, Recipient shall immediately return or destroy all physical or digital files containing Discloser's information.",
        optional: false,
        enabledByDefault: true
      },
      {
        id: "governing_law",
        heading: "3. Governing Law",
        body: "This Agreement shall be governed by the laws of the State/Country of {governing_state}.",
        optional: false,
        enabledByDefault: true
      }
    ];
  } else {
    // Unilateral / standard clauses
    clauses = [
      {
        id: "intro",
        heading: t.title.toUpperCase(),
        body: `This Unilateral Confidentiality Agreement (the "Agreement") is entered into as of {effective_date} (the "Effective Date"), by and between {disclosing_party}, located at {disclosing_address} ("Discloser"), and {receiving_party}, located at {receiving_address} ("Recipient").`,
        optional: false,
        enabledByDefault: true
      },
      {
        id: "definition",
        heading: "1. Confidential Information",
        body: "Confidential Information includes all proprietary technical, financial, or business information disclosed by Discloser to Recipient, whether in writing, orally, or visually, including but not limited to trade secrets, blueprints, algorithms, or client rosters.",
        optional: false,
        enabledByDefault: true
      },
      {
        id: "obligation",
        heading: "2. Secrecy Obligations",
        body: "Recipient agrees to hold Discloser's Confidential Information in trust and secrecy. Recipient shall not copy, disclose, or use the information for any purpose other than to evaluate a prospective business relationship with Discloser. This obligation shall survive for {term_years} years from the Effective Date.",
        optional: false,
        enabledByDefault: true
      }
    ];

    if (t.id === 'real-estate-nda') {
      clauses.push({
        id: "non_circumvention",
        heading: "3. Non-Circumvention",
        body: "Recipient agrees not to contact any tenants, property managers, lenders, or suppliers of the Property, nor bypass Discloser to negotiate directly with the Property owner or any intermediary, without Discloser's prior written consent.",
        optional: true,
        optionalLabel: "Include Non-Circumvention Clause?",
        enabledByDefault: true,
        riskLevel: "high"
      });
    }

    if (t.id === 'manufacturing-nda') {
      clauses.push({
        id: "reverse_engineering",
        heading: "3. No Reverse Engineering",
        body: "Recipient shall not analyze, decompile, disassemble, or reverse-engineer the prototype, sample parts, or tooling patterns of the {product_prototype} provided by Discloser under this Agreement.",
        optional: false,
        enabledByDefault: true
      });
    }

    if (t.id === 'legal-services-nda') {
      clauses.push({
        id: "privilege",
        heading: "3. Privilege Preservation",
        body: "The disclosure of any confidential records is not intended to waive, and shall not be deemed a waiver of, any attorney-client privilege, work-product doctrine, or other legal protection belonging to Discloser.",
        optional: false,
        enabledByDefault: true
      });
    }

    if (t.id === 'government-contractor-nda') {
      clauses.push({
        id: "far_compliance",
        heading: "3. Federal Regulations Compliance",
        body: "Recipient agrees to handle all proprietary information in strict compliance with the Federal Acquisition Regulation (FAR) and other applicable agency security guidelines.",
        optional: false,
        enabledByDefault: true
      });
    }

    if (t.id === 'franchise-nda') {
      clauses.push({
        id: "operations_manual",
        heading: "3. Protection of Operations Manual",
        body: "Recipient acknowledges that the franchise operations manual, training videos, and supply chain networks are highly proprietary trade secrets of the {franchise_brand} and shall not be copied or used for any other purpose.",
        optional: false,
        enabledByDefault: true
      });
    }

    if (t.id === 'entertainment-film-production-nda') {
      clauses.push({
        id: "social_media",
        heading: "3. Social Media and Photo Blackout",
        body: "Recipient shall not take photos, record videos, or post any descriptions on social media platforms (including Twitter, Instagram, TikTok) regarding the set, script, or production details of {production_title}.",
        optional: false,
        enabledByDefault: true
      });
    }

    if (t.id === 'pharmaceutical-nda') {
      clauses.push({
        id: "patent_protection",
        heading: "3. Patent Preservation",
        body: "The disclosure of clinical files or chemical structures does not constitute a license or waiver of rights. Discloser retains all patent rights and priority dates related to {compound_code}.",
        optional: false,
        enabledByDefault: true
      });
    }

    if (t.id === 'cybersecurity-nda') {
      clauses.push({
        id: "data_security",
        heading: "3. Security Standards",
        body: "Recipient shall store all audit notes, penetration reports, and network logs in an encrypted state (minimum AES-256) and immediately delete all copies upon the conclusion of the audit.",
        optional: false,
        enabledByDefault: true
      });
    }

    if (t.id === 'nonprofit-nda') {
      clauses.push({
        id: "donor_privacy",
        heading: "3. Donor Registry Privacy",
        body: "Recipient shall not contact, solicit, or share the contact details of any donors, benefactors, or sponsors of the Discloser's programs without explicit written consent.",
        optional: false,
        enabledByDefault: true
      });
    }

    if (t.id === 'interview-hiring-process-nda') {
      clauses.push({
        id: "interview_questions",
        heading: "3. Non-Disclosure of Interview Process",
        body: "Candidate shall not publish, share, or post any details of the technical interview questions, architecture challenges, or hiring process on platforms such as Glassdoor or personal blogs.",
        optional: true,
        optionalLabel: "Include Interview Question Ban?",
        enabledByDefault: true
      });
    }

    if (t.id === 'board-member-nda') {
      clauses.push({
        id: "public_statements",
        heading: "3. Public Announcements",
        body: "Director shall not make any public announcements, statements, or press releases concerning board resolutions, company finances, or executive decisions without the board's collective approval.",
        optional: false,
        enabledByDefault: true
      });
    }

    if (t.id === 'joint-venture-nda') {
      clauses.push({
        id: "joint_ip",
        heading: "3. Intellectual Property Rights",
        body: "Except as explicitly agreed, the sharing of files does not transfer any license. Any IP co-developed during the Evaluation shall be held in joint ownership pending final JV setup.",
        optional: false,
        enabledByDefault: true
      });
    }

    if (t.id === 'white-label-nda') {
      clauses.push({
        id: "anonymity",
        heading: "3. Brand Secrecy",
        body: "Recipient shall not disclose to any client, reseller, or the public that the rebranded software is built upon or powered by the {whitelabel_software} or the Discloser's technologies.",
        optional: false,
        enabledByDefault: true
      });
    }

    if (t.id === 'beta-tester-nda') {
      clauses.push({
        id: "screenshot_ban",
        heading: "3. Strict Capture and Review Blackout",
        body: "Tester shall not take screenshots, capture video recordings, or publish reviews, articles, or blog posts about the {beta_software} without Discloser's express consent.",
        optional: false,
        enabledByDefault: true
      });
    }

    if (t.id === 'influencer-creator-nda') {
      clauses.push({
        id: "embargo",
        heading: "3. Publication Embargo",
        body: "Creator shall not publish, teaser, or post any images or discussions of the {campaign_name} products prior to the official launch date determined by the Brand.",
        optional: false,
        enabledByDefault: true
      });
    }

    if (t.id === 'client-onboarding-nda') {
      clauses.push({
        id: "access_control",
        heading: "3. Data Access Control",
        body: "Service Provider shall restrict access to Client's database credentials solely to employees directly involved in {service_onboarding}.",
        optional: false,
        enabledByDefault: true
      });
    }

    if (t.id === 'exit-offboarding-nda') {
      clauses.push({
        id: "ip_reaffirmation",
        heading: "3. IP Reaffirmation",
        body: "Employee confirms that all software code, marketing materials, and designs created during employment are the sole property of Company.",
        optional: false,
        enabledByDefault: true
      });
    }

    if (t.id === 'trade-show-event-nda') {
      clauses.push({
        id: "no_recording",
        heading: "3. No Photo or Video Recording",
        body: "Recipient shall not photograph, film, or audio-record the demo unit or the private display suite at {event_name}.",
        optional: false,
        enabledByDefault: true
      });
    }

    if (t.id === 'due-diligence-nda') {
      clauses.push({
        id: "data_room",
        heading: "3. Secure Virtual Data Room",
        body: "Recipient shall access all financial records and tax filings solely through a secure virtual data room (VDR) and shall not download or print sensitive books.",
        optional: false,
        enabledByDefault: true
      });
    }

    if (t.id === 'nda-non-compete-clause') {
      clauses.push({
        id: "non_compete",
        heading: "3. Non-Compete Covenant",
        body: "Recipient agrees that for a period of {compete_months} months following the termination of discussions, Recipient shall not engage, directly or indirectly, in a competing business within {compete_region}.",
        optional: false,
        enabledByDefault: true
      });
    }

    if (t.id === 'nda-non-solicitation-clause') {
      clauses.push({
        id: "non_solicit",
        heading: "3. Non-Solicitation of Staff and Clients",
        body: "Recipient agrees that for a period of {solicit_months} months following discussions, Recipient shall not solicit, recruit, or attempt to hire any of Discloser's employees or solicit Discloser's clients.",
        optional: false,
        enabledByDefault: true
      });
    }

    if (t.id === 'international-nda') {
      clauses.push(
        {
          id: "arbitration",
          heading: "3. International Arbitration",
          body: "Any dispute arising from this Agreement shall be referred to and finally resolved by arbitration under the rules of the International Chamber of Commerce (ICC) at the seat of {arbitration_seat}.",
          optional: false,
          enabledByDefault: true
        },
        {
          id: "export_control",
          heading: "4. Export Controls",
          body: "Both parties agree to adhere to all applicable export control and sanctions laws of {disclosing_country} and {receiving_country} when sharing tech files.",
          optional: false,
          enabledByDefault: true
        }
      );
    }

    // Standard common endings
    clauses.push(
      {
        id: "exclusions",
        heading: t.id === 'international-nda' ? "5. Exclusions" : "4. Exclusions",
        body: "Confidential Information does not include information that: (a) is or becomes publicly available through no breach, (b) was already in Recipient's possession, (c) is independently developed, or (d) is required to be disclosed by law.",
        optional: false,
        enabledByDefault: true
      },
      {
        id: "governing_law",
        heading: t.id === 'international-nda' ? "6. Governing Law" : "5. Governing Law",
        body: "This Agreement shall be governed and interpreted under the laws of the State/Country of {governing_state}.",
        optional: false,
        enabledByDefault: true
      }
    );
  }

  return {
    id: t.id,
    slug: t.id,
    category: "nda",
    subcategory: t.subcategory,
    title: t.title,
    description: t.description,
    whatsCovered: t.whatsCovered,
    whenToUse: t.whenToUse,
    jurisdictions: t.id === 'international-nda' ? ["US", "UK", "CA", "EU", "AU"] : ["US", "UK", "CA", "AU"],
    lastReviewedAt: "2026-05-23",
    reviewerName: "Robert Vance, Esq.",
    estimatedFillMinutes: t.estimatedFillMinutes || 3,
    fields: fields,
    clauses: clauses,
    relatedTemplates: t.relatedTemplates || ["mutual-nda", "unilateral-nda"],
    faq: t.faq,
    tags: t.tags
  };
}

// Generate files
newTemplates.forEach((t) => {
  const formatted = makeNdaTemplate(t);
  const filePath = path.join(outputDir, `${formatted.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(formatted, null, 2), 'utf8');
  console.log(`Successfully wrote template: ${formatted.id}`);
});

console.log('Finished writing NDA templates!');
