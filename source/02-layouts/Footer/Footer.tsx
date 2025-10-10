import SvgTaLogo from '@/source/01-global/icon/icons/TaLogo';
import clsx from 'clsx';
import { ConstrainComponent } from 'gesso';
import { JSX } from 'react';
import Constrain from '../Constrain/Constrain';
import styles from './footer.module.css';

interface FooterProps extends ConstrainComponent {
  tagline?: string;
}

function Footer({
  hasConstrain = true,
  modifierClasses,
  constrainClasses,
  tagline,
}: FooterProps): JSX.Element {
  return (
    <footer
      className={clsx(styles.wrapper, modifierClasses)}
      role="contentinfo"
    >
      <Constrain isHidden={!hasConstrain} modifierClasses={constrainClasses}>
        <div className={styles.inner}>
          <div className={styles.left}>
            <SvgTaLogo modifierClasses={styles.logo} />
            <p className={styles.tagline}>{tagline}</p>
          </div>
        </div>
      </Constrain>
    </footer>
  );
}

export default Footer;
export type { FooterProps };
