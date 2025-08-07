import { createTheme } from '@mui/material/styles';

// Light Theme with Dark Items
const THEME_COLORS = {
  primary: '#1976D2', // Professional blue
  secondary: '#42A5F5', // Light blue
  accent: '#FF6600', // Orange accent
  error: '#F44336',
  warning: '#FF9800',
  info: '#2196F3',
  success: '#4CAF50',
  background: {
    main: '#ffffff', // Light main background
    light: '#f8f9fa', // Very light background for sections
    paper: '#ffffff', // White for cards and surfaces
    card: '#f8f9fa', // Light card background
    cardLight: '#ffffff', // White for contrast
  },
  surface: {
    main: '#ffffff',
    light: '#f8f9fa',
    lighter: '#e9ecef',
    lightest: '#dee2e6',
  },
  text: {
    primary: '#212529', // Dark text on light backgrounds
    secondary: '#495057', // Medium dark gray for secondary text
    lightPrimary: '#212529', // Dark text on light backgrounds
    lightSecondary: '#6c757d', // Medium gray for secondary text
  },
  divider: '#dee2e6', // Light dividers
};

// Dark Theme colors for better contrast on dark backgrounds
const DARK_THEME_COLORS = {
  primary: '#90caf9', // Light blue
  secondary: '#ffb74d', // Light orange
  accent: '#ff8a65', // Soft orange accent
  error: '#ef5350',
  warning: '#ffb74d',
  info: '#64b5f6',
  success: '#81c784',
  background: {
    main: '#121212', // Dark main background
    light: '#1e1e1e', // Slightly lighter for sections
    paper: '#1e1e1e', // Dark paper for cards
    card: '#2c2c2c', // Dark card background
    cardLight: '#383838', // Lighter card for hover
  },
  surface: {
    main: '#121212',
    light: '#1e1e1e',
    lighter: '#2c2c2c',
    lightest: '#383838',
  },
  text: {
    primary: '#e0e0e0', // Light text on dark backgrounds
    secondary: '#b0b0b0', // Medium light gray for secondary text
    lightPrimary: '#ffffff', // White text for emphasis
    lightSecondary: '#cccccc', // Light gray for secondary emphasis
  },
  divider: '#444444', // Dark dividers
};

const theme = createTheme({
  palette: {
    mode: 'light', // Default to light mode
    primary: {
      main: THEME_COLORS.primary,
      light: THEME_COLORS.secondary,
      dark: '#1565C0',
    },
    secondary: {
      main: THEME_COLORS.accent,
      light: '#FF8833',
      dark: '#CC5200',
    },
    error: {
      main: THEME_COLORS.error,
    },
    warning: {
      main: THEME_COLORS.warning,
    },
    info: {
      main: THEME_COLORS.info,
    },
    success: {
      main: THEME_COLORS.success,
    },
    background: {
      default: THEME_COLORS.background.main,
      paper: THEME_COLORS.background.paper,
    },
    text: {
      primary: THEME_COLORS.text.primary,
      secondary: THEME_COLORS.text.secondary,
    },
    divider: THEME_COLORS.divider,
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      color: THEME_COLORS.primary,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      color: THEME_COLORS.primary,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: THEME_COLORS.text.primary,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: THEME_COLORS.text.primary,
    },
    body1: {
      fontSize: '1rem',
      color: THEME_COLORS.text.primary,
    },
    body2: {
      fontSize: '0.875rem',
      color: THEME_COLORS.text.secondary,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          transition: 'box-shadow 0.3s ease',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
  },
});

export default theme;
