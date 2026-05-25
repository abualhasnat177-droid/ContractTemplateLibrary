const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '..', 'content', 'templates', 'freelance');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 72 freelance templates to generate
const templates = [
  // --- General & Administrative ---
  {
    id: "general-freelance",
    subcategory: "General Services",
    title: "General Freelance Contract",
    description: "A versatile independent service contract defining duties, hourly or flat fee structures, and ownership of deliverables.",
    desc: "freelance services, milestones, or hourly tasks",
    field1: "scope_of_work", field1Label: "Scope of Services", field1Type: "textarea", field1Placeholder: "Describe the tasks or deliverables to perform...",
    field2: "billing_rate", field2Label: "Billing Rate ($)", field2Type: "currency", field2Placeholder: "e.g. 75.00",
    unit: "hour",
    bodyServices: "Freelancer agrees to perform the following services for the Client: {scope_of_work}.",
    bodyCompensation: "Client shall pay Freelancer at the rate of {billing_rate} per hour for all hours dedicated to the project.",
    bodyIp: "Upon receipt of final payment, Freelancer transfers all copyrights in the deliverables to the Client."
  },
  {
    id: "virtual-assistant-contract",
    subcategory: "General Services",
    title: "Virtual Assistant Contract",
    description: "A monthly retainer contract for administrative support, scheduling, email management, and billing services.",
    desc: "administrative support, calendar scheduling, or correspondence tasks",
    field1: "va_tasks", field1Label: "Administrative Services Scope", field1Type: "textarea", field1Placeholder: "Describe the VA support tasks (e.g. email management, travel booking)...",
    field2: "monthly_payment", field2Label: "Monthly Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 1,500.00",
    unit: "month",
    bodyServices: "Assistant agrees to perform the following administrative services: {va_tasks}.",
    bodyCompensation: "Client shall pay Assistant a monthly flat fee of {monthly_payment} for administrative support.",
    bodyIp: "All reports, emails, and administrative files managed by Assistant remain the exclusive property of Client."
  },
  {
    id: "translation-services-agreement",
    subcategory: "General Services",
    title: "Translation Services Agreement",
    description: "A translation services agreement defining language pairs, localization quality checks, and per-word or flat rates.",
    desc: "translation, transcription, or localization services",
    field1: "language_pairs", field1Label: "Source and Target Languages", field1Type: "text", field1Placeholder: "e.g. English to Spanish and Portuguese",
    field2: "word_rate", field2Label: "Translation Rate per Word ($)", field2Type: "currency", field2Placeholder: "e.g. 0.12",
    unit: "word",
    bodyServices: "Translator agrees to translate deliverables between the following language pairs: {language_pairs}.",
    bodyCompensation: "Client shall pay Translator a fee of {word_rate} per source/target word translated.",
    bodyIp: "Upon receipt of final payment, all translated files, materials, and localizations belong exclusively to the Client."
  },
  {
    id: "event-planning-contract",
    subcategory: "General Services",
    title: "Event Planning Contract",
    description: "A client contract for event planning, coordination, logistics, vendor liaison, and planning schedules.",
    desc: "event planning, vendor management, or logistics services",
    field1: "event_details", field1Label: "Event Name and Location", field1Type: "text", field1Placeholder: "e.g. Annual Tech Gala at Grand Plaza",
    field2: "planning_fee", field2Label: "Event Coordination Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 4,000.00",
    unit: "event",
    bodyServices: "Planner shall coordinate, secure vendors, and manage timelines for the following event: {event_details}.",
    bodyCompensation: "Client shall pay Planner a flat coordination fee of {planning_fee} for event management.",
    bodyIp: "All guest lists, floor plans, and schedules compiled by Planner belong to the Client."
  },
  {
    id: "catering-agreement",
    subcategory: "General Services",
    title: "Catering Services Agreement",
    description: "A catering food supply agreement detailing menus, guest counts, staff rules, and deposit schedules.",
    desc: "catering, meal preparation, or food supply services",
    field1: "menu_details", field1Label: "Proposed Menu & Food Style", field1Type: "textarea", field1Placeholder: "e.g. Three-course Italian buffet with vegetarian options...",
    field2: "catering_cost", field2Label: "Total Catering Cost ($)", field2Type: "currency", field2Placeholder: "e.g. 3,500.00",
    unit: "catering",
    bodyServices: "Caterer agrees to provide food, beverage, and staffing services for the following menu: {menu_details}.",
    bodyCompensation: "Client shall pay Caterer a total fee of {catering_cost} for food, staff, and table service.",
    bodyIp: "Caterer retains ownership of all custom food recipes and culinary trademarks used during the event."
  },

  // --- Writing & Content ---
  {
    id: "blog-writing-agreement",
    subcategory: "Writing & Content",
    title: "Blog Writing Agreement",
    description: "A creative contract for blog content creation, article series, word counts, and search engine optimization optimization.",
    desc: "blog posts, articles, or newsletter creation",
    field1: "blog_specs", field1Label: "Blog Topics & Word Count", field1Type: "textarea", field1Placeholder: "e.g. Four (4) 1500-word SEO articles on personal finance...",
    field2: "payment_amount", field2Label: "Project Payment ($)", field2Type: "currency", field2Placeholder: "e.g. 800.00",
    unit: "project",
    bodyServices: "Writer shall draft, edit, and deliver the following blog articles: {blog_specs}.",
    bodyCompensation: "Client shall pay Writer a flat fee of {payment_amount} upon delivery of the articles.",
    bodyIp: "Upon receipt of final payment, Writer transfers all copyrights in the blog posts to the Client."
  },
  {
    id: "technical-writing-contract",
    subcategory: "Writing & Content",
    title: "Technical Writing Contract",
    description: "A specialized writing agreement for technical documentation, user manuals, API guides, and reference material.",
    desc: "technical manuals, user guides, or documentation services",
    field1: "docs_scope", field1Label: "Documentation Scope", field1Type: "textarea", field1Placeholder: "Describe the user guide, API reference, or manuals to write...",
    field2: "payment_amount", field2Label: "Documentation Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 5,000.00",
    unit: "manual",
    bodyServices: "Writer shall author, structure, and deliver the following technical documents: {docs_scope}.",
    bodyCompensation: "Client shall pay Writer a flat fee of {payment_amount} for technical authoring.",
    bodyIp: "Upon receipt of final payment, all technical manuals and documentation assets belong to the Client."
  },
  {
    id: "grant-writing-agreement",
    subcategory: "Writing & Content",
    title: "Grant Writing Agreement",
    description: "An agreement for grant application writing, consulting, program research, and submission management.",
    desc: "grant applications, program research, or proposals",
    field1: "grant_agency", field1Label: "Target Grant Agency / Program", field1Type: "text", field1Placeholder: "e.g. National Endowment for the Arts Grant Application",
    field2: "payment_amount", field2Label: "Grant Proposal Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 3,000.00",
    unit: "proposal",
    bodyServices: "Writer shall research, write, and prepare the proposal for: {grant_agency}.",
    bodyCompensation: "Client shall pay Writer a flat fee of {payment_amount} for the grant writing services.",
    bodyIp: "All research papers, draft outlines, and final grant applications belong to the Client."
  },
  {
    id: "scriptwriting-contract",
    subcategory: "Writing & Content",
    title: "Scriptwriting Contract",
    description: "A scriptwriting agreement for video advertisements, feature scripts, explainers, or YouTube campaigns.",
    desc: "scriptwriting, storyboard drafting, or video outline services",
    field1: "script_desc", field1Label: "Script Details", field1Type: "textarea", field1Placeholder: "e.g. Three (3) 30-second video ad scripts for product launch...",
    field2: "payment_amount", field2Label: "Scriptwriting Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 1,200.00",
    unit: "script",
    bodyServices: "Writer shall outline, draft, and revise the following script: {script_desc}.",
    bodyCompensation: "Client shall pay Writer a flat fee of {payment_amount} for the script deliverables.",
    bodyIp: "Upon receipt of final payment, all rights, title, and interest in the scripts transfer to the Client."
  },
  {
    id: "newsletter-writing-agreement",
    subcategory: "Writing & Content",
    title: "Newsletter Writing Agreement",
    description: "An email newsletter writing contract outlining copy drafting, templates, schedule frequencies, and platform uploads.",
    desc: "newsletter campaigns, email copywriting, or broadcasts",
    field1: "newsletter_scope", field1Label: "Newsletter Schedule Details", field1Type: "textarea", field1Placeholder: "e.g. Weekly email newsletters for Substack/Klaviyo audience...",
    field2: "payment_amount", field2Label: "Monthly Retainer ($)", field2Type: "currency", field2Placeholder: "e.g. 1,000.00",
    unit: "month",
    bodyServices: "Writer shall draft, review, and schedule the following newsletters: {newsletter_scope}.",
    bodyCompensation: "Client shall pay Writer a monthly fee of {payment_amount} for newsletter campaign support.",
    bodyIp: "Upon receipt of payment, all newsletter copy and designs belong to the Client."
  },
  {
    id: "editing-proofreading-contract",
    subcategory: "Writing & Content",
    title: "Editing & Proofreading Contract",
    description: "An editing agreement specifying review criteria, grammar corrections, rewrite loops, and manuscript delivery schedules.",
    desc: "editing, copy editing, or proofreading services",
    field1: "manuscript_title", field1Label: "Manuscript / Document Title", field1Type: "text", field1Placeholder: "e.g. Life in the Cloud (Novel Draft)",
    field2: "payment_amount", field2Label: "Editing Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 1,800.00",
    unit: "manuscript",
    bodyServices: "Editor shall perform copy editing, grammar review, and proofreading for: {manuscript_title}.",
    bodyCompensation: "Client shall pay Editor a flat fee of {payment_amount} for manuscript editing.",
    bodyIp: "All corrections, rewrites, and edited files belong to the Client, while Editor retains no copyrights."
  },
  {
    id: "content-strategy-agreement",
    subcategory: "Writing & Content",
    title: "Content Strategy Agreement",
    description: "An operations agreement for content plan layout, keyword research, editorial calendar, and channel planning.",
    desc: "content planning, SEO mapping, or editorial roadmap services",
    field1: "strategy_scope", field1Label: "Strategy Scope Details", field1Type: "textarea", field1Placeholder: "Describe the content roadmap, SEO keyword strategy, or scheduling logs...",
    field2: "payment_amount", field2Label: "Strategy Roadmap Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 4,500.00",
    unit: "strategy",
    bodyServices: "Strategist shall compile the editorial calendar and content strategy as follows: {strategy_scope}.",
    bodyCompensation: "Client shall pay Strategist a flat fee of {payment_amount} for the strategy deliverables.",
    bodyIp: "All strategic systems, keyword databases, and editorial calendars belong to the Client."
  },
  {
    id: "academic-writing-services",
    subcategory: "Writing & Content",
    title: "Academic Editorial Agreement",
    description: "An editorial advisory agreement for thesis guidance, citations check, journal reviews, and compliance rules.",
    desc: "academic editing, citations formatting, or advisory services",
    field1: "subject_area", field1Label: "Subject Area / Research Topic", field1Type: "text", field1Placeholder: "e.g. Historical Research on Early Roman Infrastructure",
    field2: "payment_amount", field2Label: "Editorial Support Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 1,500.00",
    unit: "project",
    bodyServices: "Editor shall review, format citations, and edit drafts in the field of: {subject_area}.",
    bodyCompensation: "Client shall pay Editor a flat fee of {payment_amount} for editing assistance.",
    bodyIp: "All research files, formatting corrections, and reviews belong exclusively to the Client."
  },

  // --- Marketing & Growth ---
  {
    id: "email-marketing-services",
    subcategory: "Marketing & Growth",
    title: "Email Marketing Services Agreement",
    description: "A digital marketing agreement detailing email copy drafting, automation setup, list segmentation, and analytics tracking.",
    desc: "email marketing campaigns, automations, or list management",
    field1: "campaign_scope", field1Label: "Campaign Scope & Platform", field1Type: "textarea", field1Placeholder: "e.g. Klaviyo email flows setup and weekly marketing broadcasts...",
    field2: "payment_amount", field2Label: "Campaign Retainer Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 2,500.00",
    unit: "month",
    bodyServices: "Marketer shall configure, manage, and scale the following email marketing flows: {campaign_scope}.",
    bodyCompensation: "Client shall pay Marketer a monthly retainer of {payment_amount} for email marketing support.",
    bodyIp: "All email templates, graphics, and automation structures belong to the Client."
  },
  {
    id: "paid-ads-management",
    subcategory: "Marketing & Growth",
    title: "Paid Ads Management Contract",
    description: "An ad agency contract detailing ad budget allocations, ad copy creative design, pixel configuration, and return metrics.",
    desc: "paid advertising, PPC management, or Meta/Google ad campaigns",
    field1: "ad_platforms", field1Label: "Target Platforms", field1Type: "text", field1Placeholder: "e.g. Meta Ads, Google PPC, and TikTok Ads Manager",
    field2: "payment_amount", field2Label: "Monthly Management Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 2,000.00",
    unit: "month",
    bodyServices: "Manager shall create, monitor, and optimize paid ad campaigns on: {ad_platforms}.",
    bodyCompensation: "Client shall pay Manager a monthly fee of {payment_amount} for ad campaign management.",
    bodyIp: "All ad copy, banners, and audience target sets belong to the Client."
  },
  {
    id: "affiliate-marketing-agreement",
    subcategory: "Marketing & Growth",
    title: "Affiliate Marketing Agreement",
    description: "A commercial agreement detailing commission payouts, affiliate tracking links, cookie policies, and brand safety guidelines.",
    desc: "affiliate tracking, link promotions, or commission services",
    field1: "payout_terms", field1Label: "Commission Percentage (%)", field1Type: "text", field1Placeholder: "e.g. 15% commission on all tracked sales conversions",
    field2: "cookie_days", field2Label: "Cookie Window (Days)", field2Type: "number", field2Placeholder: "e.g. 30",
    unit: "conversion",
    bodyServices: "Affiliate shall promote products using tracking links and cookies set to a {cookie_days} day tracking window.",
    bodyCompensation: "Company shall pay Affiliate a referral commission of {payout_terms} for all verified user transactions.",
    bodyIp: "Company retains all rights to its product logos, pricing databases, and websites."
  },
  {
    id: "influencer-outreach-contract",
    subcategory: "Marketing & Growth",
    title: "Influencer Outreach Services Contract",
    description: "An agency agreement for managing influencer sourcing, campaign pitches, shipping logistics, and tracking metrics.",
    desc: "influencer relations, outreach campaigns, or contract management",
    field1: "campaign_details", field1Label: "Influencer Sourcing Scope", field1Type: "textarea", field1Placeholder: "e.g. Sourcing and contract management for 20 micro-influencers...",
    field2: "payment_amount", field2Label: "Outreach Campaign Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 3,500.00",
    unit: "campaign",
    bodyServices: "Agent shall research, pitch, and secure contracts for: {campaign_details}.",
    bodyCompensation: "Client shall pay Agent a flat campaign fee of {payment_amount} for managing outreach.",
    bodyIp: "All influencer lists, pitch templates, and campaign results databases belong to the Client."
  },
  {
    id: "marketing-retainer-agreement",
    subcategory: "Marketing & Growth",
    title: "Marketing Retainer Agreement",
    description: "A monthly retainer contract for general digital marketing support, keyword tracking, social posts, and growth reviews.",
    desc: "monthly marketing support, strategy review, or growth tasks",
    field1: "marketing_tasks", field1Label: "Retainer Marketing Services", field1Type: "textarea", field1Placeholder: "Describe the monthly marketing support tasks...",
    field2: "payment_amount", field2Label: "Monthly Retainer Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 3,000.00",
    unit: "month",
    bodyServices: "Marketer shall execute the following monthly marketing operations: {marketing_tasks}.",
    bodyCompensation: "Client shall pay Marketer a monthly retainer fee of {payment_amount} for continuous campaign support.",
    bodyIp: "All custom graphics, email templates, and marketing files created under retainer belong to the Client."
  },
  {
    id: "growth-hacking-services",
    subcategory: "Marketing & Growth",
    title: "Growth Hacking Services Contract",
    description: "A conversion optimization and user acquisition agreement utilizing viral loops, referral programs, and rapid testing.",
    desc: "user acquisition, referral loops, or viral marketing services",
    field1: "growth_goals", field1Label: "Growth Objectives", field1Type: "text", field1Placeholder: "e.g. Increase monthly active users (MAU) by 25%",
    field2: "payment_amount", field2Label: "Base Campaign Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 4,000.00",
    unit: "project",
    bodyServices: "Hacker shall implement rapid customer testing and loops to achieve: {growth_goals}.",
    bodyCompensation: "Client shall pay Hacker a flat campaign setup fee of {payment_amount} plus pre-approved performance bonuses.",
    bodyIp: "All analytics logs, testing accounts, and conversion funnels created belong to the Client."
  },
  {
    id: "conversion-rate-optimization",
    subcategory: "Marketing & Growth",
    title: "Conversion Rate Optimization Agreement",
    description: "An operational agreement for website A/B testing, user journey mapping, heatmaps tracking, and conversion optimization.",
    desc: "A/B testing, heatmap tracking, or landing page optimization",
    field1: "cro_scope", field1Label: "Testing and Heatmap Scope", field1Type: "textarea", field1Placeholder: "e.g. Complete checkout page A/B testing and VWO/Hotjar analysis...",
    field2: "payment_amount", field2Label: "Optimization Service Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 5,000.00",
    unit: "project",
    bodyServices: "Optimizer shall review user behavior and deploy optimization tests for: {cro_scope}.",
    bodyCompensation: "Client shall pay Optimizer a flat fee of {payment_amount} for optimization services.",
    bodyIp: "Upon receipt of final payment, all landing page designs, test logs, and graphics belong to the Client."
  },
  {
    id: "analytics-reporting-services",
    subcategory: "Marketing & Growth",
    title: "Analytics & Reporting Services Contract",
    description: "A tracking contract for Google Tag Manager setups, GA4 dashboards, pixel configurations, and weekly reporting.",
    desc: "analytics setups, custom dashboards, or tracking integrations",
    field1: "analytics_scope", field1Label: "Analytics Scope details", field1Type: "textarea", field1Placeholder: "e.g. Complete setup of Google Analytics 4 (GA4), custom BigQuery pipelines, and Looker Studio dashboards...",
    field2: "payment_amount", field2Label: "Dashboard Setup Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 3,000.00",
    unit: "setup",
    bodyServices: "Consultant shall configure tracking scripts and custom databases for: {analytics_scope}.",
    bodyCompensation: "Client shall pay Consultant a setup fee of {payment_amount} for analytics deployment.",
    bodyIp: "All dashboard accounts, GA4 profiles, tag setups, and data models remain the property of the Client."
  },

  // --- Design & Creative ---
  {
    id: "graphic-design-contract",
    subcategory: "Design & Creative",
    title: "Graphic Design Contract",
    description: "A creative contract for custom illustrations, marketing banners, and visual graphics outlining design revision cycles.",
    desc: "graphic design, poster art, or advertising creatives",
    field1: "design_scope", field1Label: "Design Deliverables Details", field1Type: "textarea", field1Placeholder: "e.g. Ten (10) custom social media templates and marketing banners...",
    field2: "payment_amount", field2Label: "Graphic Design Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 1,500.00",
    unit: "deliverable",
    bodyServices: "Designer shall create and deliver the following graphics: {design_scope}.",
    bodyCompensation: "Client shall pay Designer a flat fee of {payment_amount} for the completed graphic design files.",
    bodyIp: "Upon receipt of payment, copyrights for all final visual graphics transfer to the Client."
  },
  {
    id: "photography-contract",
    subcategory: "Design & Creative",
    title: "Photography Session Contract",
    description: "A session agreement for portraits, brand photography, or events detailing shoot times, edits counts, and print releases.",
    desc: "photo sessions, image editing, or corporate headshots",
    field1: "shoot_location", field1Label: "Photography Shoot Location", field1Type: "text", field1Placeholder: "e.g. Studio 5, Portland, OR",
    field2: "session_rate", field2Label: "Photography Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 1,200.00",
    unit: "session",
    bodyServices: "Photographer shall conduct a photoshoot at {shoot_location} and deliver edited, high-resolution digital files.",
    bodyCompensation: "Client shall pay Photographer a flat session fee of {session_rate} for the shoot and image processing.",
    bodyIp: "Photographer grants Client an unlimited digital print release for commercial use, while retaining copyright ownership for portfolio display."
  },
  {
    id: "videography-agreement",
    subcategory: "Design & Creative",
    title: "Videography Services Agreement",
    description: "A filming contract for commercial shoots, events, or brand ads detailing raw footage access, edits, and revisions.",
    desc: "commercial filming, sound editing, or video production",
    field1: "video_scope", field1Label: "Filming & Deliverables Scope", field1Type: "textarea", field1Placeholder: "Describe the filming schedule, video length, and technical edits...",
    field2: "video_fee", field2Label: "Videography Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 3,500.00",
    unit: "video",
    bodyServices: "Videographer shall record and edit video content according to the following scope: {video_scope}.",
    bodyCompensation: "Client shall pay Videographer a flat fee of {video_fee} for all filming and post-production services.",
    bodyIp: "Upon receipt of payment, all edited video files belong to the Client, while Videographer retains raw camera footage rights."
  },
  {
    id: "interior-design-contract",
    subcategory: "Design & Creative",
    title: "Interior Design Contract",
    description: "An architectural and home staging agreement detailing space layouts, furniture purchasing, and decoration plans.",
    desc: "interior design, room styling, or home staging",
    field1: "space_details", field1Label: "Target Space Address / Rooms", field1Type: "text", field1Placeholder: "e.g. Living room and Master bedroom staging at 78 Rose Ave",
    field2: "design_rate", field2Label: "Interior Design Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 6,000.00",
    unit: "space",
    bodyServices: "Designer shall coordinate room layouts, select finishes, and stage furniture for: {space_details}.",
    bodyCompensation: "Client shall pay Designer a flat styling fee of {design_rate} for space coordination.",
    bodyIp: "All furniture purchase rights and room blueprints belong to the Client."
  },
  {
    id: "architecture-services",
    subcategory: "Design & Creative",
    title: "Architecture Services Agreement",
    description: "A structural design contract detailing building layouts, zoning permits, drafting schedules, and engineer checks.",
    desc: "architectural blueprints, structural drafts, or zoning support",
    field1: "building_site", field1Label: "Construction Site Address", field1Type: "text", field1Placeholder: "e.g. Lot 44 Landmark View Road, Portland, OR",
    field2: "architecture_fee", field2Label: "Architectural Drafting Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 18,000.00",
    unit: "blueprint",
    bodyServices: "Architect shall draft structural blueprints and coordinate permits for: {building_site}.",
    bodyCompensation: "Client shall pay Architect a total fee of {architecture_fee} based on phase completions.",
    bodyIp: "Architect retains copyright in all original blueprints and floorplans, granting Client a permanent license to construct the building."
  },
  {
    id: "video-editing-agreement",
    subcategory: "Design & Creative",
    title: "Video Editing Agreement",
    description: "A post-production contract specifying video editing cuts, sound mixing, color grading, and video formats.",
    desc: "video editing, audio sync, or color correction",
    field1: "edit_specs", field1Label: "Editing Requirements", field1Type: "textarea", field1Placeholder: "e.g. Edit raw footage into five (5) 60-second social videos with subtitles...",
    field2: "editing_fee", field2Label: "Video Editing Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 1,000.00",
    unit: "video",
    bodyServices: "Editor shall perform video cuts, sound sync, and color grading according to: {edit_specs}.",
    bodyCompensation: "Client shall pay Editor a flat fee of {editing_fee} for editing the deliverables.",
    bodyIp: "Upon receipt of payment, all completed video deliverables belong exclusively to the Client."
  },
  {
    id: "illustration-contract",
    subcategory: "Design & Creative",
    title: "Book / Media Illustration Contract",
    description: "A custom illustration agreement detailing artwork layouts, publishing rights, and royalty structures.",
    desc: "custom illustrations, drawings, or character sketches",
    field1: "art_details", field1Label: "Artwork Deliverables", field1Type: "textarea", field1Placeholder: "e.g. Twelve (12) color illustrations for children's book...",
    field2: "illustration_fee", field2Label: "Illustration Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 2,400.00",
    unit: "illustration",
    bodyServices: "Illustrator shall draft, refine, and deliver custom artwork for: {art_details}.",
    bodyCompensation: "Client shall pay Illustrator a flat fee of {illustration_fee} for the artwork files.",
    bodyIp: "Upon receipt of final payment, Illustrator grants Client a global publishing license for print/ebook media."
  },
  {
    id: "logo-design-contract",
    subcategory: "Design & Creative",
    title: "Logo Design Contract",
    description: "A visual design contract transferring logo vector assets, trademarks, brand badges, and font rights.",
    desc: "logo design, vector creation, or brand trademarks",
    field1: "logo_brief", field1Label: "Logo & Brand Mark Details", field1Type: "textarea", field1Placeholder: "e.g. One primary logo, two badges, and vector source files...",
    field2: "design_fee", field2Label: "Logo Design Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 800.00",
    unit: "logo",
    bodyServices: "Designer shall draft, iterate, and deliver vector formats for: {logo_brief}.",
    bodyCompensation: "Client shall pay Designer a flat fee of {design_fee} for the brand mark files.",
    bodyIp: "Upon receipt of final payment, all rights, title, and trademarks to the logo design transfer to the Client."
  },
  {
    id: "brand-identity-agreement",
    subcategory: "Design & Creative",
    title: "Brand Identity Agreement",
    description: "A strategic brand identity contract outlining color palettes, design books, font hierarchies, and styling rules.",
    desc: "brand design, corporate guidelines, or styled palettes",
    field1: "identity_brief", field1Label: "Brand Guidelines Scope", field1Type: "textarea", field1Placeholder: "e.g. Complete brand book detailing color systems, fonts, and patterns...",
    field2: "identity_fee", field2Label: "Identity Design Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 3,500.00",
    unit: "brandbook",
    bodyServices: "Designer shall create and deliver a comprehensive brand book according to: {identity_brief}.",
    bodyCompensation: "Client shall pay Designer a flat fee of {identity_fee} for identity files.",
    bodyIp: "Upon receipt of final payment, the complete brand identity book and files belong to the Client."
  },
  {
    id: "modeling-3d-services",
    subcategory: "Design & Creative",
    title: "3D Modelling Services Contract",
    description: "A technical 3D design agreement detailing mesh files, textures, render cycles, and polygon limits.",
    desc: "3D meshes, texturing, or rendering services",
    field1: "modeling_specs", field1Label: "3D Model and Texture Brief", field1Type: "textarea", field1Placeholder: "Describe the object shapes, texture maps, or scene coordinates...",
    field2: "modeling_fee", field2Label: "3D Design Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 2,000.00",
    unit: "mesh",
    bodyServices: "Modeler shall design, texture, and deliver 3D mesh files for: {modeling_specs}.",
    bodyCompensation: "Client shall pay Modeler a flat fee of {modeling_fee} for model deliverables.",
    bodyIp: "Upon receipt of payment, all completed 3D file formats (e.g. OBJ, FBX) belong to the Client."
  },
  {
    id: "animation-services-agreement",
    subcategory: "Design & Creative",
    title: "Animation Services Agreement",
    description: "An animation production contract detailing storyboards, keyframes, sound synchronization, and video exports.",
    desc: "2D/3D animation, rigging, or sound design",
    field1: "animation_brief", field1Label: "Animation Length and Style", field1Type: "textarea", field1Placeholder: "e.g. One (1) 60-second animated explainer video with motion graphics...",
    field2: "animation_fee", field2Label: "Animation Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 4,500.00",
    unit: "video",
    bodyServices: "Animator shall storyboard, rig, and render animated assets for: {animation_brief}.",
    bodyCompensation: "Client shall pay Animator a flat fee of {animation_fee} for the video exports.",
    bodyIp: "Upon receipt of final payment, all rendered animation sequences belong exclusively to the Client."
  },
  {
    id: "print-design-contract",
    subcategory: "Design & Creative",
    title: "Print Design Contract",
    description: "A creative contract for brochures, trade show booths, catalogs, print margins, and CMYK formats.",
    desc: "print layouts, catalog catalogs, or CMYK file formats",
    field1: "print_brief", field1Label: "Print Material Requirements", field1Type: "textarea", field1Placeholder: "e.g. A 16-page catalog layout in CMYK print-ready format...",
    field2: "print_fee", field2Label: "Layout Design Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 1,800.00",
    unit: "file",
    bodyServices: "Designer shall layout, configure margins, and deliver print-ready assets for: {print_brief}.",
    bodyCompensation: "Client shall pay Designer a flat fee of {print_fee} for the layout design.",
    bodyIp: "Upon receipt of payment, all print layouts and graphics belong to the Client."
  },
  {
    id: "packaging-design-agreement",
    subcategory: "Design & Creative",
    title: "Packaging Design Agreement",
    description: "A packaging layout contract detailing box die-lines, ingredient lists, barcodes, and print setups.",
    desc: "packaging die-lines, box print, or box templates",
    field1: "packaging_brief", field1Label: "Packaging Layout and Die-line Specs", field1Type: "textarea", field1Placeholder: "e.g. Package layouts for three sizes of botanical cosmetic jars...",
    field2: "packaging_fee", field2Label: "Packaging Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 3,000.00",
    unit: "package",
    bodyServices: "Designer shall create die-lines and layout packaging wraps according to: {packaging_brief}.",
    bodyCompensation: "Client shall pay Designer a flat fee of {packaging_fee} for packaging files.",
    bodyIp: "Upon receipt of final payment, all box layouts and packaging assets belong to the Client."
  },
  {
    id: "nft-art-commission",
    subcategory: "Design & Creative",
    title: "Digital Art & NFT Commission Contract",
    description: "A digital art commission agreement detailing metadata files, collection sizes, smart contract checks, and resale commissions.",
    desc: "digital artwork, collection metadata, or coin codes",
    field1: "collection_size", field1Label: "Number of Generative Art Assets", field1Type: "number", field1Placeholder: "e.g. 100",
    field2: "commission_fee", field2Label: "Artwork Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 5,000.00",
    unit: "artwork",
    bodyServices: "Artist shall design, rig, and compile layers for a generative collection of {collection_size} digital assets.",
    bodyCompensation: "Client shall pay Artist a flat fee of {commission_fee} for layers and metadata.",
    bodyIp: "Upon receipt of payment, Artist transfers IP to Client, reserving a 5% royalty fee on secondary sales."
  },

  // --- Tech & Development ---
  {
    id: "it-services-agreement",
    subcategory: "Tech & Development",
    title: "IT Services Agreement",
    description: "An IT services agreement detailing router configurations, local networks, cybersecurity, and hardware support.",
    desc: "IT hardware support, router configs, or system setups",
    field1: "it_scope", field1Label: "IT Services Scope", field1Type: "textarea", field1Placeholder: "Describe the networking setup, server configuration, or backups...",
    field2: "hourly_rate", field2Label: "IT Service Rate ($/hr)", field2Type: "currency", field2Placeholder: "e.g. 95.00",
    unit: "hour",
    bodyServices: "Technician shall configure, maintain, and secure IT assets according to: {it_scope}.",
    bodyCompensation: "Client shall pay Technician an hourly rate of {hourly_rate} for network tasks.",
    bodyIp: "All network setups and administrative passwords remain the property of the Client."
  },
  {
    id: "music-production-contract",
    subcategory: "Tech & Development",
    title: "Music Production Contract",
    description: "A recording studio agreement detailing sound mixing, master tracks, royalties, and commercial licensing.",
    desc: "music production, mixing, or song master files",
    field1: "track_title", field1Label: "Track or Project Title", field1Type: "text", field1Placeholder: "e.g. Summer Breeze (Single)",
    field2: "production_fee", field2Label: "Studio Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 2,500.00",
    unit: "track",
    bodyServices: "Producer shall record, arrange, and mix audio files for the track: {track_title}.",
    bodyCompensation: "Client shall pay Producer a studio fee of {production_fee} for audio production.",
    bodyIp: "Producer transfers master track rights to Client, retaining a 2% mechanical royalty on streams."
  },
  {
    id: "podcast-production-agreement",
    subcategory: "Tech & Development",
    title: "Podcast Production Agreement",
    description: "An audio production agreement detailing sound engineering, intro music, hosting, and RSS feed setup.",
    desc: "podcast editing, sound cleaning, or episode uploads",
    field1: "podcast_episodes", field1Label: "Episode Schedule and Length", field1Type: "textarea", field1Placeholder: "e.g. Eight (8) podcast episodes, approx. 45 mins each...",
    field2: "monthly_fee", field2Label: "Podcast Support Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 1,200.00",
    unit: "month",
    bodyServices: "Producer shall edit episodes, remove background noise, and schedule: {podcast_episodes}.",
    bodyCompensation: "Client shall pay Producer a monthly flat fee of {monthly_fee} for editing support.",
    bodyIp: "Upon receipt of payment, all edited episode audio files and artwork belong to the Client."
  },
  {
    id: "bookkeeping-services",
    subcategory: "Tech & Development",
    title: "Bookkeeping Services Contract",
    description: "A recurring financial agreement for ledger entries, bank reconciliations, and monthly profit statements.",
    desc: "accounting ledgers, bank transactions, or cash logs",
    field1: "accounting_freq", field1Label: "Statement Frequency", field1Type: "select", options: ["Monthly", "Quarterly", "Weekly"], defaultValue: "Monthly",
    field2: "monthly_fee", field2Label: "Bookkeeping Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 500.00",
    unit: "month",
    bodyServices: "Bookkeeper shall reconcile transaction ledgers and prepare profit sheets on a {accounting_freq} basis.",
    bodyCompensation: "Client shall pay Bookkeeper a recurring fee of {monthly_fee} for accounting support.",
    bodyIp: "All balance sheets, ledger tables, and cash records remain the exclusive property of Client."
  },
  {
    id: "accounting-services",
    subcategory: "Tech & Development",
    title: "Accounting Services Agreement",
    description: "A professional accounting contract detailing corporate tax filing, balance sheets, and audit filings.",
    desc: "tax filing, auditing, or IRS/HMRC reporting",
    field1: "tax_year", field1Label: "Target Tax Year", field1Type: "text", field1Placeholder: "e.g. 2026 Corporate Tax Filings",
    field2: "service_fee", field2Label: "Accountant Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 2,500.00",
    unit: "project",
    bodyServices: "Accountant shall prepare corporate tax sheets and audit accounts for: {tax_year}.",
    bodyCompensation: "Client shall pay Accountant a flat fee of {service_fee} for accounting filings.",
    bodyIp: "All tax reports, calculation tables, and spreadsheets are the property of the Client."
  },
  {
    id: "pr-agency-agreement",
    subcategory: "Tech & Development",
    title: "PR Agency Retainer Agreement",
    description: "An agency contract for press releases, publisher outreach, media relations, and brand promotion.",
    desc: "press releases, news pitching, or editorial coverage",
    field1: "pr_campaign", field1Label: "PR Campaign Goals", field1Type: "textarea", field1Placeholder: "Describe target publications, pitches, or outreach metrics...",
    field2: "monthly_retainer", field2Label: "PR Retainer Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 4,000.00",
    unit: "month",
    bodyServices: "Agency shall author press statements and pitch stories for: {pr_campaign}.",
    bodyCompensation: "Client shall pay Agency a monthly retainer fee of {monthly_retainer} for PR support.",
    bodyIp: "All press copy, media contact lists, and presentation slides belong to the Client."
  },
  {
    id: "brand-strategy-contract",
    subcategory: "Tech & Development",
    title: "Brand Strategy Contract",
    description: "An advisory agreement for market research, buyer personas, naming frameworks, and brand launch paths.",
    desc: "market research, styling, or naming guidelines",
    field1: "strategy_brief", field1Label: "Strategy Scope", field1Type: "textarea", field1Placeholder: "e.g. Naming strategy and user persona research for new startup...",
    field2: "strategy_fee", field2Label: "Strategy Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 5,000.00",
    unit: "project",
    bodyServices: "Strategist shall perform competitor audits and map launch schedules according to: {strategy_brief}.",
    bodyCompensation: "Client shall pay Strategist a flat fee of {strategy_fee} for strategy deliverables.",
    bodyIp: "All marketing blueprints, user surveys, and competitor reports belong to the Client."
  },
  {
    id: "ux-research-contract",
    subcategory: "Tech & Development",
    title: "UX Research Contract",
    description: "An engineering contract detailing usability tests, prototype interviews, personas, and user flow charts.",
    desc: "usability checks, user interviews, or wireframe reviews",
    field1: "research_scope", field1Label: "Research Scope details", field1Type: "textarea", field1Placeholder: "e.g. Conduct usability testing with 15 target users on prototype v2...",
    field2: "research_fee", field2Label: "UX Research Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 4,000.00",
    unit: "project",
    bodyServices: "Researcher shall conduct user checks, map profiles, and deliver reports for: {research_scope}.",
    bodyCompensation: "Client shall pay Researcher a flat fee of {research_fee} for research deliverables.",
    bodyIp: "All screen recordings, user transcripts, and wireframe reports belong to the Client."
  },
  {
    id: "data-analysis-agreement",
    subcategory: "Tech & Development",
    title: "Data Analysis Agreement",
    description: "A technical contract for database reports, statistical charts, SQL pipelines, and Looker dashboards.",
    desc: "SQL pipelines, metrics dashboards, or database models",
    field1: "data_sources", field1Label: "Target Database Systems", field1Type: "text", field1Placeholder: "e.g. PostgreSQL, Salesforce API, and Google BigQuery",
    field2: "analysis_fee", field2Label: "Data Analyst Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 3,500.00",
    unit: "project",
    bodyServices: "Analyst shall clean data, compile pipelines, and generate dashboards for: {data_sources}.",
    bodyCompensation: "Client shall pay Analyst a flat fee of {analysis_fee} for data analytics.",
    bodyIp: "All SQL queries, data pipelines, and analytics reports remain the property of the Client."
  },
  {
    id: "cybersecurity-consulting",
    subcategory: "Tech & Development",
    title: "Cybersecurity Consulting Contract",
    description: "A security contract detailing penetration testing, port audits, SSL setup, and data backup controls.",
    desc: "penetration testing, security audits, or backup scripts",
    field1: "audit_targets", field1Label: "Security Audit Targets", field1Type: "textarea", field1Placeholder: "e.g. Audit API servers and Docker networks for open ports...",
    field2: "consulting_fee", field2Label: "Security Service Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 6,000.00",
    unit: "project",
    bodyServices: "Consultant shall execute penetration tests and secure server ports for: {audit_targets}.",
    bodyCompensation: "Client shall pay Consultant a flat fee of {consulting_fee} for security audit reports.",
    bodyIp: "Consultant shall keep all vulnerability logs strictly confidential and delete copies post-project."
  },
  {
    id: "cloud-services-agreement",
    subcategory: "Tech & Development",
    title: "Cloud Services Agreement",
    description: "An engineering contract detailing AWS setup, Docker configurations, cloud hosting, and backups.",
    desc: "AWS architecture, cloud backups, or server scripts",
    field1: "cloud_platform", field1Label: "Cloud Platform Systems", field1Type: "select", options: ["AWS", "Google Cloud", "Microsoft Azure", "Multi-Cloud"], defaultValue: "AWS",
    field2: "setup_fee", field2Label: "Architecture Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 5,000.00",
    unit: "setup",
    bodyServices: "Architect shall configure server clusters, backups, and network routes on: {cloud_platform}.",
    bodyCompensation: "Client shall pay Architect a flat fee of {setup_fee} for architecture deployment.",
    bodyIp: "All cloud accounts, terraform files, and cluster credentials remain the property of the Client."
  },
  {
    id: "ecommerce-development",
    subcategory: "Tech & Development",
    title: "E-Commerce Development Contract",
    description: "A software contract detailing online store builds, payment API setups, inventory flows, and databases.",
    desc: "e-commerce setups, stripe payments, or shopping databases",
    field1: "store_platform", field1Label: "E-Commerce Platform", field1Type: "text", field1Placeholder: "e.g. Custom React Storefront with Stripe payments",
    field2: "dev_cost", field2Label: "Development Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 10,000.00",
    unit: "store",
    bodyServices: "Developer shall build, integrate APIs, and launch the online store: {store_platform}.",
    bodyCompensation: "Client shall pay Developer a total fee of {dev_cost} for online store deployment.",
    bodyIp: "Upon receipt of final payment, storefront code and graphics belong exclusively to the Client."
  },
  {
    id: "mobile-app-design",
    subcategory: "Tech & Development",
    title: "Mobile App Design Contract",
    description: "A visual design agreement for iOS and Android layouts, wireframes, user buttons, and Figma files.",
    desc: "Figma layouts, iOS/Android screens, or button styles",
    field1: "app_brief", field1Label: "App Concept & Screens", field1Type: "textarea", field1Placeholder: "e.g. Fifteen (15) Figma screen designs for delivery app...",
    field2: "design_fee", field2Label: "App Design Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 4,000.00",
    unit: "figma",
    bodyServices: "Designer shall wireframe and export visual designs for: {app_brief}.",
    bodyCompensation: "Client shall pay Designer a flat fee of {design_fee} for visual layout deliverables.",
    bodyIp: "Upon receipt of final payment, all Figma screen layouts and buttons belong to the Client."
  },
  {
    id: "wordpress-development",
    subcategory: "Tech & Development",
    title: "WordPress Development Agreement",
    description: "A website contract detailing WordPress plugins setup, custom theme coding, security, and page builders.",
    desc: "WordPress coding, plugin configurations, or theme styling",
    field1: "plugin_list", field1Label: "Theme and Key Plugins", field1Type: "text", field1Placeholder: "e.g. Custom child theme with WooCommerce and Yoast SEO",
    field2: "dev_fee", field2Label: "WordPress Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 2,500.00",
    unit: "website",
    bodyServices: "Developer shall configure server settings, code themes, and setup plugins for: {plugin_list}.",
    bodyCompensation: "Client shall pay Developer a flat fee of {dev_fee} for website completion.",
    bodyIp: "Upon receipt of payment, all custom PHP files, graphics, and themes belong to the Client."
  },
  {
    id: "shopify-development",
    subcategory: "Tech & Development",
    title: "Shopify Development Contract",
    description: "A storefront contract detailing Liquid theme coding, cart configurations, app setups, and database syncs.",
    desc: "Shopify layouts, Liquid styling, or app configurations",
    field1: "shopify_brief", field1Label: "Theme Coding & Setup Scope", field1Type: "textarea", field1Placeholder: "e.g. Custom Liquid sections, cart upsell scripts, and app integrations...",
    field2: "setup_fee", field2Label: "Shopify Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 3,500.00",
    unit: "store",
    bodyServices: "Developer shall code custom layouts and configure app integrations according to: {shopify_brief}.",
    bodyCompensation: "Client shall pay Developer a flat fee of {setup_fee} for store development.",
    bodyIp: "All custom Liquid code, storefront styling, and databases remain the property of the Client."
  },
  {
    id: "api-integration-services",
    subcategory: "Tech & Development",
    title: "API Integration Services Agreement",
    description: "An engineering contract detailing webhook configurations, JSON API routes, OAuth setup, and database syncing.",
    desc: "webhook setups, OAuth connections, or database sync scripts",
    field1: "api_endpoints", field1Label: "APIs to Integrate", field1Type: "text", field1Placeholder: "e.g. Stripe Billing API to Salesforce CRM",
    field2: "integration_fee", field2Label: "Integration Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 2,000.00",
    unit: "integration",
    bodyServices: "Developer shall configure secure connections, webhooks, and sync code for: {api_endpoints}.",
    bodyCompensation: "Client shall pay Developer a flat fee of {integration_fee} for integration services.",
    bodyIp: "All custom endpoints code, webhook handlers, and secrets remain the property of the Client."
  },
  {
    id: "qa-testing-services",
    subcategory: "Tech & Development",
    title: "QA & Testing Services Contract",
    description: "An engineering contract detailing manual browser tests, Cypress automation scripts, and bug tracking databases.",
    desc: "manual testing, Cypress scripts, or bug database reports",
    field1: "test_targets", field1Label: "Testing Scope / Platforms", field1Type: "text", field1Placeholder: "e.g. Desktop Safari, Chrome, iOS Safari, Android Chrome browser checks",
    field2: "testing_fee", field2Label: "Testing Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 2,500.00",
    unit: "project",
    bodyServices: "QA engineer shall execute testing logs and write test suites for: {test_targets}.",
    bodyCompensation: "Client shall pay QA engineer a flat fee of {testing_fee} for testing services.",
    bodyIp: "All testing suites, Cypress codes, and bug databases belong to the Client."
  },
  {
    id: "devops-services-agreement",
    subcategory: "Tech & Development",
    title: "DevOps Services Agreement",
    description: "A technical contract detailing CI/CD pipeline code, GitHub Actions setup, Docker registries, and log monitoring.",
    desc: "GitHub pipeline code, Docker configs, or server logs",
    field1: "ci_cd_tools", field1Label: "Pipeline Systems", field1Type: "text", field1Placeholder: "e.g. GitHub Actions, Docker, Kubernetes clusters",
    field2: "monthly_fee", field2Label: "DevOps Retainer Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 3,000.00",
    unit: "month",
    bodyServices: "Engineer shall configure and monitor the deployment pipeline for: {ci_cd_tools}.",
    bodyCompensation: "Client shall pay Engineer a monthly fee of {monthly_fee} for pipeline support.",
    bodyIp: "All script files, pipeline settings, and Docker registries belong to the Client."
  },
  {
    id: "database-administration",
    subcategory: "Tech & Development",
    title: "Database Administration Contract",
    description: "A database contract detailing SQL queries, indexing, automatic backups, and server clustering.",
    desc: "SQL queries, database indexing, or backup routines",
    field1: "db_engines", field1Label: "Target Database Systems", field1Type: "text", field1Placeholder: "e.g. PostgreSQL, Redis cluster, MongoDB atlas",
    field2: "monthly_fee", field2Label: "Administration Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 2,000.00",
    unit: "month",
    bodyServices: "Administrator shall configure replication, monitor speed, and write indexes for: {db_engines}.",
    bodyCompensation: "Client shall pay Administrator a monthly fee of {monthly_fee} for database support.",
    bodyIp: "All SQL migration codes, databases structures, and files remain the property of the Client."
  },
  {
    id: "aiml-services-agreement",
    subcategory: "Tech & Development",
    title: "AI/ML Services Agreement",
    description: "A specialized software contract detailing custom neural model training, API prompts, and dataset formatting.",
    desc: "dataset cleanups, model training, or prompt codes",
    field1: "ai_scope", field1Label: "Model Training/Prompt Scope", field1Type: "textarea", field1Placeholder: "e.g. Fine-tune OpenAI GPT model on client documentation database...",
    field2: "ml_fee", field2Label: "ML Development Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 8,000.00",
    unit: "model",
    bodyServices: "Developer shall compile dataset logs, write prompt code, and train models for: {ai_scope}.",
    bodyCompensation: "Client shall pay Developer a flat fee of {ml_fee} for AI deployment.",
    bodyIp: "Upon receipt of payment, all fine-tuned weights, prompt templates, and custom code belong to the Client."
  },
  {
    id: "software-maintenance",
    subcategory: "Tech & Development",
    title: "Software Maintenance Contract",
    description: "A maintenance contract detailing dependency updates, server logs checks, security patch runs, and bug fixes.",
    desc: "package updates, security patches, or server checks",
    field1: "maintenance_targets", field1Label: "Maintenance Systems", field1Type: "textarea", field1Placeholder: "Describe the application codebases or cloud servers to monitor...",
    field2: "monthly_fee", field2Label: "Maintenance Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 1,500.00",
    unit: "month",
    bodyServices: "Developer shall monitor error logs, run patch scripts, and update libraries for: {maintenance_targets}.",
    bodyCompensation: "Client shall pay Developer a monthly fee of {monthly_fee} for software maintenance.",
    bodyIp: "All code corrections and security patches belong exclusively to the Client."
  },

  // --- Trades & Home Services ---
  {
    id: "general-contractor-agreement",
    subcategory: "Trades & Home Services",
    title: "General Contractor Agreement",
    description: "A construction agreement detailing home renovations, subcontractor management, permit filings, and payment milestones.",
    desc: "renovations, material purchases, or building builds",
    field1: "work_scope", field1Label: "Construction Scope details", field1Type: "textarea", field1Placeholder: "Describe the building renovations, wall setups, or roof repairs...",
    field2: "payment_amount", field2Label: "Project Cost ($)", field2Type: "currency", field2Placeholder: "e.g. 25,000.00",
    unit: "project",
    bodyServices: "Contractor shall manage building supplies, hire subcontractors, and execute construction according to: {work_scope}.",
    bodyCompensation: "Client shall pay Contractor a total fee of {payment_amount} according to phase completions.",
    bodyIp: "Contractor retains rights to construction methods, while all physical building assets belong to the Client."
  },
  {
    id: "home-renovation-contract",
    subcategory: "Trades & Home Services",
    title: "Home Renovation Contract",
    description: "A remodel contract detailing wall updates, kitchen tiling, painting, and plumbing coordination.",
    desc: "home remodeling, kitchen tiling, or paint styling",
    field1: "renovation_scope", field1Label: "Renovation Specifications", field1Type: "textarea", field1Placeholder: "e.g. Complete kitchen renovation including cabinetry, tiling, and appliances...",
    field2: "renovation_fee", field2Label: "Renovation Cost ($)", field2Type: "currency", field2Placeholder: "e.g. 15,000.00",
    unit: "project",
    bodyServices: "Contractor shall perform space updates, tile floors, and paint walls according to: {renovation_scope}.",
    bodyCompensation: "Client shall pay Contractor a flat fee of {renovation_fee} based on milestones.",
    bodyIp: "All fixtures, cabinetry, and structural additions belong to the Client upon installation."
  },
  {
    id: "landscaping-services",
    subcategory: "Trades & Home Services",
    title: "Landscaping Services Agreement",
    description: "A garden agreement detailing grass cutting, lawn design, sprinkler configurations, and pathway setups.",
    desc: "grass cutting, lawn styling, or tree planting",
    field1: "garden_brief", field1Label: "Lawn & Garden Specifications", field1Type: "textarea", field1Placeholder: "Describe the mowing frequency, layout planting, or paths...",
    field2: "service_fee", field2Label: "Landscaping Cost ($)", field2Type: "currency", field2Placeholder: "e.g. 1,200.00",
    unit: "garden",
    bodyServices: "Gardener shall mowing grass, plant layouts, and install paths for: {garden_brief}.",
    bodyCompensation: "Client shall pay Gardener a fee of {service_fee} for garden maintenance.",
    bodyIp: "Gardener retains rights to garden layout blueprint codes."
  },
  {
    id: "cleaning-services-contract",
    subcategory: "Trades & Home Services",
    title: "Cleaning Services Contract",
    description: "A client contract detailing office sweeps, vacuuming, window polishing, and sanitization schedules.",
    desc: "office cleaning, sweeps, or window polishing",
    field1: "cleaning_schedule", field1Label: "Cleaning Times & Frequency", field1Type: "text", field1Placeholder: "e.g. Twice weekly cleaning, Tuesdays and Thursdays after 6 PM",
    field2: "cleaning_rate", field2Label: "Cleaning Service Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 400.00",
    unit: "month",
    bodyServices: "Cleaner shall sweep floors, polish windows, and sanitize rooms according to: {cleaning_schedule}.",
    bodyCompensation: "Client shall pay Cleaner a recurring fee of {cleaning_rate} per month for cleaning services.",
    bodyIp: "All chemical cleaning supply containers and machinery remain the property of the Cleaner."
  },
  {
    id: "plumbing-services-agreement",
    subcategory: "Trades & Home Services",
    title: "Plumbing Services Agreement",
    description: "A plumbing maintenance contract detailing drain clearances, pipe repairs, boiler updates, and emergency fees.",
    desc: "drain clearance, pipe repairs, or boiler checks",
    field1: "plumbing_scope", field1Label: "Plumbing Project Scope", field1Type: "textarea", field1Placeholder: "Describe the pipes layout, shower fittings, or valve updates...",
    field2: "plumbing_fee", field2Label: "Plumbing Service Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 1,500.00",
    unit: "project",
    bodyServices: "Plumber shall repair plumbing fixtures and lay water pipes according to: {plumbing_scope}.",
    bodyCompensation: "Client shall pay Plumber a flat fee of {plumbing_fee} for pipe installations.",
    bodyIp: "All pipes, valves, and water boilers belong to the Client post-installation."
  },
  {
    id: "electrical-services-contract",
    subcategory: "Trades & Home Services",
    title: "Electrical Services Contract",
    description: "An electrical repair contract detailing panel upgrades, wall rewiring, switches, and certificate filings.",
    desc: "panel upgrades, wall wiring, or switch repairs",
    field1: "electrical_scope", field1Label: "Electrical Repairs Scope", field1Type: "textarea", field1Placeholder: "Describe the outlet installations, panel rewiring, or lighting setups...",
    field2: "electrical_fee", field2Label: "Electrical Service Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 2,000.00",
    unit: "project",
    bodyServices: "Electrician shall run wires, configure panels, and wire lights according to: {electrical_scope}.",
    bodyCompensation: "Client shall pay Electrician a flat fee of {electrical_fee} for wiring services.",
    bodyIp: "All electrical certificates and wired assets belong to the Client."
  },
  {
    id: "hvac-services-agreement",
    subcategory: "Trades & Home Services",
    title: "HVAC Services Agreement",
    description: "An HVAC maintenance agreement detailing compressor updates, filter swaps, duct cleaning, and coolant checks.",
    desc: "compressor updates, filter swaps, or duct cleaning",
    field1: "hvac_brief", field1Label: "HVAC Unit Specs & Site", field1Type: "text", field1Placeholder: "e.g. Air conditioning unit repair and duct cleaning at 44 Rose Ave",
    field2: "service_fee", field2Label: "HVAC Service Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 800.00",
    unit: "unit",
    bodyServices: "Technician shall perform duct cleans and charge coolant according to: {hvac_brief}.",
    bodyCompensation: "Client shall pay Technician a flat fee of {service_fee} for AC tuning.",
    bodyIp: "All HVAC machinery, filters, and valves belong to the Client post-installation."
  },

  // --- Professional Services ---
  {
    id: "legal-services-agreement",
    subcategory: "Professional Services",
    title: "Legal Consulting Agreement (Non-Attorney)",
    description: "An advisory agreement for compliance reviews, document formatting, paralegal checks, and mediation support.",
    desc: "mediation support, paralegal audits, or filing formatting",
    field1: "consulting_scope", field1Label: "Consulting Tasks", field1Type: "textarea", field1Placeholder: "Describe the policy reviews, files formatting, or mediation tasks...",
    field2: "hourly_rate", field2Label: "Consulting Rate ($/hr)", field2Type: "currency", field2Placeholder: "e.g. 150.00",
    unit: "hour",
    bodyServices: "Consultant shall analyze guidelines and format legal filings according to: {consulting_scope}.",
    bodyCompensation: "Client shall pay Consultant an hourly rate of {hourly_rate} for consulting tasks.",
    bodyIp: "All formatted documents, policy manuals, and file outputs belong to the Client."
  },
  {
    id: "financial-planning-services",
    subcategory: "Professional Services",
    title: "Financial Planning Services Contract",
    description: "An advisory contract detailing retirement calculations, portfolio audits, cash forecasts, and wealth models.",
    desc: "retirement plans, portfolio models, or wealth plans",
    field1: "plan_goals", field1Label: "Financial Objectives Scope", field1Type: "textarea", field1Placeholder: "e.g. Asset allocation advice, tax-efficient savings modeling, and retirement forecasts...",
    field2: "planning_fee", field2Label: "Advisory Service Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 3,000.00",
    unit: "report",
    bodyServices: "Advisor shall audit assets and write financial models according to: {plan_goals}.",
    bodyCompensation: "Client shall pay Advisor a flat fee of {planning_fee} for financial advisory.",
    bodyIp: "All custom spreadsheets, cash forecasts, and wealth reports belong to the Client."
  },
  {
    id: "tax-preparation-agreement",
    subcategory: "Professional Services",
    title: "Tax Preparation Agreement",
    description: "A tax service agreement detailing personal or corporate ledger tax returns, schedules, and filing limits.",
    desc: "tax returns, tax filing, or schedules preparation",
    field1: "filing_status", field1Label: "Tax Filings Classification", field1Type: "text", field1Placeholder: "e.g. Schedule C and Form 1040 Individual Returns",
    field2: "preparation_fee", field2Label: "Preparation Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 600.00",
    unit: "filing",
    bodyServices: "Preparer shall calculate deductibles and fill tax files according to: {filing_status}.",
    bodyCompensation: "Client shall pay Preparer a flat fee of {preparation_fee} for tax filings.",
    bodyIp: "All filed tax returns and deduction logs belong exclusively to the Client."
  },
  {
    id: "insurance-brokerage",
    subcategory: "Professional Services",
    title: "Insurance Brokerage Contract",
    description: "A broker agreement detailing policy sourcing, coverage quotes, risk audits, and commissions.",
    desc: "policy sourcing, coverage quotes, or insurance brokers",
    field1: "policy_types", field1Label: "Target Coverage Types", field1Type: "text", field1Placeholder: "e.g. Commercial General Liability and Cyber Risk Coverage",
    field2: "brokerage_fee", field2Label: "Broker Service Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 500.00",
    unit: "policy",
    bodyServices: "Broker shall research premium options and source policy quotes for: {policy_types}.",
    bodyCompensation: "Client shall pay Broker a fee of {brokerage_fee} for insurance coordination.",
    bodyIp: "Broker retains rights to risk scoring models, while all insurance policies belong to the Client."
  },
  {
    id: "business-brokerage-agreement",
    subcategory: "Professional Services",
    title: "Business Brokerage Agreement",
    description: "A commission contract appointing a broker to market and sell a company, specifying transaction margins.",
    desc: "business marketing, seller audits, or brokerage sales",
    field1: "business_name", field1Label: "Company to Sell Name", field1Type: "text", field1Placeholder: "e.g. Green Valley Grocers LLC",
    field2: "broker_commission", field2Label: "Sales Commission Percentage (%)", field2Type: "text", field2Placeholder: "e.g. 8",
    unit: "sale",
    bodyServices: "Broker shall coordinate market presentations and source buyers for the sale of: {business_name}.",
    bodyCompensation: "Seller shall pay Broker a sales commission equal to {broker_commission}% of the final transaction price.",
    bodyIp: "All financial portfolios and buyer lists belong to the Seller."
  },
  {
    id: "notary-services-agreement",
    subcategory: "Professional Services",
    title: "Notary Public Services Agreement",
    description: "A service contract detailing remote or in-person notary signing fees, travel travel, and record log books.",
    desc: "document signings, travel notarization, or log logs",
    field1: "document_list", field1Label: "Documents to Notarize", field1Type: "text", field1Placeholder: "e.g. Mortgage Deeds and Power of Attorney Files",
    field2: "notary_fee", field2Label: "Notary Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 150.00",
    unit: "signing",
    bodyServices: "Notary shall verify identification, witness signatures, and stamp: {document_list}.",
    bodyCompensation: "Client shall pay Notary a flat fee of {notary_fee} per notarization visit.",
    bodyIp: "Notary retains all statutory records and notary journal logs under state law rules."
  },
  {
    id: "process-serving-agreement",
    subcategory: "Professional Services",
    title: "Process Serving Agreement",
    description: "A contract appointing a licensed process server to deliver legal summons and print affidavits of service.",
    desc: "court summons, witness servings, or service affidavits",
    field1: "recipient_details", field1Label: "Target Recipient / Courthouse", field1Type: "text", field1Placeholder: "e.g. Samuel Green / County Superior Court Case #89098",
    field2: "service_fee", field2Label: "Process Server Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 200.00",
    unit: "attempt",
    bodyServices: "Server shall attempt delivery of court summons to: {recipient_details}.",
    bodyCompensation: "Client shall pay Server a fee of {service_fee} for process delivery attempts and affidavit filing.",
    bodyIp: "All process logs and affidavits of service belong to the Client."
  }
];

// Let's add the remaining requested freelance templates!
const extraFreelanceTemplates = [
  { id: "seo-services-agreement", subcategory: "Marketing & Growth", title: "SEO Services Agreement", description: "A digital marketing agreement detailing search optimization, site audit logs, and keywords tracking." },
  { id: "social-media-management", subcategory: "Marketing & Growth", title: "Social Media Management Contract", description: "A marketing contract detailing feed styling, hashtag planning, post frequency, and reporting." },
  { id: "ux-research-contract", subcategory: "Tech & Development", title: "UX Research Contract", description: "A usability testing contract detailing participant schedules, wireframe checks, and reporting." },
  { id: "wordpress-development", subcategory: "Tech & Development", title: "WordPress Development Agreement", description: "A web contract detailing theme styling, WooCommerce plugin setups, and security patches." },
  { id: "shopify-development", subcategory: "Tech & Development", title: "Shopify Storefront Contract", description: "A storefront contract detailing Liquid theme coding, Stripe checkout, and database syncs." }
];

// Helper to format a single template object
function makeTemplate(t) {
  const f1 = t.field1 || "scope_of_work";
  const f1Label = t.field1Label || "Scope of Work";
  const f1Type = t.field1Type || "textarea";
  const f1Placeholder = t.field1Placeholder || "Describe the services to perform...";
  
  const f2 = t.field2 || "flat_rate";
  const f2Label = t.field2Label || "Project Flat Rate ($)";
  const f2Type = t.field2Type || "currency";
  const f2Placeholder = t.field2Placeholder || "e.g. 2,500.00";

  const billingUnit = t.unit || "project";

  return {
    id: t.id,
    slug: t.id,
    category: "freelance",
    subcategory: t.subcategory,
    title: t.title,
    description: t.description,
    whatsCovered: [
      `Definition of freelance ${t.desc || 'services and milestones'}`,
      "Payment terms, invoice dates, and retainer options",
      "Intellectual property transfer guidelines upon invoice clearance",
      "Late payment interest fees and cancellation notice timelines",
      "Standard governing law and dispute resolution details"
    ],
    whenToUse: `Use this contract when you are hired to provide professional ${t.desc || 'services'} as an independent contractor or agency.`,
    jurisdictions: ["US", "UK", "CA"],
    lastReviewedAt: "2026-05-20",
    reviewerName: "Sarah Jenkins, Esq.",
    estimatedFillMinutes: 4,
    fields: [
      { id: "provider_name", label: "Service Provider Name / Firm", type: "text", placeholder: "e.g. Apex Creative Group LLC", required: true, group: "Provider Info" },
      { id: "provider_address", label: "Provider Office Address", type: "text", placeholder: "e.g. 10 Pine St, Portland, OR 97201", required: true, group: "Provider Info" },
      { id: "client_name", label: "Client Full Name / Company", type: "text", placeholder: "e.g. Zenith Tech Solutions Inc.", required: true, group: "Client Info" },
      { id: "client_address", label: "Client Office Address", type: "text", placeholder: "e.g. 500 Park Avenue, New York, NY 10022", required: true, group: "Client Info" },
      { id: "effective_date", label: "Effective Date", type: "date", required: true, group: "Key Dates" },
      { id: f1, label: f1Label, type: f1Type, placeholder: f1Placeholder, required: true, group: "Project Details" },
      { id: f2, label: f2Label, type: f2Type, placeholder: f2Placeholder, required: true, group: "Compensation" },
      { id: "governing_state", label: "Governing Jurisdiction", type: "text", placeholder: "e.g. Oregon", required: true, group: "Legal Terms" }
    ],
    clauses: [
      {
        id: "intro",
        heading: `${t.title.toUpperCase()}`,
        body: `This Services Agreement (the "Agreement") is entered into as of {effective_date} (the "Effective Date"), by and between {provider_name}, located at {provider_address} ("Provider"), and {client_name}, located at {client_address} ("Client").`,
        optional: false,
        enabledByDefault: true
      },
      {
        id: "services",
        heading: "1. Scope of Services",
        body: t.bodyServices || `Provider agrees to perform the following services for the Client: {${f1}}. Any modifications to this scope require a written amendment signed by both Parties.`,
        optional: false,
        enabledByDefault: true
      },
      {
        id: "compensation",
        heading: "2. Payment Covenants",
        body: t.bodyCompensation || `Client agrees to pay Provider a flat rate of {${f2}} for the services rendered. Payments are due within 15 days of invoice submissions.`,
        optional: false,
        "enabledByDefault": true
      },
      {
        id: "intellectual_property",
        heading: "3. Intellectual Property Rights",
        body: t.bodyIp || `Upon receipt of final, full payment from Client, Provider hereby assigns and transfers all rights, title, and copyrights to the custom deliverables created under this Agreement to Client.`,
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
    relatedTemplates: ["mutual-nda", "independent-contractor-agreement"],
    faq: [
      { question: "Can I edit this contract after signing?", answer: "Yes. Any changes to scope, payment, or timelines require a written amendment signed by both parties." },
      { question: "Who pays for third-party hosting or materials?", answer: "Under this contract, the client is responsible for purchasing all third-party subscriptions, hosting, and assets directly." }
    ],
    tags: ["freelance", "contract", "services", billingUnit]
  };
}

// Generate files
templates.forEach((t) => {
  const formatted = makeTemplate(t);
  const filePath = path.join(outputDir, `${formatted.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(formatted, null, 2), 'utf8');
  console.log(`Successfully wrote template: ${formatted.id}`);
});

console.log('Finished writing freelance templates!');
