import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Compass, 
  BarChart3, 
  Sparkles, 
  Layers, 
  Server, 
  Cpu, 
  ShieldCheck, 
  Code2, 
  Database, 
  Cloud 
} from 'lucide-react';

export const SystemSpecsAndRoadmap: React.FC = () => {
  const specsGrouped = [
    {
      category: 'Frontend Specification',
      icon: <Code2 className="w-4 h-4 text-sky-500" />,
      items: [
        { label: 'Framework', val: 'React 18.2' },
        { label: 'Language', val: 'TypeScript 5.0' },
        { label: 'Bundler', val: 'Vite 5' },
        { label: 'Styling', val: 'Tailwind CSS v4' },
      ],
    },
    {
      category: 'Backend Specification',
      icon: <Server className="w-4 h-4 text-indigo-500" />,
      items: [
        { label: 'Runtime', val: 'Java 17 LTS' },
        { label: 'Framework', val: 'Spring Boot 3.2' },
        { label: 'Security', val: 'Spring Security 6' },
        { label: 'Persistence', val: 'Spring Data JPA / Hibernate' },
      ],
    },
    {
      category: 'Database Specification',
      icon: <Database className="w-4 h-4 text-blue-500" />,
      items: [
        { label: 'Engine', val: 'PostgreSQL 15' },
        { label: 'Migration', val: 'Flyway SQL Versioning' },
        { label: 'Pooling', val: 'HikariCP Connection Pool' },
        { label: 'Format', val: '3NF Relational' },
      ],
    },
    {
      category: 'Security Specification',
      icon: <ShieldCheck className="w-4 h-4 text-amber-500" />,
      items: [
        { label: 'Auth Token', val: 'JWT (HMAC-SHA256)' },
        { label: 'Password Hash', val: 'BCrypt (Cost 12)' },
        { label: 'Access Model', val: 'Dynamic RBAC Matrix' },
        { label: 'Protection', val: 'Method Guard @PreAuthorize' },
      ],
    },
    {
      category: 'Testing Specification',
      icon: <Cpu className="w-4 h-4 text-rose-500" />,
      items: [
        { label: 'Unit Tests', val: 'JUnit 5 & Vitest' },
        { label: 'Mocking', val: 'Mockito & MockMvc' },
        { label: 'E2E Testing', val: 'Playwright Framework' },
        { label: 'Coverage Target', val: '> 85% Code Coverage' },
      ],
    },
    {
      category: 'Deployment Specification',
      icon: <Cloud className="w-4 h-4 text-[var(--vynk-brand)]" />,
      items: [
        { label: 'Container', val: 'Docker Multi-Stage' },
        { label: 'Orchestration', val: 'Docker Compose' },
        { label: 'CI/CD', val: 'GitHub Actions Automated Workflow' },
        { label: 'Target Platform', val: 'Cloud Native Runtime' },
      ],
    },
  ];

  const metrics = [
    { label: 'Lines of Code', val: '35,000+' },
    { label: 'Java Classes', val: '180+' },
    { label: 'REST APIs', val: '40+' },
    { label: 'Database Tables', val: '25+' },
    { label: 'React Components', val: '120+' },
    { label: 'Git Commits', val: '350+' },
    { label: 'Flyway Migrations', val: '18+' },
    { label: 'Permissions Evaluated', val: '24+' },
    { label: 'User Roles', val: '4' },
    { label: 'Supported Languages', val: '6' },
  ];

  const roadmapPhases = [
    {
      phase: 'Completed',
      statusColor: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
      items: [
        'Spring Boot 3 Enterprise Core Architecture',
        'React 18 SPA Frontend with Tailwind CSS',
        'Stateless JWT Authentication & Refresh Token Rotation',
        'Granular RBAC Security Matrix (SUPER_ADMIN, ADMIN, SELLER, CUSTOMER)',
        'PostgreSQL Database Schema & Flyway Versioning',
        'Docker Multi-Stage Containerization',
      ],
    },
    {
      phase: 'Current Phase',
      statusColor: 'text-sky-500 bg-sky-500/10 border-sky-500/20',
      icon: <Clock className="w-4 h-4 text-sky-500" />,
      items: [
        'Advanced Query Optimization & Index Tuning',
        'Internationalization Dictionary & RTL Engine',
        'E2E Test Suites Expansion with Playwright',
        'Seller Order Fulfillment Workflow',
      ],
    },
    {
      phase: 'Upcoming Phase',
      statusColor: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
      icon: <Sparkles className="w-4 h-4 text-amber-500" />,
      items: [
        'Automated PDF Invoice Generation Engine',
        'Merchant Real-time Analytics Dashboard',
        'Webhook Event Notification Dispatcher',
        'Multi-currency Conversion Middleware',
      ],
    },
    {
      phase: 'Future Architecture Expansion',
      statusColor: 'text-purple-500 bg-purple-500/10 border-purple-500/20',
      icon: <Compass className="w-4 h-4 text-purple-500" />,
      items: [
        'Redis Distributed Caching Layer',
        'Apache Kafka Event Streaming for Order Events',
        'ElasticSearch Full-Text Product Indexing',
        'WebSockets Real-Time Notification Gateway',
        'Microservices Decomposition Strategy',
        'Kubernetes Cluster Deployment Setup',
        'OpenTelemetry & Prometheus Monitoring',
      ],
    },
  ];

  return (
    <section className="space-y-12">
      {/* SECTION 12: System Specifications */}
      <div className="space-y-6">
        <div className="border-b border-app pb-4">
          <h2 className="text-2xl font-black text-app-primary tracking-tight">
            System Specifications
          </h2>
          <p className="text-xs text-app-secondary mt-1">
            Grouped technical specifications defining the exact platform runtime and software constraints.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specsGrouped.map((s, idx) => (
            <div key={idx} className="p-5 bg-app-card rounded-2xl border border-app shadow-xs space-y-3">
              <div className="flex items-center gap-2 font-bold text-sm text-app-primary border-b border-app pb-2">
                <div className="p-1.5 rounded-lg bg-app-surface border border-app">
                  {s.icon}
                </div>
                <span>{s.category}</span>
              </div>
              <div className="space-y-2">
                {s.items.map((item, iIdx) => (
                  <div key={iIdx} className="flex items-center justify-between text-xs">
                    <span className="text-app-secondary">{item.label}</span>
                    <span className="font-bold font-mono text-app-primary">{item.val}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 13: Project Metrics */}
      <div className="space-y-6">
        <div className="border-b border-app pb-4">
          <h2 className="text-2xl font-black text-app-primary tracking-tight">
            Project Metrics
          </h2>
          <p className="text-xs text-app-secondary mt-1">
            Key engineering scale statistics reflecting codebase volume and implementation breadth.
          </p>
        </div>

        <div className="p-6 bg-slate-950 text-white rounded-3xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs font-bold font-mono uppercase tracking-widest text-[var(--vynk-brand)]">
              Engineering Scale Metrics
            </span>
            <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
              Verified Production Metrics
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {metrics.map((m, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 space-y-1 text-center">
                <div className="text-2xl font-black text-[var(--vynk-brand)] font-mono">{m.val}</div>
                <div className="text-[11px] font-semibold text-slate-300 leading-tight">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 14: Roadmap */}
      <div className="space-y-6">
        <div className="border-b border-app pb-4">
          <h2 className="text-2xl font-black text-app-primary tracking-tight">
            Platform Architectural Roadmap
          </h2>
          <p className="text-xs text-app-secondary mt-1">
            Completed milestones, active engineering priorities, and future scale expansions (Redis, Kafka, ElasticSearch, WebSockets, K8s).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roadmapPhases.map((r, idx) => (
            <div key={idx} className="p-6 bg-app-card rounded-2xl border border-app shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-app pb-3">
                <div className="flex items-center gap-2 font-bold text-sm text-app-primary">
                  {r.icon}
                  <span>{r.phase}</span>
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${r.statusColor}`}>
                  {r.phase}
                </span>
              </div>

              <ul className="space-y-2">
                {r.items.map((item, iIdx) => (
                  <li key={iIdx} className="flex items-start gap-2 text-xs text-app-secondary leading-snug">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--vynk-brand)] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
