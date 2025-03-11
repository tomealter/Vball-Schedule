import CursorNavigation, {
  ArchiveParams,
} from '@/app/_components/content/CursorNavigation';
import Article from '@/source/03-components/Article/Article';
import LandingPage from '@/source/04-templates/LandingPage/LandingPage';
import { NextSearchParamsProp } from '@/types/NextSearchParams';
import {
  BlogArchiveQuery,
  BlogArchiveQueryVariables,
} from '@/types/__generated__/graphql';
import stringParamsFromSearch from '@/util/wp/stringParamsFromSearch';
import { getClient } from '@faustwp/experimental-app-router';
import { Metadata } from 'next';
import Link from 'next/link';
import blogArchiveQuery from './blogArchiveQuery';

const PAGE_TITLE = 'Blog';
export const metadata: Metadata = {
  title: PAGE_TITLE,
};

type BlogArchiveProps = NextSearchParamsProp;

async function BlogArchive({ searchParams }: BlogArchiveProps) {
  const stringParams = stringParamsFromSearch(searchParams);

  // Use cursor based pagination. Prioritize "after" over "before".
  const after = stringParams[ArchiveParams.AFTER] || undefined;
  const before = (!after && stringParams[ArchiveParams.BEFORE]) || undefined;
  // "first" should be 12 for all queries that do not use "before".
  const first = (!before && 12) || undefined;
  const last = (before && 12) || undefined;

  const client = await getClient();
  const { data, error } = await client.query<
    BlogArchiveQuery,
    BlogArchiveQueryVariables
  >({
    query: blogArchiveQuery,
    variables: {
      first,
      after,
      last,
      before,
    },
  });

  if (error) {
    throw new Error(error.message);
  }
  const { posts } = data;
  if (!posts) {
    throw new Error(
      'An error has occurred when trying to retrieve the list of posts.',
    );
  }

  return (
    <LandingPage title={PAGE_TITLE}>
      <Article>
        <ul>
          {posts.edges.map(({ node }) => (
            <li key={node.id}>
              <Link href={`/blog/${node.slug}`}>{node.title}</Link>
            </li>
          ))}
        </ul>
        <CursorNavigation pageInfo={posts.pageInfo} />
      </Article>
    </LandingPage>
  );
}

export default BlogArchive;
