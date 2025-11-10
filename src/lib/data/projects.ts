export interface Project {
  id: string;
  title: string;
  slug: string; // URL-friendly slug
  description: string;
  longDescription: string;
  
  // Images
  image: string; // Main thumbnail
  images: string[]; // Gallery images
  
  // Technical Details
  technologies: string[];
  category: "Frontend" | "Full Stack" | "UI/UX" | "Mobile" | "Other";
  tags: string[]; // Additional tags for filtering
  
  // Links
  liveUrl?: string;
  githubUrl?: string;
  caseStudyUrl?: string;
  
  // Metadata
  featured: boolean;
  status: "Completed" | "In Progress" | "Archived";
  date: string; // YYYY-MM format
  duration?: string; // "2 months"
  
  // Additional Info
  role?: string; // "Lead Developer", "Solo Project"
  team?: string[]; // Team members
  challenges?: string[]; // Technical challenges solved
  features?: string[]; // Key features
  metrics?: {
    label: string;
    value: string;
  }[];
}

export const projectsData: Project[] = [
  {
    id: "1",
    slug: "ecommerce-platform",
    title: "E-Commerce Platform",
    description: "An E-commerce project with product catalog, cart, and checkout functionality.",
    longDescription: `
      Built a complete e-commerce solution featuring server-side rendering, optimistic UI updates, 
      and a seamless checkout experience. The platform includes product catalog, shopping cart, 
      user authentication, and order management.
      
      Implemented advanced features like product search, filtering, wishlist, and user reviews. 
      The application features a responsive design that works flawlessly across all devices with 
      smooth animations and transitions.
    `,
    image: "/projects/ecommerce/792dc364-6cf2-4030-b977-c6dab73f8c31.jpg",
    images: [
      "/projects/ecommerce/792dc364-6cf2-4030-b977-c6dab73f8c31.jpg",
      "/projects/ecommerce/home.webp",
      "/projects/ecommerce/product.webp",
      "/projects/ecommerce/brands.webp",
      "/projects/ecommerce/cart.webp",
      "/projects/ecommerce/checkout.webp",
      "/projects/ecommerce/wishlist.webp",
      "/projects/ecommerce/thumbnail.webp"
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "React", "NextAuth"],
    category: "Full Stack",
    tags: ["ecommerce", "shopping", "nextjs", "authentication"],
    liveUrl: "https://2-b-stylish-storre-next-js-e-commer.vercel.app/Login?callbackUrl=%2F",
    githubUrl: "https://github.com/Kareem4874/AUTH-Mart-2B-Stylish-Website-Next.js-",
    featured: true,
    status: "Completed",
    date: "2023-10",
    duration: "3 months",
    role: "Full Stack Developer",
    challenges: [
      "Implementing secure authentication with NextAuth",
      "Optimizing product catalog performance",
      "Building responsive shopping cart functionality",
      "Creating smooth user experience across all pages"
    ],
    features: [
      "User authentication and authorization",
      "Product catalog with search and filters",
      "Shopping cart with persistent storage",
      "Brand showcase and categories",
      "Responsive design for all devices",
      "Smooth page transitions",
      "User-friendly checkout process"
    ],
    metrics: [
      { label: "Page Load Time", value: "< 2s" },
      { label: "Products", value: "100+" },
      { label: "Mobile Responsive", value: "100%" }
    ]
  },
  {
    id: "2",
    slug: "portfolio-website",
    title: "Portfolio Website",
    description: "Personal portfolio website showcasing my skills and projects.",
    longDescription: `
      A responsive portfolio website built with Next.js and Tailwind CSS to showcase projects, 
      skills, and experience in an elegant and interactive way. Features smooth animations, 
      dark theme design, and optimized performance.
      
      The site includes sections for about me, skills showcase, project gallery, blog posts, 
      and contact form. Built with modern web technologies and best practices for SEO and 
      accessibility.
    `,
    image: "/projects/Portfolio/thumbnail.webp",
    images: [
      "/projects/Portfolio/thumbnail.webp",
      "/projects/Portfolio/about.webp",    
      "/projects/Portfolio/blog.webp",     
      "/projects/Portfolio/works.webp"     
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "React"],
    category: "Frontend",
    tags: ["portfolio", "showcase", "nextjs", "personal"],
    liveUrl: "https://kareem4874.github.io/Simple-Site/",
    githubUrl: "https://github.com/Kareem4874/Simple-Site",
    featured: true,
    status: "Completed",
    date: "2023-09",
    duration: "2 months",
    role: "Frontend Developer & Designer",
    challenges: [
      "Creating unique and engaging design",
      "Implementing smooth animations without performance impact",
      "Building responsive layout for all screen sizes",
      "Optimizing images and assets for fast loading"
    ],
    features: [
      "Animated homepage with hero section",
      "Projects showcase with filtering",
      "Blog section with articles",
      "About me with skills display",
      "Contact form integration",
      "Dark theme design",
      "Fully responsive layout",
      "SEO optimized"
    ],
    metrics: [
      { label: "Lighthouse Score", value: "95+" },
      { label: "First Paint", value: "< 1.5s" },
      { label: "Mobile Score", value: "98" }
    ]
  },
  {
    id: "3",
    slug: "tech-information-platform",
    title: "Tech Information Platform",
    description: "A social media platform with user profiles, posts, and interactions.",
    longDescription: `
      A tech-focused social platform built with React and Firebase, allowing users to share 
      information, post updates, and interact with other tech enthusiasts. Features real-time 
      updates, user authentication, and interactive post management.
      
      Users can create posts, upload images, like and comment on content, and manage their 
      profiles. The platform includes real-time notifications and a clean, modern interface 
      built with Material-UI.
    `,
    image: "/projects/social-meidaAPP/uesr Posts.jpg",
    images: [
      "/projects/social-meidaAPP/uesr Posts.jpg"
    ],
    technologies: ["React", "Firebase", "Material-UI", "JavaScript"],
    category: "Full Stack",
    tags: ["social", "firebase", "react", "real-time"],
    liveUrl: "https://social-app-opal-six.vercel.app/",
    githubUrl: "https://github.com/Kareem4874/Tech-Information-Sharing-Platform",
    featured: true,
    status: "Completed",
    date: "2023-08",
    duration: "2.5 months",
    role: "Full Stack Developer",
    challenges: [
      "Implementing real-time updates with Firebase",
      "Managing user authentication and authorization",
      "Building efficient data structure for posts and comments",
      "Optimizing performance with large datasets"
    ],
    features: [
      "User authentication with Firebase",
      "Create and manage posts",
      "Upload and display images",
      "Like and comment on posts",
      "User profiles and management",
      "Real-time updates and notifications",
      "Responsive Material-UI design"
    ],
    metrics: [
      { label: "Real-time Updates", value: "Instant" },
      { label: "User Engagement", value: "High" },
      { label: "Performance", value: "Optimized" }
    ]
  },
  {
    id: "4",
    slug: "product-management-system",
    title: "Product Management System",
    description: "Admin dashboard with analytics, user management, and data visualization.",
    longDescription: `
      A comprehensive product management system with an admin dashboard, analytics, user 
      management, and data visualization capabilities built with React and Redux. Features 
      CRUD operations for products with search, filter, and sort functionality.
      
      The system includes detailed product management with categories, pricing, and inventory 
      tracking. Built with Bootstrap for responsive design and Chart.js for data visualization.
    `,
    image: "/projects/systemmangement/thumbnail.jpg",
    images: [
      "/projects/systemmangement/thumbnail.jpg"
    ],
    technologies: ["React", "Redux", "Chart.js", "Bootstrap", "JavaScript"],
    category: "Frontend",
    tags: ["dashboard", "admin", "react", "management"],
    liveUrl: "https://kareem4874.github.io/Product-Management-System/",
    githubUrl: "https://github.com/Kareem4874/Product-Management-System",
    featured: false,
    status: "Completed",
    date: "2023-07",
    duration: "2 months",
    role: "Frontend Developer",
    challenges: [
      "Implementing efficient state management with Redux",
      "Building complex filtering and search functionality",
      "Creating responsive data tables",
      "Optimizing performance for large product lists"
    ],
    features: [
      "CRUD operations for products",
      "Advanced search and filtering",
      "Product categories management",
      "Inventory tracking",
      "Data visualization with charts",
      "Responsive Bootstrap design",
      "Local storage for data persistence"
    ],
    metrics: [
      { label: "Products Handled", value: "500+" },
      { label: "Load Time", value: "< 2s" },
      { label: "Responsive", value: "100%" }
    ]
  },
  {
    id: "5",
    slug: "weather-forecast-app",
    title: "Weather Forecast App",
    description: "Real-time weather information with 3-day forecast and location detection.",
    longDescription: `
      A weather application that provides real-time weather information, 3-day forecast, and 
      location-based weather data using the OpenWeather API. Features beautiful UI design with 
      weather icons and smooth animations.
      
      Users can search for any city worldwide, view current conditions, hourly and daily forecasts, 
      and save favorite locations. The app includes detailed weather information like temperature, 
      humidity, wind speed, and conditions.
    `,
    image: "/projects/weather/thumbnail.jpg",
    images: [
      "/projects/weather/thumbnail.jpg"
    ],
    technologies: ["JavaScript", "OpenWeather API", "CSS3", "HTML5"],
    category: "Frontend",
    tags: ["weather", "api", "javascript", "forecast"],
    liveUrl: "https://kareem4874.github.io/Weather-Forecast-Application/",
    githubUrl: "https://github.com/Kareem4874/Weather-Forecast-Application",
    featured: false,
    status: "Completed",
    date: "2023-06",
    duration: "1 month",
    role: "Frontend Developer",
    challenges: [
      "Integrating and parsing OpenWeather API data",
      "Implementing geolocation functionality",
      "Creating responsive weather cards",
      "Handling API rate limits and errors"
    ],
    features: [
      "Real-time weather data",
      "3-day weather forecast",
      "City search functionality",
      "Location-based weather detection",
      "Weather icons and animations",
      "Detailed weather information",
      "Responsive mobile design",
      "Fast API integration"
    ],
    metrics: [
      { label: "API Response Time", value: "< 1s" },
      { label: "Accuracy", value: "98%" },
      { label: "Cities Supported", value: "200K+" }
    ]
  }
];

// Helper functions
export const getAllProjects = () => projectsData;

export const getFeaturedProjects = () => {
  return projectsData.filter(project => project.featured);
};

export const getProjectBySlug = (slug: string) => {
  return projectsData.find(project => project.slug === slug);
};

export const getProjectsByCategory = (category: string) => {
  if (category === "All") return projectsData;
  return projectsData.filter(project => project.category === category);
};

export const getProjectsByTechnology = (tech: string) => {
  return projectsData.filter(project => 
    project.technologies.some(t => t.toLowerCase().includes(tech.toLowerCase()))
  );
};

export const getRelatedProjects = (currentProject: Project, limit = 3) => {
  return projectsData
    .filter(project => 
      project.id !== currentProject.id &&
      (project.category === currentProject.category ||
       project.technologies.some(tech => currentProject.technologies.includes(tech)))
    )
    .slice(0, limit);
};

export const searchProjects = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return projectsData.filter(project =>
    project.title.toLowerCase().includes(lowerQuery) ||
    project.description.toLowerCase().includes(lowerQuery) ||
    project.technologies.some(tech => tech.toLowerCase().includes(lowerQuery)) ||
    project.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

// Get all unique technologies
export const getAllTechnologies = () => {
  const techSet = new Set<string>();
  projectsData.forEach(project => {
    project.technologies.forEach(tech => techSet.add(tech));
  });
  return Array.from(techSet).sort();
};

// Get all unique categories
export const getAllCategories = () => {
  const categories = new Set(projectsData.map(p => p.category));
  return ["All", ...Array.from(categories)];
};

// Get all unique tags
export const getAllTags = () => {
  const tagSet = new Set<string>();
  projectsData.forEach(project => {
    project.tags.forEach(tag => tagSet.add(tag));
  });
  return Array.from(tagSet).sort();
};