const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '..', 'content', 'templates', 'real-estate');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 1. Update existing 2 real estate files with Landlord & Tenant subcategory
const existingFiles = ["residential-lease.json", "roommate-agreement.json"];

existingFiles.forEach((fileName) => {
  const filePath = path.join(outputDir, fileName);
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, 'utf8');
    try {
      const parsed = JSON.parse(raw);
      parsed.subcategory = "Landlord & Tenant";
      fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2), 'utf8');
      console.log(`Updated subcategory for existing real estate: ${fileName} -> Landlord & Tenant`);
    } catch (e) {
      console.error(`Error updating: ${fileName}`, e);
    }
  }
});

// 2. 55 new real estate templates to generate
const newTemplates = [
  // --- Agent & Brokerage ---
  {
    id: "exclusive-right-to-buy",
    subcategory: "Agent & Brokerage",
    title: "Exclusive Right to Buy Agreement",
    description: "An agency contract establishing a buyer's exclusive relationship with a real estate broker, detailing commission terms.",
    desc: "buyer representation, broker commissions, and home search services",
    field1: "buyer_goals", field1Label: "Desired Property Type & Location", field1Type: "textarea", field1Placeholder: "e.g. Single-family residential home in the greater Denver metro area...",
    field2: "broker_commission", field2Label: "Broker Commission Rate (%)", field2Type: "text", field2Placeholder: "e.g. 2.5% of purchase price",
    unit: "transaction",
    bodyServices: "Broker agrees to represent Buyer exclusively in finding and purchasing property matching: {buyer_goals}.",
    bodyCompensation: "Buyer agrees that Broker shall be compensated at the rate of {broker_commission} upon closing of the transaction.",
    bodyIp: "All property search lists, MLS briefs, and correspondence logs remain the property of the Brokerage."
  },
  {
    id: "open-listing-agreement",
    subcategory: "Agent & Brokerage",
    title: "Open Listing Agreement",
    description: "A non-exclusive seller agreement allowing multiple brokers to market the property, compensating only the procuring broker.",
    desc: "non-exclusive property listings, commissions, and seller representation",
    field1: "listing_price", field1Label: "Target Listing Price ($)", field1Type: "currency", field1Placeholder: "e.g. 450,000.00",
    field2: "procuring_commission", field2Label: "Commission Rate (%)", field2Type: "text", field2Placeholder: "e.g. 3% of sales price",
    unit: "sale",
    bodyServices: "Broker is authorized to market the property at the target listing price of {listing_price} on a non-exclusive open listing basis.",
    bodyCompensation: "Seller shall pay Broker a commission of {procuring_commission} only if Broker procures the buyer who completes the sale.",
    bodyIp: "Seller retains the right to list the property with other brokers or sell it independently without commission."
  },
  {
    id: "net-listing-agreement",
    subcategory: "Agent & Brokerage",
    title: "Net Listing Agreement",
    description: "A specialized listing contract where the broker's commission is any amount above the seller's specified net price.",
    desc: "net pricing, excess commissions, and seller terms",
    field1: "seller_net_price", field1Label: "Seller Net Price ($)", field1Type: "currency", field1Placeholder: "e.g. 300,000.00",
    field2: "listing_period", field2Label: "Listing Duration (Days)", field2Type: "number", field2Placeholder: "e.g. 90",
    unit: "sale",
    bodyServices: "Broker shall market the property for a listing period of {listing_period} days to achieve a target net return to Seller.",
    bodyCompensation: "Broker shall receive a commission equal to any amount received above the Seller Net Price of {seller_net_price}.",
    bodyIp: "Brokerage must disclose all offers received to the Seller prior to executing any sale."
  },
  {
    id: "cobrokerage-agreement",
    subcategory: "Agent & Brokerage",
    title: "Co-Brokerage Agreement",
    description: "An agreement between listing and buyer brokers detailing the split of commissions on a cooperative transaction.",
    desc: "commission splits, co-brokerage, and MLS rules",
    field1: "property_address", field1Label: "Property Address", field1Type: "text", field1Placeholder: "e.g. 102 Maple Street, Denver, CO 80202",
    field2: "commission_split", field2Label: "Buyer Agent Split Percentage (%)", field2Type: "text", field2Placeholder: "e.g. 50/50 split of the total 5% commission",
    unit: "split",
    bodyServices: "The Parties agree to cooperate in facilitating the sale and transaction for the property: {property_address}.",
    bodyCompensation: "The commission earned shall be split between the listing and cooperating brokers as follows: {commission_split}.",
    bodyIp: "Cooperating brokers shall maintain joint confidentiality regarding patient/buyer profiles."
  },
  {
    id: "broker-referral-agreement",
    subcategory: "Agent & Brokerage",
    title: "Broker-to-Broker Referral Agreement",
    description: "A contract detailing referral commission splits between brokers for introducing a buyer or seller client.",
    desc: "lead referrals, commission splits, and client data",
    field1: "referred_client_name", field1Label: "Referred Client Full Name", field1Type: "text", field1Placeholder: "e.g. Jane Miller",
    field2: "referral_fee_percent", field2Label: "Referral Fee Percentage (%)", field2Type: "text", field2Placeholder: "e.g. 25% of the receiving broker's commission",
    unit: "referral",
    bodyServices: "Referring Broker refers the buyer/seller client {referred_client_name} to the Receiving Broker for representation.",
    bodyCompensation: "Upon successful closing of any transaction for the client, Receiving Broker shall pay Referring Broker a referral fee of {referral_fee_percent}.",
    bodyIp: "Client contact information shall be kept confidential and used solely for the transaction representation."
  },
  {
    id: "team-member-agreement",
    subcategory: "Agent & Brokerage",
    title: "Team Member Agreement (Real Estate Team)",
    description: "A team charter defining agent splits, team leads commissions, marketing costs, and lead distribution databases.",
    desc: "real estate team leads, agent splits, and marketing databases",
    field1: "lead_distribution_rules", field1Label: "Lead Assignment Rules", field1Type: "textarea", field1Placeholder: "Describe how incoming Zillow/MLS leads are assigned to team members...",
    field2: "team_split", field2Label: "Team Lead / Member Split (%)", field2Type: "text", field2Placeholder: "e.g. 60/40 team split on team leads, 80/20 on personal leads",
    unit: "split",
    bodyServices: "Team Member shall represent the team and follow lead assignment guidelines: {lead_distribution_rules}.",
    bodyCompensation: "Commissions earned by Team Member shall be divided according to the team commission splits: {team_split}.",
    bodyIp: "All lead databases, CRM profiles, and marketing materials remain the exclusive property of the Team Lead."
  },
  {
    id: "independent-contractor-agent",
    subcategory: "Agent & Brokerage",
    title: "Broker-Agent Independent Contractor Agreement",
    description: "A standard contract establishing an agent's relationship with their sponsoring brokerage, outlining desk fees and commission splits.",
    desc: "desk fees, broker sponsorship, and commission splits",
    field1: "desk_fee", field1Label: "Monthly Desk/Office Fee ($)", field1Type: "currency", field1Placeholder: "e.g. 250.00",
    field2: "commission_split_schedule", field2Label: "Broker/Agent Split Ratio", field2Type: "text", field2Placeholder: "e.g. 70/30 agent/broker split up to $100k cap, then 100%",
    unit: "agreement",
    bodyServices: "Agent shall associate with Brokerage as an independent contractor, adhering to MLS regulations and code of ethics.",
    bodyCompensation: "Agent shall pay a monthly desk fee of {desk_fee} and commissions shall be divided per schedule: {commission_split_schedule}.",
    bodyIp: "All listing contracts, client folders, and transaction documents are legally owned by the Brokerage."
  },
  {
    id: "showing-agreement",
    subcategory: "Agent & Brokerage",
    title: "Showing Agreement (Unrepresented Buyer)",
    description: "A contract authorizing an agent to show a specific home to an unrepresented buyer, ensuring commission protection.",
    desc: "home showing, buyer registration, and commission rights",
    field1: "property_address", field1Label: "Property to be Shown", field1Type: "text", field1Placeholder: "e.g. 404 Peak View Drive, Golden, CO 80401",
    field2: "commission_rate", field2Label: "Commission Rate ($ or %)", field2Type: "text", field2Placeholder: "e.g. 2.5% of purchase price",
    unit: "showing",
    bodyServices: "Agent is authorized to show the buyer the following registered property: {property_address}.",
    bodyCompensation: "Seller agrees to pay Agent a commission of {commission_rate} if the registered buyer purchases the property within 180 days.",
    bodyIp: "This agreement is non-exclusive except for the specific registered property shown."
  },
  {
    id: "lead-referral-agreement",
    subcategory: "Agent & Brokerage",
    title: "Lead Referral Services Agreement",
    description: "An agreement with a lead generation firm or marketing agency specifying cost per lead and lead conversion splits.",
    desc: "lead generation, cost per lead, and data sharing",
    field1: "lead_generation_criteria", field1Label: "Lead Quality Criteria", field1Type: "textarea", field1Placeholder: "Describe lead demographic, minimum budget, or verification requirements...",
    field2: "cost_per_lead", field2Label: "Cost Per Lead ($)", field2Type: "currency", field2Placeholder: "e.g. 45.00",
    unit: "lead",
    bodyServices: "Provider shall deliver verified contact leads matching listing criteria: {lead_generation_criteria}.",
    bodyCompensation: "Broker shall pay Provider {cost_per_lead} per lead delivered, subject to validation rules.",
    bodyIp: "All lead logs, email files, and caller notes remain the shared property of both parties."
  },
  {
    id: "real-estate-assistant",
    subcategory: "Agent & Brokerage",
    title: "Real Estate Assistant Agreement",
    description: "A contract for administrative or licensed assistant services, outlining task limits under state law.",
    desc: "administrative real estate support, client files, and calendar tracking",
    field1: "assistant_tasks", field1Label: "Assistant Scope of Work", field1Type: "textarea", field1Placeholder: "e.g. Coordinate files signing, schedule showings, and update MLS listings...",
    field2: "hourly_rate", field2Label: "Assistant Hourly Wage ($)", field2Type: "currency", field2Placeholder: "e.g. 22.00",
    unit: "hour",
    bodyServices: "Assistant shall coordinate administrative files and coordinate showings according to: {assistant_tasks}.",
    bodyCompensation: "Agent shall pay Assistant an hourly wage of {hourly_rate} for support services.",
    bodyIp: "All buyer cards, listing documents, and team passwords remain the property of the Agent."
  },

  // --- Landlord & Tenant ---
  {
    id: "pet-addendum-lease",
    subcategory: "Landlord & Tenant",
    title: "Pet Addendum to Lease",
    description: "A lease addendum specifying pet deposits, pet rules, and liability for pet damages.",
    desc: "pet rent, pet deposits, and lease rules",
    field1: "pet_details", field1Label: "Pet Description (Breed & Weight)", field1Type: "text", field1Placeholder: "e.g. Golden Retriever named Max, 60 lbs",
    field2: "pet_deposit", field2Label: "Refundable Pet Deposit ($)", field2Type: "currency", field2Placeholder: "e.g. 300.00",
    unit: "addendum",
    bodyServices: "Tenant is permitted to keep the registered pet described as: {pet_details}.",
    bodyCompensation: "Tenant shall pay a pet deposit of {pet_deposit} plus a monthly pet rent fee.",
    bodyIp: "Tenant accepts full liability for any property damages, stains, or noise caused by the pet."
  },
  {
    id: "parking-addendum",
    subcategory: "Landlord & Tenant",
    title: "Parking Addendum to Lease",
    description: "An addendum assigning parking spots, listing vehicle rules, and setting parking fees.",
    desc: "assigned parking, parking spots, and towing rules",
    field1: "parking_space_number", field1Label: "Assigned Space Number", field1Type: "text", field1Placeholder: "e.g. Space #44, Underground Parking Garage",
    field2: "monthly_parking_fee", field2Label: "Monthly Parking Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 75.00",
    unit: "month",
    bodyServices: "Landlord assigns Tenant the exclusive use of parking space: {parking_space_number}.",
    bodyCompensation: "Tenant agrees to pay a monthly parking utility fee of {monthly_parking_fee} with rent.",
    bodyIp: "Vehicles must be registered and in working order, or subject to immediate towing."
  },
  {
    id: "lease-extension-agreement",
    subcategory: "Landlord & Tenant",
    title: "Lease Extension Agreement",
    description: "A contract extending the lease period, modifying rent pricing, and keeping existing terms.",
    desc: "lease extensions, rent increases, and lease dates",
    field1: "new_expiration_date", field1Label: "New Lease Expiration Date", field1Type: "date", required: true,
    field2: "new_monthly_rent", field2Label: "New Monthly Rent ($)", field2Type: "currency", field2Placeholder: "e.g. 1,850.00",
    unit: "extension",
    bodyServices: "The existing lease is extended through the new expiration date: {new_expiration_date}.",
    bodyCompensation: "Tenant agrees to pay the adjusted monthly rent of {new_monthly_rent} starting on the extension start date.",
    bodyIp: "All other covenants, security deposits, and rules of the original lease remain active."
  },
  {
    id: "early-lease-termination",
    subcategory: "Landlord & Tenant",
    title: "Early Lease Termination Agreement",
    description: "A mutual agreement release form releasing tenants from lease rules in exchange for a buyout fee.",
    desc: "lease terminations, buyout fees, and property release",
    field1: "termination_date", field1Label: "Move-Out / Termination Date", field1Type: "date", required: true,
    field2: "termination_fee", field2Label: "Termination Buyout Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 2,500.00",
    unit: "termination",
    bodyServices: "Landlord and Tenant mutually agree to terminate the lease as of the date: {termination_date}.",
    bodyCompensation: "Tenant agrees to pay an early buyout fee of {termination_fee} in exchange for full lease release.",
    bodyIp: "Tenant must return the keys and leave the property in clean, undamaged condition."
  },
  {
    id: "inspection-checklist",
    subcategory: "Landlord & Tenant",
    title: "Move-In / Move-Out Inspection Checklist",
    description: "A property inspection log detailing room conditions, wear, and security deposit deductions.",
    desc: "property checks, room checks, and security deposit logs",
    field1: "damage_notes", field1Label: "Pre-existing Damage Notes", field1Type: "textarea", field1Placeholder: "e.g. Scuffs on living room wall, kitchen cabinet door loose...",
    field2: "security_deposit_total", field2Label: "Total Security Deposit ($)", field2Type: "currency", field2Placeholder: "e.g. 1,500.00",
    unit: "inspection",
    bodyServices: "The room check and wear records are compiled in the damage log: {damage_notes}.",
    bodyCompensation: "Landlord holds the security deposit of {security_deposit_total} to cover any future cleaning/damage fees.",
    bodyIp: "Both parties agree that this checklist represents the official property condition at move-in."
  },
  {
    id: "late-rent-notice",
    subcategory: "Landlord & Tenant",
    title: "Late Rent Notice",
    description: "A formal notice sent to a tenant detailing late payment balances, late fees, and pay dates.",
    desc: "late rent, late fees, and payment deadlines",
    field1: "rent_due_date", field1Label: "Original Rent Due Date", field1Type: "date", required: true,
    field2: "total_due_with_fees", field2Label: "Total Outstanding Balance ($)", field2Type: "currency", field2Placeholder: "e.g. 1,950.00",
    unit: "notice",
    bodyServices: "Tenant is notified that rent due on {rent_due_date} is late and unpaid.",
    bodyCompensation: "Tenant must pay the total outstanding balance of {total_due_with_fees} immediately to avoid legal actions.",
    bodyIp: "This notice serves as a formal written warning under state landlord-tenant laws."
  },
  {
    id: "eviction-notice",
    subcategory: "Landlord & Tenant",
    title: "Notice to Pay Rent or Quit (Eviction)",
    description: "A state-law notice giving a tenant a fixed number of days to pay rent or vacate the property.",
    desc: "evictions, pay or quit, and lease breaches",
    field1: "quit_days", field1Label: "Days to Comply (e.g. 3, 5, 7)", field1Type: "number", field1Placeholder: "e.g. 3",
    field2: "past_due_rent", field2Label: "Past Due Rent Amount ($)", field2Type: "currency", field2Placeholder: "e.g. 1,800.00",
    unit: "notice",
    bodyServices: "Tenant is ordered to pay past due rent or vacate the property within {quit_days} days of service.",
    bodyCompensation: "The landlord demands the immediate payment of the past due rent balance: {past_due_rent}.",
    bodyIp: "Failure to comply or vacate will result in immediate filing of an unlawful detainer lawsuit."
  },
  {
    id: "lease-violation-notice",
    subcategory: "Landlord & Tenant",
    title: "Lease Violation Notice",
    description: "A formal notice detailing a lease breach (noise, unauthorized occupants) and demanding cure.",
    desc: "lease violations, cure notices, and landlord rules",
    field1: "violation_details", field1Label: "Description of Lease Violation", field1Type: "textarea", field1Placeholder: "e.g. Unauthorized dog kept at unit in violation of Section 12...",
    field2: "cure_deadline", field2Label: "Deadline to Cure (Date)", field2Type: "date", required: true,
    unit: "notice",
    bodyServices: "Tenant is in violation of the lease terms due to: {violation_details}.",
    bodyCompensation: "Tenant must cure the violation or vacate the unit by the deadline: {cure_deadline}.",
    bodyIp: "Failure to resolve the breach will lead to immediate lease termination and eviction filings."
  },
  {
    id: "cosigner-guarantor-agreement",
    subcategory: "Landlord & Tenant",
    title: "Co-Signer / Guarantor Agreement",
    description: "An agreement holding a third-party guarantor liable for rent payments if the tenant defaults.",
    desc: "rent guarantees, tenant defaults, and co-signers",
    field1: "tenant_name", field1Label: "Tenant Full Name", field1Type: "text", field1Placeholder: "e.g. Alex Green",
    field2: "max_liability_limit", field2Label: "Guarantor Liability Limit ($)", field2Type: "currency", field2Placeholder: "e.g. 10,000.00",
    unit: "guarantee",
    bodyServices: "Guarantor agrees to guarantee all rent payments and lease compliance for the tenant: {tenant_name}.",
    bodyCompensation: "Guarantor accepts primary financial liability up to the limit of {max_liability_limit} if tenant defaults.",
    bodyIp: "Guarantor agrees to credit checks and waves notice of lease amendments."
  },
  {
    id: "utility-responsibility-addendum",
    subcategory: "Landlord & Tenant",
    title: "Utility Responsibility Addendum",
    description: "An addendum specifying which utilities (water, gas, trash) are paid by tenant vs landlord.",
    desc: "utility bills, water gas trash, and energy fees",
    field1: "utility_rules", field1Label: "Utility Allocations & Billing Methods", field1Type: "textarea", field1Placeholder: "e.g. Tenant pays electricity and internet directly; Landlord bills flat water fee...",
    field2: "monthly_flat_fee", field2Label: "Flat Utility Billing Rate ($)", field2Type: "currency", field2Placeholder: "e.g. 50.00",
    unit: "addendum",
    bodyServices: "Utility bills and payment responsibilities are allocated as follows: {utility_rules}.",
    bodyCompensation: "Tenant shall pay a monthly flat utility fee of {monthly_flat_fee} where applicable.",
    bodyIp: "Utility meters and fixtures remain the physical property of the Landlord."
  },

  // --- Property Management ---
  {
    id: "exclusive-property-management",
    subcategory: "Property Management",
    title: "Exclusive Property Management Agreement",
    description: "An agreement appointing a property manager to lease, maintain, and manage a rental property.",
    desc: "property leasing, tenant screening, and landlord rules",
    field1: "property_address", field1Label: "Rental Property Address", field1Type: "text", field1Placeholder: "e.g. 404 Forest Ave, Denver, CO 80210",
    field2: "management_fee_rate", field2Label: "Management Fee (% of Monthly Rent)", field2Type: "text", field2Placeholder: "e.g. 10% of monthly gross collections",
    unit: "month",
    bodyServices: "Manager shall advertise, screen tenants, and manage the property: {property_address}.",
    bodyCompensation: "Owner shall pay Manager a monthly management fee of {management_fee_rate} for services.",
    bodyIp: "All tenant leases, keys, security deposit bank accounts remain the property of the Owner."
  },
  {
    id: "management-fee-schedule",
    subcategory: "Property Management",
    title: "Property Management Fee Schedule Addendum",
    description: "An addendum listing property management service pricing (leasing fees, maintenance markups, evictions fees).",
    desc: "leasing fees, repair markups, and eviction coordination fees",
    field1: "maintenance_markup_percent", field1Label: "Maintenance Markup Rate (%)", field1Type: "text", field1Placeholder: "e.g. 10% markup on vendor invoices",
    field2: "leasing_fee_flat", field2Label: "Lease Placement Flat Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 500.00",
    unit: "addendum",
    bodyServices: "Manager shall coordinate property repairs subject to a service markup of: {maintenance_markup_percent}.",
    bodyCompensation: "Owner shall pay Manager a flat placement fee of {leasing_fee_flat} for each new lease signed.",
    bodyIp: "This schedule replaces any prior compensation structures listed in the management contract."
  },
  {
    id: "owner-tenant-dispute",
    subcategory: "Property Management",
    title: "Owner-Tenant Dispute Resolution Addendum",
    description: "An addendum establishing mediation and arbitration procedures for resolved property disputes.",
    desc: "mediation terms, arbitration procedures, and dispute logs",
    field1: "mediation_venue", field1Label: "Dispute Mediation Venue", field1Type: "text", field1Placeholder: "e.g. Judicial Arbiter Group, Denver, CO",
    field2: "resolution_days_limit", field2Label: "Mediation Request Limit (Days)", field2Type: "number", field2Placeholder: "e.g. 30",
    unit: "addendum",
    bodyServices: "Both parties agree to submit unresolved property disputes to mediation in: {mediation_venue}.",
    bodyCompensation: "Dispute requests must be filed within {resolution_days_limit} days of the incident.",
    bodyIp: "All mediation files, communications, and findings are strictly confidential."
  },
  {
    id: "maintenance-request-auth",
    subcategory: "Property Management",
    title: "Maintenance Request Authorization Form",
    description: "A form signed by tenants authorizing repair teams to enter the property to fix requested items.",
    desc: "maintenance access, keys entry, and liability releases",
    field1: "repair_details", field1Label: "Requested Repairs / Maintenance Tasks", field1Type: "textarea", field1Placeholder: "e.g. Fix leaking dishwasher valve in kitchen...",
    field2: "authorized_access_window", field2Label: "Access Hours Window", field2Type: "text", field2Placeholder: "e.g. Monday-Friday, 9:00 AM - 5:00 PM",
    unit: "authorization",
    bodyServices: "Tenant authorizes entry to address the requested repairs: {repair_details}.",
    bodyCompensation: "Tenant agrees that repair teams may enter the unit during the window: {authorized_access_window}.",
    bodyIp: "Tenant releases landlord from liability for tracking mud or general displacement during repairs."
  },
  {
    id: "vendor-contractor-auth",
    subcategory: "Property Management",
    title: "Vendor / Contractor Authorization Form",
    description: "A property manager authorization form hiring a third-party contractor for property upgrades.",
    desc: "handyman services, painter work, and invoice approvals",
    field1: "contractor_scope", field1Label: "Contractor Service Scope", field1Type: "textarea", field1Placeholder: "e.g. Drywall repair and painting of unit 2B...",
    field2: "max_invoice_limit", field2Label: "Maximum Authorized Invoice ($)", field2Type: "currency", field2Placeholder: "e.g. 1,200.00",
    unit: "project",
    bodyServices: "Contractor is authorized to execute repair and painting works: {contractor_scope}.",
    bodyCompensation: "Contractor billing shall not exceed {max_invoice_limit} without prior manager approval.",
    bodyIp: "Contractor must submit lien waivers and proof of insurance before payment is released."
  },
  {
    id: "property-inspection-agreement",
    subcategory: "Property Management",
    title: "Property Inspection Agreement",
    description: "A service agreement with a home inspector detailing inspection checks, foundation reviews, and liability caps.",
    desc: "home inspections, foundation checks, and structural logs",
    field1: "inspection_address", field1Label: "Inspection Site Address", field1Type: "text", field1Placeholder: "e.g. 15 Ridge Road, Castle Rock, CO 80104",
    field2: "inspection_fee", field2Label: "Inspection Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 450.00",
    unit: "inspection",
    bodyServices: "Inspector shall inspect plumbing, electrical, roofing, and foundations for: {inspection_address}.",
    bodyCompensation: "Client shall pay Inspector a flat fee of {inspection_fee} for the report.",
    bodyIp: "Inspector retains copyrights in the final report, granting a license to Client for transaction use."
  },
  {
    id: "hoa-management-agreement",
    subcategory: "Property Management",
    title: "HOA Management Agreement",
    description: "A management contract between a Homeowners Association and a property manager detailing HOA fee collections and common area rules.",
    desc: "HOA fees, common area maintenance, and community rules",
    field1: "association_name", field1Label: "Homeowners Association Name", field1Type: "text", field1Placeholder: "e.g. Peak View Townhomes Association Inc.",
    field2: "management_fee_monthly", field2Label: "Monthly Management Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 2,200.00",
    unit: "month",
    bodyServices: "Manager shall coordinate landscaping, collect dues, and coordinate meetings for: {association_name}.",
    bodyCompensation: "Association shall pay Manager a monthly management fee of {management_fee_monthly}.",
    bodyIp: "All member databases, HOA accounts, and meeting logs belong to the Association."
  },
  {
    id: "resident-rules-regulations",
    subcategory: "Property Management",
    title: "Resident Rules & Regulations Addendum",
    description: "An addendum establishing community rules for trash disposal, noise hours, pools use, and balcony displays.",
    desc: "noise rules, trash bins, and community pool rules",
    field1: "quiet_hours", field1Label: "Quiet Hours Policy", field1Type: "text", field1Placeholder: "e.g. 10:00 PM to 8:00 AM daily",
    field2: "balcony_restrictions", field2Label: "Balcony / Patio Restrictions", field2Type: "textarea", field2Placeholder: "e.g. No laundry hanging, no charcoal grills, and only outdoor furniture...",
    unit: "addendum",
    bodyServices: "Resident agrees to follow balcony and patio guidelines: {balcony_restrictions}.",
    bodyCompensation: "Resident agrees to follow noise rules during quiet hours: {quiet_hours}.",
    bodyIp: "Violations of these guidelines constitute a default under the primary lease agreement."
  },

  // --- Investment & Transactions ---
  {
    id: "real-estate-purchase",
    subcategory: "Investment & Transactions",
    title: "Real Estate Purchase Agreement",
    description: "A standard purchase contract detailing sales price, financing rules, inspections timelines, and title terms.",
    desc: "home purchase, sales price, and escrow rules",
    field1: "property_legal_description", field1Label: "Property Legal Description", field1Type: "textarea", field1Placeholder: "Describe lot, block, and subdivision details...",
    field2: "purchase_price", field2Label: "Purchase Price ($)", field2Type: "currency", field2Placeholder: "e.g. 450,000.00",
    unit: "transaction",
    bodyServices: "Seller agrees to sell and Buyer agrees to purchase the real property described as: {property_legal_description}.",
    bodyCompensation: "Buyer shall pay Seller the total purchase price of {purchase_price} at closing.",
    bodyIp: "All title deeds, surveys, and escrow deposits are handled by the designated Title Company."
  },
  {
    id: "earnest-money-agreement",
    subcategory: "Investment & Transactions",
    title: "Earnest Money Escrow Agreement",
    description: "An agreement defining escrow deposit terms, release dates, and dispute rules for earnest money.",
    desc: "earnest money, escrow deposits, and dispute rules",
    field1: "escrow_holder_name", field1Label: "Escrow Company / Holder Name", field1Type: "text", field1Placeholder: "e.g. Land Title Guarantee Company",
    field2: "earnest_money_amount", field2Label: "Earnest Money Deposit ($)", field2Type: "currency", field2Placeholder: "e.g. 5,000.00",
    unit: "deposit",
    bodyServices: "Buyer shall deposit earnest funds with {escrow_holder_name} within 3 days of contract execution.",
    bodyCompensation: "The Escrow Holder shall hold the deposit of {earnest_money_amount} to be applied to the purchase price at closing.",
    bodyIp: "Disputes over earnest money must be resolved via mutual release or court interpleader actions."
  },
  {
    id: "option-to-purchase",
    subcategory: "Investment & Transactions",
    title: "Option to Purchase Agreement",
    description: "An agreement granting a buyer the exclusive right to purchase a property within a set timeframe in exchange for an option fee.",
    desc: "option fees, purchase options, and purchase options",
    field1: "option_term_days", field1Label: "Option Term (Days)", field1Type: "number", field1Placeholder: "e.g. 180",
    field2: "option_fee_amount", field2Label: "Non-Refundable Option Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 3,500.00",
    unit: "option",
    bodyServices: "Seller grants Buyer the exclusive option to buy the property for a term of {option_term_days} days.",
    bodyCompensation: "Buyer shall pay Seller a non-refundable option fee of {option_fee_amount} to secure this right.",
    bodyIp: "If option is exercised, the option fee shall be credited to the final purchase price."
  },
  {
    id: "right-of-first-refusal",
    subcategory: "Investment & Transactions",
    title: "Right of First Refusal Agreement",
    description: "A contract granting a party the right to match any external purchase offers before the owner sells the property.",
    desc: "first refusal, purchase offers matching, and notice days",
    field1: "match_days_limit", field1Label: "Days to Match Offer (Days)", field1Type: "number", field1Placeholder: "e.g. 15",
    field2: "property_address", field2Label: "Target Property Address", field2Type: "text", field2Placeholder: "e.g. 88 Mountain Road, Boulder, CO 80301",
    unit: "agreement",
    bodyServices: "Owner grants Holder a right of first refusal to purchase the property: {property_address}.",
    bodyCompensation: "Holder shall have {match_days_limit} days to match any verified third-party offer received by Owner.",
    bodyIp: "This right is personal and cannot be assigned without Owner's written consent."
  },
  {
    id: "assignment-purchase-contract",
    subcategory: "Investment & Transactions",
    title: "Assignment of Real Estate Purchase Contract",
    description: "An assignment agreement where a buyer transfers their purchase rights to an end buyer in exchange for an assignment fee.",
    desc: "wholesale assignments, assignment fees, and contract rights",
    field1: "original_agreement_date", field1Label: "Original Contract Date", field1Type: "date", required: true,
    field2: "assignment_fee", field2Label: "Assignment Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 8,000.00",
    unit: "assignment",
    bodyServices: "Assignor assigns all rights under the purchase contract dated {original_agreement_date} to the Assignee.",
    bodyCompensation: "Assignee shall pay Assignor an assignment fee of {assignment_fee} upon successful closing.",
    bodyIp: "Assignee assumes all performance liabilities of the buyer under the original contract."
  },
  {
    id: "wholesale-real-estate",
    subcategory: "Investment & Transactions",
    title: "Wholesale Real Estate Contract",
    description: "A purchase agreement with specific assignment clauses and marketing rights for real estate wholesalers.",
    desc: "wholesaling, assignable clauses, and marketing rights",
    field1: "inspection_period_days", field1Label: "Inspection Period (Days)", field1Type: "number", field1Placeholder: "e.g. 15",
    field2: "wholesale_purchase_price", field2Label: "Wholesale Purchase Price ($)", field2Type: "currency", field2Placeholder: "e.g. 150,000.00",
    unit: "wholesale",
    bodyServices: "Seller agrees to sell property to Wholesaler with full marketing and assignment rights during the {inspection_period_days} day inspection window.",
    bodyCompensation: "Wholesaler agrees to secure an end buyer or purchase the property for the wholesale price of {wholesale_purchase_price}.",
    bodyIp: "Wholesaler retains exclusive right to market the contract and show the property to prospective end-buyers."
  },
  {
    id: "subject-to-purchase",
    subcategory: "Investment & Transactions",
    title: "Subject-To Purchase Agreement",
    description: "A contract where the buyer purchases the property subject to the existing mortgage remaining in place.",
    desc: "subject-to transactions, mortgage assumptions, and financing risks",
    field1: "existing_mortgage_balance", field1Label: "Existing Mortgage Balance ($)", field1Type: "currency", field1Placeholder: "e.g. 185,000.00",
    field2: "loan_servicer_name", field2Label: "Loan Servicer Company Name", field2Type: "text", field2Placeholder: "e.g. Chase Mortgage Services",
    unit: "transaction",
    bodyServices: "Buyer purchases the property subject to the existing loan serviced by: {loan_servicer_name}.",
    bodyCompensation: "Buyer agrees to make monthly payments directly on the mortgage balance of {existing_mortgage_balance} on behalf of Seller.",
    bodyIp: "Seller understands that the loan remains in their name and late payments will impact their credit."
  },
  {
    id: "real-estate-jv-agreement",
    subcategory: "Investment & Transactions",
    title: "Real Estate Joint Venture Agreement",
    description: "A co-investment contract defining profit splits, manager duties, and funding contributions for property flips.",
    desc: "joint ventures, flip splits, and funding rules",
    field1: "jv_project_goals", field1Label: "JV Project Scope", field1Type: "textarea", field1Placeholder: "e.g. Purchase, renovate, and sell the duplex at 12 Elm Street...",
    field2: "profit_split_ratio", field2Label: "Profit Split Ratio (Manager/Investor %)", field2Type: "text", field2Placeholder: "e.g. 50/50 profit split after return of capital",
    unit: "partnership",
    bodyServices: "The Parties establish a joint venture to execute the following property flip: {jv_project_goals}.",
    bodyCompensation: "All venture proceeds shall be distributed according to the split ratio: {profit_split_ratio}.",
    bodyIp: "All project blueprints, vendor bids, and accounting ledgers belong to the Joint Venture."
  },
  {
    id: "hard-money-loan",
    subcategory: "Investment & Transactions",
    title: "Hard Money Loan Agreement",
    description: "A short-term, asset-backed loan agreement for real estate investors, specifying interest rates and points.",
    desc: "hard money, investor loans, and mortgage deeds",
    field1: "loan_interest_rate", field1Label: "Interest Rate (% Annually)", field1Type: "text", field1Placeholder: "e.g. 12% per annum, interest-only payments",
    field2: "loan_principal_amount", field2Label: "Loan Principal Amount ($)", field2Type: "currency", field2Placeholder: "e.g. 200,000.00",
    unit: "loan",
    bodyServices: "Lender agrees to fund the principal loan amount of {loan_principal_amount} secured by a first deed of trust.",
    bodyCompensation: "Borrower shall make monthly interest-only payments based on the interest rate of {loan_interest_rate} with balloon payment at maturity.",
    bodyIp: "Lender retains the right to foreclose on the real property if Borrower defaults on payments."
  },
  {
    id: "real-estate-profit-sharing",
    subcategory: "Investment & Transactions",
    title: "Profit-Sharing Agreement (Real Estate Partnership)",
    description: "A partnership agreement detailing equity percentages, profit distributions, and cash reserves formulas.",
    desc: "profit sharing, equity splits, and cash reserves",
    field1: "equity_splits_schedule", field1Label: "Equity Split Percentages", field1Type: "textarea", field1Placeholder: "e.g. Partner A: 60% equity (capital provider), Partner B: 40% equity (operating partner)...",
    field2: "minimum_reserve_fund", field2Label: "Minimum Cash Reserve ($)", field2Type: "currency", field2Placeholder: "e.g. 15,000.00",
    unit: "partnership",
    bodyServices: "Partners shall maintain a minimum cash reserve of {minimum_reserve_fund} for property repairs.",
    bodyCompensation: "All net cash flows shall be shared per the equity splits schedule: {equity_splits_schedule}.",
    bodyIp: "All partnership records, escrow accounts, and tenant histories belong to the Partnership."
  },

  // --- Commercial Real Estate ---
  {
    id: "triple-net-nnn-lease",
    subcategory: "Commercial Real Estate",
    title: "Triple Net (NNN) Lease Agreement",
    description: "A commercial lease where the tenant pays base rent plus taxes, insurance, and maintenance costs.",
    desc: "triple net lease, base rent, and NNN utilities",
    field1: "nnn_terms_scope", field1Label: "Taxes, Insurance & Maintenance Covenants", field1Type: "textarea", field1Placeholder: "e.g. Tenant pays 100% of property taxes, building insurance, and structural repair costs...",
    field2: "base_monthly_rent", field2Label: "Base Monthly Rent ($)", field2Type: "currency", field2Placeholder: "e.g. 8,500.00",
    unit: "month",
    bodyServices: "Tenant shall lease the commercial premises and pay all taxes, insurance, and utility bills: {nnn_terms_scope}.",
    bodyCompensation: "Tenant shall pay Landlord a base rent of {base_monthly_rent} plus estimated monthly NNN expenses.",
    bodyIp: "All structural building modifications require Landlord's prior written engineering signoff."
  },
  {
    id: "gross-lease-agreement",
    subcategory: "Commercial Real Estate",
    title: "Commercial Gross Lease Agreement",
    description: "A commercial lease contract where the landlord pays all property taxes, insurance, and maintenance out of the tenant's base rent.",
    desc: "gross lease, base rent, and utility rules",
    field1: "premises_description", field1Label: "Leased Commercial Space", field1Type: "text", field1Placeholder: "e.g. Suite 300, 1500 Commercial Blvd, Denver, CO",
    field2: "flat_monthly_rent", field2Label: "Flat Monthly Rent ($)", field2Type: "currency", field2Placeholder: "e.g. 5,000.00",
    unit: "month",
    bodyServices: "Landlord leases the premises to Tenant on a full gross lease basis: {premises_description}.",
    bodyCompensation: "Tenant shall pay Landlord a flat monthly rent fee of {flat_monthly_rent} with no NNN overrides.",
    bodyIp: "Landlord is responsible for all common area maintenance (CAM), property taxes, and insurance."
  },
  {
    id: "modified-gross-lease",
    subcategory: "Commercial Real Estate",
    title: "Modified Gross Lease Agreement",
    description: "A commercial lease where the tenant pays base rent and a portion of specific utility or maintenance expenses.",
    desc: "modified gross, base rent, and shared utility billing",
    field1: "shared_utility_rules", field1Label: "Shared Expenses Allocation", field1Type: "textarea", field1Placeholder: "e.g. Tenant pays electricity and interior janitorial; Landlord pays taxes and insurance...",
    field2: "base_monthly_rent", field2Label: "Base Monthly Rent ($)", field2Type: "currency", field2Placeholder: "e.g. 6,000.00",
    unit: "month",
    bodyServices: "Tenant leases the space, sharing operational utility costs: {shared_utility_rules}.",
    bodyCompensation: "Tenant shall pay Landlord a base rent of {base_monthly_rent} plus designated shared expenses.",
    bodyIp: "Landlord retains ownership of all HVAC units, and Tenant maintains interior fixtures."
  },
  {
    id: "commercial-lease-addendum",
    subcategory: "Commercial Real Estate",
    title: "Commercial Lease Addendum",
    description: "A general addendum modifying specific commercial lease covenants (signage rights, subleasing, tenant improvements).",
    desc: "signage rights, tenant improvements, and subleasing terms",
    field1: "signage_rights_rules", field1Label: "Exterior Signage Guidelines", field1Type: "textarea", field1Placeholder: "e.g. Tenant is authorized to install exterior logo sign on main directory plaque...",
    field2: "improvements_allowance", field2Label: "Tenant Improvements Allowance ($)", field2Type: "currency", field2Placeholder: "e.g. 10,000.00",
    unit: "addendum",
    bodyServices: "Tenant is granted exterior signage and buildout rights as follows: {signage_rights_rules}.",
    bodyCompensation: "Landlord shall credit Tenant an improvements allowance of {improvements_allowance} upon completion of buildout phases.",
    bodyIp: "All permanent electrical and partition upgrades remain the property of the Landlord."
  },
  {
    id: "retail-space-lease",
    subcategory: "Commercial Real Estate",
    title: "Retail Space Lease Agreement",
    description: "A commercial lease specifying percentage rent splits, store hours, and shopping center common area fees.",
    desc: "retail space, store hours, and percentage rent",
    field1: "business_hours_policy", field1Label: "Mandatory Business Hours", field1Type: "text", field1Placeholder: "e.g. Monday-Saturday 10:00 AM to 9:00 PM, Sunday 12:00 PM to 6:00 PM",
    field2: "percentage_rent_rate", field2Label: "Percentage Rent Rate (%)", field2Type: "text", field2Placeholder: "e.g. 2% of annual gross sales exceeding $500,000 breakpoint",
    unit: "month",
    bodyServices: "Tenant shall operate the retail store during the mandatory business hours: {business_hours_policy}.",
    bodyCompensation: "Tenant shall pay base monthly rent plus percentage rent calculated at: {percentage_rent_rate}.",
    bodyIp: "Tenant retains rights to retail merchandise, while all storefront structures belong to the Landlord."
  },
  {
    id: "office-space-lease",
    subcategory: "Commercial Real Estate",
    title: "Office Space Lease Agreement",
    description: "A lease agreement for professional office buildings, detailing shared utilities, receptionist desk rules, and access key policies.",
    desc: "office space, shared boardrooms, and access cards",
    field1: "internet_security_rules", field1Label: "Office IT & Internet Policies", field1Type: "textarea", field1Placeholder: "Describe common server room access, shared Wi-Fi limits, and firewalls...",
    field2: "monthly_rent", field2Label: "Monthly Office Rent ($)", field2Type: "currency", field2Placeholder: "e.g. 3,500.00",
    unit: "month",
    bodyServices: "Tenant leases the professional office space, adhering to network rules: {internet_security_rules}.",
    bodyCompensation: "Tenant shall pay Landlord a monthly rent of {monthly_rent} for office usage.",
    bodyIp: "All shared boardrooms, lobbies, and directory boards remain the property of the Landlord."
  },
  {
    id: "warehouse-lease-agreement",
    subcategory: "Commercial Real Estate",
    title: "Industrial / Warehouse Lease Agreement",
    description: "A commercial lease for warehouse spaces detailing loading dock access, heavy machinery rules, and structural floor loads.",
    desc: "loading docks, floor loads, and heavy machinery rules",
    field1: "floor_load_limit", field1Label: "Maximum Floor Load Limit", field1Type: "text", field1Placeholder: "e.g. 250 lbs per square foot, forklift access permitted",
    field2: "monthly_base_rent", field2Label: "Base Warehouse Rent ($)", field2Type: "currency", field2Placeholder: "e.g. 7,200.00",
    unit: "month",
    bodyServices: "Tenant shall use the warehouse space adhering to load boundaries and machine codes: {floor_load_limit}.",
    bodyCompensation: "Tenant shall pay Landlord a monthly base rent of {monthly_base_rent}.",
    bodyIp: "All installed heavy machinery, metal shelving, and cranes belong to Tenant if removed cleanly."
  },

  // --- Short-Term & Vacation Rental ---
  {
    id: "airbnb-house-rules",
    subcategory: "Short-Term & Vacation Rental",
    title: "Airbnb House Rules Agreement",
    description: "A guest agreement detailing check-in times, noise rules, pet rules, and damage penalties for short-term stays.",
    desc: "short term stays, noise curfews, and checkout rules",
    field1: "checkin_checkout_hours", field1Label: "Check-in & Check-out Times", field1Type: "text", field1Placeholder: "e.g. Check-in after 4:00 PM, Check-out by 11:00 AM",
    field2: "unauthorized_party_fine", field2Label: "Unauthorized Party Penalty Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 500.00",
    unit: "stay",
    bodyServices: "Guest agrees to vacate the premises by checkout time and adhere to rules: {checkin_checkout_hours}.",
    bodyCompensation: "Guest agrees that unauthorized events will result in a penalty fine of {unauthorized_party_fine}.",
    bodyIp: "The property owner retains the right to evict guests immediately for rule breaches."
  },
  {
    id: "vacation-rental-damage-waiver",
    subcategory: "Short-Term & Vacation Rental",
    title: "Vacation Rental Damage Waiver",
    description: "A waiver contract protecting guests from accidental property damage fees in exchange for a flat waiver fee.",
    desc: "accidental damages, rental waivers, and repair caps",
    field1: "covered_damage_limit", field1Label: "Maximum Coverage Limit ($)", field1Type: "currency", field1Placeholder: "e.g. 1,500.00",
    field2: "waiver_flat_fee", field2Label: "Accidental Damage Waiver Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 45.00",
    unit: "waiver",
    bodyServices: "Host agrees to waive claims for accidental interior damages up to the maximum limit: {covered_damage_limit}.",
    bodyCompensation: "Guest agrees to pay a non-refundable damage waiver fee of {waiver_flat_fee} with booking.",
    bodyIp: "Accidental waiver excludes intentional vandalism, theft, or pet damage violations."
  },
  {
    id: "guest-rental-agreement",
    subcategory: "Short-Term & Vacation Rental",
    title: "Guest Rental Agreement (VRBO-Style)",
    description: "A vacation rental agreement defining stay periods, maximum guests counts, pool rules, and security deposits.",
    desc: "vacation stays, maximum guests, and pool guidelines",
    field1: "max_guest_count", field1Label: "Maximum Guest Occupancy", field1Type: "number", field1Placeholder: "e.g. 8",
    field2: "security_deposit_refundable", field2Label: "Refundable Security Deposit ($)", field2Type: "currency", field2Placeholder: "e.g. 500.00",
    unit: "stay",
    bodyServices: "Guest agrees that total occupancy shall not exceed the limit of {max_guest_count} persons.",
    bodyCompensation: "Guest shall pay a refundable security deposit of {security_deposit_refundable} prior to arrival date.",
    bodyIp: "The property manager may hold deposits to cover cleanings or noise rule violations."
  },
  {
    id: "airbnb-cohost-agreement",
    subcategory: "Short-Term & Vacation Rental",
    title: "Airbnb Co-Host Agreement",
    description: "A co-hosting contract detailing payout splits, message response rules, and cleaning coordination splits.",
    desc: "co-host percentages, guest messages, and cleaner oversight",
    field1: "cohost_responsibilities", field1Label: "Co-Host Operational Tasks", field1Type: "textarea", field1Placeholder: "e.g. Manage guest communication, coordinate cleaners, and restock supplies...",
    field2: "cohost_commission_percentage", field2Label: "Co-Host Commission (%)", field2Type: "text", field2Placeholder: "e.g. 15% of gross booking revenues",
    unit: "booking",
    bodyServices: "Co-Host shall coordinate cleaners and respond to guest inquiries: {cohost_responsibilities}.",
    bodyCompensation: "Host shall pay Co-Host a service commission of {cohost_commission_percentage} per booking payout.",
    bodyIp: "All guest ratings, Airbnb listing profiles, and photos belong exclusively to the Host."
  },
  {
    id: "property-caretaker-agreement",
    subcategory: "Short-Term & Vacation Rental",
    title: "Property Caretaker Agreement",
    description: "A service contract for a live-in or local property caretaker, defining gardening, security, and maintenance tasks.",
    desc: "caretaker duties, garden watering, and winter security checks",
    field1: "caretaker_tasks", field1Label: "Caretaker Maintenance Duties", field1Type: "textarea", field1Placeholder: "e.g. Winterize pipes, water garden, check locks weekly, and shovel snow...",
    field2: "monthly_stipend", field2Label: "Monthly Caretaker Stipend ($)", field2Type: "currency", field2Placeholder: "e.g. 800.00",
    unit: "month",
    bodyServices: "Caretaker shall perform weekly locks checks and garden watering according to: {caretaker_tasks}.",
    bodyCompensation: "Owner shall provide free rent/utilities plus a monthly stipend of {monthly_stipend}.",
    bodyIp: "Caretaker holds no tenancy rights under this agreement and must vacate upon contract termination."
  },

  // --- Disclosure & Compliance ---
  {
    id: "seller-property-disclosure",
    subcategory: "Disclosure & Compliance",
    title: "Seller's Property Disclosure Statement",
    description: "A mandatory transaction disclosure form detailing roof ages, basements leaks, wiring defects, and plumbing issues.",
    desc: "property defects, roof age, and appliance states",
    field1: "defect_notes", field1Label: "Known Property Defects", field1Type: "textarea", field1Placeholder: "e.g. Minor basement moisture during heavy spring rains, roof replaced in 2018...",
    field2: "disclosure_date", field2Label: "Disclosure Execution Date", field2Type: "date", required: true,
    unit: "disclosure",
    bodyServices: "Seller discloses known building defects and maintenance logs as follows: {defect_notes}.",
    bodyCompensation: "This statement is executed on {disclosure_date} and forms part of the purchase contract.",
    bodyIp: "Seller warrants that disclosures represent true conditions to the best of their knowledge."
  },
  {
    id: "lead-paint-disclosure",
    subcategory: "Disclosure & Compliance",
    title: "Lead Paint Disclosure (Pre-1978)",
    description: "A legally required federal lead paint disclosure form for houses constructed before 1978.",
    desc: "lead paint risks, pre-1978 homes, and EPA pamphlets",
    field1: "construction_year", field1Label: "Building Construction Year", field1Type: "number", field1Placeholder: "e.g. 1972",
    field2: "lead_records_notes", field2Label: "Known Lead Paint Hazards", field2Type: "textarea", field2Placeholder: "e.g. Seller has no knowledge of lead-based paint hazards and no records...",
    unit: "disclosure",
    bodyServices: "Buyer acknowledges building was constructed in {construction_year} and receives lead paint pamphlets.",
    bodyCompensation: "Seller discloses lead hazard information and records: {lead_records_notes}.",
    bodyIp: "This disclosure is a mandatory filing under EPA and federal housing laws."
  },
  {
    id: "as-is-purchase-addendum",
    subcategory: "Disclosure & Compliance",
    title: "AS-IS Property Purchase Addendum",
    description: "An addendum stating the buyer purchases the property in its current state without landlord repair obligations.",
    desc: "as-is sales, repair waivers, and inspection releases",
    field1: "inspection_acceptance_date", field1Label: "Inspection Review Deadline", field1Type: "date", required: true,
    field2: "maximum_repair_credit_limit", field2Label: "Maximum Landlord Repair Credit ($)", field2Type: "currency", field2Placeholder: "e.g. 0.00",
    unit: "addendum",
    bodyServices: "Buyer agrees to buy the property in AS-IS state following the review deadline: {inspection_acceptance_date}.",
    bodyCompensation: "Seller is not liable for any repair costs and provides a repair credit of: {maximum_repair_credit_limit}.",
    bodyIp: "Buyer releases Seller from any claims regarding latent or active property defects."
  },
  {
    id: "agency-disclosure-form",
    subcategory: "Disclosure & Compliance",
    title: "Real Estate Agency Disclosure Form",
    description: "A disclosure form explaining agent relationships (buyer's agent, seller's agent, or dual agency) to clients.",
    desc: "agency relationships, dual agent risks, and client representation",
    field1: "designated_relationship", field1Label: "Agency Relationship Type", field1Type: "select", options: ["Seller Agent", "Buyer Agent", "Dual Agent", "Transaction Broker"], defaultValue: "Buyer Agent",
    field2: "agent_license_number", field2Label: "Agent State License Number", field2Type: "text", field2Placeholder: "e.g. FA.1000987-CO",
    unit: "disclosure",
    bodyServices: "Agent explains client representation boundaries under the selected relationship: {designated_relationship}.",
    bodyCompensation: "The agent holds state credentials under license number: {agent_license_number}.",
    bodyIp: "This disclosure must be signed by the client prior to executing any listing or representation contracts."
  },
  {
    id: "wire-fraud-warning",
    subcategory: "Disclosure & Compliance",
    title: "Wire Fraud Warning Notice",
    description: "A mandatory safety notice warning clients of email wire scams, setting telephone verification rules.",
    desc: "wire fraud warning, escrow wire scams, and phone check rules",
    field1: "closing_agent_telephone", field1Label: "Verification Telephone Number", field1Type: "text", field1Placeholder: "e.g. 303-555-0199",
    field2: "max_escrow_deposit", field2Label: "Expected Escrow Deposit ($)", field2Type: "currency", field2Placeholder: "e.g. 10,000.00",
    unit: "notice",
    bodyServices: "Buyer is warned to verify all wire instructions by calling the closing agent at: {closing_agent_telephone}.",
    bodyCompensation: "Buyer shall verify wiring instructions before transferring the escrow deposit of: {max_escrow_deposit}.",
    bodyIp: "Neither Brokerage nor Title Company is liable for funds sent to fraudulent spoofed accounts."
  }
];

// Helper to format a single template object
function makeRealEstateTemplate(t) {
  const f1 = t.field1 || "scope_of_work";
  const f1Label = t.field1Label || "Scope of Work";
  const f1Type = t.field1Type || "textarea";
  const f1Placeholder = t.field1Placeholder || "Describe the property details to perform...";
  
  const f2 = t.field2 || "flat_rate";
  const f2Label = t.field2Label || "Transaction Rate ($)";
  const f2Type = t.field2Type || "currency";
  const f2Placeholder = t.field2Placeholder || "e.g. 2,500.00";

  const billingUnit = t.unit || "project";

  return {
    id: t.id,
    slug: t.id,
    category: "real-estate",
    subcategory: t.subcategory,
    title: t.title,
    description: t.description,
    whatsCovered: [
      `Definition of professional ${t.desc || 'real estate covenants'}`,
      "Security deposits, escrow rules, and payment milestones",
      "Property access, landlord entry, and keys protocols",
      "Disclosures, lead paint compliance, and state law notices",
      "Standard governing law and contract enforcement guidelines"
    ],
    whenToUse: `Use this contract when organizing transactions or agreements for ${t.desc || 'real estate projects'} to maintain complete legal compliance with state property regulations.`,
    jurisdictions: ["US", "UK", "CA"],
    lastReviewedAt: "2026-05-20",
    reviewerName: "Sarah Jenkins, Esq.",
    estimatedFillMinutes: 5,
    fields: [
      { id: "provider_name", label: "Owner / Landlord / First Party Name", type: "text", placeholder: "e.g. Apex Property Investments LLC", required: true, group: "First Party Info" },
      { id: "provider_address", label: "First Party Address", type: "text", placeholder: "e.g. 100 Landmark Blvd, Denver, CO 80202", required: true, group: "First Party Info" },
      { id: "client_name", label: "Tenant / Buyer / Second Party Name", type: "text", placeholder: "e.g. John Doe", required: true, group: "Second Party Info" },
      { id: "client_address", label: "Second Party Address", type: "text", placeholder: "e.g. 15 Ridge Way, Boulder, CO 80301", required: true, group: "Second Party Info" },
      { id: "effective_date", label: "Effective Date", type: "date", required: true, group: "Key Dates" },
      { id: f1, label: f1Label, type: f1Type, placeholder: f1Placeholder, required: true, group: "Property Details" },
      { id: f2, label: f2Label, type: f2Type, placeholder: f2Placeholder, required: true, group: "Financials" },
      { id: "governing_state", label: "Governing Jurisdiction (State/Country)", type: "text", placeholder: "e.g. Colorado", required: true, group: "Legal Settings" }
    ],
    clauses: [
      {
        id: "intro",
        heading: `${t.title.toUpperCase()}`,
        body: `This Real Estate Agreement (the "Agreement") is entered into as of {effective_date} (the "Effective Date"), by and between {provider_name}, located at {provider_address} ("First Party"), and {client_name}, located at {client_address} ("Second Party").`,
        optional: false,
        enabledByDefault: true
      },
      {
        id: "services",
        heading: "1. Property / Covenants Scope",
        body: t.bodyServices || `First Party agrees to grant rights or perform tasks as specified in the property specifications: {${f1}}. All parties agree to maintain the premises in compliant status.`,
        optional: false,
        enabledByDefault: true
      },
      {
        id: "compensation",
        heading: "2. Financial Obligations & Fees",
        body: t.bodyCompensation || `Second Party shall pay First Party the rate of {${f2}} in accordance with the transaction billing milestones. Deposits shall be held in compliant escrow accounts.`,
        optional: false,
        "enabledByDefault": true
      },
      {
        id: "compliance",
        heading: "3. Disclosures and Environmental Covenants",
        body: t.bodyIp || "Both parties agree to execute all necessary state agency disclosures, environmental lead disclosures, and wire fraud check warnings as required by federal or municipal statutes.",
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
    relatedTemplates: ["residential-lease", "roommate-agreement"],
    faq: [
      { question: "Is this agreement binding in all US states?", answer: "Yes, but real estate laws vary significantly. Ensure you specify the correct governing state in the Legal Settings field before closing." },
      { question: "How are security or escrow funds handled?", answer: "All security and earnest deposits must be held in dedicated escrow trust accounts in accordance with state license commission laws." }
    ],
    tags: ["real-estate", "contract", "property", billingUnit]
  };
}

// Generate files
newTemplates.forEach((t) => {
  const formatted = makeRealEstateTemplate(t);
  const filePath = path.join(outputDir, `${formatted.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(formatted, null, 2), 'utf8');
  console.log(`Successfully wrote template: ${formatted.id}`);
});

console.log('Finished writing real estate templates!');
