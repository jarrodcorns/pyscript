import { MD3LightTheme, type MD3Theme } from 'react-native-paper';

export const colors = {
  forest: '#0F382C',
  forestSoft: '#1D5142',
  moss: '#4F7567',
  mint: '#DDF1E8',
  cream: '#FAF8F5',
  paper: '#FFFFFF',
  gold: '#C96E22',
  goldSoft: '#F9E4D1',
  ink: '#18312A',
  muted: '#66756F',
  line: '#DCE5E1',
  danger: '#A6403A',
  dangerSoft: '#F8E4E2',
} as const;

export const theme: MD3Theme = {
  ...MD3LightTheme,
  roundness: 5,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.forest,
    onPrimary: colors.paper,
    primaryContainer: colors.mint,
    onPrimaryContainer: colors.ink,
    secondary: colors.gold,
    onSecondary: colors.paper,
    secondaryContainer: colors.goldSoft,
    onSecondaryContainer: colors.ink,
    background: colors.cream,
    onBackground: colors.ink,
    surface: colors.paper,
    onSurface: colors.ink,
    surfaceVariant: '#EEF3F0',
    onSurfaceVariant: colors.muted,
    outline: colors.line,
    error: colors.danger,
    errorContainer: colors.dangerSoft,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;
