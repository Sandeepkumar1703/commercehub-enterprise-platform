import React from 'react';
import { 
  Workflow, 
  Code2, 
  Server, 
  Container, 
  GitBranch, 
  TestTube, 
  Cloud, 
  CheckCircle2, 
  Zap, 
  Lock, 
  Globe 
} from 'lucide-react';

export const DevOpsAndApis: React.FC = () => {
  const devStandards = [
    { name: 'Layered Architecture', desc: 'Strict isolation between Controller, Service, Repository, and Model tiers.' },
    { name: 'SOLID Principles', desc: 'Single responsibility, open-closed design, and dependency inversion across services.' },
    { name: 'Repository Pattern', desc: 'Spring Data JPA abstraction separating data persistence from business rules.' },
    { name: 'DTO Pattern', desc: 'Separate Request and Response DTOs preventing over-posting and entity exposure.' },
    { name: 'Mapper Pattern', desc: 'MapStruct compile-time mappers ensuring zero runtime reflection overhead.' },
    { name: 'Dependency Injection', desc: 'Spring IoC container managing singleton beans via constructor injection.' },
    { name: 'Global Exception Handling', desc: 'Centralized @ControllerAdvice transforming exceptions into standard JSON envelopes.' },
    { name: 'Bean Validation', desc: 'JSR-380 annotation constraints validating inputs before business execution.' },
  ];

  const devOpsPipeline = [
    { name: 'Developer', desc: 'Feature commits', icon: <Code2 size={16} /> },
    { name: 'GitHub', desc: 'Pull requests', icon: <GitBranch size={16} /> },
    { name: 'GitHub Actions', desc: 'CI Runner', icon: <Workflow size={16} /> },
    { name: 'Maven Build', desc: 'JAR packaging', icon: <Server size={16} /> },
    { name: 'JUnit Tests', desc: 'Test execution', icon: <TestTube size={16} /> },
    { name: 'Docker Build', desc: 'Image tagging', icon: <Container size={16} /> },
    { name: 'Cloud Registry', desc: 'Push image', icon: <Cloud size={16} /> },
    { name: 'Production', desc: 'Live execution', icon: <Zap size={16} /> },
  ];

  const apiShowcase = [
    { title: 'Authentication APIs', endpoints: 8, auth: 'Public / Auth', methods: ['POST', 'GET'] },
    { title: 'Products APIs', endpoints: 12, auth: 'Public / Admin / Seller', methods: ['GET', 'POST', 'PUT', 'DELETE'] },
    { title: 'Categories APIs', endpoints: 6, auth: 'Public / Admin', methods: ['GET', 'POST', 'PUT', 'DELETE'] },
    { title: 'Orders APIs', endpoints: 10, auth: 'Customer / Admin / Seller', methods: ['GET', 'POST', 'PUT', 'PATCH'] },
    { title: 'Users APIs', endpoints: 8, auth: 'Admin / Self', methods: ['GET', 'PUT', 'DELETE'] },
    { title: 'Payments APIs', endpoints: 6, auth: 'Customer / Admin', methods: ['POST', 'GET', 'PATCH'] },
    { title: 'Shipping APIs', endpoints: 5, auth: 'Customer / Admin', methods: ['GET', 'POST', 'PUT'] },
    { title: 'Review APIs', endpoints: 6, auth: 'Customer / Public', methods: ['GET', 'POST', 'DELETE'] },
    { title: 'Wishlist APIs', endpoints: 4, auth: 'Customer', methods: ['GET', 'POST', 'DELETE'] },
    { title: 'Cart APIs', endpoints: 5, auth: 'Customer', methods: ['GET', 'POST', 'PUT', 'DELETE'] },
    { title: 'Permissions APIs', endpoints: 6, auth: 'Super Admin', methods: ['GET', 'POST', 'PUT', 'DELETE'] },
  ];

  const perfCards = [
    { title: 'Lazy Loading', desc: 'JPA entity fetch strategies and React route-based code splitting reduce initial bundle size.' },
    { title: 'Pagination', desc: 'Spring Data Pageable queries limit database query overhead and conserve memory.' },
    { title: 'Optimized SQL', desc: 'Explicit JPQL queries and database indexing avoid N+1 select queries.' },
    { title: 'Efficient JPA', desc: 'Hibernate second-level cache readiness and entity graph overrides for fast queries.' },
    { title: 'Caching Strategy', desc: 'In-memory client caching with TanStack Query and HTTP Cache-Control headers.' },
    { title: 'Code Splitting', desc: 'Dynamic imports with React.lazy split UI components into optimized chunks.' },
    { title: 'Memoization', desc: 'React.useMemo and useCallback hooks prevent unnecessary component re-renders.' },
    { title: 'Image Optimization', desc: 'Responsive image srcsets and CDN delivery ensure rapid visual asset rendering.' },
  ];

  return (
    <section className="space-y-12">
      {/* SECTION 8: Development Standards */}
      <div className="space-y-6">
        <div className="border-b border-app pb-4">
          <h2 className="text-2xl font-black text-app-primary tracking-tight">
            Development Standards & Practices
          </h2>
          <p className="text-xs text-app-secondary mt-1">
            Enterprise software craftsmanship principles ensuring codebase maintainability, clean separation, and quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {devStandards.map((std, idx) => (
            <div key={idx} className="p-4 bg-app-card rounded-2xl border border-app shadow-xs space-y-2">
              <div className="font-bold text-xs text-app-primary flex items-center gap-2">
                <CheckCircle2 size={14} className="text-[var(--vynk-brand)]" />
                {std.name}
              </div>
              <p className="text-[11px] text-app-secondary leading-relaxed">{std.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 9: DevOps Pipeline Horizontal Flow */}
      <div className="space-y-6">
        <div className="border-b border-app pb-4">
          <h2 className="text-2xl font-black text-app-primary tracking-tight">
            DevOps & CI/CD Pipeline
          </h2>
          <p className="text-xs text-app-secondary mt-1">
            Automated delivery pipeline executing builds, unit tests, containerization, and cloud deployment.
          </p>
        </div>

        <div className="p-6 bg-app-card rounded-2xl border border-app shadow-xs space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 items-center">
            {devOpsPipeline.map((node, i) => (
              <div key={i} className="p-3 rounded-xl bg-app-surface border border-app flex flex-col items-center text-center space-y-2 hover:border-[var(--vynk-brand)] transition-colors">
                <div className="p-2 rounded-lg bg-app-card border border-app text-[var(--vynk-brand)]">
                  {node.icon}
                </div>
                <div className="text-xs font-bold text-app-primary">{node.name}</div>
                <div className="text-[9px] text-app-secondary">{node.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 10: API Showcase */}
      <div className="space-y-6">
        <div className="border-b border-app pb-4">
          <h2 className="text-2xl font-black text-app-primary tracking-tight">
            API Showcase
          </h2>
          <p className="text-xs text-app-secondary mt-1">
            11 REST API endpoint controllers providing full CRUD coverage across all commerce domains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {apiShowcase.map((api, idx) => (
            <div key={idx} className="p-5 bg-app-card rounded-2xl border border-app shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-app-primary">{api.title}</h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[var(--vynk-brand)]/10 text-[var(--vynk-brand)] border border-[var(--vynk-brand)]/20">
                  {api.endpoints} Endpoints
                </span>
              </div>
              <div className="text-xs text-app-secondary">
                <span className="font-semibold text-app-primary">Access:</span> {api.auth}
              </div>
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-app">
                {api.methods.map((m, mIdx) => (
                  <span
                    key={mIdx}
                    className={`text-[9px] font-mono font-extrabold px-2 py-0.5 rounded ${
                      m === 'GET'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : m === 'POST'
                        ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400'
                        : m === 'PUT' || m === 'PATCH'
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                        : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'
                    }`}
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 11: Performance Optimization */}
      <div className="space-y-6">
        <div className="border-b border-app pb-4">
          <h2 className="text-2xl font-black text-app-primary tracking-tight">
            Performance Optimization Strategies
          </h2>
          <p className="text-xs text-app-secondary mt-1">
            Database, server, and client-side performance engineering patterns ensuring sub-second response times.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {perfCards.map((c, idx) => (
            <div key={idx} className="p-5 bg-app-card rounded-2xl border border-app shadow-xs space-y-2">
              <div className="font-bold text-sm text-app-primary flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                {c.title}
              </div>
              <p className="text-xs text-app-secondary leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
