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

async function Home(): Promise<JSX.Element> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY;
  const scheduleId = '1CdwnKb394xGY1zXjzD08yXFic3ors5OuIveANI_sG80';
  const scheduleTab = '2017';
  const standingsId = '1ty9qCmpMiZ_CtS9HWDrs8pX4MdmFvARMxYpIm3Zd3E4';
  const standingsTab = 'Scores';
  console.log("My key is:", process.env.NEXT_PUBLIC_GOOGLE_SHEETS_API_KEY);

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

  // Create a combined data object
  const totalData = {
    schedule: dataSchedule.values,
    standings: dataStandings.values,
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
