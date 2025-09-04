import { Anton, Bebas_Neue, Geist, Geist_Mono, Rajdhani, Roboto } from 'next/font/google';

export const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas-neue'
});

export const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto'
});

export const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-rajdhani'
});

export const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-anton'
});

export const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist'
});

export const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono'
});

// CSS переменные для использования в CSS
export const fontVariables = {
  '--font-bebas-neue': bebasNeue.style.fontFamily,
  '--font-roboto': roboto.style.fontFamily,
  '--font-rajdhani': rajdhani.style.fontFamily,
  '--font-anton': anton.style.fontFamily,
  '--font-geist': geistSans.style.fontFamily,
  '--font-geist-mono': geistMono.style.fontFamily,
};
