import styles from './matches.module.css';

interface MatchesProps {
  data: {
    date: string;
    match_1: string;
    match_2: string;
    match_3: string;
    match_4: string;
  }[];
  activeTeam: string;
  teamList: string[];
}

function Matches({ data, activeTeam, teamList }: MatchesProps) {
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
          {match.match_1 && match.match_2 && match.match_3 ? (
            <div className={styles.games}>
              <div className={styles.game}>
                <div className={styles.time}>7PM</div>
                {renderTeamNames(match.match_1)}
              </div>
              <div className={styles.game}>
                <div className={styles.time}>8PM</div>
                {renderTeamNames(match.match_2)}
              </div>
              <div className={styles.game}>
                <div className={styles.time}>9PM</div>
                {renderTeamNames(match.match_3)}
              </div>
              <div className={styles.game}>
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
  );
}

export default Matches;
