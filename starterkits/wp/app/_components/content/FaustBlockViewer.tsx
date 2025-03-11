'use client';

import { Data } from '@/util/wp/flatListToHierarchical';
import { WordPressBlocksViewer } from '@faustwp/blocks';
import { JSX } from 'react';

function FaustBlockViewer(block: Data): JSX.Element | null {
  if (block?.block && typeof block.block === 'object') {
    return <WordPressBlocksViewer blocks={[block.block]} />;
  }
  return null;
}

export default FaustBlockViewer;
