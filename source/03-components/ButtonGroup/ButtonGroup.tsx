import clsx from 'clsx';
import { GessoComponent } from 'gesso';
import Link from 'next/link';
import { ElementType, JSX } from 'react';
import styles from './button-group.module.css';

interface Button {
  url?: string;
  text: string;
  isActive?: boolean;
}

interface ButtonGroupProps extends GessoComponent {
  element?: ElementType;
  heading: string;
  buttons: Button[];
  activeLabel?: string;
  variant?: string;
  styleSize?: 'small' | 'medium' | 'large';
}

function ButtonGroup({
  element: Element = 'div',
  heading,
  modifierClasses,
  buttons,
  activeLabel = '(active)',
  variant,
  styleSize = 'medium',
}: ButtonGroupProps): JSX.Element {
  return (
    <Element
      className={clsx(styles.group, modifierClasses)}
      aria-label={heading}
      role={Element === 'nav' ? undefined : 'group'}
    >
      <ul className={styles.list}>
        {buttons.map((button, i) => (
          <li
            key={i}
            className={clsx(
              styles.item,
              button.isActive && styles['is-active'],
            )}
          >
            <Link
              href={button.url || '#0'}
              className={clsx(
                styles.link,
                button.isActive && styles['is-active'],
                variant && variant !== 'primary' && styles[`link--${variant}`],
                styleSize !== 'medium' && styles[`link--${styleSize}`],
              )}
            >
              {button.text}
              {button.isActive && (
                <span className="u-visually-hidden">{activeLabel}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </Element>
  );
}

export default ButtonGroup;
export type { ButtonGroupProps };
