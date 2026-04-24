import type { ParsedMatch } from '@/app/page';
import styles from './matches.module.css';

const GAME_TIMES = ['7PM', '8PM', '9PM', '10PM'];

interface MatchesProps {
  data: ParsedMatch[];
  activeTeam: string;
  teamList: string[];
}

function Matches({ data, activeTeam, teamList }: MatchesProps) {
  // Function to render date
  const renderDate = (date: string) => {
    const dateSplit = date.split(' ');
    const month = dateSplit[0];
    const day = !Number.isNaN(parseInt(dateSplit[1].substring(0, 2)))
      ? parseInt(dateSplit[1].substring(0, 2))
      : parseInt(dateSplit[2].substring(0, 2)); // Fallback for date typo..

    return (
      <div className={styles.date}>
        <span className={styles.month}>{month.substring(0, 3)}</span>
        <span className={styles.day}>{day < 10 ? `0${day}` : day}</span>
      </div>
    );
  };

  // Function to return team names from match data
  const renderTeamNames = (match: string) => {
    if (match) {
      const strSplit = match.split(' ');
      const team_1 = teamList[parseInt(strSplit[0]) - 1];
      const team_2 = teamList[parseInt(strSplit[2]) - 1];

      return (
        <div className={styles['teams']}>
          <div
            className={styles['team']}
            data-active={team_1 === activeTeam ? 'true' : 'false'}
          >
            {team_1}
          </div>
          <div
            className={styles['team']}
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

  return (
    <ul className={styles['matches']}>
      {data.map((match, index) => (
        <li className={styles['matches-item']} key={index}>
          {renderDate(match.date)}
          {match.matches.some(Boolean) ? (
            <div className={styles.games}>
              {match.matches.map((m, i) =>
                renderTeamNames(m) ? (
                  <div className={styles.game} key={i}>
                    <div className={styles.time}>{GAME_TIMES[i]}</div>
                    {renderTeamNames(m)}
                  </div>
                ) : null,
              )}
            </div>
          ) : (
            <p>Playoffs TBD</p>
          )}
        </li>
      ))}
    </ul>
  );
}

export default Matches;
