import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { ActiveSection } from '../../types';
import {
  Palette,
  Type,
  Grid,
  Monitor,
  MousePointer,
  FormInput,
  Bell,
  Figma,
  Code2,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface SidebarItem {
  id: ActiveSection;
  label: string;
  icon: React.ElementType;
  badge?: string;
}

interface SidebarGroup {
  title: string;
  items: SidebarItem[];
}

export const Sidebar: React.FC = () => {
  const { activeSection, setActiveSection, setIsExporterOpen } = useTheme();

  const groups: SidebarGroup[] = [
    {
      title: 'FOUNDATIONS',
      items: [
        { id: 'color-palette', label: 'Color Tokens & 100–900', icon: Palette, badge: 'Tokens' },
        { id: 'typography', label: 'Typography Scale', icon: Type, badge: 'Inter' },
        { id: 'spacing', label: 'Spacing & 8pt Grid', icon: Grid, badge: '8pt' },
        { id: 'breakpoints', label: 'Breakpoint Layouts', icon: Monitor, badge: '3 Frames' },
      ],
    },
    {
      title: 'CORE COMPONENT MATRIX',
      items: [
        { id: 'buttons', label: 'Buttons (Variants & States)', icon: MousePointer, badge: '5 Variants' },
        { id: 'form-controls', label: 'Form Controls & Inputs', icon: FormInput, badge: 'Slots' },
        { id: 'feedback', label: 'Modals, Alerts & Toasts', icon: Bell, badge: '3 Types' },
      ],
    },
    {
      title: 'SPECIFICATIONS & EXPORT',
      items: [
        { id: 'figma-specs', label: 'Figma Auto Layout Specs', icon: Figma, badge: 'Auto Layout' },
        { id: 'exporter', label: 'Token Exporter (JSON/CSS)', icon: Code2, badge: 'Export' },
      ],
    },
  ];

  const handleSelect = (id: ActiveSection) => {
    if (id === 'exporter') {
      setIsExporterOpen(true);
    } else {
      setActiveSection(id);
    }
  };

  return (
    <aside className="w-full lg:w-72 shrink-0 border-r border-[var(--border-default)] bg-[var(--bg-surface-raised)]/60 p-4 flex flex-col gap-6">
      {/* Overview Banner */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-br from-indigo-500/10 via-indigo-500/5 to-transparent border border-indigo-500/20">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-1">
          <Sparkles className="w-3.5 h-3.5" /> Token Architecture
        </div>
        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
          Design system foundation powered by 8pt spatial grid, semantic color tokens, and complete Figma auto-layout specs.
        </p>
      </div>

      {/* Navigation Sections */}
      <div className="flex flex-col gap-6">
        {groups.map((group) => (
          <div key={group.title} className="flex flex-col gap-1.5">
            <h2 className="px-3 text-[11px] font-bold tracking-wider text-[var(--text-secondary)] uppercase">
              {group.title}
            </h2>
            <div className="flex flex-col gap-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-semibold'
                        : 'text-[var(--text-primary)] hover:bg-[var(--bg-surface)] hover:text-indigo-600 dark:hover:text-indigo-400'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-[var(--text-secondary)]'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.badge && (
                      <span
                        className={`px-1.5 py-0.5 text-[10px] font-mono rounded-md ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-[var(--border-default)] text-[var(--text-secondary)]'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};
