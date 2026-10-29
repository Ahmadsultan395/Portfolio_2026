export interface Project {
  slug: string;
  name: string;
  /** Short, accurate description based only on the supplied project details. */
  description: string;
  highlights: string[];
  /** Only technologies explicitly supplied. Omitted when no stack was provided. */
  stack?: string[];
  /** Category tags derived from the supplied details. */
  tags: string[];
  /** Live URL exactly as supplied. Omitted when none was supplied. */
  url?: string;
  /** Add your own contribution here (shown on the card when set). */
  contribution?: string;
  featured: boolean;
  /** Layout hint for featured projects. */
  size?: "wide" | "half";
}

export const projects: Project[] = [
  {
    slug: "f2a",
    name: "F2A Gift Store",
    description:
      "A premium e-commerce platform offering authentic gift items with cash on delivery, nationwide fast shipping, and beautifully gift-wrapped packaging.",
    highlights: [
      "Featured products & flash sales",
      "Cash on delivery & secure checkout",
      "Free gift wrapping on every order",
    ],
    stack: ["Next.js", "React", "Tailwind CSS"], // Agar backend use kiya hai to add karein
    tags: ["E-Commerce", "Retail", "Gifting"],
    url: "https://gift-store-tawny.vercel.app/",
    featured: true,
    size: "wide",
  },
  {
    slug: "level-up-saloon",
    name: "Level Up Saloon",
    description:
      "A modern barbershop and salon booking platform. Features a sleek design allowing customers to explore grooming services, view pricing, and book appointments online.",
    highlights: [
      "Online appointment booking",
      "Service & pricing catalog",
      "Modern, responsive UI",
    ],
    stack: ["Next.js", "React", "CSS Modules"], // Apne hisaab se stack change kar sakte hain
    tags: ["Booking", "Salon", "Lifestyle"],
    url: "https://level-up-saloon.vercel.app/",
    featured: true,
    size: "half",
  },
  {
    slug: "khatri-brothers-academy",
    name: "Khatri Brothers Academy",
    description:
      "A music-learning platform with course purchases, custom courses and dashboards for every role.",
    highlights: [
      "Music course purchases and custom courses",
      "Secure transactions",
      "Role-based student, instructor and admin dashboards",
    ],
    tags: ["Education", "E-learning", "Payments"],
    url: "https://www.khatribrothersacademy.com/",
    featured: true,
    size: "half",
  },
  {
    slug: "digital-school-management-system",
    name: "Digital School Management System",
    description:
      "A multi-school platform where each school gets its own access, managed centrally by a Super Admin.",
    highlights: [
      "Super Admin and school-specific access",
      "Role-based dashboards and permissions",
      "User management",
    ],
    stack: ["Next.js", "TypeScript", "REST APIs"],
    tags: ["Education", "Multi-tenant", "Dashboards"],
    url: "https://digitalschoolsedu.com/",
    featured: true,
    size: "wide",
  },
  {
    slug: "step-career-path",
    name: "Step Career Path / School Management Website",
    description:
      "A school website with student registration, authentication, an admin dashboard and content management.",
    highlights: [
      "Student registration",
      "Admin dashboard and authentication",
      "Content management",
    ],
    stack: ["React.js", "APIs"],
    tags: ["Education", "Admin dashboard"],
    url: "https://www.stempathway.org/",
    featured: false,
  },
  {
    slug: "digital-adaptation",
    name: "Digital Agency – Full Stack Web Development",
    description:
      "A modern, responsive, and SEO-friendly full-stack corporate website along with an admin dashboard for a digital solutions agency. Features web & mobile app development services, UI/UX design, digital marketing, blog management, and career pages.",
    highlights: [
      "Custom admin dashboard for content management",
      "Firebase authentication and real-time database",
      "Blog, Services, and Career page management",
      "SEO-friendly structure and fully responsive UI",
    ],
    stack: ["React.js", "Material UI", "Tailwind CSS", "Firebase"],
    tags: ["Full Stack", "Corporate", "Admin Dashboard", "SEO"],
    url: "https://digiadaptation.com/",
    featured: false,
    size: "wide",
  },
  {
    slug: "moshlay-creatives",
    name: "Moshlay Creatives",
    description:
      "An IT-services website presenting web and mobile development work with service inquiries.",
    highlights: [
      "Web and mobile development presentation",
      "Responsive interfaces",
      "Service inquiries",
    ],
    tags: ["IT services", "Company website"],
    url: "https://moshlaycreatives.com/",
    featured: false,
  },
  {
    slug: "dubai-safari-booking-platform",
    name: "Dubai Safari Booking Platform",
    description:
      "A booking platform for safari packages with ticketing, package management and payment workflows.",
    highlights: [
      "Safari packages and ticket booking",
      "Package management",
      "API integrations and booking/payment workflows",
      "Responsive UI",
    ],
    stack: ["React.js", "Node.js"],
    tags: ["Travel", "Booking", "Payments"],
    url: "https://www.bookdubaisafari.com/",
    featured: false,
    size: "half",
  },
  {
    slug: "moshlay-printing",
    name: "Moshlay Printing",
    description:
      "An e-commerce site for printing services, with product browsing and order customization.",
    highlights: ["Custom packaging", "Product browsing", "Order customization"],
    tags: ["E-commerce", "Printing"],
    url: "https://moshlayprinting.com/",
    featured: false,
  },
  {
    slug: "itify-smc-private-limited",
    name: "Itify (SMC Private) Limited",
    description:
      "A software company website with a responsive UI and professional service presentation.",
    highlights: ["Responsive UI", "Professional service presentation"],
    tags: ["Company website", "Software"],
    url: "https://itify.website/",
    featured: false,
  },
  {
    slug: "shopwave-ecommerce",
    name: "ShopWave – Full Stack E-Commerce Store",
    description:
      "A modern full-stack e-commerce platform focused on trending electronics and smart gadgets. Provides a fast, secure, and user-friendly shopping experience with product browsing, cart management, and secure checkout.",
    highlights: [
      "Built with Next.js and TypeScript for scalability",
      "Supabase authentication and database integration",
      "Cart management, secure checkout, and order tracking",
      "Admin dashboard for managing products and orders",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    tags: ["E-Commerce", "Full Stack", "Tech Gadgets", "Admin Dashboard"],
    url: "https://shopwave-ecommerce-store-p8sx.vercel.app/",
    featured: false,
    size: "wide",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const indexProjects = projects.filter((p) => !p.featured);
