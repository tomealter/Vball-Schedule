type NextSearchParams = { [key: string]: string | string[] | undefined };

interface NextSearchParamsProp {
  searchParams: NextSearchParams;
}

export type { NextSearchParamsProp };
export default NextSearchParams;
