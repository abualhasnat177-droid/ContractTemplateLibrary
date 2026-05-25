const fs = require('fs');
const path = require('path');

const outputDir = path.join(__dirname, '..', 'content', 'templates', 'creator');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// 1. Update existing 2 creator files with subcategories
const mapping = {
  "influencer-agreement.json": "Platform-Specific Sponsorship",
  "ugc-creator-agreement.json": "Platform-Specific Sponsorship"
};

Object.entries(mapping).forEach(([fileName, subcat]) => {
  const filePath = path.join(outputDir, fileName);
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, 'utf8');
    try {
      const parsed = JSON.parse(raw);
      parsed.subcategory = subcat;
      fs.writeFileSync(filePath, JSON.stringify(parsed, null, 2), 'utf8');
      console.log(`Updated subcategory for existing creator: ${fileName} -> ${subcat}`);
    } catch (e) {
      console.error(`Error updating: ${fileName}`, e);
    }
  }
});

// 2. 45 new creator & influencer templates to generate
const newTemplates = [
  // --- Platform-Specific Sponsorship ---
  {
    id: "tiktok-brand-deal",
    subcategory: "Platform-Specific Sponsorship",
    title: "TikTok Brand Deal Agreement",
    description: "A sponsorship agreement detailing video lengths, music licensing, Spark Ads codes, usage rights, and engagement goals.",
    desc: "TikTok videos, Spark Ads codes, sound clips, and brand integrations",
    field1: "tiktok_deliverables", field1Label: "Video Post Specifications", field1Type: "textarea", field1Placeholder: "e.g. One (1) 30-60 second TikTok video integrated with brand's sound clip...",
    field2: "sponsor_rate", field2Label: "TikTok Post Rate ($)", field2Type: "currency", field2Placeholder: "e.g. 1,500.00",
    unit: "video",
    bodyServices: "Creator shall record, edit, and post the following TikTok video content: {tiktok_deliverables}.",
    bodyCompensation: "Brand agrees to pay Creator a flat post fee of {sponsor_rate} within 15 days of video launch.",
    bodyIp: "Creator grants Brand a 30-day non-exclusive license to use video as a Spark Ad."
  },
  {
    id: "youtube-sponsorship",
    subcategory: "Platform-Specific Sponsorship",
    title: "YouTube Sponsorship Agreement",
    description: "A contract for dedicated videos or integrated mid-roll sponsorships, outlining script reviews and link placements.",
    desc: "YouTube mid-rolls, links tracking, and video sponsorships",
    field1: "youtube_deliverables", field1Label: "YouTube Video Specifications", field1Type: "textarea", field1Placeholder: "e.g. One (1) 60-second integrated mid-roll placement in a dedicated video...",
    field2: "sponsor_rate", field2Label: "YouTube Sponsor Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 3,000.00",
    unit: "video",
    bodyServices: "Creator shall integrate the Brand's message and links as follows: {youtube_deliverables}.",
    bodyCompensation: "Brand agrees to pay Creator a sponsorship fee of {sponsor_rate} upon video launch.",
    bodyIp: "Creator retains all rights to the video, granting Brand a perpetual license to share the specific integration segment."
  },
  {
    id: "instagram-paid-partnership",
    subcategory: "Platform-Specific Sponsorship",
    title: "Instagram Paid Partnership Contract",
    description: "A contract for Instagram Reels, Stories with swipe-up/sticker links, static carousel posts, and partnership tag approvals.",
    desc: "Instagram Reels, carousel posts, and Story links",
    field1: "instagram_deliverables", field1Label: "Instagram Post Specs", field1Type: "textarea", field1Placeholder: "e.g. One (1) Instagram Reel and one (1) Story with affiliate link sticker...",
    field2: "sponsor_rate", field2Label: "Instagram Campaign Rate ($)", field2Type: "currency", field2Placeholder: "e.g. 1,200.00",
    unit: "post",
    bodyServices: "Creator shall post Reels and Stories using the Paid Partnership Tag according to: {instagram_deliverables}.",
    bodyCompensation: "Brand shall pay Creator a flat fee of {sponsor_rate} for the Instagram assets.",
    bodyIp: "Creator grants Brand rights to repost the assets on Brand's feed for 90 days."
  },
  {
    id: "twitch-streaming-sponsorship",
    subcategory: "Platform-Specific Sponsorship",
    title: "Twitch / Streaming Sponsorship Agreement",
    description: "An agreement for stream overlays, chat bots, sponsored gaming segments, and product mentions.",
    desc: "Twitch stream overlays, sponsored play hours, and chat bot configs",
    field1: "stream_deliverables", field1Label: "Streaming Specifications", field1Type: "textarea", field1Placeholder: "e.g. Two (2) hours of sponsored gameplay of the target game on stream...",
    field2: "stream_hourly_rate", field2Label: "Streaming Hourly Rate ($)", field2Type: "currency", field2Placeholder: "e.g. 250.00",
    unit: "hour",
    bodyServices: "Streamer shall stream gameplay and configure chat bot links according to: {stream_deliverables}.",
    bodyCompensation: "Brand shall pay Streamer {stream_hourly_rate} per hour of sponsored streaming.",
    bodyIp: "Streamer retains rights to the VODs and clips created during the stream."
  },
  {
    id: "linkedin-creator-sponsorship",
    subcategory: "Platform-Specific Sponsorship",
    title: "LinkedIn Creator Sponsorship Agreement",
    description: "A contract for B2B creators publishing sponsored newsletters, carousel slide posts, or text posts on LinkedIn.",
    desc: "LinkedIn posts, B2B newsletters, and carousel documents",
    field1: "linkedin_deliverables", field1Label: "LinkedIn Campaign Scope", field1Type: "textarea", field1Placeholder: "e.g. One (1) sponsored LinkedIn post and one (1) newsletter mention...",
    field2: "sponsor_rate", field2Label: "LinkedIn Post Rate ($)", field2Type: "currency", field2Placeholder: "e.g. 1,000.00",
    unit: "post",
    bodyServices: "Creator shall publish sponsored B2B resources and tag the Brand according to: {linkedin_deliverables}.",
    bodyCompensation: "Brand shall pay Creator a flat fee of {sponsor_rate} per campaign post.",
    bodyIp: "Creator retains copyright in the writing, and grants Brand a permanent license to share the post link."
  },
  {
    id: "pinterest-creator-partnership",
    subcategory: "Platform-Specific Sponsorship",
    title: "Pinterest Creator Partnership Contract",
    description: "A contract for Pinterest Idea Pins, shopping boards creation, and product tag configurations.",
    desc: "Pinterest pins, Idea Pins, and shopping board setups",
    field1: "pinterest_deliverables", field1Label: "Pinterest Pins Specs", field1Type: "textarea", field1Placeholder: "e.g. Five (5) Pinterest Idea Pins with product links...",
    field2: "sponsor_rate", field2Label: "Pinterest Campaign Rate ($)", field2Type: "currency", field2Placeholder: "e.g. 800.00",
    unit: "pin",
    bodyServices: "Creator shall design and pin high-resolution graphics according to: {pinterest_deliverables}.",
    bodyCompensation: "Brand shall pay Creator a flat fee of {sponsor_rate} for the pinned graphics.",
    bodyIp: "All graphics, layouts, and boards belong to the Creator, with search rights granted to the Brand."
  },
  {
    id: "snapchat-creator-agreement",
    subcategory: "Platform-Specific Sponsorship",
    title: "Snapchat Creator Agreement",
    description: "A sponsorship agreement for Snapchat Stories, custom filters, and Spotlight video posts.",
    desc: "Snapchat Stories, Spotlight videos, and custom geo-filters",
    field1: "snapchat_deliverables", field1Label: "Snapchat Story Specs", field1Type: "textarea", field1Placeholder: "e.g. A series of three (3) snaps in the Spotlight feed...",
    field2: "sponsor_rate", field2Label: "Snapchat Post Rate ($)", field2Type: "currency", field2Placeholder: "e.g. 900.00",
    unit: "story",
    bodyServices: "Creator shall record and publish Snaps with links according to: {snapchat_deliverables}.",
    bodyCompensation: "Brand shall pay Creator a flat fee of {sponsor_rate} for the Snaps.",
    bodyIp: "Stories remain live for standard Snapchat retention times, and Brand has rights to save screenshots."
  },
  {
    id: "twitter-paid-promotion",
    subcategory: "Platform-Specific Sponsorship",
    title: "Twitter/X Paid Promotion Agreement",
    description: "An agreement for sponsored threads, X Spaces co-hosting, and pinned posts on Twitter/X.",
    desc: "sponsored threads, X Spaces audio, and pinned posts",
    field1: "twitter_deliverables", field1Label: "X Campaign Deliverables", field1Type: "textarea", field1Placeholder: "e.g. One (1) sponsored thread of 5 posts, pinned for 48 hours...",
    field2: "sponsor_rate", field2Label: "X Campaign Rate ($)", field2Type: "currency", field2Placeholder: "e.g. 500.00",
    unit: "campaign",
    bodyServices: "Creator shall publish sponsored posts and host audio spaces according to: {twitter_deliverables}.",
    bodyCompensation: "Brand shall pay Creator a flat campaign fee of {sponsor_rate}.",
    bodyIp: "All tweets remain the intellectual property of the Creator, with repost rights granted to the Brand."
  },

  // --- Licensing & IP ---
  {
    id: "beat-licensing-nonexclusive",
    subcategory: "Licensing & IP",
    title: "Beat Licensing Agreement (Non-Exclusive)",
    description: "A music license allowing artists to write and record over a producer's beat with sales caps and streaming limits.",
    desc: "non-exclusive beats, music streams caps, and vocal recordings",
    field1: "stream_limit", field1Label: "Maximum Streaming Count", field1Type: "number", field1Placeholder: "e.g. 100000",
    field2: "beat_price", field2Label: "Non-Exclusive License Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 49.00",
    unit: "license",
    bodyServices: "Producer grants Artist non-exclusive rights to record over the beat up to a streaming limit of {stream_limit} plays.",
    bodyCompensation: "Artist shall pay Producer a flat non-exclusive license fee of {beat_price}.",
    bodyIp: "Producer retains 100% ownership of the original musical beat compositions."
  },
  {
    id: "beat-licensing-exclusive",
    subcategory: "Licensing & IP",
    title: "Beat Licensing Agreement (Exclusive)",
    description: "An exclusive music contract transferring complete rights in a beat to an artist, removing it from the producer's catalog.",
    desc: "exclusive beats, master recordings, and music royalties",
    field1: "vocal_rights", field1Label: "Vocal recording details", field1Type: "text", field1Placeholder: "Artist has full rights to write, perform, and sell vocal tracks over the beat",
    field2: "exclusive_price", field2Label: "Exclusive Purchase Price ($)", field2Type: "currency", field2Placeholder: "e.g. 500.00",
    unit: "beat",
    bodyServices: "Producer grants Artist exclusive rights to use, edit, and sell the beat: {vocal_rights}.",
    bodyCompensation: "Artist shall pay Producer a flat fee of {exclusive_price} for the exclusive beat transfer.",
    bodyIp: "Producer transfers all exclusive distribution rights to Artist, retaining publishing writer shares."
  },
  {
    id: "sample-clearance-agreement",
    subcategory: "Licensing & IP",
    title: "Sample Clearance Agreement",
    description: "A contract clearing audio samples or vocals loops for a song, detailing royalty shares and upfront fees.",
    desc: "audio samples, master clearance, and publishing splits",
    field1: "sampled_song_title", field1Label: "Sampled Song Title & Artist", field1Type: "text", field1Placeholder: "e.g. Night Loops by Producer X",
    field2: "clearance_fee", field2Label: "Clearance Buyout Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 1,000.00",
    unit: "sample",
    bodyServices: "Licensor clears the master audio sample from the track {sampled_song_title} for use in Licensee's new song.",
    bodyCompensation: "Licensee shall pay Licensor a flat clearance fee of {clearance_fee} plus pre-agreed royalty splits.",
    bodyIp: "Licensor retains copyright in the original sample, and Licensee owns the derivative song master."
  },
  {
    id: "font-licensing-agreement",
    subcategory: "Licensing & IP",
    title: "Font Licensing Agreement",
    description: "A type foundry license defining personal, commercial, desktop app, and website embedding limits.",
    desc: "font file formats, desktop licenses, and website embeddings",
    field1: "allowed_views_monthly", field1Label: "Maximum Website Views / Month", field1Type: "number", field1Placeholder: "e.g. 500000",
    field2: "font_license_price", field2Label: "Font License Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 250.00",
    unit: "font",
    bodyServices: "Foundry grants Licensee right to install font on desktop systems and embed on websites with up to {allowed_views_monthly} monthly views.",
    bodyCompensation: "Licensee shall pay Foundry a flat licensing fee of {font_license_price}.",
    bodyIp: "Foundry retains all copyright, design patents, and software files in the font catalog."
  },
  {
    id: "preset-filter-licensing",
    subcategory: "Licensing & IP",
    title: "Preset / Filter Licensing Agreement",
    description: "A licensing contract for photographers and designers selling Lightroom presets, video LUTs, or Instagram filters.",
    desc: "Lightroom presets, video LUT files, and digital downloads",
    field1: "allowed_users", field1Label: "Allowed Seat Count", field1Type: "number", field1Placeholder: "e.g. 5",
    field2: "preset_license_fee", field2Label: "Preset License Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 99.00",
    unit: "preset",
    bodyServices: "Designer grants Licensee the right to install the preset/LUT files on up to {allowed_users} user devices.",
    bodyCompensation: "Licensee shall pay Designer a flat licensing fee of {preset_license_fee}.",
    bodyIp: "Designer retains copyright in preset file configurations, and prohibits reselling of raw presets."
  },
  {
    id: "template-licensing-digital",
    subcategory: "Licensing & IP",
    title: "Template Licensing Agreement (Digital Products)",
    description: "A commercial license for Notion, Canva, or website templates specifying resale restrictions.",
    desc: "Canva templates, Notion setups, and digital product resales",
    field1: "license_terms", field1Label: "Allowed Resell / Edit Limits", field1Type: "textarea", field1Placeholder: "e.g. Licensee may edit and use template for clients, but cannot resell template in raw format...",
    field2: "template_price", field2Label: "Template License Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 150.00",
    unit: "template",
    bodyServices: "Creator grants Licensee a commercial license to use template subject to guidelines: {license_terms}.",
    bodyCompensation: "Licensee shall pay Creator a flat licensing fee of {template_price}.",
    bodyIp: "Creator retains copyright in original structures and layouts of the digital products."
  },
  {
    id: "course-content-licensing",
    subcategory: "Licensing & IP",
    title: "Course Content Licensing Agreement",
    description: "A license allowing schools or platforms to host and sell a creator's educational course videos.",
    desc: "course videos, slide decks, and hosting licenses",
    field1: "allowed_student_count", field1Label: "Maximum Student Seats", field1Type: "number", field1Placeholder: "e.g. 1000",
    field2: "licensing_fee", field2Label: "Annual Hosting License Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 5,000.00",
    unit: "course",
    bodyServices: "Creator licenses course videos and slide decks to Platform for up to {allowed_student_count} student enrollments.",
    bodyCompensation: "Platform shall pay Creator an annual licensing fee of {licensing_fee}.",
    bodyIp: "All course video assets, audio streams, and PDFs belong exclusively to the Creator."
  },
  {
    id: "podcast-format-licensing",
    subcategory: "Licensing & IP",
    title: "Podcast Format Licensing Agreement",
    description: "A licensing contract allowing a production company to adapt a podcast concept for other language markets.",
    desc: "podcast formats, language adaptations, and production concepts",
    field1: "territory_scope", field1Label: "Licensed Language/Territory", field1Type: "text", field1Placeholder: "e.g. French translation for French and Belgian markets",
    field2: "licensing_advance", field2Label: "Format Licensing Advance ($)", field2Type: "currency", field2Placeholder: "e.g. 10,000.00",
    unit: "format",
    bodyServices: "Creator grants Producer format rights to adapt podcast structure in territory: {territory_scope}.",
    bodyCompensation: "Producer shall pay Creator a format licensing advance of {licensing_advance} plus royalties on advertising.",
    bodyIp: "Creator retains copyright in original English podcast scripts, titles, and branding."
  },

  // --- Agency & Management ---
  {
    id: "talent-management-agreement",
    subcategory: "Agency & Management",
    title: "Talent Management Agreement",
    description: "A contract appointing a manager to secure brand deals, specifying commissions rates, and exclusivity.",
    desc: "talent manager commissions, exclusive representation, and brand deal terms",
    field1: "exclusivity_rules", field1Label: "Representation Exclusivity Scope", field1Type: "textarea", field1Placeholder: "e.g. Manager has exclusive representation for all B2B sponsorship deals worldwide...",
    field2: "commission_rate", field2Label: "Manager Commission Rate (%)", field2Type: "text", field2Placeholder: "e.g. 20% of gross campaign revenues",
    unit: "month",
    bodyServices: "Manager shall secure brand partnerships, audit contracts, and negotiate on behalf of Creator: {exclusivity_rules}.",
    bodyCompensation: "Creator shall pay Manager a service commission of {commission_rate} on all campaigns secured.",
    bodyIp: "All brand databases, email threads, and contact lists remain the property of the Manager."
  },
  {
    id: "creator-agency-representation",
    subcategory: "Agency & Management",
    title: "Creator Agency Representation Contract",
    description: "A contract with a creator agency outlining lead distribution, branding fees, and termination notices.",
    desc: "creator agency leads, branding fees, and termination rules",
    field1: "termination_notice_days", field1Label: "Termination Notice (Days)", field1Type: "number", field1Placeholder: "e.g. 60",
    field2: "agency_commission_percent", field2Label: "Agency Commission (%)", field2Type: "text", field2Placeholder: "e.g. 15% of total booking fees",
    unit: "campaign",
    bodyServices: "Agency shall represent Creator in sourcing influencer campaigns and brand deals.",
    bodyCompensation: "Agency shall retain {agency_commission_percent} of gross booking fees as representation commissions, and contract can be terminated with {termination_notice_days} days notice.",
    bodyIp: "All campaign metrics, client databases, and influencer files belong to the Agency."
  },
  {
    id: "influencer-agency-agreement",
    subcategory: "Agency & Management",
    title: "Influencer Marketing Agency Agreement",
    description: "An agency contract where an agency agrees to run marketing campaigns utilizing a roster of creators.",
    desc: "influencer marketing, campaign setups, and creator rosters",
    field1: "campaign_kpis", field1Label: "Campaign Target KPI Metrics", field1Type: "textarea", field1Placeholder: "e.g. Sourcing 15 creators, achieving a combined reach of 1 million impressions...",
    field2: "agency_setup_fee", field2Label: "Agency Campaign Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 7,500.00",
    unit: "campaign",
    bodyServices: "Agency shall source, contract, and manage creators to hit the target metrics: {campaign_kpis}.",
    bodyCompensation: "Client shall pay Agency a management fee of {agency_setup_fee} for campaign administration.",
    bodyIp: "Client owns the campaign performance data, and Agency retains rights to its creator roster database."
  },
  {
    id: "pr-publicity-creator",
    subcategory: "Agency & Management",
    title: "PR & Publicity Agreement (Creator)",
    description: "A public relations contract detailing press releases, interview sourcing, and media training scopes.",
    desc: "press releases, magazine interviews, and crisis management",
    field1: "pr_scope", field1Label: "Publicity & PR Scope", field1Type: "textarea", field1Placeholder: "Describe the magazine interviews, news pitching, or event invitations to secure...",
    field2: "monthly_fee", field2Label: "PR Retainer Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 3,000.00",
    unit: "month",
    bodyServices: "Publicist shall draft press templates and secure media interviews according to: {pr_scope}.",
    bodyCompensation: "Creator shall pay Publicist a monthly retainer of {monthly_fee} for media relations.",
    bodyIp: "All drafted press briefs, slide sheets, and interview logs belong to the Creator."
  },
  {
    id: "booking-agent-agreement",
    subcategory: "Agency & Management",
    title: "Creator Booking Agent Agreement",
    description: "A booking agent contract detailing speaking fees commissions, live appearances terms, and booking rules.",
    desc: "speaking fees, event appearances, and travel expense terms",
    field1: "appearance_scope", field1Label: "Appearance Booking Scope", field1Type: "textarea", field1Placeholder: "e.g. Sourcing speaking engagements at conferences, panel sessions, and university appearances...",
    field2: "booking_commission_rate", field2Label: "Agent Booking Split (%)", field2Type: "text", field2Placeholder: "e.g. 10% of gross speaking fees",
    unit: "appearance",
    bodyServices: "Agent shall negotiate speaker terms and schedule live appearances according to: {appearance_scope}.",
    bodyCompensation: "Creator shall pay Agent {booking_commission_rate} of all speaking or booking fees collected.",
    bodyIp: "All speaker rosters and conference databases belong exclusively to the Agent."
  },
  {
    id: "merchandise-licensing-agreement",
    subcategory: "Agency & Management",
    title: "Merchandise Licensing Agreement",
    description: "A contract licensing a creator's brand and graphics to a merch supplier for printing, warehousing, and profit cuts.",
    desc: "merchandise printing, t-shirt sales, and creator royalties",
    field1: "merch_categories", field1Label: "Licensed Merch Categories", field1Type: "text", field1Placeholder: "e.g. T-shirts, hoodies, stickers, and coffee mugs",
    field2: "royalty_rate", field2Label: "Royalty Rate on Net Sales (%)", field2Type: "text", field2Placeholder: "e.g. 12% of net merchandise sales",
    unit: "sale",
    bodyServices: "Creator licenses brand graphics for printing and selling products in: {merch_categories}.",
    bodyCompensation: "Merchandiser shall pay Creator a monthly royalty fee of {royalty_rate} from print sales.",
    bodyIp: "Creator retains 100% ownership of brand logos, marks, and design graphics."
  },
  {
    id: "tour-appearance-agreement",
    subcategory: "Agency & Management",
    title: "Tour / Live Event Appearance Agreement",
    description: "A contract for live tour shows, detailing ticket revenue splits, backstage riders, and venue setups.",
    desc: "tour bookings, backstage riders, and ticketing splits",
    field1: "rider_specifications", field1Label: "Backstage Rider / Hotel Specs", field1Type: "textarea", field1Placeholder: "e.g. Two (2) business class flights, one suite hotel room, and specific green room food...",
    field2: "guarantee_fee", field2Label: "Guaranteed Performance Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 5,000.00",
    unit: "performance",
    bodyServices: "Promoter shall secure venue and ticket sales, complying with creator riders: {rider_specifications}.",
    bodyCompensation: "Promoter shall pay Creator a guaranteed flat performance fee of {guarantee_fee} plus ticketing splits.",
    bodyIp: "Creator retains rights to audio/video recordings of the performance."
  },

  // --- Collaboration & Co-Creation ---
  {
    id: "youtube-collab-agreement",
    subcategory: "Collaboration & Co-Creation",
    title: "YouTube Collaboration Agreement",
    description: "An agreement between creators detailing video cross-promotion, channel uploads, and ad revenue sharing splits.",
    desc: "YouTube collabs, channel uploads, and ad revenue sharing",
    field1: "video_posting_rules", field1Label: "Posting and Upload Rules", field1Type: "textarea", field1Placeholder: "e.g. Upload video A on Creator X's channel and video B on Creator Y's channel with reciprocal link descriptions...",
    field2: "ad_revenue_split", field2Label: "Ad Revenue Split Ratio (%)", field2Type: "text", field2Placeholder: "e.g. 50/50 split of AdSense revenues generated by the collaboration videos",
    unit: "video",
    bodyServices: "Creators shall film and cross-promote collaboration videos according to: {video_posting_rules}.",
    bodyCompensation: "Creators shall share any YouTube AdSense revenue generated by the videos according to: {ad_revenue_split}.",
    bodyIp: "Each Creator retains copyright in the files uploaded to their respective channel."
  },
  {
    id: "podcast-guest-appearance",
    subcategory: "Collaboration & Co-Creation",
    title: "Podcast Guest Appearance Agreement",
    description: "A guest release form granting a host rights to edit, distribute, and promote a guest's interview audio.",
    desc: "podcast guest release, interview editing, and audio distribution",
    field1: "podcast_name", field1Label: "Podcast Name / Show", field1Type: "text", field1Placeholder: "e.g. The Creator Economics Podcast",
    field2: "appearance_fee", field2Label: "Guest Speaker Fee ($ or None)", field2Type: "text", field2Placeholder: "e.g. $0.00 (appearance for promotional value)",
    unit: "episode",
    bodyServices: "Guest authorizes Host to record, edit, and distribute Guest's interview on the show: {podcast_name}.",
    bodyCompensation: "Guest agrees that the appearance fee is: {appearance_fee} in exchange for promotional links.",
    bodyIp: "Host retains all copyright in the completed podcast episode and audio tracks."
  },
  {
    id: "joint-course-creation",
    subcategory: "Collaboration & Co-Creation",
    title: "Joint Course Creation Agreement",
    description: "An agreement between instructors co-creating a course, defining video editing duties and student revenue splits.",
    desc: "joint courses, slide designs, and student sales splits",
    field1: "course_division_labor", field1Label: "Labor & Video Division", field1Type: "textarea", field1Placeholder: "e.g. Partner X records Modules 1-4; Partner Y records Modules 5-8 and edits all videos...",
    field2: "sales_split_ratio", field2Label: "Student Sales Split (%)", field2Type: "text", field2Placeholder: "e.g. 60% Partner X, 40% Partner Y after software fees",
    unit: "course",
    bodyServices: "Instructors shall design modules and edit videos according to the division: {course_division_labor}.",
    bodyCompensation: "Sales revenues from student enrollments shall be divided per the split: {sales_split_ratio}.",
    bodyIp: "Instructors retain joint ownership of the compiled educational course database."
  },
  {
    id: "coauthored-book-agreement",
    subcategory: "Collaboration & Co-Creation",
    title: "Co-Authored Book Agreement",
    description: "A writer contract detailing outline schedules, word counts, publishing royalties, and marketing splits.",
    desc: "book writing, word counts, and publishing royalties",
    field1: "book_title_working", field1Label: "Working Book Title", field1Type: "text", field1Placeholder: "e.g. The Age of the Digital Nomad",
    field2: "publishing_royalty_split", field2Label: "Publishing Royalty Split (%)", field2Type: "text", field2Placeholder: "e.g. 50/50 split of all book publishing royalties",
    unit: "book",
    bodyServices: "Writers shall co-author draft chapters for the book: {book_title_working}.",
    bodyCompensation: "All royalties from print and digital publishing shall be split as follows: {publishing_royalty_split}.",
    bodyIp: "Writers shall hold joint copyright in the manuscript and book files."
  },
  {
    id: "collaborative-album-agreement",
    subcategory: "Collaboration & Co-Creation",
    title: "Collaborative Album Agreement",
    description: "A music agreement between bands or artists co-creating an album, detailing master splits and streaming allocations.",
    desc: "album collaborations, streaming royalties, and master splits",
    field1: "album_title_working", field1Label: "Working Album Title", field1Type: "text", field1Placeholder: "e.g. Acoustic Sessions Vol 1",
    field2: "distrokid_splits", field2Label: "DistroKid / Streaming Splits", field2Type: "text", field2Placeholder: "e.g. Equal 25% splits across four band members",
    unit: "album",
    bodyServices: "Artists shall record, mix, and master audio tracks for: {album_title_working}.",
    bodyCompensation: "All digital streaming revenues and master proceeds shall be shared according to: {distrokid_splits}.",
    bodyIp: "All master audio files and sound assets belong to the collaborative group jointly."
  },
  {
    id: "brand-collab-cocreation",
    subcategory: "Collaboration & Co-Creation",
    title: "Brand Collab / Product Co-Creation Contract",
    description: "A product co-creation contract detailing trademark licensing, custom makeup/apparel lines, and licensing commissions.",
    desc: "makeup lines, apparel lines, and branding commissions",
    field1: "product_line_specs", field1Label: "Co-Created Product Specifications", field1Type: "textarea", field1Placeholder: "e.g. Sourcing, styling, and branding a custom cosmetic eyeshadow palette line...",
    field2: "royalty_rate", field2Label: "Creator Royalty on Product Sales (%)", field2Type: "text", field2Placeholder: "e.g. 8% of gross product sales",
    unit: "sale",
    bodyServices: "Creator and Brand shall develop and market the co-branded product line: {product_line_specs}.",
    bodyCompensation: "Brand shall pay Creator a royalty rate of {royalty_rate} from product sales.",
    bodyIp: "Creator retains ownership of their name and personal brand trademarks, and Brand owns product formulas."
  },
  {
    id: "creative-director-creator",
    subcategory: "Collaboration & Co-Creation",
    title: "Creative Director Agreement (Creator Brand)",
    description: "A professional service contract hiring a creative director to manage design styling, video styles, and brand assets.",
    desc: "creative directors, video editing styling, and brand guidelines",
    field1: "director_tasks", field1Label: "Director Scope of Work", field1Type: "textarea", field1Placeholder: "e.g. Manage branding design, approve video edit styling, and design merch layouts...",
    field2: "director_fee", field2Label: "Creative Director Retainer ($)", field2Type: "currency", field2Placeholder: "e.g. 4,500.00",
    unit: "month",
    bodyServices: "Director shall manage brand layout guidelines and design styling according to: {director_tasks}.",
    bodyCompensation: "Creator shall pay Director a monthly service retainer of {director_fee}.",
    bodyIp: "All graphics, designs, and files created under this agreement are owned by the Creator."
  },
  {
    id: "mastermind-cohost-agreement",
    subcategory: "Collaboration & Co-Creation",
    title: "Mastermind / Community Co-Host Agreement",
    description: "An agreement co-hosting a paid mastermind or community, detailing member fee splits, event tasks, and list shares.",
    desc: "mastermind groups, community fees, and event agendas",
    field1: "cohost_tasks", field1Label: "Cohost Community Agenda", field1Type: "textarea", field1Placeholder: "e.g. Host bi-weekly Zoom sessions, moderate community forum, and book speakers...",
    field2: "member_fee_split", field2Label: "Member Fee Splits (%)", field2Type: "text", field2Placeholder: "e.g. 50/50 split of gross mastermind memberships",
    unit: "month",
    bodyServices: "Cohosts shall coordinate mastermind sessions and moderate forums according to: {cohost_tasks}.",
    bodyCompensation: "Revenues from membership sales shall be shared per the splits: {member_fee_split}.",
    bodyIp: "The member email database and forum platforms remain the shared property of both cohosts."
  },

  // --- Digital Products & Courses ---
  {
    id: "online-course-creation",
    subcategory: "Digital Products & Courses",
    title: "Online Course Creation Agreement",
    description: "A contract detailing video module structures, slide templates, copyright assignments, and hosting terms.",
    desc: "course creation, slide templates, and video assets",
    field1: "course_curriculum", field1Label: "Course Curriculum Details", field1Type: "textarea", field1Placeholder: "Describe the course modules, slide assets, or video specs...",
    field2: "dev_cost", field2Label: "Course Development Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 4,000.00",
    unit: "course",
    bodyServices: "Developer shall record modules, style slides, and deploy hosting files for: {course_curriculum}.",
    bodyCompensation: "Client shall pay Developer a flat fee of {dev_cost} for course development.",
    bodyIp: "Upon receipt of final payment, all course videos, slides, and files belong to the Client."
  },
  {
    id: "digital-product-reseller",
    subcategory: "Digital Products & Courses",
    title: "Digital Product Reseller Agreement",
    description: "A reseller contract outlining rights to repackage, resell, or distribute a creator's e-book or templates library.",
    desc: "reselling digital files, e-books distribution, and white-label rights",
    field1: "reseller_limits", field1Label: "Resale/Distribution Limits", field1Type: "textarea", field1Placeholder: "e.g. Permitted to sell as a PDF guide; prohibited from reselling as editable Notion files...",
    field2: "reseller_fee_upfront", field2Label: "Upfront Reseller License Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 1,000.00",
    unit: "license",
    bodyServices: "Licensor grants Reseller rights to repackage and distribute digital files subject to guidelines: {reseller_limits}.",
    bodyCompensation: "Reseller shall pay Licensor an upfront licensing fee of {reseller_fee_upfront}.",
    bodyIp: "Licensor retains copyright in the base templates and digital codes."
  },
  {
    id: "membership-site-tos",
    subcategory: "Digital Products & Courses",
    title: "Membership Site Terms of Service",
    description: "Terms of service specifying subscription fees, payment billing rules, community safety rules, and account lockouts.",
    desc: "membership subscriptions, card billings, and account sharing bans",
    field1: "membership_rules", field1Label: "Community Safety Covenants", field1Type: "textarea", field1Placeholder: "e.g. Strict ban on scraping directory data, sharing login accounts, or posting spam links...",
    field2: "subscription_rate", field2Label: "Monthly Subscription Rate ($)", field2Type: "currency", field2Placeholder: "e.g. 49.00",
    unit: "month",
    bodyServices: "Users are granted site access subject to community safety rules: {membership_rules}.",
    bodyCompensation: "Users agree to pay a monthly subscription fee of {subscription_rate} via automatic billing.",
    bodyIp: "All downloadable videos, worksheets, and codes remain the property of the Platform."
  },
  {
    id: "community-discord-membership",
    subcategory: "Digital Products & Courses",
    title: "Community / Discord Membership Agreement",
    description: "An agreement setting community behavior rules, moderation guidelines, and content distribution safety rules.",
    desc: "Discord channels, behavior rules, and spam bans",
    field1: "discord_rules", field1Label: "Discord Channels Regulations", field1Type: "textarea", field1Placeholder: "e.g. No harassment, no unsolicited DMs to members, and zero tolerance for hate speech...",
    field2: "membership_stipend", field2Label: "Membership Dues ($)", field2Type: "currency", field2Placeholder: "e.g. 29.00",
    unit: "month",
    bodyServices: "Member agrees to follow Discord channel rules and moderation commands: {discord_rules}.",
    bodyCompensation: "Member shall pay monthly membership dues of {membership_stipend} to maintain server roles.",
    bodyIp: "All chat logs, messages, and uploaded files are subject to moderation and remain server data."
  },
  {
    id: "cohort-course-instructor",
    subcategory: "Digital Products & Courses",
    title: "Cohort-Based Course Instructor Agreement",
    description: "An instructor hiring agreement detailing lecture schedules, slides, grading duties, and student fees splits.",
    desc: "cohort courses, live lecture hours, and student splits",
    field1: "cohort_schedule", field1Label: "Live Lecture Schedule", field1Type: "textarea", field1Placeholder: "e.g. Four (4) live Zoom lectures on consecutive Thursdays at 7 PM EST...",
    field2: "instructor_payout_per_student", field2Label: "Payout Per Student Enrolled ($)", field2Type: "currency", field2Placeholder: "e.g. 150.00",
    unit: "student",
    bodyServices: "Instructor shall conduct live lectures and guide students according to: {cohort_schedule}.",
    bodyCompensation: "Platform shall pay Instructor a student acquisition fee of {instructor_payout_per_student} per enrollment.",
    bodyIp: "Platform retains rights to recorded Zoom video VODs, and Instructor retains slide designs."
  },
  {
    id: "webinar-cohost-agreement",
    subcategory: "Digital Products & Courses",
    title: "Webinar Co-Host Agreement",
    description: "An agreement detailing webinar registration splits, email list collections, and sales pitch pitches.",
    desc: "webinar pitches, registration lists, and sales commission splits",
    field1: "pitch_format", field1Label: "Webinar Agenda & Pitch Format", field1Type: "textarea", field1Placeholder: "e.g. 45-minute educational content followed by a 15-minute pitch for the program...",
    field2: "sales_commission_split", field2Label: "Course Sales Split (%)", field2Type: "text", field2Placeholder: "e.g. 40% commission on course sales tracked through custom checkout link",
    unit: "sale",
    bodyServices: "Cohosts shall present content and pitch courses according to: {pitch_format}.",
    bodyCompensation: "Sales generated during the webinar shall be divided according to the split: {sales_commission_split}.",
    bodyIp: "Both hosts shall receive equal rights to upload the registration email list to their CRMs."
  },
  {
    id: "ebook-distribution-agreement",
    subcategory: "Digital Products & Courses",
    title: "E-Book Distribution Agreement",
    description: "A distribution contract specifying online shops sales splits, book files formats, and promotion plans.",
    desc: "e-book PDF sales, Amazon shop, and author percentages",
    field1: "book_formats", field1Label: "E-Book Formats", field1Type: "text", field1Placeholder: "e.g. PDF, EPUB, and Kindle-compatible formats",
    field2: "royalty_split", field2Label: "Sales Royalty Split (%)", field2Type: "text", field2Placeholder: "e.g. 70% to Author, 30% to Distributor on gross sales",
    unit: "sale",
    bodyServices: "Distributor shall display, process payments, and email e-books in formats: {book_formats}.",
    bodyCompensation: "Distributor shall pay Author a monthly royalty split of {royalty_split} from ebook transactions.",
    bodyIp: "Author retains 100% copyright in original book manuscript and cover art graphics."
  },

  // --- Misc Creator Legal ---
  {
    id: "model-release-form",
    subcategory: "Misc Creator Legal",
    title: "Model Release Form",
    description: "A model release form granting a photographer/videographer rights to license and sell visual assets containing the model's likeness.",
    desc: "likeness release, photo licensing, and commercial use releases",
    field1: "likeness_scope", field1Label: "Likeness Media Scope", field1Type: "textarea", field1Placeholder: "e.g. All photos and videos recorded during the studio shoot on May 23, 2026...",
    field2: "release_compensation", field2Label: "Release Compensation ($ or None)", field2Type: "text", field2Placeholder: "e.g. $100.00 flat fee or TFP (Time for Print)",
    unit: "session",
    bodyServices: "Model grants Photographer irrevocable rights to license and publish media containing the model's likeness: {likeness_scope}.",
    bodyCompensation: "Model agrees that the release compensation is: {release_compensation}.",
    bodyIp: "Photographer retains all copyright in the final photos and video files."
  },
  {
    id: "property-release-form",
    subcategory: "Misc Creator Legal",
    title: "Property Release Form",
    description: "A release form granting filmmakers rights to film on private property and publish the video footage commercially.",
    desc: "property release, filming locations, and building footage releases",
    field1: "property_location", field1Label: "Property Location & Address", field1Type: "text", field1Placeholder: "e.g. 102 Peak View Mansion, Golden, CO",
    field2: "location_fee", field2Label: "Location Rent / Release Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 500.00",
    unit: "session",
    bodyServices: "Owner grants Filmmaker rights to enter, film, and commercially distribute footage of the property located at: {property_location}.",
    bodyCompensation: "Filmmaker shall pay Owner a location release fee of {location_fee} prior to filming.",
    bodyIp: "Filmmaker owns all rights, title, and interest in the recorded footage."
  },
  {
    id: "video-appearance-release",
    subcategory: "Misc Creator Legal",
    title: "Video Appearance Release",
    description: "A release form granting video creators rights to edit and publish street interviews or crowd video footage.",
    desc: "video appearance release, street interviews, and video edits",
    field1: "interview_scope", field1Label: "Interview Scope & Location", field1Type: "text", field1Placeholder: "e.g. Street interviews at Denver Central Park on May 23, 2026",
    field2: "compensation_terms", field2Label: "Appearance Compensation Terms", field2Type: "text", field2Placeholder: "e.g. $0.00 (promotional/entertainment appearance)",
    unit: "stay",
    bodyServices: "Participant grants Videographer rights to edit and publish video footage from the interview: {interview_scope}.",
    bodyCompensation: "Participant agrees that the appearance compensation is: {compensation_terms}.",
    bodyIp: "Videographer retains all copyright and distribution rights in the video files."
  },
  {
    id: "podcast-disclaimer-terms",
    subcategory: "Misc Creator Legal",
    title: "Podcast Disclaimer & Terms",
    description: "A disclaimer statement for podcast websites outlining medical, legal, or financial advice liability waivers.",
    desc: "podcast disclaimers, liability waivers, and advice warning notices",
    field1: "advice_type", field1Label: "Advice Disclaimer Category", field1Type: "select", options: ["Financial/Investment Advice", "Medical/Health Advice", "Legal Advice", "General Information Only"], defaultValue: "General Information Only",
    field2: "show_name", field2Label: "Podcast Show Name", field2Type: "text", field2Placeholder: "e.g. Money Insights Podcast",
    unit: "stay",
    bodyServices: "This notice serves to warn listeners that {show_name} contains information categorized as: {advice_type}.",
    bodyCompensation: "Listeners agree that information does not constitute professional advice and releases hosts from liability.",
    bodyIp: "This disclaimer text is a mandatory legal notice file of the Podcast."
  },
  {
    id: "dmca-takedown-notice",
    subcategory: "Misc Creator Legal",
    title: "DMCA Takedown Notice Template",
    description: "A standard legal letter for sending DMCA notices to websites hosting stolen or plagiarized creator videos/images.",
    desc: "DMCA takedown, copyright infringement letters, and link details",
    field1: "infringing_links", field1Label: "Infringing Content URLs", field1Type: "textarea", field1Placeholder: "e.g. http://infringing-site.com/stolen-video-clip...",
    field2: "original_work_link", field2Label: "Original Content URL", field2Type: "text", field2Placeholder: "e.g. http://youtube.com/my-original-video",
    unit: "notice",
    bodyServices: "Host is notified that infringing content located at {infringing_links} violates original work: {original_work_link}.",
    bodyCompensation: "Under penalty of perjury, the copyright owner demands immediate removal of the infringing files.",
    bodyIp: "This notice is a formal legal submission under the Digital Millennium Copyright Act."
  },
  {
    id: "social-media-content-ownership",
    subcategory: "Misc Creator Legal",
    title: "Social Media Content Ownership Agreement",
    description: "An agreement between brands and content managers defining post ownership, custom graphics, and scheduling database rights.",
    desc: "social post ownership, custom graphic files, and client CRM rights",
    field1: "post_accounts", field1Label: "Target Social Media Accounts", field1Type: "text", field1Placeholder: "e.g. Brand's Twitter/X and Instagram profiles",
    field2: "manager_fee_monthly", field2Label: "Monthly Management Fee ($)", field2Type: "currency", field2Placeholder: "e.g. 2,000.00",
    unit: "month",
    bodyServices: "Manager shall schedule, design graphics, and post updates on the profiles: {post_accounts}.",
    bodyCompensation: "Brand shall pay Manager a monthly management fee of {manager_fee_monthly}.",
    bodyIp: "All custom graphics, copy drafts, and scheduled posts belong exclusively to the Brand upon creation."
  },
  {
    id: "creator-llc-operating",
    subcategory: "Misc Creator Legal",
    title: "Creator LLC Operating Agreement",
    description: "An operating agreement for a creator LLC defining member equity, channel asset transfers, and expense approvals.",
    desc: "LLC structures, member equity shares, and channel asset transfers",
    field1: "members_equity_schedule", field1Label: "LLC Members & Equity Shares", field1Type: "textarea", field1Placeholder: "e.g. Member X: 70% equity (primary talent), Member Y: 30% equity (operations manager)...",
    field2: "expense_approval_limit", field2Label: "Manager Expense Approval Limit ($)", field2Type: "currency", field2Placeholder: "e.g. 1,000.00",
    unit: "agreement",
    bodyServices: "Members establish LLC rules and set the manager expense approval limit to: {expense_approval_limit}.",
    bodyCompensation: "LLC profits and losses shall be distributed according to: {members_equity_schedule}.",
    bodyIp: "All channel logins, YouTube accounts, domain records, and camera equipment belong to the LLC."
  }
];

// Helper to format a single template object
function makeCreatorTemplate(t) {
  const f1 = t.field1 || "scope_of_work";
  const f1Label = t.field1Label || "Scope of Work";
  const f1Type = t.field1Type || "textarea";
  const f1Placeholder = t.field1Placeholder || "Describe the creative deliverables to perform...";
  
  const f2 = t.field2 || "flat_rate";
  const f2Label = t.field2Label || "Campaign Flat Fee ($)";
  const f2Type = t.field2Type || "currency";
  const f2Placeholder = t.field2Placeholder || "e.g. 2,500.00";

  const billingUnit = t.unit || "project";

  return {
    id: t.id,
    slug: t.id,
    category: "creator",
    subcategory: t.subcategory,
    title: t.title,
    description: t.description,
    whatsCovered: [
      `Definition of creative ${t.desc || 'campaign deliverables'}`,
      "Intellectual property licensing, usage rights, and exclusivity",
      "Payment milestones, brand payouts, and affiliate commissions",
      "Content moderation, FTC disclosures compliance, and safety rules",
      "Standard governing law and contract enforcement guidelines"
    ],
    whenToUse: `Use this contract when establishing guidelines for ${t.desc || 'creator campaigns'} to ensure legal safety for intellectual property and payments.`,
    jurisdictions: ["US", "UK", "CA"],
    lastReviewedAt: "2026-05-20",
    reviewerName: "Sarah Jenkins, Esq.",
    estimatedFillMinutes: 4,
    fields: [
      { id: "provider_name", label: "Creator / Licensor Name", type: "text", placeholder: "e.g. Alexa Green Influencer LLC", required: true, group: "Creator Info" },
      { id: "provider_address", label: "Creator Mailing Address", type: "text", placeholder: "e.g. 15 Prose Lane, Portland, OR 97201", required: true, group: "Creator Info" },
      { id: "client_name", label: "Brand / Licensee Name", type: "text", placeholder: "e.g. Apex Cosmetic Group Inc.", required: true, group: "Brand Info" },
      { id: "client_address", label: "Brand Office Address", type: "text", placeholder: "e.g. 500 Park Avenue, New York, NY 10022", required: true, group: "Brand Info" },
      { id: "effective_date", label: "Effective Date", type: "date", required: true, group: "Key Dates" },
      { id: f1, label: f1Label, type: f1Type, placeholder: f1Placeholder, required: true, group: "Project Details" },
      { id: f2, label: f2Label, type: f2Type, placeholder: f2Placeholder, required: true, group: "Compensation" },
      { id: "governing_state", label: "Governing Jurisdiction", type: "text", placeholder: "e.g. Oregon", required: true, group: "Legal Settings" }
    ],
    clauses: [
      {
        id: "intro",
        heading: `${t.title.toUpperCase()}`,
        body: `This Creator Agreement (the "Agreement") is entered into as of {effective_date} (the "Effective Date"), by and between {provider_name}, located at {provider_address} ("Creator"), and {client_name}, located at {client_address} ("Brand").`,
        optional: false,
        enabledByDefault: true
      },
      {
        id: "services",
        heading: "1. Creative Deliverables & Milestones",
        body: t.bodyServices || `Creator agrees to produce and publish deliverables according to the creative brief: {${f1}}. All assets must comply with FTC guidelines.`,
        optional: false,
        enabledByDefault: true
      },
      {
        id: "compensation",
        heading: "2. Payment and Sponsorship Fees",
        body: t.bodyCompensation || `Brand agrees to pay Creator the sponsorship rate of {${f2}} in exchange for the campaign posts. Payments are due within 15 days of post approvals.`,
        optional: false,
        "enabledByDefault": true
      },
      {
        id: "licensing",
        heading: "3. Intellectual Property and FTC Disclosures",
        body: t.bodyIp || "Creator retains copyright in the posts. Creator grants Brand a non-exclusive license to share/repost campaign assets on brand profiles, subject to including mandatory FTC sponsorship disclosures.",
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
    relatedTemplates: ["influencer-agreement", "ugc-creator-agreement"],
    faq: [
      { question: "Are FTC disclosures mandatory under this contract?", answer: "Yes. Both parties are legally required to ensure all sponsored posts include clear, conspicuous hashtags such as #ad or #sponsored." },
      { question: "Who owns the video files after campaign completion?", answer: "The creator retains copyright in all original files, granting the brand a licensing right to share and host the assets." }
    ],
    tags: ["creator", "contract", "influencer", billingUnit]
  };
}

// Generate files
newTemplates.forEach((t) => {
  const formatted = makeCreatorTemplate(t);
  const filePath = path.join(outputDir, `${formatted.id}.json`);
  fs.writeFileSync(filePath, JSON.stringify(formatted, null, 2), 'utf8');
  console.log(`Successfully wrote template: ${formatted.id}`);
});

console.log('Finished writing creator templates!');
