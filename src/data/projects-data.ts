import { Project } from "@/lib/data/projects";

export const projectsData: Project[] = [
  {
    id: "1",
    slug: "ecommerce-platform",
    title: "E-Commerce Platform",
    description: "An E-commerce project with product catalog, cart, and checkout functionality.",
    longDescription: "A full-featured e-commerce platform built with Next.js and TypeScript, featuring product catalog, shopping cart, and secure checkout process.",
    image: "/projects/ecommerce/792dc364-6cf2-4030-b977-c6dab73f8c31.jpg",
    images: [
      "/projects/ecommerce/792dc364-6cf2-4030-b977-c6dab73f8c31.jpg",
      "/projects/ecommerce/home.PNG",
      "/projects/ecommerce/products.PNG",
      "/projects/ecommerce/cart.PNG",
      "/projects/ecommerce/checkout.PNG",
      "/projects/ecommerce/wishlist.PNG",
      "/projects/ecommerce/brands.PNG",
      "/projects/ecommerce/thumbnail.PNG"
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    category: "Full Stack",
    tags: ["ecommerce", "shopping", "nextjs"],
    liveUrl: "https://2-b-stylish-storre-next-js-e-commer.vercel.app/Login?callbackUrl=%2F",
    githubUrl: "https://github.com/Kareem4874/AUTH-Mart-2B-Stylish-Website-Next.js-",
    featured: true,
    status: "Completed",
    date: "2023-10",
    role: "Full Stack Developer"
  },
  {
    id: "2",
    slug: "portfolio-website",
    title: "Portfolio Website",
    description: "Personal portfolio website showcasing my skills and projects.",
    longDescription: "A responsive portfolio website built with Next.js and Tailwind CSS to showcase my projects, skills, and experience in an elegant and interactive way.",
    image: "/projects/Portfolio/thumbnail.webp",
    images: [
      "/projects/Portfolio/thumbnail.webp",
      "/projects/Portfolio/about.webp",    
      "/projects/Portfolio/blog.webp",     
      "/projects/Portfolio/works.webp"     
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    category: "Frontend",
    tags: ["portfolio", "showcase", "nextjs"],
    liveUrl: "https://kareem4874.github.io/Simple-Site/",
    githubUrl: "https://github.com/Kareem4874/Simple-Site",
    featured: true,
    status: "Completed",
    date: "2023-09",
    role: "Frontend Developer"
  },
  {
    id: "3",
    slug: "tech-information-platform",
    title: "Tech Information Platform",
    description: "A social media platform with user profiles, posts, and interactions.",
    longDescription: "A tech-focused social platform built with React and Firebase, allowing users to share information, post updates, and interact with other tech enthusiasts.",
    image: "/projects/social-meidaAPP/uesr Posts.jpg",
    images: [
      "/projects/social-meidaAPP/uesr Posts.jpg"
    ],
    technologies: ["React", "Firebase", "Material-UI"],
    category: "Full Stack",
    tags: ["social", "firebase", "react"],
    liveUrl: "https://social-app-opal-six.vercel.app/",
    githubUrl: "https://github.com/Kareem4874/Tech-Information-Sharing-Platform",
    featured: true,
    status: "Completed",
    date: "2023-08",
    role: "Full Stack Developer"
  },
  {
    id: "4",
    slug: "product-management-system",
    title: "Product Management System",
    description: "Admin dashboard with analytics, user management, and data visualization.",
    longDescription: "A comprehensive product management system with an admin dashboard, analytics, user management, and data visualization capabilities built with React and Redux.",
    image: "/projects/systemmangement/thumbnail.jpg",
    images: [
      "/projects/systemmangement/thumbnail.jpg"
    ],
    technologies: ["React", "Redux", "Chart.js", "Bootstrap"],
    category: "Frontend",
    tags: ["dashboard", "admin", "react"],
    liveUrl: "https://kareem4874.github.io/Product-Management-System/",
    githubUrl: "https://github.com/Kareem4874/Product-Management-System",
    featured: false,
    status: "Completed",
    date: "2023-07",
    role: "Frontend Developer"
  },
  {
    id: "5",
    slug: "weather-forecast-app",
    title: "Weather Forecast App",
    description: "Real-time weather information with 3-day forecast and location detection.",
    longDescription: "A weather application that provides real-time weather information, 3-day forecast, and location-based weather data using the OpenWeather API.",
    image: "/projects/weather/thumbnail.jpg",
    images: [
      "/projects/weather/thumbnail.jpg"
    ],
    technologies: ["JavaScript", "OpenWeather API", "CSS3"],
    category: "Frontend",
    tags: ["weather", "api", "javascript"],
    liveUrl: "https://kareem4874.github.io/Weather-Forecast-Application/",
    githubUrl: "https://github.com/Kareem4874/Weather-Forecast-Application",
    featured: false,
    status: "Completed",
    date: "2023-06",
    role: "Frontend Developer"
  }
];