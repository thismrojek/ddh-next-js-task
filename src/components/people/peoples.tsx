import {
  Box,
  CircularProgress,
  Divider,
  Pagination,
  Stack,
} from "@mui/material";
import usePeoples from "@/hooks/usePeoples";
import { useListNavigation } from "@/hooks/useListNavigation";

import PeoplesList from "./peoples-list";

const Peoples = (): JSX.Element => {
  const { currentPage, handlePaginationChange } = useListNavigation();
  const { peoples, status, listMetadata } = usePeoples(currentPage);

  return (
    <Stack alignItems="center" justifyContent="center" my={4}>
      {status === "success" && peoples ? (
        <Stack gap={2}>
          <PeoplesList peoples={peoples.list} />
          <Divider />
          <Pagination
            count={listMetadata.pagesCount}
            siblingCount={0}
            page={currentPage}
            onChange={handlePaginationChange}
          />
        </Stack>
      ) : (
        <Box p={4}>
          <CircularProgress />
        </Box>
      )}
    </Stack>
  );
};

export default Peoples;
