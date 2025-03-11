import Article from '@/source/03-components/Article/Article';
import Wysiwyg from '@/source/03-components/Wysiwyg/Wysiwyg';
import { FragmentType, getFragmentData, graphql } from '@/types/__generated__';
import parse from 'html-react-parser';
import { JSX } from 'react';

const ArticleFullFragment = graphql(`
  fragment ArticleFullFragment on NodeArticle {
    title
    created {
      timestamp
    }
    body {
      processed
    }
  }
`);

function ArticleDetailPage(props: {
  entity: FragmentType<typeof ArticleFullFragment>;
}): JSX.Element {
  const article = getFragmentData(ArticleFullFragment, props.entity);
  return (
    <Article title={article.title}>
      {article.body && typeof article.body.processed === 'string' ? (
        <Wysiwyg>{parse(article.body.processed)}</Wysiwyg>
      ) : null}
    </Article>
  );
}

export { ArticleFullFragment };
export default ArticleDetailPage;
