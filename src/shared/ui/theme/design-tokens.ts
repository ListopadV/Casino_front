

export const designTokens = {
  colors: {
    // Основные цвета
    primary: {
      red: {
        50: '#FEF2F2',
        100: '#FEE2E2',
        200: '#FECACA',
        300: '#FCA5A5',
        400: '#F87171',
        500: '#EF4444',
        600: '#DC2626',
        700: '#B91C1C',
        800: '#991B1B',
        900: '#7F1D1D',
        950: '#450A0A',
      },
      black: {
        50: '#F8FAFC',
        100: '#F1F5F9',
        200: '#E2E8F0',
        300: '#CBD5E1',
        400: '#94A3B8',
        500: '#64748B',
        600: '#475569',
        700: '#334155',
        800: '#1E293B',
        900: '#0F172A',
        950: '#020617',
      }
    },
    
    // Семантические цвета
    semantic: {
      error: '#EF4444',
      success: '#10B981',
      warning: '#F59E0B',
      info: '#3B82F6',
    },
    
    // Брендовые цвета (из компонентов)
    brand: {
      accentRed: '#D82E30',
      accentRedAlt: '#D82D30',
      darkGray: '#1a1a1a',
      mediumGray: '#212121',
      gray: '#404040',
      lightGray: '#FEFEFE',
      white: '#FFFFFF',
      black: '#000000',
    },
    
    // Прозрачные цвета
    transparent: {
      black: {
        10: 'rgba(0, 0, 0, 0.1)',
        20: 'rgba(0, 0, 0, 0.2)',
        30: 'rgba(0, 0, 0, 0.3)',
        50: 'rgba(0, 0, 0, 0.5)',
        60: 'rgba(0, 0, 0, 0.6)',
        70: 'rgba(0, 0, 0, 0.7)',
        80: 'rgba(0, 0, 0, 0.8)',
        90: 'rgba(0, 0, 0, 0.9)',
      },
      red: {
        50: 'rgba(239, 68, 68, 0.5)',
        65: 'rgba(239, 68, 68, 0.65)',
      },
      white: {
        70: 'rgba(255, 255, 255, 0.7)',
      }
    }
  },
  
  // Шрифты
  fonts: {
    primary: 'Bebas_Neue',
    secondary: 'Roboto',
    accent: 'Rajdhani',
    display: 'Anton',
    mono: 'Geist_Mono',
    sans: 'Geist',
  },
  
  // Размеры шрифтов
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
    '9xl': '8rem',
  },
  
  // Веса шрифтов
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  
  // Межстрочные интервалы
  lineHeight: {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },
  
  // Межбуквенные интервалы
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  }
};

