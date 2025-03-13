import { ReactNode } from 'react';
import styles from './poster.module.css';

interface PosterProps {
  image: ReactNode;
}

function Poster({ image }: PosterProps): JSX.Element {
  return <div className={styles.poster}>{image}</div>;
}

export default Poster;
