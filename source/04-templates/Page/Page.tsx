import Poster from '@/source/03-components/Poster/Poster';
import Image from 'next/image';
import { JSX, ReactNode } from 'react';
import { MAIN_ID } from '../../00-config/constants';
import Main from '../../02-layouts/Main/Main';
import posterImage from '/public/images/anderson_spike.jpg';

interface PageProps {
  mainId?: string;
  title?: string;
  children?: ReactNode;
  preContent?: ReactNode;
}

function Page({
  children,
  mainId = MAIN_ID,
  preContent,
}: PageProps): JSX.Element {
  return (
    <>
      {preContent}
      <Main id={mainId} hasConstrain={false}>
        <Poster
          image={
            <Image
              src={posterImage}
              alt="Matt Anderson"
              width={1280}
              height={720}
            />
          }
        />
        {children}
      </Main>
    </>
  );
}

export default Page;
export type { PageProps };
