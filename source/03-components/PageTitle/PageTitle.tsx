import Constrain from '@/source/02-layouts/Constrain/Constrain';
import clsx from 'clsx';
import { GessoComponent } from 'gesso';
import { JSX, ReactNode } from 'react';
import styles from './page-title.module.css';

interface PageTitleProps extends GessoComponent {
  pageTitle: ReactNode;
  subTitle?: ReactNode;
}

function PageTitle({
  pageTitle,
  subTitle,
  modifierClasses,
}: PageTitleProps): JSX.Element {
  return (
    <div className={clsx(styles['page-title'], modifierClasses)}>
      <Constrain>
        <div className={styles.inner}>
          <h1 className={styles.title}>{pageTitle}</h1>
          {subTitle && <div className={styles.subtitle}>{subTitle}</div>}
        </div>
      </Constrain>
    </div>
  );
}

export default PageTitle;
export type { PageTitleProps };
