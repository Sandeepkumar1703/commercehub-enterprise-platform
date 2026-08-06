import React from 'react';
import { 
  Code2, 
  Server, 
  Database, 
  Wrench, 
  TestTube, 
  Cloud 
} from 'lucide-react';

export const TechStackGrouped: React.FC = () => {
  const groups = [
    {
      title: 'Frontend Architecture',
      icon: <Code2 className="w-5 h-5 text-sky-500" />,
      bg: 'bg-sky-500/10',
      techs: [
        { name: 'React 18', desc: 'Component tree with Concurrent Rendering' },
        { name: 'TypeScript 5.x', desc: 'Strict static type validation & interfaces' },
        { name: 'Vite 5', desc: 'Ultra-fast ESM bundler & Hot Reload' },
        { name: 'Tailwind CSS v4', desc: 'Utility-first responsive styling framework' },
        { name: 'React Router v6', desc: 'Declarative routing & protected route guards' },
        { name: 'TanStack Query', desc: 'Server-state hydration & intelligent caching' },
        { name: 'React Hook Form', desc: 'High-performance form state & Zod validation' },
      ],
    },
    {
      title: 'Backend Ecosystem',
      icon: <Server className="w-5 h-5 text-indigo-500" />,
      bg: 'bg-indigo-500/10',
      techs: [
        { name: 'Java 17 LTS', desc: 'Modern long-term support Java runtime' },
        { name: 'Spring Boot 3', desc: 'Opinionated enterprise backend framework' },
        { name: 'Spring Security 6', desc: 'Stateless JWT & filter chain security' },
        { name: 'Spring Data JPA', desc: 'Data access abstraction layer over repositories' },
        { name: 'Hibernate ORM', desc: 'High-performance object-relational mapper' },
        { name: 'MapStruct', desc: 'Compile-time type-safe DTO mapper' },
        { name: 'Lombok', desc: 'Boilerplate reduction for getters/setters/builders' },
        { name: 'Bean Validation', desc: 'JSR-380 declarative payload constraints' },
      ],
    },
    {
      title: 'Database & Storage',
      icon: <Database className="w-5 h-5 text-blue-500" />,
      bg: 'bg-blue-500/10',
      techs: [
        { name: 'PostgreSQL 15', desc: 'Enterprise ACID-compliant relational database' },
        { name: 'Flyway Migration', desc: 'SQL schema version control & auto-execution' },
        { name: 'Redis (Future Ready)', desc: 'Distributed session & L2 query caching' },
      ],
    },
    {
      title: 'Development Tools',
      icon: <Wrench className="w-5 h-5 text-amber-500" />,
      bg: 'bg-amber-500/10',
      techs: [
        { name: 'Apache Maven', desc: 'Dependency management & lifecycle build tool' },
        { name: 'Git & GitHub', desc: 'Version control & pull request workflow' },
        { name: 'IntelliJ IDEA Ultimate', desc: 'Primary Java & Spring Boot IDE' },
        { name: 'VS Code', desc: 'Frontend TypeScript development' },
        { name: 'Postman', desc: 'API testing & environment variable collections' },
        { name: 'Swagger / OpenAPI 3', desc: 'Interactive live API documentation' },
      ],
    },
    {
      title: 'Testing & Quality Assurance',
      icon: <TestTube className="w-5 h-5 text-rose-500" />,
      bg: 'bg-rose-500/10',
      techs: [
        { name: 'JUnit 5', desc: 'Standard Java unit testing framework' },
        { name: 'Mockito', desc: 'Mocking framework for isolated service unit tests' },
        { name: 'MockMvc', desc: 'Spring Controller layer integration testing' },
        { name: 'Vitest', desc: 'Blazing fast React component unit test runner' },
        { name: 'Playwright', desc: 'End-to-End browser test automation suite' },
      ],
    },
    {
      title: 'Deployment & DevOps',
      icon: <Cloud className="w-5 h-5 text-[var(--vynk-brand)]" />,
      bg: 'bg-[var(--vynk-brand)]/10',
      techs: [
        { name: 'Docker', desc: 'Multi-stage containerization builds' },
        { name: 'Docker Compose', desc: 'Multi-container local stack orchestration' },
        { name: 'GitHub Actions', desc: 'Automated CI/CD build & test workflows' },
        { name: 'Linux Cloud Engine', desc: 'Cloud-native runtime container execution' },
      ],
    },
  ];

  return (
    <section className="space-y-6">
      <div className="border-b border-app pb-4">
        <h2 className="text-2xl font-black text-app-primary tracking-tight">
          Technology Stack
        </h2>
        <p className="text-xs text-app-secondary mt-1">
          Grouped toolchains engineered for high productivity, static safety, and containerized cloud readiness.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((grp, idx) => (
          <div key={idx} className="p-6 bg-app-card rounded-2xl border border-app shadow-xs space-y-4">
            <div className="flex items-center gap-3 border-b border-app pb-3">
              <div className={`p-2 rounded-xl ${grp.bg}`}>
                {grp.icon}
              </div>
              <h3 className="font-bold text-base text-app-primary">{grp.title}</h3>
            </div>

            <div className="space-y-2.5">
              {grp.techs.map((t, tIdx) => (
                <div key={tIdx} className="p-2.5 rounded-xl bg-app-surface border border-app flex items-start justify-between gap-2">
                  <div>
                    <div className="font-bold text-xs text-app-primary">{t.name}</div>
                    <div className="text-[10px] text-app-secondary mt-0.5">{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
