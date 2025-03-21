import clsx from 'clsx';
import { GessoComponent } from 'gesso';
import { JSX, ReactNode } from 'react';
import styles from './figure.module.css';

interface FigureProps extends GessoComponent {
  media: ReactNode;
  caption?: ReactNode;
}

function Figure({ media, caption, modifierClasses }: FigureProps): JSX.Element {
  return (
    <figure className={clsx(styles.figure, modifierClasses)}>
      <div>{media}</div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}

export default Figure;
export type { FigureProps };
