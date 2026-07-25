export type ThemeMode = 'light' | 'dark';

export interface SemanticToken {
  id: string;
  name: string;
  lightMode: string;
  darkMode: string;
  usage: string;
  category: 'surface' | 'border' | 'typography' | 'interactive' | 'status';
}

export interface ColorScaleItem {
  shade: number; // 100, 200, 300 ... 900
  hex: string;
  name: string;
}

export interface PaletteFamily {
  id: string;
  name: string;
  description: string;
  shades: ColorScaleItem[];
}

export interface TypographyToken {
  id: string;
  name: string;
  px: number;
  rem: string;
  lineHeightPx: number;
  lineHeightRem: string;
  weight: number;
  weightLabel: string;
  usage: string;
  cssRule: string;
  tailwindClass: string;
}

export interface SpacingToken {
  name: string;
  alias: string; // 3xs, 2xs, xs, sm, md, lg, xl, 2xl
  px: number;
  rem: string;
  usage: string;
}

export interface BreakpointToken {
  id: string;
  name: string;
  device: string;
  widthPx: number;
  columns: number;
  gutterPx: number;
  marginPx: number;
  usage: string;
}

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ComponentState = 'default' | 'hover' | 'focused' | 'pressed' | 'disabled' | 'loading';

export interface ButtonConfig {
  variant: ButtonVariant;
  size: ButtonSize;
  state: ComponentState;
  hasLeftIcon: boolean;
  hasRightIcon: boolean;
  label: string;
}

export type InputState = 'default' | 'focused' | 'invalid' | 'disabled';

export interface InputConfig {
  label: string;
  placeholder: string;
  helperText: string;
  state: InputState;
  hasPrefixIcon: boolean;
  prefixText?: string;
  hasSuffixIcon: boolean;
  suffixType?: 'icon' | 'clear' | 'none';
  value: string;
}

export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

export interface AlertConfig {
  variant: AlertVariant;
  title: string;
  message: string;
  dismissible: boolean;
}

export interface ToastItem {
  id: string;
  variant: AlertVariant;
  title: string;
  message: string;
  timestamp: string;
}

export interface ModalConfig {
  isOpen: boolean;
  title: string;
  bodyText: string;
  showFooter: boolean;
  primaryActionText: string;
  secondaryActionText: string;
}

export type ActiveSection = 
  | 'color-palette'
  | 'typography'
  | 'spacing'
  | 'breakpoints'
  | 'buttons'
  | 'form-controls'
  | 'feedback'
  | 'figma-specs'
  | 'exporter';
