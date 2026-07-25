import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import {
  Figma,
  Layers,
  Copy,
  Check,
  Box,
  Layout,
  Sparkles,
} from 'lucide-react';

export const FigmaSpecsSection: React.FC = () => {
  const { addToast } = useTheme();

  const specs = [
    {
      component: 'Button Component',
      autoLayout: 'Horizontal Stack | Gap: 8px (2xs) | Align: Center',
      padding: 'Small (32px h): py: 6px, px: 12px | Medium (40px h): py: 10px, px: 16px | Large (48px h): py: 12px, px: 20px',
      radius: 'Small: 8px (rounded-lg) | Medium: 12px (rounded-xl) | Large: 16px (rounded-2xl)',
      properties: [
        'Variant (Primary, Secondary, Outline, Ghost, Destructive)',
        'Size (Small 32px, Medium 40px, Large 48px)',
        'State (Default, Hover, Focused, Pressed, Disabled, Loading)',
        'Boolean: Left Icon (hasLeftIcon)',
        'Boolean: Right Icon (hasRightIcon)',
        'Text: Button Label',
      ],
    },
    {
      component: 'Form Input Control',
      autoLayout: 'Vertical Stack | Gap: 6px (xs) | Alignment: Fill Container',
      padding: 'Container py: 10px, px: 14px | Prefix/Suffix Offset: 12px',
      radius: '12px (rounded-xl) | Focus Stroke Offset: 2px / Ring: 4px',
      properties: [
        'State (Default, Focused, Invalid, Disabled)',
        'Text: Label',
        'Text: Placeholder',
        'Text: Helper / Error Text',
        'Slot Instance: Prefix Icon / Text',
        'Slot Instance: Suffix Icon / Clear Button',
      ],
    },
    {
      component: 'Alert Callout Container',
      autoLayout: 'Horizontal Stack | Gap: 14px (sm) | Padding: 16px (sm)',
      padding: 'py: 16px, px: 16px | Border: 1px subtle matching status hex',
      radius: '16px (rounded-2xl)',
      properties: [
        'Variant (Info, Success, Warning, Error)',
        'Text: Title',
        'Text: Message Copy',
        'Boolean: Dismissible (hasCloseButton)',
      ],
    },
    {
      component: 'Modal Overlay Container',
      autoLayout: 'Vertical Stack | Fixed Header (48px h) + Scrollable Content + Sticky Footer (64px h)',
      padding: 'Header px: 20px, py: 16px | Body px: 24px, py: 20px | Footer px: 20px, py: 16px',
      radius: '24px (rounded-3xl) | Drop Shadow: 0 25px 50px -12px rgba(0,0,0,0.25)',
      properties: [
        'Boolean: IsOpen',
        'Text: Header Title',
        'Text: Body Content',
        'Boolean: ShowFooter',
        'Text: Primary Action Label',
        'Text: Secondary Action Label',
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      {/* Title & Introduction */}
      <div>
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider mb-2">
          Design System Specification
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--text-primary)]">
          Figma Auto Layout & Component Property Specs
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-2 max-w-3xl leading-relaxed">
          Structural documentation aligning Figma Auto Layout padding, gaps, corner radii, and component variants with production React / Tailwind CSS properties.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {specs.map((item) => (
          <div
            key={item.component}
            className="p-6 rounded-2xl border border-[var(--border-default)] bg-[var(--bg-surface)] shadow-sm flex flex-col gap-4"
          >
            <div className="flex items-center justify-between border-b border-[var(--border-default)] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                  <Figma className="w-4 h-4" />
                </div>
                <h2 className="text-base font-bold text-[var(--text-primary)]">
                  {item.component}
                </h2>
              </div>
              <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-2.5 py-1 rounded-md border border-indigo-200 dark:border-indigo-800 font-bold">
                Figma Ready
              </span>
            </div>

            <div className="flex flex-col gap-3 text-xs">
              <div>
                <span className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider block mb-0.5">
                  Auto Layout Frame
                </span>
                <p className="font-mono text-[var(--text-primary)] bg-[var(--bg-surface-raised)] p-2 rounded-lg border border-[var(--border-default)]">
                  {item.autoLayout}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider block mb-0.5">
                  Padding Math Specification
                </span>
                <p className="font-mono text-[var(--text-primary)] bg-[var(--bg-surface-raised)] p-2 rounded-lg border border-[var(--border-default)]">
                  {item.padding}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider block mb-0.5">
                  Corner Radius & Border Rules
                </span>
                <p className="font-mono text-[var(--text-primary)] bg-[var(--bg-surface-raised)] p-2 rounded-lg border border-[var(--border-default)]">
                  {item.radius}
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-[var(--text-secondary)] uppercase tracking-wider block mb-1">
                  Component Properties Matrix
                </span>
                <ul className="space-y-1 list-disc pl-4 text-[var(--text-primary)] font-mono text-[11px]">
                  {item.properties.map((prop, i) => (
                    <li key={i}>{prop}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
