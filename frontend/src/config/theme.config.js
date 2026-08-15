/**
 * Global Theme Configuration
 * Centralized theme variables for scalable modular application development.
 */

export const themeConfig = {
  colors: {
    navyDark: '#0A2647',
    bluePrimary: '#144272',
    blueRoyal: '#205295',
    blueHighlight: '#2C74B3',
    backgroundLight: '#F4F7FA',
    cardLight: '#FFFFFF',
    textDark: '#0F172A',
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
    primary: 'linear-gradient(135deg, #144272 0%, #205295 50%, #2C74B3 100%)',
    heroOverlay: 'linear-gradient(to bottom, rgba(10, 38, 71, 0.75), rgba(10, 38, 71, 0.90))',
    cardHover: 'linear-gradient(180deg, #FFFFFF 0%, #F0F4F8 100%)',
  },
  shadows: {
    brand: '0 10px 40px -12px rgba(32, 82, 149, 0.35)',
    card: '0 4px 24px -4px rgba(10, 38, 71, 0.08)',
  }
};

export default themeConfig;
