import { NextSearchParamsProp } from '@/types/NextSearchParams';

export function hasPreviewProps(props: NextSearchParamsProp) {
  return props?.searchParams?.preview === 'true' && !!props?.searchParams?.p;
}
