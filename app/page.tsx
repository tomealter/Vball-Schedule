import PageTitle from '@/source/03-components/PageTitle/PageTitle';
import Schedule from '@/source/03-components/Schedule/Schedule';
import Page from '@/source/04-templates/Page/Page';
import { JSX } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Section from '../source/02-layouts/Section/Section';

const title = 'BB Division 1 Schedule';

export const metadata: Metadata = {
  title,
  description: 'Vball schedule for BB Division 1',
};

export interface ParsedMatch {
  date: string;
  weekIndex: number;
  matches: string[];
}

export interface ParsedStanding {
  team: string;
  wins: number;
  losses: number;
  weeklyWins: (number | undefined)[];
}

// Match cells look like "5 V 6"; also tolerates "5 vs 6" / "5 v. 6"
const MATCH_RE = /^\s*\d+\s*vs?\.?\s*\d+\s*$/i;

// Column 0 of a game row holds its time, e.g. "7:00 PM"
const TIME_RE = /^\s*(\d{1,2})(?::\d{2})*\s*([AP]M)\s*$/i;

// Slot order must stay in sync with GAME_TIMES in Matches.tsx
const SLOT_TIMES = ['7PM', '8PM', '9PM', '10PM'];

// Date rows sit 2 rows above their block of game rows
const DATE_ROW_OFFSET = 2;
const DATE_COLUMNS = [1, 2, 3];

function parseTeamList(rows: string[][]): string[] {
  const teams: string[] = [];
  for (let i = 2; i < 12; i++) {
    if (rows[i]?.[1] && rows[i]?.[2]) {
      teams.push(rows[i][2]);
    } else {
      break;
    }
  }
  return teams;
}

// "7:00 PM" -> "7PM", so odd spacing or seconds still resolve to a slot
function normalizeTime(value: string): string {
  const parts = TIME_RE.exec(value);
  return parts ? `${parseInt(parts[1], 10)}${parts[2].toUpperCase()}` : '';
}

// A game row is one carrying a time label or a match; either signal is enough,
// so a slot with no games that week still holds the block together.
function isGameRow(row: string[] | undefined): boolean {
  if (!row) return false;
  return (
    normalizeTime(row[0] ?? '') !== '' ||
    DATE_COLUMNS.some(col => MATCH_RE.test(row[col] ?? ''))
  );
}

// Anchors on blocks of game rows rather than on the date text, so typos in the
// sheet's month names ("AUGUAT") can't drop a week of games.
function parseSchedule(rows: string[][]): ParsedMatch[] {
  const schedule: ParsedMatch[] = [];
  let weekIndex = 0;

  rows.forEach((row, index) => {
    // Only act on the first row of each block
    if (!isGameRow(row) || isGameRow(rows[index - 1])) return;

    const dateRow = rows[index - DATE_ROW_OFFSET];
    if (!dateRow) return;

    const blockRows: string[][] = [];
    for (let offset = 0; isGameRow(rows[index + offset]); offset++) {
      blockRows.push(rows[index + offset]);
    }

    DATE_COLUMNS.forEach(col => {
      if (!dateRow[col]) return;

      const matches: string[] = new Array(SLOT_TIMES.length).fill('');
      blockRows.forEach((blockRow, position) => {
        // Unrecognized times fall back to the row's position in the block
        const named = SLOT_TIMES.indexOf(normalizeTime(blockRow[0] ?? ''));
        const slot = named === -1 ? position : named;
        if (slot < matches.length) matches[slot] = blockRow[col] ?? '';
      });

      schedule.push({ date: dateRow[col], weekIndex: weekIndex++, matches });
    });
  });

  return schedule;
}

// Standings sheet names are matched loosely since minor formatting drift
// (case, stray whitespace) between the two sheets shouldn't drop a team.
const normalizeTeamName = (value: string): string => value.trim().toLowerCase();

function parseStandings(rows: string[][], teamList: string[]): ParsedStanding[] {
  const standings: ParsedStanding[] = [];
  rows.forEach(row => {
    const team = teamList.find(
      t => normalizeTeamName(t) === normalizeTeamName(row[1] ?? ''),
    );
    if (team) {
      // Cols: [num, name, g1wins, g1losses, g2wins, g2losses, ..., totalWins, totalLosses]
      // Game week pairs start at index 2; last two cols are totals
      const numGameWeeks = Math.floor((row.length - 4) / 2);
      const weeklyWins: (number | undefined)[] = [];
      for (let g = 0; g < numGameWeeks; g++) {
        const val = row[2 + g * 2];
        weeklyWins.push(val !== undefined && val !== '' ? parseInt(val, 10) : undefined);
      }
      standings.push({
        // Store the schedule sheet's spelling so it matches teamList elsewhere
        team,
        wins: parseInt(row[row.length - 2], 10),
        losses: parseInt(row[row.length - 1], 10),
        weeklyWins,
      });
    }
  });
  standings.sort((a, b) => {
    if (b.wins !== a.wins) return b.wins - a.wins;
    return a.losses - b.losses;
  });
  return standings;
}

async function Home(): Promise<JSX.Element> {
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY;
  const scheduleId = '1CdwnKb394xGY1zXjzD08yXFic3ors5OuIveANI_sG80';
  const scheduleTab = '2017';
  const standingsId = '1ty9qCmpMiZ_CtS9HWDrs8pX4MdmFvARMxYpIm3Zd3E4';
  const standingsTab = 'Scores';

  // Construct the URL for Google Sheets API v4
  const scheduleUrl = `https://sheets.googleapis.com/v4/spreadsheets/${scheduleId}/values/${scheduleTab}?key=${apiKey}`;
  const standingsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${standingsId}/values/${standingsTab}?key=${apiKey}`;

  type JSONResponse = {
    values: string[][];
  };

  // Get Schedule Data
  const responseSchedule = await fetch(scheduleUrl, {
    cache: 'no-store', // Disable caching to get fresh data
  });
  if (!responseSchedule.ok) {
    throw new Error('Network response was not ok');
  }
  const jsonResponseSchedule = (await responseSchedule.json()) as JSONResponse;
  const dataSchedule: JSONResponse = jsonResponseSchedule;

  // Get Standings Data
  const responseStandings = await fetch(standingsUrl, {
    cache: 'no-store', // Disable caching to get fresh data
  });
  if (!responseStandings.ok) {
    throw new Error('Network response was not ok');
  }
  const jsonResponseStandings =
    (await responseStandings.json()) as JSONResponse;
  const dataStandings: JSONResponse = jsonResponseStandings;

  const teamList = parseTeamList(dataSchedule.values);
  const totalData = {
    schedule: parseSchedule(dataSchedule.values),
    standings: parseStandings(dataStandings.values, teamList),
    teamList,
  };

  return (
    <Page>
      <PageTitle
        pageTitle="BB Divison 1"
        subTitle={
          <p>
            Official schedule can be found{' '}
            <Link
              href="https://www.fairfaxsportsplex.com/mens-bb-division-1/"
              target="_blank"
            >
              Here
            </Link>
            .
            <br />
            Hit up Tommy if you see discrepancies.
          </p>
        }
      />
      <Section>
        <Schedule data={totalData} />
      </Section>
    </Page>
  );
}

export default Home;
