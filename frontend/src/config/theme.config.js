/**
 * Global Theme Configuration
 * Centralized theme variables for scalable modular application development.
 */

export const themeConfig = {
  colors: {
    navyDark: '#172554',
    bluePrimary: '#3B82F6',
    blueRoyal: '#1E40AF',
    blueHighlight: '#BFDBFE',
    backgroundLight: '#EFF6FF',
    cardLight: '#FFFFFF',
    textDark: '#0B1329',
    textMuted: '#475569',
    borderLight: '#E2E8F0',
  },
  fonts: {
    display: "'DM Serif Display', serif",
    body: "'DM Sans', sans-serif",
  },
  spacing: {
    sectionPadding: 'px-6 py-20 md:px-12 lg:px-20 xl:px-32',
    containerNarrow: 'max-w-6xl mx-auto',
  },
  gradients: {
    primary: 'linear-gradient(135deg, #172554 0%, #1E40AF 50%, #3B82F6 100%)',
    heroOverlay: 'linear-gradient(to bottom, rgba(23, 37, 84, 0.80), rgba(23, 37, 84, 0.94))',
    cardHover: 'linear-gradient(180deg, #FFFFFF 0%, #EFF6FF 100%)',
  },
  shadows: {
    brand: '0 10px 40px -12px rgba(59, 130, 246, 0.35)',
    card: '0 4px 24px -4px rgba(23, 37, 84, 0.08)',
  }
};

export default themeConfig;
