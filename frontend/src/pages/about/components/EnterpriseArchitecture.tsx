import React from 'react';
import { 
  ArrowDown, 
  ArrowRight, 
  Code2, 
  Globe, 
  ShieldCheck, 
  Briefcase, 
  Database, 
  Layers, 
  Server, 
  Cpu, 
  CheckCircle2 
} from 'lucide-react';

export const EnterpriseArchitecture: React.FC = () => {
  const diagramNodes = [
    { title: 'React Frontend', desc: 'Type-Safe Single Page Application', icon: <Code2 className="w-5 h-5 text-sky-500" />, color: 'border-sky-500/30 bg-sky-500/5' },
    { title: 'REST API', desc: 'JSON Response Contracts', icon: <Globe className="w-5 h-5 text-indigo-500" />, color: 'border-indigo-500/30 bg-indigo-500/5' },
    { title: 'Spring Boot Backend', desc: 'Java 17 Microservice Engine', icon: <Server className="w-5 h-5 text-purple-500" />, color: 'border-purple-500/30 bg-purple-500/5' },
    { title: 'Spring Security', desc: 'JWT & Filter Chain Gatekeeper', icon: <ShieldCheck className="w-5 h-5 text-amber-500" />, color: 'border-amber-500/30 bg-amber-500/5' },
    { title: 'Service Layer', desc: '@Transactional Business Rules', icon: <Briefcase className="w-5 h-5 text-emerald-500" />, color: 'border-emerald-500/30 bg-emerald-500/5' },
    { title: 'JPA Repository Layer', desc: 'Spring Data JPA Data Access', icon: <Cpu className="w-5 h-5 text-[var(--vynk-brand)]" />, color: 'border-[var(--vynk-brand)]/30 bg-[var(--vynk-brand)]/5' },
    { title: 'Hibernate', desc: 'Object-Relational Mapping (ORM)', icon: <Layers className="w-5 h-5 text-rose-500" />, color: 'border-rose-500/30 bg-rose-500/5' },
    { title: 'PostgreSQL Database', desc: 'ACID Relational Storage & Flyway', icon: <Database className="w-5 h-5 text-blue-500" />, color: 'border-blue-500/30 bg-blue-500/5' },
  ];

  const layersDetail = [
    {
      name: 'React Layer',
      icon: <Code2 className="w-4 h-4 text-sky-500" />,
      desc: 'Client-side interface rendered via React 18 and Vite with full state hydration.',
      points: ['Reusable UI Components', 'Custom React Hooks', 'Strict TypeScript Type Safety', 'Responsive Tailwind UI'],
    },
    {
      name: 'API Layer',
      icon: <Globe className="w-4 h-4 text-indigo-500" />,
      desc: 'RESTful API controllers managing payload envelopes, HTTP status, and validation.',
      points: ['Standardized REST APIs', 'Explicit HTTP Status Codes', 'Clean JSON Responses', 'DTO Payload Validation'],
    },
    {
      name: 'Security Layer',
      icon: <ShieldCheck className="w-4 h-4 text-amber-500" />,
      desc: 'Stateful filter chain evaluating JWT signatures, expiration, and role credentials.',
      points: ['Stateless JWT Verification', 'Spring Security Filter Chain', 'Authentication Interceptors', 'Method-Level Authorization'],
    },
    {
      name: 'Business Layer',
      icon: <Briefcase className="w-4 h-4 text-emerald-500" />,
      desc: 'Encapsulated business logic, transactional boundaries, and domain rules.',
      points: ['Spring @Service Classes', 'ACID Transactions (@Transactional)', 'Domain Validation Rules', 'MapStruct DTO Mapping'],
    },
    {
      name: 'Repository Layer',
      icon: <Cpu className="w-4 h-4 text-[var(--vynk-brand)]" />,
      desc: 'Abstraction over persistence mechanisms provided by Spring Data JPA.',
      points: ['Spring Data JPA Repositories', 'Hibernate ORM Persistence', 'Custom JPQL & Native Queries', 'Optimized Pageable Queries'],
    },
    {
      name: 'Database Layer',
      icon: <Database className="w-4 h-4 text-blue-500" />,
      desc: 'PostgreSQL relational engine with Flyway SQL version control migrations.',
      points: ['PostgreSQL 15 Database', 'Flyway SQL Versioning', 'Relational Indexes & Keys', 'Audit Field Timestamps'],
    },
  ];

  return (
    <section className="space-y-8">
      <div className="border-b border-app pb-4">
        <h2 className="text-2xl font-black text-app-primary tracking-tight">
          Enterprise Architecture
        </h2>
        <p className="text-xs text-app-secondary mt-1">
          Multi-tiered software architecture decoupling client presentation, security filters, transactional services, and relational persistence.
        </p>
      </div>

      {/* Visual Flow Diagram */}
      <div className="p-6 bg-app-card rounded-2xl border border-app shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-app pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[var(--vynk-brand)]">
            System Tier Interconnection Diagram
          </span>
          <span className="text-[10px] font-mono text-app-muted bg-app-surface px-2 py-0.5 rounded border border-app">
            Sync / Async REST
          </span>
        </div>

        {/* Desktop Pipeline Horizontal Flow */}
        <div className="hidden lg:grid grid-cols-8 gap-2 items-center">
          {diagramNodes.map((node, i) => (
            <React.Fragment key={i}>
              <div className={`p-3 rounded-xl border ${node.color} flex flex-col items-center text-center space-y-1.5 transition-all hover:scale-105`}>
                <div className="p-2 rounded-lg bg-app-card border border-app shadow-xs">
                  {node.icon}
                </div>
                <div className="text-[11px] font-bold text-app-primary leading-tight">{node.title}</div>
                <div className="text-[9px] text-app-secondary leading-none">{node.desc}</div>
              </div>
              {i < diagramNodes.length - 1 && (
                <div className="flex items-center justify-center text-app-muted">
                  <ArrowRight size={14} className="animate-pulse" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Mobile / Tablet Vertical Pipeline Flow */}
        <div className="lg:hidden flex flex-col space-y-3">
          {diagramNodes.map((node, i) => (
            <React.Fragment key={i}>
              <div className={`p-3.5 rounded-xl border ${node.color} flex items-center gap-3`}>
                <div className="p-2 rounded-lg bg-app-card border border-app shrink-0">
                  {node.icon}
                </div>
                <div>
                  <div className="text-xs font-bold text-app-primary">{node.title}</div>
                  <div className="text-[10px] text-app-secondary">{node.desc}</div>
                </div>
              </div>
              {i < diagramNodes.length - 1 && (
                <div className="flex justify-center text-app-muted py-0.5">
                  <ArrowDown size={14} />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Grid Explaining Each Layer */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {layersDetail.map((layer, idx) => (
          <div key={idx} className="p-5 bg-app-card rounded-2xl border border-app shadow-xs space-y-3">
            <div className="flex items-center gap-2 font-bold text-sm text-app-primary">
              <div className="p-1.5 rounded-lg bg-app-surface border border-app">
                {layer.icon}
              </div>
              <span>{layer.name}</span>
            </div>
            <p className="text-xs text-app-secondary leading-relaxed">{layer.desc}</p>
            <ul className="space-y-1.5 pt-2 border-t border-app">
              {layer.points.map((pt, pIdx) => (
                <li key={pIdx} className="flex items-center gap-2 text-xs text-app-primary">
                  <CheckCircle2 size={12} className="text-[var(--vynk-brand)] shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};
