import React from 'react';
import { 
  Workflow, 
  FolderTree, 
  ArrowRight, 
  ArrowDown, 
  ShieldCheck, 
  Key, 
  Terminal, 
  Cpu, 
  Database, 
  CheckCircle2, 
  FileCode 
} from 'lucide-react';

export const RequestLifecycleAndPackages: React.FC = () => {
  const lifecycleSteps = [
    { step: '1', title: 'Client Request', desc: 'React SPA sends HTTPS REST request with Auth Header', icon: <Terminal size={14} /> },
    { step: '2', title: 'Security Chain', desc: 'Spring Security Filter Chain intercepts incoming request', icon: <ShieldCheck size={14} /> },
    { step: '3', title: 'JWT Filter', desc: 'JWT Authentication Filter parses bearer token & context', icon: <Key size={14} /> },
    { step: '4', title: 'Controller', desc: 'Spring @RestController maps endpoint & validates DTO', icon: <FileCode size={14} /> },
    { step: '5', title: 'Service', desc: '@Service applies business rules & transaction boundaries', icon: <Cpu size={14} /> },
    { step: '6', title: 'Repository', desc: 'Spring Data JPA executes repository methods', icon: <Database size={14} /> },
    { step: '7', title: 'Hibernate ORM', desc: 'Hibernate translates JPQL to native SQL query', icon: <Workflow size={14} /> },
    { step: '8', title: 'PostgreSQL DB', desc: 'Database returns result set over JDBC pool', icon: <Database size={14} /> },
    { step: '9', title: 'Response DTO', desc: 'MapStruct formats entity into clean Response DTO', icon: <CheckCircle2 size={14} /> },
  ];

  const packages = [
    { path: 'com.vynk.backend', type: 'root', desc: 'Root package containing Spring Boot Application entry point' },
    { path: '├── auth', type: 'module', desc: 'Authentication, token issuance, refresh rotation, login/logout' },
    { path: '├── user', type: 'module', desc: 'User profiles, role assignments, account credentials' },
    { path: '├── product', type: 'module', desc: 'Product catalog, SKU management, search specifications' },
    { path: '├── category', type: 'module', desc: 'Category hierarchy, parent-child relationships, slugs' },
    { path: '├── order', type: 'module', desc: 'Order status state machine, checkout, order items' },
    { path: '├── payment', type: 'module', desc: 'Payment gateways, transaction logs, refund webhooks' },
    { path: '├── shipping', type: 'module', desc: 'Shipping carriers, tracking numbers, dispatch status' },
    { path: '├── review', type: 'module', desc: 'Product ratings, comments, buyer verification' },
    { path: '├── wishlist', type: 'module', desc: 'Customer saved items, back-in-stock indicators' },
    { path: '├── cart', type: 'module', desc: 'Active shopping carts, line items, stock validation' },
    { path: '├── inventory', type: 'module', desc: 'Stock allocation, low-stock alerts, warehouse updates' },
    { path: '├── analytics', type: 'module', desc: 'Platform KPIs, sales conversion, revenue charts' },
    { path: '├── common', type: 'core', desc: 'Shared cross-cutting concerns & framework utilities' },
    { path: '│   ├── config', type: 'sub', desc: 'Spring Beans, CORS, OpenAPI, Jackson JSON mapper configs' },
    { path: '│   ├── security', type: 'sub', desc: 'JWT TokenProvider, UserDetailsService, AuthFilter, RBAC' },
    { path: '│   ├── exception', type: 'sub', desc: '@ControllerAdvice, ResourceNotFoundException, GlobalHandler' },
    { path: '│   ├── dto', type: 'sub', desc: 'Generic ApiResponse envelope, ErrorDetails, PageResponse' },
    { path: '│   └── util', type: 'sub', desc: 'SlugGenerator, DateUtils, PasswordHashUtils' },
    { path: '└── localization', type: 'module', desc: 'Multi-language message bundles & translation mappings' },
  ];

  return (
    <section className="space-y-8">
      {/* Backend Request Lifecycle */}
      <div className="p-6 bg-app-card rounded-2xl border border-app shadow-xs space-y-6">
        <div className="border-b border-app pb-3 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-app-primary flex items-center gap-2">
              <Workflow className="text-[var(--vynk-brand)] w-5 h-5" />
              Backend Request Lifecycle
            </h3>
            <p className="text-xs text-app-secondary mt-0.5">
              Sequence of execution for every HTTP request passing through the Spring Security Filter Chain to PostgreSQL persistence.
            </p>
          </div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--vynk-brand)] bg-[var(--vynk-brand)]/10 px-2.5 py-1 rounded-full border border-[var(--vynk-brand)]/20">
            End-to-End Execution Flow
          </span>
        </div>

        {/* Lifecycle Flow Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-9 gap-2">
          {lifecycleSteps.map((s, idx) => (
            <div key={idx} className="relative flex flex-col justify-between p-3 rounded-xl bg-app-surface border border-app hover:border-[var(--vynk-brand)]/40 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="w-5 h-5 rounded-full bg-[var(--vynk-brand)]/10 text-[var(--vynk-brand)] font-mono font-bold text-[10px] flex items-center justify-center">
                  {s.step}
                </span>
                <div className="text-app-muted">{s.icon}</div>
              </div>
              <div>
                <div className="font-bold text-xs text-app-primary leading-snug">{s.title}</div>
                <div className="text-[10px] text-app-secondary leading-tight mt-1">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Package-level Overview */}
      <div className="p-6 bg-app-card rounded-2xl border border-app shadow-xs space-y-6">
        <div className="border-b border-app pb-3 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-app-primary flex items-center gap-2">
              <FolderTree className="text-indigo-600 dark:text-indigo-400 w-5 h-5" />
              Spring Boot Architecture (Package-Level Structure)
            </h3>
            <p className="text-xs text-app-secondary mt-0.5">
              Domain-driven package layout ensuring strict encapsulation, feature isolation, and enterprise scalability.
            </p>
          </div>
          <span className="text-[10px] font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20">
            Java Package Hierarchy
          </span>
        </div>

        <div className="p-4 bg-slate-950 text-slate-100 rounded-xl border border-slate-800 font-mono text-xs overflow-x-auto space-y-1">
          {packages.map((pkg, idx) => (
            <div key={idx} className="flex items-center justify-between py-1 border-b border-slate-900/60 hover:bg-slate-900/50 px-2 rounded transition-colors">
              <span className={`font-semibold ${pkg.type === 'root' ? 'text-[var(--vynk-brand)] font-bold' : pkg.type === 'core' ? 'text-indigo-400 font-bold' : pkg.type === 'sub' ? 'text-sky-300' : 'text-slate-200'}`}>
                {pkg.path}
              </span>
              <span className="text-[10px] text-slate-400 pl-4 text-right shrink-0 truncate max-w-xs sm:max-w-md">
                {pkg.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
