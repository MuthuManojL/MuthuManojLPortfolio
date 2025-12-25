/**
 * Design Tokens for Futuristic Portfolio
 * Light and Dark theme palettes with semantic color mapping
 */

export const lightTokens = {
  // Background & Surface with sophisticated gradient-ready palette
  background: "#f8fafc",
  surface: "#ffffff",
  surface_dim: "#f1f5f9",
  surface_bright: "#ffffff",

  // Text & Foreground - Enhanced contrast for accessibility (WCAG AA+)
  foreground: "#0b1220",
  text_primary: "#0b1220",
  text_secondary: "#374151",
  text_tertiary: "#6b7280",

  // Brand Colors - Vibrant for light theme
  primary: "#6C5CE7", // Purple-violet
  primary_light: "#a78bfa",
  primary_dark: "#5a4bbf",

  secondary: "#EC4899", // Hot pink/magenta
  secondary_light: "#f472b6",
  secondary_dark: "#be185d",

  accent: "#00C2D1", // Cyan - vibrant
  accent_light: "#22d3ee",
  accent_dark: "#0891b2",

  // Additional neon accent colors
  neon_cyan: "#00C2D1",
  neon_violet: "#6C5CE7",
  neon_magenta: "#EC4899",
  neon_yellow: "#FBBF24",
  neon_green: "#10b981",

  // States
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
  info: "#3b82f6",

  // Borders with subtle color tint
  border: "#e5d7f0",
  border_light: "#f3e8f7",
  border_dark: "#d8bff0",

  // Sophisticated gradients for light theme
  gradient_primary: "linear-gradient(135deg, #6C5CE7 0%, #EC4899 100%)",
  gradient_secondary: "linear-gradient(135deg, #EC4899 0%, #FBBF24 100%)",
  gradient_accent: "linear-gradient(135deg, #00C2D1 0%, #6C5CE7 100%)",
  gradient_warm: "linear-gradient(135deg, #FBBF24 0%, #EC4899 100%)",
  gradient_cool: "linear-gradient(135deg, #00C2D1 0%, #10b981 100%)",
  gradient_hero: "linear-gradient(135deg, #E8FFFD 0%, #F3E9FF 50%, #FFF6FB 100%)",
  gradient_radial: "radial-gradient(circle at 50% 50%, #6C5CE715, transparent 60%)",
  gradient_card: "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(251,249,255,0.95) 100%)",
  gradient_surface: "linear-gradient(180deg, rgba(107,92,231,0.04) 0%, rgba(0,194,209,0.02) 100%)",

  // Shadows - refined for light theme depth
  shadow_sm: "0 2px 8px rgba(107, 92, 231, 0.12)",
  shadow_md: "0 6px 20px rgba(107, 92, 231, 0.15)",
  shadow_lg: "0 12px 32px rgba(107, 92, 231, 0.18)",
  shadow_xl: "0 20px 48px rgba(107, 92, 231, 0.22)",

  // Glow effects - softer for light theme
  glow_primary: "0 0 24px rgba(108, 92, 231, 0.3)",
  glow_accent: "0 0 24px rgba(0, 194, 209, 0.3)",
  glow_magenta: "0 0 24px rgba(236, 72, 153, 0.3)",
};

export const darkTokens = {
  // Background & Surface
  background: "#0a0e27",
  surface: "#1a1f3a",
  surface_dim: "#0f1427",
  surface_bright: "#252d4a",

  // Text & Foreground
  foreground: "#f8f9fa",
  text_primary: "#f8f9fa",
  text_secondary: "#b8bcc8",
  text_tertiary: "#7a7f92",

  // Brand Colors
  primary: "#818cf8", // Indigo (lighter for dark mode)
  primary_light: "#a5b4fc",
  primary_dark: "#6366f1",

  secondary: "#c4b5fd", // Violet (lighter)
  secondary_light: "#ddd6fe",
  secondary_dark: "#a78bfa",

  accent: "#22d3ee", // Cyan (lighter)
  accent_light: "#67e8f9",
  accent_dark: "#06b6d4",

  // States
  success: "#34d399",
  warning: "#fbbf24",
  error: "#f87171",
  info: "#60a5fa",

  // Borders & Dividers
  border: "#2d3748",
  border_light: "#374151",
  border_dark: "#1f2937",

  // Gradients
  gradient_primary: "linear-gradient(135deg, #818cf8 0%, #c4b5fd 100%)",
  gradient_secondary: "linear-gradient(135deg, #c4b5fd 0%, #f472b6 100%)",
  gradient_accent: "linear-gradient(135deg, #22d3ee 0%, #06b6d4 100%)",
  gradient_warm: "linear-gradient(135deg, #fbbf24 0%, #f87171 100%)",
  gradient_cool: "linear-gradient(135deg, #22d3ee 0%, #34d399 100%)",
  gradient_hero: "linear-gradient(135deg, #0f1427 0%, #1a1f3a 50%, #0f1427 100%)",
  gradient_radial: "radial-gradient(circle at 50% 50%, #818cf815, transparent 60%)",
  gradient_card: "linear-gradient(180deg, rgba(26,31,58,0.95) 0%, rgba(15,20,39,0.95) 100%)",
  gradient_surface: "linear-gradient(180deg, rgba(129,140,248,0.08) 0%, rgba(34,211,238,0.04) 100%)",

  // Shadows (more subtle in dark mode)
  shadow_sm: "0 1px 2px 0 rgba(0, 0, 0, 0.3)",
  shadow_md: "0 4px 6px -1px rgba(0, 0, 0, 0.4)",
  shadow_lg: "0 10px 15px -3px rgba(0, 0, 0, 0.5)",
  shadow_xl: "0 20px 25px -5px rgba(0, 0, 0, 0.6)",

  // Glow effects (enhanced in dark)
  glow_primary: "0 0 30px rgba(129, 140, 248, 0.5)",
  glow_accent: "0 0 30px rgba(34, 211, 238, 0.5)",
  glow_magenta: "0 0 30px rgba(244, 114, 182, 0.5)",

  // Additional neon accent colors
  neon_cyan: "#22d3ee",
  neon_violet: "#818cf8",
  neon_magenta: "#f472b6",
  neon_yellow: "#fbbf24",
  neon_green: "#34d399",
};

export type ThemeTokens = typeof lightTokens;

// Animation tokens
export const animationTokens = {
  duration: {
    fast: "150ms",
    normal: "250ms",
    slow: "350ms",
    slower: "500ms",
  },
  easing: {
    easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
    easeOut: "cubic-bezier(0, 0, 0.2, 1)",
    easeIn: "cubic-bezier(0.4, 0, 1, 1)",
    spring: "cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  },
};

// Typography tokens
export const typographyTokens = {
  // Headings
  display_lg: {
    fontSize: "3.5rem",
    fontWeight: 700,
    lineHeight: "1.2",
    letterSpacing: "-0.02em",
  },
  display_md: {
    fontSize: "2.8rem",
    fontWeight: 700,
    lineHeight: "1.25",
    letterSpacing: "-0.015em",
  },
  heading_xl: {
    fontSize: "2.2rem",
    fontWeight: 600,
    lineHeight: "1.3",
    letterSpacing: "-0.01em",
  },
  heading_lg: {
    fontSize: "1.875rem",
    fontWeight: 600,
    lineHeight: "1.35",
  },
  heading_md: {
    fontSize: "1.5rem",
    fontWeight: 600,
    lineHeight: "1.4",
  },
  heading_sm: {
    fontSize: "1.25rem",
    fontWeight: 600,
    lineHeight: "1.4",
  },

  // Body text
  body_lg: {
    fontSize: "1.125rem",
    fontWeight: 400,
    lineHeight: "1.6",
  },
  body_md: {
    fontSize: "1rem",
    fontWeight: 400,
    lineHeight: "1.6",
  },
  body_sm: {
    fontSize: "0.875rem",
    fontWeight: 400,
    lineHeight: "1.5",
  },

  // Captions
  caption: {
    fontSize: "0.75rem",
    fontWeight: 500,
    lineHeight: "1.4",
    letterSpacing: "0.01em",
  },
};

// Breakpoints
export const breakpoints = {
  xs: "320px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};
