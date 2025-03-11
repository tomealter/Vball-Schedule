import '@/source/00-config/index.css';

import ClientProvider from '@/app/ClientProvider';
import layoutMetadataQuery from '@/app/layoutMetadataQuery';
import '@/faust.config.js';
import sourceSansPro from '@/source/01-global/fonts/source-sans';
import '@/source/01-global/index.css';
import Footer from '@/source/02-layouts/Footer/Footer';
import Header from '@/source/02-layouts/Header/Header';
import SiteContainer from '@/source/02-layouts/SiteContainer/SiteContainer';
import BackToTop from '@/source/03-components/BackToTop/BackToTop';
import Menu from '@/source/03-components/Menu/Menu';
import addBasePath from '@/source/06-utility/addBasePath';
import '@/source/06-utility/index.css';
import {
  GetLayoutQuery,
  LayoutMetadataQuery,
} from '@/types/__generated__/graphql';
import { arrayFromAcf } from '@/util/wp/acfTools';
import { gql } from '@apollo/client';
import { getClient } from '@faustwp/experimental-app-router';
import { FaustProvider } from '@faustwp/experimental-app-router/ssr';
import { Metadata } from 'next';
import { PropsWithChildren } from 'react';

export async function generateMetadata(): Promise<Metadata> {
  const client = await getClient();
  const { data } = await client.query<LayoutMetadataQuery>({
    query: layoutMetadataQuery,
  });
  const title = data.generalSettings?.title || '';
  return {
    // https://nextjs.org/docs/app/api-reference/functions/generate-metadata#title
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    // https://nextjs.org/docs/app/api-reference/functions/generate-metadata#manifest
    // manifest: addBasePath('/site.webmanifest'),
    // https://nextjs.org/docs/app/api-reference/functions/generate-metadata#icons
    icons: {
      icon: [
        { url: addBasePath('/favicon.ico') },
        {
          url: addBasePath('/favicon-16x16.png'),
          sizes: '16x16',
          type: 'image/png',
        },
        {
          url: addBasePath('/favicon-32x32.png'),
          sizes: '32x32',
          type: 'image/png',
        },
      ],
      apple: addBasePath('/apple-touch-icon.png'),
      // TODO: Add mask-icon for safari-pinned-tab.svg?
    },
  };
}

export default async function RootLayout({ children }: PropsWithChildren) {
  const client = await getClient();

  const { data } = await client.query<GetLayoutQuery>({
    query: gql`
      query GetLayout {
        primaryMenuItems: menuItems(where: { location: PRIMARY }) {
          nodes {
            id
            label
            uri
          }
        }
      }
    `,
  });

  if (!data.primaryMenuItems) {
    throw new Error('Query failed.');
  }

  return (
    <html lang="en" className={sourceSansPro.variable}>
      <body>
        <SiteContainer>
          <FaustProvider>
            <ClientProvider>
              <Header>
                <Menu
                  items={arrayFromAcf(data.primaryMenuItems.nodes).map(el => ({
                    title: el.label || '',
                    url: el.uri || '',
                  }))}
                />
              </Header>
              {children}
              <Footer />
            </ClientProvider>
          </FaustProvider>
        </SiteContainer>
        <BackToTop text="Back to Top" topElement="top" />
      </body>
    </html>
  );
}
