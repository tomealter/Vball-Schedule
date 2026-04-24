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
  matches: string[];
}

export interface ParsedStanding {
  team: string;
  wins: number;
  losses: number;
}

const MONTHS = new Set([
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
]);

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

function parseSchedule(rows: string[][]): ParsedMatch[] {
  const schedule: ParsedMatch[] = [];
  rows.forEach((row, index) => {
    if (row[1] && MONTHS.has(row[1].split(' ')[0])) {
      for (let i = 0; i <= 3; i++) {
        if (row[i]) {
          schedule.push({
            date: row[i],
            matches: [
              rows[index + 2]?.[i] ?? '',
              rows[index + 3]?.[i] ?? '',
              rows[index + 4]?.[i] ?? '',
              rows[index + 5]?.[i] ?? '',
            ],
          });
        }
      }
    }
  });
  return schedule;
}

function parseStandings(rows: string[][], teamList: string[]): ParsedStanding[] {
  const standings: ParsedStanding[] = [];
  rows.forEach(row => {
    if (teamList.includes(row[1])) {
      standings.push({
        team: row[1],
        wins: parseInt(row[row.length - 2], 10),
        losses: parseInt(row[row.length - 1], 10),
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
