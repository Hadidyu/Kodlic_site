export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Solutions", href: "#solutions" },
  { label: "Engagement", href: "#engagement" },
  { label: "Clients", href: "#clients" },
  { label: "Estimate", href: "#estimate" },
  { label: "Contact", href: "#contact" },
];

export const TECH_STACK = [
  "React", "Next.js", "TypeScript", "Node.js", "React Native",
  "Flutter", "PostgreSQL", "MongoDB", "Supabase", "Firebase",
  "Stripe", "Shopify", "Tailwind", "Figma", "Vercel",
  "Cloudflare", "OpenAI", "Claude", "Gemini", "GitHub",
];

export type Service = {
  id: string;
  no: string;
  title: string;
  tagline: string;
  desc: string;
  items: string[];
  glyph: "mobile" | "frontend" | "backend" | "api" | "commerce";
};

export const SERVICES: Service[] = [
  {
    id: "mobile",
    no: "01",
    title: "Mobile App Development",
    tagline: "iOS & Android, one codebase or two",
    desc: "Native-feeling applications engineered for retention — from first prototype to store release, with the infrastructure to keep them alive.",
    items: [
      "iOS applications", "Android applications", "React Native", "Flutter",
      "Cross-platform development", "Push notifications", "In-app purchases",
      "App Store deployment", "Google Play deployment",
    ],
    glyph: "mobile",
  },
  {
    id: "frontend",
    no: "02",
    title: "Frontend Development",
    tagline: "Interfaces that feel engineered",
    desc: "Fast, accessible, pixel-exact frontends. We obsess over the 100ms details that make a product feel expensive.",
    items: [
      "React", "Next.js", "TypeScript", "Responsive UI",
      "Interactive dashboards", "High-performance interfaces",
    ],
    glyph: "frontend",
  },
  {
    id: "backend",
    no: "03",
    title: "Backend Development",
    tagline: "Systems built to stay up",
    desc: "Clean architectures that scale past launch day — typed APIs, sane databases, and infrastructure your next engineer will thank you for.",
    items: [
      "Node.js", "REST APIs", "GraphQL", "Database architecture",
      "Authentication", "Cloud infrastructure", "Scalable backend systems",
    ],
    glyph: "backend",
  },
  {
    id: "api",
    no: "04",
    title: "API & Integrations",
    tagline: "Everything talking to everything",
    desc: "We wire your product into the world — payments, CRMs, ERPs and third-party services, with webhooks that never silently fail.",
    items: [
      "Payment integrations", "CRM integrations", "ERP integrations",
      "Third-party APIs", "Webhooks", "Authentication providers",
    ],
    glyph: "api",
  },
  {
    id: "commerce",
    no: "05",
    title: "Websites & E-Commerce",
    tagline: "Found to bought, without friction",
    desc: "Marketing sites that convert and storefronts that checkout. SEO-ready architecture and analytics from day one.",
    items: [
      "Business websites", "Landing pages", "Shopify", "Headless commerce",
      "CMS", "SEO-ready architecture", "Analytics integration",
    ],
    glyph: "commerce",
  },
];

export type Solution = {
  id: string;
  no: string;
  title: string;
  desc: string;
  items: string[];
  glyph: "layers" | "coin" | "browser" | "spark" | "bars" | "shield";
  span: string;
};

export const SOLUTIONS: Solution[] = [
  {
    id: "platforms",
    no: "01",
    title: "Platforms",
    desc: "Multi-user products with roles, billing and scale.",
    items: [
      "SaaS Platforms", "Marketplaces", "Community Platforms",
      "Membership Platforms", "Booking Platforms", "Learning Management Systems",
    ],
    glyph: "layers",
    span: "lg:col-span-2",
  },
  {
    id: "commerce",
    no: "02",
    title: "Commerce & Finance",
    desc: "Money-moving systems that reconcile cleanly.",
    items: [
      "E-commerce", "Shopify", "FinTech solutions",
      "Payment systems", "Billing systems", "Invoicing systems",
    ],
    glyph: "coin",
    span: "lg:col-span-2",
  },
  {
    id: "webmobile",
    no: "03",
    title: "Web & Mobile",
    desc: "The surfaces your users actually touch.",
    items: [
      "Marketing websites", "Client portals", "Admin dashboards",
      "PWAs", "Mobile applications", "Internal applications",
    ],
    glyph: "browser",
    span: "lg:col-span-2",
  },
  {
    id: "ai",
    no: "04",
    title: "AI & Automation",
    desc: "LLMs doing real work inside your product — not demo tricks.",
    items: [
      "AI Agents", "AI Chatbots", "LLM integrations", "AI automation",
      "Workflow automation", "Document processing",
      "AI recommendations", "Customer support AI",
    ],
    glyph: "spark",
    span: "lg:col-span-3",
  },
  {
    id: "data",
    no: "05",
    title: "Data & Operations",
    desc: "Operational truth, surfaced in real time.",
    items: [
      "CRM systems", "ERP integrations", "Inventory systems",
      "Logistics platforms", "Analytics dashboards", "Reporting systems",
      "Data migration",
    ],
    glyph: "bars",
    span: "lg:col-span-3",
  },
  {
    id: "infra",
    no: "06",
    title: "Infrastructure",
    desc: "The invisible layer that keeps everything fast, safe and deployable.",
    items: [
      "REST / GraphQL APIs", "Authentication", "Role-based permissions",
      "Cloud infrastructure", "DevOps", "Security",
      "Performance optimization", "Legacy system modernization",
    ],
    glyph: "shield",
    span: "lg:col-span-6",
  },
];

export type Engagement = {
  id: string;
  no: string;
  name: string;
  tagline: string;
  includes: string[];
  cta: string;
  href: string;
  accent: "mint" | "sun" | "steel";
};

export const ENGAGEMENTS: Engagement[] = [
  {
    id: "project",
    no: "01",
    name: "Project-Based",
    tagline: "For clients with defined requirements and a clear finish line.",
    includes: [
      "Fixed scope", "Defined milestones", "Project timeline", "Development",
      "Testing", "Documentation", "Final handoff",
    ],
    cta: "Start a Project",
    href: "#estimate",
    accent: "mint",
  },
  {
    id: "retainer",
    no: "02",
    name: "Retainer",
    tagline: "For companies that need continuous development capacity.",
    includes: [
      "Monthly development", "Priority support", "Continuous improvements",
      "Feature development", "Maintenance", "Monthly planning",
      "Direct communication",
    ],
    cta: "Talk to Kodlic",
    href: "#contact",
    accent: "sun",
  },
  {
    id: "consulting",
    no: "03",
    name: "Consulting",
    tagline: "For companies that need senior technical judgement.",
    includes: [
      "Technical architecture", "Code reviews", "Technology selection",
      "Technical strategy", "Product consultation", "Due diligence",
      "Hiring / team strategy",
    ],
    cta: "Book a Consultation",
    href: "#contact",
    accent: "steel",
  },
];

export type MonthlyPlan = {
  id: string;
  name: string;
  tag: string;
  price: string;
  period: string;
  note: string;
  includes: string[];
  badge?: string;
  cta: string;
  href: string;
};

export const MONTHLY: MonthlyPlan[] = [
  {
    id: "tech-management",
    name: "Tech Management",
    tag: "Operations & support",
    price: "$200–$2,000",
    period: "/month",
    note: "Your technical back-office, handled.",
    includes: [
      "Technical support", "Customer support coordination", "Ticket management",
      "Engineering coordination", "Subscription / billing support", "Account management",
    ],
    cta: "Start a Project",
    href: "#estimate",
  },
  {
    id: "dedicated-dev",
    name: "Dedicated Developer",
    tag: "Embedded engineering",
    price: "$2,500+",
    period: "/month",
    note: "A senior engineer inside your team, from day one.",
    includes: [
      "Dedicated developer", "Full-time development support",
      "Existing team integration", "Existing technology stack",
      "Direct communication", "Continuous development", "Scaling support",
    ],
    badge: "Most flexible",
    cta: "Talk to Kodlic",
    href: "#contact",
  },
];

export type ClientSegment = {
  id: string;
  no: string;
  name: string;
  desc: string;
  points: { label: string; detail: string }[];
  pipeline?: string[];
};

export const CLIENTS: ClientSegment[] = [
  {
    id: "startups",
    no: "01",
    name: "Startups",
    desc: "From napkin sketch to live product. We move at founder speed with engineering discipline — shipping an MVP users can actually pay for.",
    points: [
      { label: "MVP development", detail: "Scoped, built and shipped in weeks" },
      { label: "Product development", detail: "Full-cycle, from spec to store" },
      { label: "Prototyping", detail: "Clickable proof before you commit" },
      { label: "Launch support", detail: "Stores, DNS, monitoring — handled" },
    ],
  },
  {
    id: "growth",
    no: "02",
    name: "Growth-Stage Companies",
    desc: "Your product works — now it needs to work at 10x. We scale systems, ship features faster and plug senior engineers into your roadmap.",
    points: [
      { label: "New features", detail: "Shipped on your release cadence" },
      { label: "Product scaling", detail: "Architecture that survives growth" },
      { label: "Performance optimization", detail: "Faster loads, lower infra bills" },
      { label: "Migration", detail: "Zero-downtime platform moves" },
      { label: "Team augmentation", detail: "Engineers who merge, not disrupt" },
    ],
  },
  {
    id: "enterprises",
    no: "03",
    name: "Enterprises",
    desc: "Custom software that plays nicely with the systems you already run — secure, auditable and modernized without stopping the business.",
    points: [
      { label: "Custom software", detail: "Built to your compliance bar" },
      { label: "Internal platforms", detail: "Tools your teams will actually use" },
      { label: "AI implementation", detail: "Practical LLM rollouts, not pilots" },
      { label: "Legacy modernization", detail: "Strangler-fig, not big-bang" },
      { label: "Enterprise integrations", detail: "ERP, CRM, SSO and beyond" },
    ],
  },
  {
    id: "founders",
    no: "04",
    name: "Non-Technical Founders",
    desc: "You don't need to learn to code — you need a partner who translates your vision into working software, and explains every step in plain language.",
    points: [
      { label: "One accountable partner", detail: "Design, build and launch under one roof" },
      { label: "Plain-language process", detail: "No jargon, weekly demos" },
      { label: "Fixed, predictable pricing", detail: "Know the number before we start" },
      { label: "Post-launch growth", detail: "We stay for analytics and iteration" },
    ],
    pipeline: ["Idea", "Design", "Development", "Launch", "Growth"],
  },
];

/* ---------------- Estimate builder ---------------- */

export type ScopeOption = { label: string; mult: number };
export type ProjectType = {
  id: string;
  label: string;
  base: [number, number];
  hint: string;
  scopes: ScopeOption[];
};

export const PROJECT_TYPES: ProjectType[] = [
  {
    id: "website", label: "Website", base: [1500, 4500], hint: "Marketing & business sites",
    scopes: [
      { label: "Landing page", mult: 0.7 },
      { label: "Business website (5–10 pages)", mult: 1 },
      { label: "Multi-page content site", mult: 1.25 },
      { label: "Full redesign + migration", mult: 1.5 },
    ],
  },
  {
    id: "webapp", label: "Web Application", base: [6000, 14000], hint: "Portals, dashboards, tools",
    scopes: [
      { label: "MVP", mult: 0.85 },
      { label: "Internal tool", mult: 1 },
      { label: "Client portal / dashboard", mult: 1.25 },
      { label: "Full product platform", mult: 1.6 },
    ],
  },
  {
    id: "mobile", label: "Mobile App", base: [8000, 18000], hint: "iOS, Android or both",
    scopes: [
      { label: "Single platform (iOS or Android)", mult: 0.8 },
      { label: "Cross-platform (React Native / Flutter)", mult: 1 },
      { label: "App + backend & admin panel", mult: 1.35 },
    ],
  },
  {
    id: "saas", label: "SaaS", base: [12000, 28000], hint: "Subscription software",
    scopes: [
      { label: "MVP with auth + billing", mult: 0.8 },
      { label: "Multi-tenant platform", mult: 1.15 },
      { label: "Marketplace / two-sided", mult: 1.5 },
    ],
  },
  {
    id: "ai", label: "AI Product", base: [8000, 22000], hint: "Agents, chatbots, LLM features",
    scopes: [
      { label: "AI chatbot / assistant", mult: 0.8 },
      { label: "LLM feature inside a product", mult: 1 },
      { label: "AI automation workflows", mult: 1.2 },
      { label: "RAG / custom model system", mult: 1.6 },
    ],
  },
  {
    id: "ecom", label: "E-Commerce", base: [3000, 9000], hint: "Storefronts & commerce",
    scopes: [
      { label: "Shopify setup & theme", mult: 0.7 },
      { label: "Custom storefront", mult: 1.1 },
      { label: "Headless commerce", mult: 1.5 },
    ],
  },
  {
    id: "custom", label: "Custom Software", base: [15000, 40000], hint: "Enterprise & bespoke systems",
    scopes: [
      { label: "System integration", mult: 0.8 },
      { label: "Legacy modernization", mult: 1.1 },
      { label: "Enterprise platform", mult: 1.5 },
    ],
  },
  {
    id: "other", label: "Other", base: [5000, 12000], hint: "Something else entirely",
    scopes: [
      { label: "Not sure yet — discovery sprint", mult: 0.8 },
      { label: "Small build", mult: 0.9 },
      { label: "Medium build", mult: 1.1 },
      { label: "Large build", mult: 1.4 },
    ],
  },
];

export const DESIGN_OPTIONS = [
  { label: "Existing Design", desc: "We build from your Figma files or brand kit.", add: [0, 0] as [number, number] },
  { label: "Need UI/UX Design", desc: "Product design, flows and a component system.", add: [1500, 4000] as [number, number] },
  { label: "Need Branding + Design", desc: "Identity, design system and full UI/UX.", add: [3500, 8000] as [number, number] },
];

export const TIMELINE_OPTIONS = [
  { label: "ASAP", factor: 1.25, note: "Rush lane — prioritized sprint team" },
  { label: "1–2 Months", factor: 1.1, note: "Fast, focused delivery" },
  { label: "3–4 Months", factor: 1, note: "Standard engineering pace" },
  { label: "Flexible", factor: 0.92, note: "Best rate — we slot you in" },
];

export const BUDGET_OPTIONS = [
  "Under $2k", "$2k – $5k", "$5k – $10k", "$10k – $25k", "$25k – $50k", "$50k+",
];

export const STATS = [
  { value: 120, suffix: "+", label: "Projects shipped" },
  { value: 8, suffix: "+", label: "Years engineering" },
  { value: 40, suffix: "+", label: "Clients retained" },
  { value: 12, suffix: "", label: "Countries served" },
];
