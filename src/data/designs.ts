// Design Prototype Interface
export interface DesignPrototype {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'professional' | 'gaming' | 'startups' | 'api-backend' | 'stackweb-projects';
  techStack: string[];
}

// All Design Prototypes
export const allDesigns: DesignPrototype[] = [
  // Professional Designs
  {
    id: 'prof-1',
    title: 'Corporate Business Suite',
    description: 'Modern corporate website with professional design and CMS integration',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=500&auto=format',
    category: 'professional',
    techStack: ['React', 'TypeScript', 'Tailwind CSS']
  },
  {
    id: 'prof-2',
    title: 'Executive Portfolio',
    description: 'Elegant portfolio for executives and professionals',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=500&auto=format',
    category: 'professional',
    techStack: ['Next.js', 'Framer Motion', 'Sanity CMS']
  },
  {
    id: 'prof-3',
    title: 'Law Firm Website',
    description: 'Professional website for legal services with case management',
    imageUrl: 'https://images.unsplash.com/photo-1479142506502-19b3a3b7ff33?q=80&w=500&auto=format',
    category: 'professional',
    techStack: ['React', 'Node.js', 'PostgreSQL']
  },
  {
    id: 'prof-4',
    title: 'Consulting Agency',
    description: 'Clean and modern design for consulting businesses',
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=500&auto=format',
    category: 'professional',
    techStack: ['Vue.js', 'Tailwind CSS', 'Strapi']
  },

  // Gaming Designs
  {
    id: 'game-1',
    title: 'Esports Tournament Platform',
    description: 'Dynamic platform for esports tournaments and live streaming',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=500&auto=format',
    category: 'gaming',
    techStack: ['React', 'WebSocket', 'Three.js']
  },
  {
    id: 'game-2',
    title: 'Gaming Community Hub',
    description: 'Social platform for gamers with forums and chat',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=500&auto=format',
    category: 'gaming',
    techStack: ['Next.js', 'Socket.io', 'MongoDB']
  },
  {
    id: 'game-3',
    title: 'Game Studio Portfolio',
    description: 'Showcase website for indie game developers',
    imageUrl: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=500&auto=format',
    category: 'gaming',
    techStack: ['React', 'GSAP', 'Contentful']
  },
  {
    id: 'game-4',
    title: 'Gaming Clan Website',
    description: 'Team website with member profiles and match history',
    imageUrl: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=500&auto=format',
    category: 'gaming',
    techStack: ['Vue.js', 'Firebase', 'Tailwind CSS']
  },

  // Startup Designs
  {
    id: 'startup-1',
    title: 'SaaS Landing Page',
    description: 'Conversion-optimized landing page for SaaS products',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500&auto=format',
    category: 'startups',
    techStack: ['React', 'Framer Motion', 'Stripe']
  },
  {
    id: 'startup-2',
    title: 'Tech Startup MVP',
    description: 'Full-featured MVP with user authentication and dashboard',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=500&auto=format',
    category: 'startups',
    techStack: ['Next.js', 'Supabase', 'Tailwind CSS']
  },
  {
    id: 'startup-3',
    title: 'Mobile App Landing',
    description: 'App showcase with download links and feature highlights',
    imageUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=500&auto=format',
    category: 'startups',
    techStack: ['React', 'TypeScript', 'Analytics']
  },
  {
    id: 'startup-4',
    title: 'Fintech Platform',
    description: 'Financial technology platform with secure transactions',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=500&auto=format',
    category: 'startups',
    techStack: ['Next.js', 'Node.js', 'PostgreSQL']
  },

  // API & Backend Designs
  {
    id: 'api-1',
    title: 'REST API Documentation',
    description: 'Interactive API documentation with code examples',
    imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=500&auto=format',
    category: 'api-backend',
    techStack: ['Express', 'Swagger', 'MongoDB']
  },
  {
    id: 'api-2',
    title: 'Microservices Architecture',
    description: 'Scalable microservices backend with Docker',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=500&auto=format',
    category: 'api-backend',
    techStack: ['Node.js', 'Docker', 'Redis']
  },
  {
    id: 'api-3',
    title: 'GraphQL API Server',
    description: 'Modern GraphQL API with real-time subscriptions',
    imageUrl: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=500&auto=format',
    category: 'api-backend',
    techStack: ['Apollo', 'GraphQL', 'PostgreSQL']
  },
  {
    id: 'api-4',
    title: 'Payment Gateway Integration',
    description: 'Secure payment processing backend with webhooks',
    imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=500&auto=format',
    category: 'api-backend',
    techStack: ['Node.js', 'Stripe', 'Express']
  },

  // StackWeb Projects
  {
    id: 'stack-1',
    title: 'E-commerce Platform',
    description: 'Full-featured online store with cart and checkout',
    imageUrl: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=500&auto=format',
    category: 'stackweb-projects',
    techStack: ['React', 'Node.js', 'Stripe', 'MongoDB']
  },
  {
    id: 'stack-2',
    title: 'Real Estate Portal',
    description: 'Property listing platform with search and filters',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=500&auto=format',
    category: 'stackweb-projects',
    techStack: ['Next.js', 'Mapbox', 'PostgreSQL']
  },
  {
    id: 'stack-3',
    title: 'Learning Management System',
    description: 'Online education platform with video courses',
    imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=500&auto=format',
    category: 'stackweb-projects',
    techStack: ['React', 'Video.js', 'Firebase']
  },
  {
    id: 'stack-4',
    title: 'Restaurant Booking System',
    description: 'Table reservation system with menu management',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=500&auto=format',
    category: 'stackweb-projects',
    techStack: ['Vue.js', 'Node.js', 'MySQL']
  }
];

// Helper function to get designs by category
export function getDesignsByCategory(category: DesignPrototype['category']): DesignPrototype[] {
  return allDesigns.filter(design => design.category === category);
}

// Helper function to get design by ID
export function getDesignById(id: string): DesignPrototype | undefined {
  return allDesigns.find(design => design.id === id);
}
