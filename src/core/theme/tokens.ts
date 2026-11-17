export const colors = {
  background: '#F7F5F2',
  surface: '#FFFFFF',
  text: '#1C1917',
  textMuted: '#78716C',
  border: '#E7E5E4',
  primary: '#0F766E',
  primaryText: '#FFFFFF',
  danger: '#B91C1C',
  secondary: '#E7E5E4',
  secondaryText: '#1C1917',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
} as const;

export const radii = {
  sm: 6,
  md: 12,
  lg: 20,
} as const;

export const typography = {
  title: 28,
  body: 16,
  caption: 13,
} as const;

export const theme = {
  colors,
  spacing,
  radii,
  typography,
} as const;

export type Theme = typeof theme;
