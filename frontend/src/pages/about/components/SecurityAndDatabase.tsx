import React from 'react';
import { 
  ShieldCheck, 
  Key, 
  Lock, 
  Database, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  FileText, 
  ShieldAlert, 
  Server 
} from 'lucide-react';

export const SecurityAndDatabase: React.FC = () => {
  const authFlowSteps = [
    { title: 'User Login', desc: 'POST /api/auth/login with credentials' },
    { title: 'JWT Generation', desc: 'Spring Security creates HMAC256 token' },
    { title: 'Refresh Token', desc: 'Secure HttpOnly cookie rotation' },
    { title: 'Role Verification', desc: 'Granted Authorities mapping' },
    { title: 'Permission Validation', desc: '@PreAuthorize method guard' },
    { title: 'Protected API Access', desc: 'Authorized response dispatched' },
  ];

  const dbEntitiesFlow = [
    'Users', 'Roles', 'Permissions', 'Products', 'Categories', 
    'Orders', 'Payments', 'Reviews', 'Wishlist', 'Cart', 'Inventory'
  ];

  const dbPrinciples = [
    { name: '3NF Normalization', desc: 'Eliminates data redundancy and anomaly updates across all 25+ relational entities.' },
    { name: 'Foreign Key Constraints', desc: 'Enforces referential integrity on cascade deletes and relationship associations.' },
    { name: 'B-Tree Indexing', desc: 'Accelerates search queries on SKU, product titles, category IDs, and customer user IDs.' },
    { name: 'Audit Timestamps', desc: 'Every record contains base entity timestamps: createdAt, updatedAt, and createdBy.' },
    { name: 'Flyway Version Control', desc: 'Strict SQL migration files (V1__init.sql) executed automatically upon Spring Boot boot.' },
  ];

  return (
    <section className="space-y-10">
      {/* SECTION 5: Security Architecture */}
      <div className="space-y-6">
        <div className="border-b border-app pb-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-amber-600 dark:text-amber-400">
            <ShieldCheck size={16} /> Section 5
          </div>
          <h2 className="text-2xl font-black text-app-primary tracking-tight mt-1">
            Security Architecture
          </h2>
          <p className="text-xs text-app-secondary mt-1">
            End-to-end stateless security framework with Spring Security, JWT tokens, BCrypt hashing, and role/permission enforcement.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Authentication Flow Sequence */}
          <div className="p-6 bg-app-card rounded-2xl border border-app shadow-xs space-y-4">
            <h3 className="text-base font-bold text-app-primary flex items-center gap-2">
              <Key className="w-4 h-4 text-amber-500" />
              Authentication & Token Lifecycle
            </h3>

            <div className="space-y-2.5">
              {authFlowSteps.map((s, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-app-surface border border-app flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <div className="font-bold text-xs text-app-primary">{s.title}</div>
                    <div className="text-[10px] text-app-secondary">{s.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security Mechanisms */}
          <div className="p-6 bg-app-card rounded-2xl border border-app shadow-xs space-y-4">
            <h3 className="text-base font-bold text-app-primary flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-500" />
              Security Principles & Defenses
            </h3>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-app-surface border border-app space-y-1">
                <div className="font-bold text-xs text-app-primary flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  BCrypt Password Encryption
                </div>
                <p className="text-[11px] text-app-secondary">
                  Passwords salted and hashed using BCrypt Strength 12 prior to database storage.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-app-surface border border-app space-y-1">
                <div className="font-bold text-xs text-app-primary flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  Stateless CSRF & CORS Policy
                </div>
                <p className="text-[11px] text-app-secondary">
                  Stateless JWT design disables traditional CSRF attacks; strict domain origin matching controls cross-site requests.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-app-surface border border-app space-y-1">
                <div className="font-bold text-xs text-app-primary flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  Input Sanitization & Bean Validation
                </div>
                <p className="text-[11px] text-app-secondary">
                  JSR-380 validation (@NotNull, @Size, @Pattern) prevents SQL injection and malformed payload injection.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-app-surface border border-app space-y-1">
                <div className="font-bold text-xs text-app-primary flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  Global Exception Interception
                </div>
                <p className="text-[11px] text-app-secondary">
                  Spring @ControllerAdvice catches unhandled runtime exceptions and returns sanitized JSON error envelopes without exposing stack traces.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 6: Database Architecture */}
      <div className="space-y-6">
        <div className="border-b border-app pb-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase text-blue-600 dark:text-blue-400">
            <Database size={16} /> Section 6
          </div>
          <h2 className="text-2xl font-black text-app-primary tracking-tight mt-1">
            Database Architecture (PostgreSQL)
          </h2>
          <p className="text-xs text-app-secondary mt-1">
            Enterprise PostgreSQL 15 database design featuring strict 3NF normalization, relational entity relationships, and Flyway migration versioning.
          </p>
        </div>

        {/* Entity Relationships Pipeline */}
        <div className="p-6 bg-app-card rounded-2xl border border-app shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-app pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Relational Entity Cascade Linkage
            </span>
            <span className="text-[10px] font-mono text-app-muted bg-app-surface px-2 py-0.5 rounded border border-app">
              1:1, 1:N & N:M Relations
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-2">
            {dbEntitiesFlow.map((entity, i) => (
              <React.Fragment key={i}>
                <div className="px-3 py-1.5 rounded-xl bg-app-surface border border-app font-mono font-bold text-xs text-app-primary flex items-center gap-1.5 shadow-2xs">
                  <Database size={12} className="text-blue-500" />
                  {entity}
                </div>
                {i < dbEntitiesFlow.length - 1 && (
                  <ArrowRight size={14} className="text-app-muted shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Database Principles Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dbPrinciples.map((p, idx) => (
            <div key={idx} className="p-4 bg-app-card rounded-2xl border border-app shadow-xs space-y-2">
              <div className="font-bold text-xs text-app-primary flex items-center gap-2">
                <Layers size={14} className="text-blue-500" />
                {p.name}
              </div>
              <p className="text-[11px] text-app-secondary leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
