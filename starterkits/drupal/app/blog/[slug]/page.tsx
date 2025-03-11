import { graphql } from '@/types/__generated__';
import {
  GetArticleByPathQuery,
  GetArticleByPathQueryVariables,
  NodeArticle,
} from '@/types/__generated__/graphql';
import {
  canShowEntity,
  entityExists,
  routeIsInternal,
} from '@/util/drupal/dataIsEntityType';
import query from '@/util/drupal/query';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';
import ArticleFull from '../../_components/content/ArticleFull';

const getArticleByName = graphql(`
  query GetArticleByPath($path: String!) {
    route(path: $path) {
      __typename
      ... on RouteInternal {
        entity {
          __typename
          ... on NodeInterface {
            status
          }
          ...ArticleFullFragment
        }
      }
    }
  }
`);

async function NodeFull({ params }: { params: { slug: string } }) {
  const { isEnabled } = draftMode();
  const data = await query<
    GetArticleByPathQuery,
    GetArticleByPathQueryVariables
  >(getArticleByName, {
    /*
      If you have Pathauto set up, you'll need to change the path here to match.
      For example, if you set articles up to be at /blog/[node:title], the path
      will need to be `blog/${params.slug}`.
     */
    path: `${params.slug}`,
  });
  if (
    !!data &&
    routeIsInternal(data.route) &&
    entityExists<NodeArticle>(data.route.entity, 'NodeArticle') &&
    canShowEntity(data.route.entity, isEnabled)
  ) {
    return <ArticleFull entity={data.route.entity} />;
  } else {
    notFound();
  }
}

export default NodeFull;
