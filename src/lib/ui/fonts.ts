import localFont from 'next/font/local';

export const Wayfinder = localFont({
  src: [
    {
      path: '../../assets/fonts/Wayfinder/Wayfinder-Thin.woff2',
      style: 'normal',
      weight: '400',
    },
    {
      path: '../../assets/fonts/Wayfinder/Wayfinder-ThinItalic.woff2',
      style: 'italic',
      weight: '400',
    },
  ],
  display: 'swap',
  preload: true,
  variable: '--font-wayfinder',
});
