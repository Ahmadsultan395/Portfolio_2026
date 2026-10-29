export interface SkillCategory {
  id: string;
  title: string;
  blurb: string;
  items: string[];
}

/**
 * Every technology below comes from the CV details supplied for this portfolio.
 * No proficiency levels are claimed. If you want to distinguish "daily use" from
 * "working knowledge", add a `level` field here and render it in SkillsSection.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend & Languages",
    blurb: "The core of how I build interfaces.",
    items: ["Next.js", "React.js", "TypeScript", "JavaScript", "HTML5", "CSS3"],
  },
  {
    id: "ui",
    title: "UI Frameworks & Styling",
    blurb: "Responsive, consistent visual systems.",
    items: ["Tailwind CSS", "Bootstrap", "Material UI", "shadcn/ui", "jQuery", "Sass", "SCSS"],
  },
  {
    id: "state",
    title: "State, Routing & Data Fetching",
    blurb: "Predictable data flow across the app.",
    items: ["Redux", "Redux Toolkit", "Axios", "React Router"],
  },
  {
    id: "forms",
    title: "Forms & Validation",
    blurb: "Forms that guide and protect users.",
    items: ["React Hook Form", "Formik", "Yup", "Zod"],
  },
  {
    id: "apis",
    title: "APIs, Real-time & Integrations",
    blurb: "Connecting the interface to the product.",
    items: ["REST APIs", "Socket.IO", "API integrations"],
  },
  {
    id: "backend",
    title: "Backend",
    blurb: "Enough server-side depth to collaborate well.",
    items: ["Node.js", "Express.js"],
  },
  {
    id: "data",
    title: "Databases & Firebase",
    blurb: "Persistence and backend-as-a-service.",
    items: ["MongoDB", "Mongoose", "SQL", "Firebase", "Firestore", "Firebase Cloud Functions"],
  },
  {
    id: "auth",
    title: "Authentication & Authorization",
    blurb: "Secure sign-in and role-aware access.",
    items: ["Firebase Authentication", "Role-based access control"],
  },
  {
    id: "payments",
    title: "Payments & Cloud Storage",
    blurb: "Transactions and media storage.",
    items: ["PayPal integration", "AWS S3"],
  },
  {
    id: "tools",
    title: "Development Tools & Deployment",
    blurb: "Shipping and collaborating cleanly.",
    items: ["GitHub", "Postman", "Vercel", "Netlify", "Docker"],
  },
];

/** Headline technologies used in the hero ticker. */
export const tickerItems = [
  "Next.js",
  "React.js",
  "TypeScript",
  "Redux Toolkit",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "MongoDB",
  "Firebase",
  "REST APIs",
];
