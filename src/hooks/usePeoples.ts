import { QueryStatus, useQuery } from "@tanstack/react-query";

import { List } from "@/types/list";
import { People } from "@/types/people";

import { PeopleService } from "@/services/people";

interface State {
  status: QueryStatus;
  peoples: List<People> | undefined;
  listMetadata: {
    currentPage: number;
    pagesCount: number;
  };
}

const PEOPLES_KEY = "people";

const usePeoples = (page: number): State => {
  const peopleService = new PeopleService();

  const { data, status } = useQuery({
    queryKey: [PEOPLES_KEY, page],
    queryFn: () => peopleService.getPage(page),
  });

  return {
    status: status,
    peoples: data,
    listMetadata: {
      currentPage: page,
      pagesCount: data?.totalPage || 1,
    },
  };
};

export default usePeoples;
