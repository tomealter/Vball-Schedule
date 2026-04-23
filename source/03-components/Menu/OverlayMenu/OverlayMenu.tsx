'use client';

import clsx from 'clsx';
import { GessoComponent } from 'gesso';
import { JSX, useCallback, useEffect, useId, useRef, useState } from 'react';
import HamburgerButton from '../../HamburgerButton/HamburgerButton';
import buttonStyles from '../../HamburgerButton/hamburger-button.module.css';
import Menu, { MenuItem } from '../Menu';
import styles from './overlay-menu.module.css';

interface OverlayMenuProps extends GessoComponent {
  items: MenuItem[];
}

const focusableElementsString =
  'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';

function OverlayMenu({
  items,
  modifierClasses,
}: OverlayMenuProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const navId = useId();
  const navRef = useRef<HTMLElement>(null);

  const handleKeydown = useCallback(
    (event: KeyboardEvent) => {
      const focusable = navRef.current?.querySelectorAll<HTMLElement>(
        focusableElementsString,
      );
      // Trap focus within the menu
      if (focusable && focusable.length > 0) {
        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (event.key === 'Tab') {
          if (event.shiftKey && document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          } else if (
            !event.shiftKey &&
            document.activeElement === lastElement
          ) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
      // Close the menu when the escape key is pressed
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    },
    [],
  );

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('has-open-menu');
      const firstElement = navRef.current?.querySelectorAll<HTMLElement>(
        focusableElementsString,
      )?.[0];
      firstElement?.focus();
      window.addEventListener('keydown', handleKeydown);
    } else {
      document.body.classList.remove('has-open-menu');
      window.removeEventListener('keydown', handleKeydown);
      // Focus menu button on close
      const button = document.querySelector(
        `[aria-controls="${navId}"]`,
      ) as HTMLButtonElement;
      button?.focus();
    }
    return () => {
      document.body.classList.remove('has-open-menu');
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [isOpen, navId, handleKeydown]);

  return (
    <>
      <HamburgerButton
        aria-controls={navId}
        aria-expanded={isOpen}
        onClick={() => setIsOpen(true)}
        hidden={isOpen}
        text="Menu"
        modifierClasses={buttonStyles['button--menu']}
      />
      <nav
        className={clsx(
          styles.overlay,
          isOpen && styles['is-open'],
          modifierClasses,
        )}
        id={navId}
        ref={navRef}
      >
        <HamburgerButton
          onClick={() => setIsOpen(false)}
          aria-controls={navId}
          aria-expanded={isOpen}
          hidden={!isOpen}
          text="Close"
          modifierClasses={buttonStyles['button--close']}
          autoFocus
        />
        <Menu
          items={items}
          modifierClasses={styles.menu}
          linkClasses={styles.link}
        />
      </nav>
    </>
  );
}

export default OverlayMenu;
export type { OverlayMenuProps };
