import PageTitle from '@/source/03-components/PageTitle/PageTitle';
import Schedule from '@/source/03-components/Schedule/Schedule';
import Page from '@/source/04-templates/Page/Page';
import { Metadata } from 'next';
import Link from 'next/link';
import Section from '../source/02-layouts/Section/Section';

const title = 'Forum One Next.js Starter App';

export const metadata: Metadata = {
  title,
  description: 'Next app using TypeScript and PostCSS',
};

async function Home(): Promise<JSX.Element> {
  // Replace with your actual Spreadsheet ID
  const spreadsheetId = '1CdwnKb394xGY1zXjzD08yXFic3ors5OuIveANI_sG80';
  const spreadsheetTab = '2017';
  // Replace with your API Key
  const apiKey = 'AIzaSyC2LSKa6M1fv1W8VjNnI5six6NkssnTHK4';
  // Construct the URL for Google Sheets API v4
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${spreadsheetTab}?key=${apiKey}`;
  type JSONResponse = {
    values: string[][];
  };

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const jsonResponse = (await response.json()) as JSONResponse;
  const data: JSONResponse = jsonResponse;

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
            Hit up Tommy, if you see discrepancies.
          </p>
        }
      />
      <Section>
        <Schedule data={data} />
      </Section>
    </Page>
  );
}

export default Home;
