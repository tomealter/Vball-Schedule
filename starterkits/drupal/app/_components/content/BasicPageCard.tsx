import Card from '@/source/03-components/Card/Card';
import { FragmentType, getFragmentData, graphql } from '@/types/__generated__';
import { JSX } from 'react';

const BasicPageCardFragment = graphql(`
  fragment BasicPageCardFragment on NodePage {
    title
    body {
      summary
    }
    path
  }
`);

function BasicPageCard(props: {
  entity: FragmentType<typeof BasicPageCardFragment>;
}): JSX.Element {
  const page = getFragmentData(BasicPageCardFragment, props.entity);
  return (
    <Card title={page.title} url={page.path}>
      {page.body?.summary}
    </Card>
  );
}

export { BasicPageCardFragment };
export default BasicPageCard;
