export interface ExperienceItem {
  company: string;
  location: string;
  mode?: string;
  role: string;
  /** Dates exactly as supplied in the CV (overlaps are intentional and preserved). */
  period: string;
  current?: boolean;
  points: string[];
}

export const experience: ExperienceItem[] = [
  {
    company: "Digital Adaptation",
    location: "Islamabad",
    role: "Next.js / React.js Developer",
    period: "December 2024 – Present",
    current: true,
    points: [
      "Build dynamic frontend interfaces with Next.js, React.js and TypeScript.",
      "Work with Firebase authentication, Firestore and related services.",
      "Craft responsive interfaces using Tailwind CSS and Material UI.",
      "Handle API integrations and performance improvements.",
      "Keep learning and applying new tools and techniques.",
    ],
  },
  {
    company: "Moshlay Creatives",
    location: "Lahore",
    mode: "On-site",
    role: "React.js Developer",
    period: "July 2024 – December 2024",
    points: [
      "Developed web applications with React, Node.js, Express and MongoDB.",
      "Delivered responsive interfaces and scalable functionality.",
      "Collaborated with the team and helped improve development processes.",
    ],
  },
  {
    company: "Itify (SMC Private) Limited",
    location: "Burewala",
    mode: "On-site",
    role: "React.js Developer",
    period: "September 2023 – August 2024",
    points: [
      "Built interactive interfaces with React.",
      "Collaborated with designers and backend developers.",
      "Implemented responsive layouts and improved user experience.",
    ],
  },
  {
    company: "Itify (SMC Private) Limited",
    location: "Burewala",
    role: "Frontend Developer Intern",
    period: "June 2023 – September 2023",
    points: [
      "Created HTML/CSS layouts and ensured cross-browser compatibility.",
      "Built responsive interfaces.",
      "Worked on CRUD functionality and customer data management.",
    ],
  },
];

export interface EducationItem {
  institution: string;
  degree: string;
  year: string;
  score: string;
}

export const education: EducationItem[] = [
  {
    institution: "University of Agriculture Faisalabad",
    degree: "Bachelor of Computer Science",
    year: "2023",
    score: "CGPA 3.5+",
  },
  {
    institution: "Aspire College, Burewala",
    degree: "FSc Pre-Engineering",
    year: "2019",
    score: "75% overall",
  },
];

export const activities = ["Debate club", "Science exhibitions", "Sports"];

export const interests = ["Cricket", "Video games", "Traveling", "Photography"];
