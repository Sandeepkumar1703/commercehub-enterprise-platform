import React from 'react';
import { HeroAndMetrics } from './components/HeroAndMetrics';
import { PlatformHighlights } from './components/PlatformHighlights';
import { EnterpriseArchitecture } from './components/EnterpriseArchitecture';
import { RequestLifecycleAndPackages } from './components/RequestLifecycleAndPackages';
import { TechStackGrouped } from './components/TechStackGrouped';
import { SecurityAndDatabase } from './components/SecurityAndDatabase';
import { ApplicationModules } from './components/ApplicationModules';
import { DevOpsAndApis } from './components/DevOpsAndApis';
import { SystemSpecsAndRoadmap } from './components/SystemSpecsAndRoadmap';

export const AboutVynk: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Section 1: Hero & Animated Stat Cards */}
      <HeroAndMetrics />

      {/* Section 2: Platform Highlights (8 Feature Cards) */}
      <PlatformHighlights />

      {/* Section 3: Enterprise Architecture & Diagram */}
      <EnterpriseArchitecture />

      {/* Section 3 Recommendation: Request Lifecycle & Package Structure */}
      <RequestLifecycleAndPackages />

      {/* Section 4: Technology Stack Grouped Categories */}
      <TechStackGrouped />

      {/* Section 5 & 6: Security Architecture & Database Architecture */}
      <SecurityAndDatabase />

      {/* Section 7: Application Modules (15 Enterprise Module Cards) */}
      <ApplicationModules />

      {/* Section 8, 9, 10, 11: Standards, DevOps, API Showcase, Performance */}
      <DevOpsAndApis />

      {/* Section 12, 13, 14: System Specifications, Metrics, Roadmap */}
      <SystemSpecsAndRoadmap />
    </div>
  );
};
