import { PeopleService } from "@/services/people";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const useSearchPeople = () => {
  const [searchValue, setSearchValue] = useState("");

  const peopleService = new PeopleService();

  const { data: options } = useQuery({
    queryKey: ["words", searchValue],
    queryFn: () => peopleService.getSearchResults(searchValue),
    enabled: searchValue.length > 2,
    staleTime: 10000,
    structuralSharing: true,
  });

  return {
    options,
    setSearchValue,
  }
};
