import { Roboto_Condensed as RobotoCondensed } from 'next/font/google';

const robotoCondensed = RobotoCondensed({
  display: 'auto',
  subsets: ['latin'],
  weight: 'variable',
  fallback: ['Arial', 'sans-serif'],
  variable: '--font-family-primary',
});

export default robotoCondensed;
