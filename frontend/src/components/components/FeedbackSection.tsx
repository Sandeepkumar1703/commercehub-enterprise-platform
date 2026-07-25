import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { AlertVariant, ModalConfig } from '../../types';
import {
  Bell,
  Info,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  X,
  Sparkles,
  Sliders,
  Maximize2,
  Send,
  Layers,
} from 'lucide-react';

export const FeedbackSection: React.FC = () => {
  const { addToast } = useTheme();

  // Modal Interactive Sandbox state
  const [modalConfig, setModalConfig] = useState<ModalConfig>({
    isOpen: false,
    title: 'Confirm System Deployment',
    bodyText: 'Deploying updated design token specifications will immediately sync CSS custom variables across all connected micro-frontends and product component libraries.',
    showFooter: true,
    primaryActionText: 'Proceed Deployment',
    secondaryActionText: 'Cancel & Review',
  });

  const alerts: { variant: AlertVariant; title: string; message: string }[] = [
    {
      variant: 'info',
      title: 'Design System v2.4 Spec Available',
      message: 'New spatial grid tokens and component property definitions have been synced with Figma libraries.',
    },
    {
      variant: 'success',
      title: 'Token Exports Generated Successfully',
      message: 'All CSS variables and Tailwind theme maps were compiled without validation warnings.',
    },
    {
      variant: 'warning',
      title: 'Deprecated Hardcoded Hex Detected',
      message: 'Component #14 uses raw #6366f1 instead of var(--brand-primary). Update before production build.',
    },
    {
      variant: 'error',
      title: 'WCAG Contrast Ratio Check Failed',
      message: 'Foreground color #94a3b8 on white background achieves 2.8:1 contrast (minimum 4.5:1 required).',
    },
  ];

  const triggerLiveToast = (variant: AlertVariant) => {
    const titles = {
      info: 'Information Toast Triggered',
      success: 'Operation Completed',
      warning: 'Attention Needed',
      error: 'System Exception',
    };
    const messages = {
      info: 'Tokens updated in runtime memory.',
      success: 'Component properties verified successfully.',
      warning: 'Memory usage approaching threshold.',
      error: 'Failed to establish WebSocket connection.',
    };
    addToast(titles[variant], messages[variant], variant);
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Title & Introduction */}
      <div>
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-2">
          Core Component Matrix
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">
          Feedback & Overlays (Alerts, Modals & Toasts)
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-3xl leading-relaxed">
          Interactive feedback overlays supporting 4 status alert variants with subtle border accents, fixed header scrolling modals with sticky action bars, and live toast notification queues.
        </p>
      </div>

      {/* Alert Variants Grid */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-[var(--text-primary)]">
          Alert Component Variants
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {alerts.map((alert) => {
            const iconMap = {
              info: <Info className="w-5 h-5 text-blue-500 shrink-0" />,
              success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
              warning: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
              error: <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />,
            };

            const bgMap = {
              info: 'bg-blue-50/80 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100',
              success: 'bg-emerald-50/80 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100',
              warning: 'bg-amber-50/80 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-100',
              error: 'bg-red-50/80 dark:bg-red-950/50 border-red-200 dark:border-red-800 text-red-900 dark:text-red-100',
            };

            return (
              <div
                key={alert.variant}
                className={`p-4 rounded-2xl border flex items-start gap-3.5 transition-all shadow-xs ${bgMap[alert.variant]}`}
              >
                {iconMap[alert.variant]}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-bold capitalize">{alert.title}</h3>
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold bg-white/50 dark:bg-black/30">
                      {alert.variant}
                    </span>
                  </div>
                  <p className="text-xs mt-1 leading-relaxed opacity-90">{alert.message}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Toast Trigger Workbench */}
      <div className="p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] shadow-sm flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-[var(--border-default)] pb-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Bell className="w-3.5 h-3.5" /> Toast Notification Launcher
            </div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              Interactive Toast Queue Generator
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Click buttons to launch floating toast notifications with auto-dismissal and stack management.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => triggerLiveToast('info')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white font-semibold text-xs shadow-sm hover:bg-blue-700 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            Launch Info Toast
          </button>

          <button
            onClick={() => triggerLiveToast('success')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs shadow-sm hover:bg-emerald-700 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            Launch Success Toast
          </button>

          <button
            onClick={() => triggerLiveToast('warning')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 text-white font-semibold text-xs shadow-sm hover:bg-amber-700 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            Launch Warning Toast
          </button>

          <button
            onClick={() => triggerLiveToast('error')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 text-white font-semibold text-xs shadow-sm hover:bg-red-700 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
            Launch Error Toast
          </button>
        </div>
      </div>

      {/* Modal Dialog Interactive Sandbox */}
      <div className="p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] shadow-sm flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-[var(--border-default)] pb-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Layers className="w-3.5 h-3.5" /> Overlay Specification
            </div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              Modal Spec (Fixed Header, Scrolling Body & Sticky Action Bar)
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Modals feature standard fixed header with close button, scrollable content area, and sticky bottom footer.
            </p>
          </div>

          <button
            onClick={() => setModalConfig({ ...modalConfig, isOpen: true })}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs shadow-md shadow-indigo-600/20 hover:bg-indigo-700 transition-all"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            Open Sample Modal
          </button>
        </div>

        {/* Inline Modal Preview Visualizer */}
        <div className="p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface-raised)] max-w-lg mx-auto w-full flex flex-col rounded-2xl overflow-hidden shadow-lg border border-[var(--border-default)]">
          {/* Modal Fixed Header */}
          <div className="p-4 bg-[var(--bg-surface)] border-b border-[var(--border-default)] flex items-center justify-between">
            <h3 className="text-sm font-bold text-[var(--text-primary)]">
              {modalConfig.title}
            </h3>
            <span className="p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
              <X className="w-4 h-4" />
            </span>
          </div>

          {/* Modal Body */}
          <div className="p-5 text-xs text-[var(--text-secondary)] leading-relaxed space-y-3 max-h-48 overflow-y-auto">
            <p>{modalConfig.bodyText}</p>
            <p className="text-[11px] font-mono bg-[var(--bg-surface)] p-2.5 rounded-lg border border-[var(--border-default)]">
              Auto Layout Spec: Fixed Header (px: 16px, py: 12px) | Body Gap: 12px | Sticky Footer (px: 16px, py: 12px)
            </p>
          </div>

          {/* Sticky Bottom Action Bar */}
          <div className="p-4 bg-[var(--bg-surface)] border-t border-[var(--border-default)] flex items-center justify-end gap-3">
            <button
              onClick={() => addToast('Modal Dismissed', 'Clicked cancel action', 'info')}
              className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-[var(--border-default)] text-[var(--text-primary)] hover:border-indigo-500"
            >
              {modalConfig.secondaryActionText}
            </button>
            <button
              onClick={() => addToast('Action Confirmed', 'Proceeded deployment', 'success')}
              className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-indigo-600 text-white shadow-sm hover:bg-indigo-700"
            >
              {modalConfig.primaryActionText}
            </button>
          </div>
        </div>
      </div>

      {/* Actual Live Modal Portal Overlay when Opened */}
      {modalConfig.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-[var(--bg-surface)] border border-[var(--border-default)] rounded-2xl max-w-lg w-full shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95">
            {/* Header */}
            <div className="p-4 sm:p-5 border-b border-[var(--border-default)] flex items-center justify-between">
              <h3 className="text-base font-bold text-[var(--text-primary)]">
                {modalConfig.title}
              </h3>
              <button
                onClick={() => setModalConfig({ ...modalConfig, isOpen: false })}
                className="p-1 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface-raised)] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrolling Body */}
            <div className="p-5 sm:p-6 text-sm text-[var(--text-secondary)] leading-relaxed space-y-4 max-h-[60vh] overflow-y-auto">
              <p>{modalConfig.bodyText}</p>
              <div className="p-4 rounded-xl bg-[var(--bg-surface-raised)] border border-[var(--border-default)] space-y-2">
                <span className="text-xs font-bold font-mono text-indigo-600 dark:text-indigo-400">
                  System Pre-flight Checks:
                </span>
                <ul className="text-xs space-y-1 list-disc pl-4 text-[var(--text-primary)] font-mono">
                  <li>Token schema validation: PASSED</li>
                  <li>WCAG AA contrast ratios: 100% PASSED</li>
                  <li>8pt spatial grid geometry: ALIGNED</li>
                </ul>
              </div>
            </div>

            {/* Sticky Action Footer */}
            <div className="p-4 sm:p-5 border-t border-[var(--border-default)] bg-[var(--bg-surface-raised)] flex items-center justify-end gap-3">
              <button
                onClick={() => setModalConfig({ ...modalConfig, isOpen: false })}
                className="px-4 py-2 text-xs font-semibold rounded-xl border border-[var(--border-default)] text-[var(--text-primary)] hover:border-indigo-500 bg-[var(--bg-surface)]"
              >
                {modalConfig.secondaryActionText}
              </button>
              <button
                onClick={() => {
                  setModalConfig({ ...modalConfig, isOpen: false });
                  addToast('Deployment Initiated', 'Tokens successfully broadcasted!', 'success');
                }}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 text-white shadow-md hover:bg-indigo-700"
              >
                {modalConfig.primaryActionText}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
