'use client';

import Constrain from '@/source/02-layouts/Constrain/Constrain';
import constrainStyles from '@/source/02-layouts/Constrain/constrain.module.css';
import clsx from 'clsx';
import { createContext, useMemo, useState } from 'react';
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
    schedule: string[][];
    standings: string[][];
  };
  modifierClasses?: string;
}

function Schedule({ data, modifierClasses }: ScheduleProps) {
  const schedule: {
    date: string;
    match_1: string;
    match_2: string;
    match_3: string;
    match_4: string;
  }[] = [];
  const standings: {
    team: string;
    wins: number;
    losses: number;
  }[] = [];
  // Months array for checking dates
  const months = [
    'JANUARY',
    'FEBRUARY',
    'MARCH',
    'APRIL',
    'MAY',
    'JUNE',
    'JULY',
    'AUGUST',
    'SEPTEMBER',
    'OCTOBER',
    'NOVEMBER',
    'DECEMBER',
  ];

  // Create list of teams
  const teamList = useMemo(() => {
    const teams = [] as string[];
    for (let i = 2; i < 12; i++) {
      if (data.schedule[i][1] && data.schedule[i][2]) {
        teams.push(data.schedule[i][2]);
      } else {
        break;
      }
    }
    return teams;
  }, [data.schedule]);

  const [activeTeam, setActiveTeam] = useState<string | null>(
    teamList[0] || null,
  );

  // Create schedule array
  data.schedule.map((row, index) => {
    if (row[1]) {
      // Check if row contains a date
      if (months.includes(row[1].split(' ')[0])) {
        // Add matches to schedule
        for (let i = 0; i <= 3; i++) {
          if (row[i]) {
            schedule.push({
              date: row[i],
              match_1: data.schedule[index + 2][i],
              match_2: data.schedule[index + 3][i],
              match_3: data.schedule[index + 4][i],
              match_4: data.schedule[index + 5][i],
            });
          }
        }
      }
    }
  });

  // Create standings array
  data.standings.map(row => {
    if (teamList.includes(row[1])) {
      standings.push({
        team: row[1],
        wins: parseInt(row[row.length - 2]),
        losses: parseInt(row[row.length - 1]),
      });
    }
  });
  standings.sort(function (a, b) {
    // First sort by wins (descending)
    if (b.wins !== a.wins) {
      return b.wins - a.wins;
    }
    // If wins are equal, sort by losses (ascending)
    return a.losses - b.losses;
  });

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
