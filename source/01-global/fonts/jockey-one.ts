import { Jockey_One as JockeyOne } from 'next/font/google';

const jockeyOne = JockeyOne({
  display: 'auto',
  subsets: ['latin'],
  weight: '400',
  fallback: ['Arial', 'sans-serif'],
  variable: '--font-family-heading',
});

export default jockeyOne;
