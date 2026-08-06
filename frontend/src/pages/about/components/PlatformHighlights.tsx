import React from 'react';
import { 
  Server, 
  Code2, 
  Lock, 
  ShieldAlert, 
  ShoppingBag, 
  Gauge, 
  TerminalSquare, 
  Cloud 
} from 'lucide-react';

export const PlatformHighlights: React.FC = () => {
  const highlights = [
    {
      title: 'Enterprise Java Backend',
      category: 'Core System',
      icon: <Server className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />,
      bg: 'bg-indigo-500/10',
      description: 'Robust enterprise backend architecture built on modern Java ecosystem principles.',
      techs: [
        'Java 17 LTS',
        'Spring Boot 3',
        'Spring Security',
        'Spring Data JPA',
        'Hibernate ORM',
        'PostgreSQL',
        'Flyway Migration',
        'Bean Validation',
        'MapStruct',
        'Lombok',
      ],
    },
    {
      title: 'Modern React Frontend',
      category: 'Client Application',
      icon: <Code2 className="w-5 h-5 text-sky-600 dark:text-sky-400" />,
      bg: 'bg-sky-500/10',
      description: 'High-performance Single Page Application with strict type safety and dynamic UI state.',
      techs: [
        'React 18',
        'TypeScript',
        'Vite 5',
        'React Router',
        'Context API',
        'TanStack Query',
        'Tailwind CSS',
        'Responsive Design',
      ],
    },
    {
      title: 'Enterprise Authentication',
      category: 'Security & Identity',
      icon: <Lock className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      bg: 'bg-amber-500/10',
      description: 'Production-grade stateless identity management and token refresh lifecycle.',
      techs: [
        'JWT Authentication',
        'Access Token (Short-lived)',
        'Refresh Token (HttpOnly)',
        'Role Guards',
        'Permission Guards',
        'BCrypt Password Encoding',
        'Email Verification',
        'Forgot Password',
        'Reset Password',
        'Session Management',
      ],
    },
    {
      title: 'Advanced RBAC',
      category: 'Access Control',
      icon: <ShieldAlert className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      bg: 'bg-emerald-500/10',
      description: 'Granular role and permission authorization matrix evaluated dynamically.',
      techs: [
        'SUPER_ADMIN',
        'ADMIN',
        'SELLER',
        'CUSTOMER',
        'Permission Matrix',
        'Dynamic Permission Evaluation',
        'Method Level Authorization',
        'Route Guards',
      ],
    },
    {
      title: 'Commerce Engine',
      category: 'Business Core',
      icon: <ShoppingBag className="w-5 h-5 text-[var(--vynk-brand)]" />,
      bg: 'bg-[var(--vynk-brand)]/10',
      description: 'Comprehensive e-commerce operational pipeline handling products, orders, and payments.',
      techs: [
        'Product Management',
        'Category Management',
        'Inventory Tracking',
        'Shopping Cart',
        'Wishlist',
        'Checkout Pipeline',
        'Order Processing',
        'Coupons & Discounts',
        'Shipping Carriers',
        'Payment Integration',
      ],
    },
    {
      title: 'High Performance',
      category: 'Optimization',
      icon: <Gauge className="w-5 h-5 text-rose-600 dark:text-rose-400" />,
      bg: 'bg-rose-500/10',
      description: 'Engineered for sub-second query response times and low memory footprints.',
      techs: [
        'Pagination',
        'Filtering & Sorting',
        'Lazy Loading',
        'In-Memory Caching',
        'Optimized Queries',
        'Debounced Search',
        'Code Splitting',
      ],
    },
    {
      title: 'Developer Experience',
      category: 'Architecture Quality',
      icon: <TerminalSquare className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      bg: 'bg-purple-500/10',
      description: 'Standardized enterprise patterns ensuring codebase longevity and easy onboarding.',
      techs: [
        'Swagger / OpenAPI',
        'Global Exception Handling',
        'Bean Validation',
        'DTO Layer',
        'Mapper Layer',
        'Repository Pattern',
        'Service Layer',
        'Controller Layer',
      ],
    },
    {
      title: 'Cloud Ready',
      category: 'DevOps & Infra',
      icon: <Cloud className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />,
      bg: 'bg-cyan-500/10',
      description: 'Fully containerized deployment infrastructure ready for auto-scaling cloud targets.',
      techs: [
        'Docker',
        'Docker Compose',
        'GitHub Actions',
        'CI/CD Pipelines',
        'Cloud Deployment',
        'Environment Profiles',
        'Production Configuration',
      ],
    },
  ];

  return (
    <section className="space-y-6">
      <div className="border-b border-app pb-4">
        <h2 className="text-2xl font-black text-app-primary tracking-tight">
          Platform Highlights
        </h2>
        <p className="text-xs text-app-secondary mt-1">
          Eight architectural pillars engineered for enterprise robustness, high security, and seamless developer experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {highlights.map((card, idx) => (
          <div
            key={idx}
            className="p-6 bg-app-card rounded-2xl border border-app shadow-xs hover:border-[var(--vynk-brand)]/40 hover:shadow-md transition-all flex flex-col justify-between space-y-4 group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center font-bold group-hover:scale-105 transition-transform`}>
                  {card.icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-app-muted bg-app-surface px-2 py-0.5 rounded-full border border-app">
                  {card.category}
                </span>
              </div>

              <h3 className="text-lg font-bold text-app-primary">{card.title}</h3>
              <p className="text-xs text-app-secondary leading-relaxed">{card.description}</p>
            </div>

            <div className="pt-3 border-t border-app">
              <div className="flex flex-wrap gap-1.5">
                {card.techs.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-app-surface border border-app text-app-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
