import React from 'react';
import { HelpCircle, Mail, Shield, FileText, Info } from 'lucide-react';

export const AboutPage: React.FC = () => (
  <div className="max-w-4xl mx-auto py-12 px-4 space-y-6">
    <div className="flex items-center gap-3">
      <Info className="w-8 h-8 text-brand" />
      <h1 className="text-3xl font-black text-content-primary">About CommerceHub</h1>
    </div>
    <p className="text-sm text-content-secondary leading-relaxed">
      CommerceHub is an enterprise-grade multi-tenant e-commerce platform engineered with React, TypeScript, and Spring Boot.
      Designed with SOLID architecture, strict RBAC authorization, multi-currency pricing, and real-time order processing.
    </p>
  </div>
);

export const ContactPage: React.FC = () => (
  <div className="max-w-4xl mx-auto py-12 px-4 space-y-6">
    <div className="flex items-center gap-3">
      <Mail className="w-8 h-8 text-brand" />
      <h1 className="text-3xl font-black text-content-primary">Contact Support</h1>
    </div>
    <p className="text-sm text-content-secondary">
      Reach our enterprise support engineering team 24/7 at <span className="font-bold text-brand">support@commercehub.com</span>.
    </p>
  </div>
);

export const FAQPage: React.FC = () => (
  <div className="max-w-4xl mx-auto py-12 px-4 space-y-6">
    <div className="flex items-center gap-3">
      <HelpCircle className="w-8 h-8 text-brand" />
      <h1 className="text-3xl font-black text-content-primary">Frequently Asked Questions</h1>
    </div>
    <div className="space-y-4">
      <div className="p-4 bg-surface border border-border rounded-xl">
        <h3 className="font-bold text-sm text-content-primary">How do I track my shipment?</h3>
        <p className="text-xs text-content-secondary mt-1">Navigate to Customer Dashboard &gt; Orders &gt; Track Shipment.</p>
      </div>
      <div className="p-4 bg-surface border border-border rounded-xl">
        <h3 className="font-bold text-sm text-content-primary">What payment methods are supported?</h3>
        <p className="text-xs text-content-secondary mt-1">Stripe, Credit Cards, PayPal, and Bank Wire transfers.</p>
      </div>
    </div>
  </div>
);

export const PrivacyPage: React.FC = () => (
  <div className="max-w-4xl mx-auto py-12 px-4 space-y-6">
    <div className="flex items-center gap-3">
      <Shield className="w-8 h-8 text-brand" />
      <h1 className="text-3xl font-black text-content-primary">Privacy Policy</h1>
    </div>
    <p className="text-sm text-content-secondary leading-relaxed">
      CommerceHub respects user data privacy and complies with GDPR & CCPA frameworks. JWT authentication tokens are encrypted at rest.
    </p>
  </div>
);

export const TermsPage: React.FC = () => (
  <div className="max-w-4xl mx-auto py-12 px-4 space-y-6">
    <div className="flex items-center gap-3">
      <FileText className="w-8 h-8 text-brand" />
      <h1 className="text-3xl font-black text-content-primary">Terms of Service</h1>
    </div>
    <p className="text-sm text-content-secondary leading-relaxed">
      By utilizing the CommerceHub marketplace platform, merchants and buyers agree to standard transaction terms and acceptable security practices.
    </p>
  </div>
);
