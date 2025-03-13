'use client';

import SvgAngleDown from '@/source/01-global/icon/icons/AngleDown';
import Constrain from '@/source/02-layouts/Constrain/Constrain';
import constrainStyles from '@/source/02-layouts/Constrain/constrain.module.css';
import clsx from 'clsx';
import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './schedule.module.css';

interface ScheduleProps {
  data: {
    values: string[][];
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
  const magicLine = useRef<HTMLDivElement>(null);
  const [dropDownOpen, setDropDownOpen] = useState(false);

  // Create list of teams
  const teamList = useMemo(() => {
    const teams = [] as string[];
    for (let i = 2; i < 11; i++) {
      if (data.values[i][1] && data.values[i][2]) {
        teams.push(data.values[i][2]);
      }
    }
    return teams;
  }, [data.values]);

  const [activeTeam, setActiveTeam] = useState(teamList[0]);

  // Create schedule array
  data.values.map((row, index) => {
    if (row[1]) {
      // Check if row contains a date
      if (months.includes(row[1].split(' ')[0])) {
        // Add matches to schedule
        for (let i = 0; i <= 3; i++) {
          if (row[i]) {
            schedule.push({
              date: row[i],
              match_1: data.values[index + 2][i],
              match_2: data.values[index + 3][i],
              match_3: data.values[index + 4][i],
              match_4: data.values[index + 5][i],
            });
          }
        }
      }
    }
  });

  // Function to return team names from match data
  const renderTeamNames = (match: string) => {
    if (match) {
      const strSplit = match.split(' ');
      const team_1 = teamList[parseInt(strSplit[0]) - 1];
      const team_2 = teamList[parseInt(strSplit[2]) - 1];

      return (
        <div className={styles['team-names']}>
          <div
            className={styles['team-name']}
            data-active={team_1 === activeTeam ? 'true' : 'false'}
          >
            {team_1}
          </div>
          <div
            className={styles['team-name']}
            data-active={team_2 === activeTeam ? 'true' : 'false'}
          >
            {team_2}
          </div>
        </div>
      );
    } else {
      return '';
    }
  };

  // Function to render date
  const renderDate = (date: string) => {
    const dateSplit = date.split(' ');
    const month = dateSplit[0];
    const day = parseInt(dateSplit[1].substring(0, 2));

    return (
      <div className={styles.date}>
        <span className={styles.month}>{month.substring(0, 3)}</span>
        <span className={styles.day}>{day < 10 ? `0${day}` : day}</span>
      </div>
    );
  };

  useEffect(() => {
    const activeIndex = teamList.indexOf(activeTeam);
    if (magicLine.current && activeIndex !== -1) {
      const teamButton = document.querySelectorAll(`.${styles.team}`)[
        activeIndex
      ] as HTMLElement;
      if (teamButton) {
        magicLine.current.style.width = `${teamButton.offsetWidth}px`;
        magicLine.current.style.top = `${teamButton.offsetTop - 2}px`;
      }
    }
  }, [activeTeam, teamList]);

  return (
    <div className={clsx(styles.wrapper, modifierClasses)}>
      <Constrain modifierClasses={constrainStyles['constrain--small']}>
        <div className={styles.row}>
          <div className={styles.teams}>
            <label htmlFor="">Select team</label>
            <button
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
            </button>
            <h2 className={styles.title}>Teams</h2>
            <ul aria-hidden={dropDownOpen ? 'false' : 'true'}>
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
            </ul>
          </div>
          <div className={styles.schedule}>
            <h2 className={styles.title}>Schedule</h2>
            <ul>
              {schedule.map((match, index) => (
                <li className={styles['schedule-item']} key={index}>
                  {renderDate(match.date)}
                  {match.match_1 && match.match_2 && match.match_3 ? (
                    <div className={styles.matches}>
                      <div className={styles.match}>
                        <div className={styles.time}>7PM</div>
                        {renderTeamNames(match.match_1)}
                      </div>
                      <div className={styles.match}>
                        <div className={styles.time}>8PM</div>
                        {renderTeamNames(match.match_2)}
                      </div>
                      <div className={styles.match}>
                        <div className={styles.time}>9PM</div>
                        {renderTeamNames(match.match_3)}
                      </div>
                      <div className={styles.match}>
                        <div className={styles.time}>10PM</div>
                        {renderTeamNames(match.match_4)}
                      </div>
                    </div>
                  ) : (
                    <p>Playoffs TBD</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Constrain>
    </div>
  );
}

export default Schedule;
export type { ScheduleProps };
