'use client';

import Constrain from '@/source/02-layouts/Constrain/Constrain';
import constrainStyles from '@/source/02-layouts/Constrain/constrain.module.css';
import clsx from 'clsx';
import { createContext, useEffect, useState } from 'react';
import type { ParsedMatch, ParsedStanding } from '@/app/page';
import Matches from '../Matches/Matches';
import TeamSelect from '../TeamSelect/TeamSelect';
import styles from './schedule.module.css';

interface ActiveTeamContextType {
  activeTeam: string | null;
  setActiveTeam: React.Dispatch<React.SetStateAction<string | null>>;
}

export const ActiveTeamContext = createContext<
  ActiveTeamContextType | undefined
>(undefined);

interface ScheduleProps {
  data: {
    schedule: ParsedMatch[];
    standings: ParsedStanding[];
    teamList: string[];
  };
  modifierClasses?: string;
}

function Schedule({ data, modifierClasses }: ScheduleProps) {
  const { schedule, standings, teamList } = data;

  const [activeTeam, setActiveTeam] = useState<string | null>(
    teamList[0] || null,
  );

  // Restore persisted team selection after hydration
  useEffect(() => {
    const stored = localStorage.getItem('activeTeam');
    if (stored && teamList.includes(stored)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveTeam(stored);
    }
  }, [teamList]);

  // Save to localStorage whenever activeTeam changes
  useEffect(() => {
    if (activeTeam) {
      localStorage.setItem('activeTeam', activeTeam);
    }
  }, [activeTeam]);

  return (
    <ActiveTeamContext.Provider value={{ activeTeam, setActiveTeam }}>
      <div className={clsx(styles.wrapper, modifierClasses)}>
        <Constrain modifierClasses={constrainStyles['constrain--small']}>
          <div className={styles.row}>
            <div className={styles.left}>
              <TeamSelect teamList={teamList} />
              <div className={styles.standings}>
                <h2 className={styles.title}>Standings</h2>
                <ul>
                  {standings.map((team, index) => (
                    <li
                      className={clsx(styles['standings-item'], {
                        [styles['team-active']]: team.team === activeTeam,
                      })}
                      key={index}
                    >
                      <div className={styles['standings-team']}>
                        {team.team}
                      </div>
                      <div className={styles['standings-record']}>
                        ({team.wins} - {team.losses})
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className={styles.right}>
              <h2 className={styles.title}>Schedule</h2>
              <Matches
                data={schedule}
                activeTeam={activeTeam || ''}
                teamList={teamList}
              />
            </div>
          </div>
        </Constrain>
      </div>
    </ActiveTeamContext.Provider>
  );
}

export default Schedule;
export type { ScheduleProps };
