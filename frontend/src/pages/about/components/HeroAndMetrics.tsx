import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Server, 
  Database, 
  ShieldCheck, 
  Cpu, 
  Code2, 
  Container, 
  Key, 
  FileCode, 
  Layers 
} from 'lucide-react';

interface StatProps {
  label: string;
  value: number;
  suffix?: string;
  subtext: string;
  icon: React.ReactNode;
}

const AnimatedCounter: React.FC<StatProps> = ({ label, value, suffix = '', subtext, icon }) => {
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200; // ms
    const increment = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="p-5 bg-app-card rounded-2xl border border-app shadow-xs hover:border-[var(--vynk-brand)]/40 hover:shadow-md transition-all group">
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 rounded-xl bg-[var(--vynk-brand)]/10 text-[var(--vynk-brand)] flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
          {icon}
        </div>
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-app-muted bg-app-surface px-2 py-0.5 rounded-md border border-app">
          Verified
        </span>
      </div>
      <div className="text-3xl font-black text-app-primary tracking-tight font-mono">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-xs font-bold text-app-primary mt-1">{label}</div>
      <p className="text-[11px] text-app-secondary mt-0.5 leading-snug">{subtext}</p>
    </div>
  );
};

export const HeroAndMetrics: React.FC = () => {
  const stats = [
    { label: '40+ REST APIs', value: 40, suffix: '+', subtext: 'Production HTTP endpoints', icon: <Server size={20} /> },
    { label: '25+ Database Tables', value: 25, suffix: '+', subtext: 'PostgreSQL normalized schema', icon: <Database size={20} /> },
    { label: 'JWT Authentication', value: 100, suffix: '%', subtext: 'Stateless access & refresh tokens', icon: <Key size={20} /> },
    { label: 'RBAC Security', value: 4, suffix: ' Roles', subtext: 'SUPER_ADMIN, ADMIN, SELLER, CUSTOMER', icon: <ShieldCheck size={20} /> },
    { label: 'PostgreSQL 15', value: 15, suffix: ' DB', subtext: 'ACID compliant relational engine', icon: <Layers size={20} /> },
    { label: 'Spring Boot 3', value: 3, suffix: '.x', subtext: 'Enterprise Java framework core', icon: <Cpu size={20} /> },
    { label: 'React 18 Architecture', value: 18, suffix: '.x', subtext: 'Type-safe component hierarchy', icon: <Code2 size={20} /> },
    { label: 'Docker Containerized', value: 100, suffix: '%', subtext: 'Cloud Native & CI/CD deployment', icon: <Container size={20} /> },
  ];

  return (
    <section className="space-y-10">
      {/* Hero Title Block */}
      <div className="text-center space-y-4 max-w-4xl mx-auto pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--vynk-brand)]/10 text-[var(--vynk-brand)] text-xs font-extrabold tracking-wide uppercase border border-[var(--vynk-brand)]/20 shadow-xs">
          <Zap className="w-3.5 h-3.5" /> Enterprise Technical Architecture Specification
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-app-primary tracking-tight leading-none">
          Vynk Enterprise Commerce Platform
        </h1>

        <p className="text-sm sm:text-base text-app-secondary max-w-3xl mx-auto leading-relaxed font-normal">
          A production-ready enterprise commerce platform engineered with Java Spring Boot microservice principles, modern React architecture, secure authentication, intelligent role-based access control, and cloud-native deployment strategies.
        </p>
      </div>

      {/* Grid of Animated Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((s, idx) => (
          <AnimatedCounter
            key={idx}
            label={s.label}
            value={s.value}
            suffix={s.suffix}
            subtext={s.subtext}
            icon={s.icon}
          />
        ))}
      </div>
    </section>
  );
};
