'use client';

import clsx from 'clsx';
import { useContext } from 'react';
import Select from 'react-select';
import { ActiveTeamContext } from '../Schedule/Schedule';
import styles from './team-select.module.css';

interface TeamSelectProps {
  teamList: string[];
  modifierClasses?: string;
}

function TeamSelect({ teamList, modifierClasses }: TeamSelectProps) {
  const context = useContext(ActiveTeamContext);

  if (!context) {
    throw new Error(
      'TeamSelect must be used within an ActiveTeamContext.Provider',
    );
  }

  const { activeTeam, setActiveTeam } = context;

  return (
    <div className={clsx(styles.wrapper, modifierClasses)}>
      <label className={styles.label} htmlFor="#team-select">
        Select Team
      </label>
      <Select
        options={teamList.map(team => ({ value: team, label: team }))}
        value={activeTeam ? { value: activeTeam, label: activeTeam } : null}
        onChange={selectedOption =>
          setActiveTeam(selectedOption?.value || null)
        }
        className={styles['team-select']}
        classNamePrefix={styles['team-select']}
        id="team-select"
        // menuIsOpen
        classNames={{
          menu: () => 'menu',
          control: () => 'control',
          singleValue: () => 'single-value',
          menuList: () => 'menu-list',
          option: () => 'option',
        }}
      />
    </div>
  );
}

export default TeamSelect;
