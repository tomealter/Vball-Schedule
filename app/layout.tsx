import '../source/00-config/index.css';

import jockeyOne from '@/source/01-global/fonts/jockey-one';
import robotoCondensed from '@/source/01-global/fonts/roboto-condensed';
import clsx from 'clsx';
import { JSX, PropsWithChildren } from 'react';
import '../source/01-global/index.css';
import SiteContainer from '../source/02-layouts/SiteContainer/SiteContainer';
import BackToTop from '../source/03-components/BackToTop/BackToTop';
import Skiplink from '../source/03-components/Skiplink/Skiplink';
import '../source/06-utility/index.css';

function RootLayout({ children }: PropsWithChildren): JSX.Element {
  return (
    <html
      lang="en"
      className={clsx(robotoCondensed.variable, jockeyOne.variable)}
    >
      <body id="top">
        <Skiplink />
        <SiteContainer>{children}</SiteContainer>
        <BackToTop text="Back to Top" topElement="top" />
      </body>
    </html>
  );
}

export default RootLayout;
