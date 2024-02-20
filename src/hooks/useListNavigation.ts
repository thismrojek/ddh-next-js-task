import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";

const PAGE_NUMBER_SEARCH_PARAM_NAME = "page";
const INITIAL_PAGE = 1;

export const useListNavigation = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const currentPage = Number(searchParams.get(PAGE_NUMBER_SEARCH_PARAM_NAME)) || INITIAL_PAGE;

  const setPage = (targetPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set(PAGE_NUMBER_SEARCH_PARAM_NAME, targetPage.toString());

    replace(`${pathname}?${params.toString()}`);
  }

  const handlePaginationChange = (_event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  }

  return {
    currentPage,
    setPage,
    handlePaginationChange,
  };
};
