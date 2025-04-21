'use client';

import Constrain from '@/source/02-layouts/Constrain/Constrain';
import constrainStyles from '@/source/02-layouts/Constrain/constrain.module.css';
import clsx from 'clsx';
import { useMemo, useState } from 'react';
import Select from 'react-select';
import Matches from '../Matches/Matches';
import styles from './schedule.module.css';

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
  // const magicLine = useRef<HTMLDivElement>(null);
  // const [dropDownOpen, setDropDownOpen] = useState(false);

  // Create list of teams
  const teamList = useMemo(() => {
    const teams = [] as string[];
    for (let i = 2; i < 11; i++) {
      if (data.schedule[i][1] && data.schedule[i][2]) {
        teams.push(data.schedule[i][2]);
      }
    }
    return teams;
  }, [data.schedule]);

  const [activeTeam, setActiveTeam] = useState(teamList[0]);

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
    return b.wins - a.wins;
  });

  return (
    <div className={clsx(styles.wrapper, modifierClasses)}>
      <Constrain modifierClasses={constrainStyles['constrain--small']}>
        <div className={styles.row}>
          <div className={styles.left}>
            <div className={styles.teams}>
              <label htmlFor="#team-select">Select team</label>
              <Select
                options={teamList.map(team => ({ value: team, label: team }))}
                defaultValue={{ value: teamList[0], label: teamList[0] }}
                onChange={e => setActiveTeam(e?.value || '')}
                className={styles['team-select']}
                classNamePrefix={styles['team-select']}
                id="team-select"
              />
              {/* <button
                className={styles['teams-dropdown']}
                aria-expanded={dropDownOpen ? 'true' : 'false'}
                onClick={
                  dropDownOpen
                    ? () => setDropDownOpen(false)
                    : () => setDropDownOpen(true)
                }
              >
                {activeTeam}
                <SvgAngleDown />
              </button> */}
              {/* <h2 className={styles.title}>Teams</h2> */}
              {/* <ul aria-hidden={dropDownOpen ? 'false' : 'true'}>
                {teamList.map((team, index) => (
                  <li key={index}>
                    <button
                      className={styles.team}
                      data-active={team === activeTeam ? 'true' : 'false'}
                      onClick={() => {
                        setActiveTeam(team);
                        setDropDownOpen(false);
                      }}
                    >
                      {team}
                    </button>
                  </li>
                ))}
                <div className={styles.line} ref={magicLine}></div>
              </ul> */}
            </div>
            <div className={styles.standings}>
              <h2 className={styles.title}>Standings</h2>
              {/* <button className={styles['standings-dropdown']}>
                Standings
              </button> */}
              <ul>
                {standings.map((team, index) => (
                  <li className={styles['standings-item']} key={index}>
                    <div className={styles['standings-team']}>{team.team}</div>
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
              activeTeam={activeTeam}
              teamList={teamList}
            />
          </div>
        </div>
      </Constrain>
    </div>
  );
}

export default Schedule;
export type { ScheduleProps };
