import { Box, Typography } from "@mui/material";

import { People } from "@/types/people";
import Link from "next/link";
import ROUTES from "@/utils/routes";

interface Props {
  peoples: People[];
}

const PeoplesList = ({ peoples }: Props): JSX.Element => {
  return (
    <>
      {peoples.map((x) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography key={x.name} variant="subtitle1">
            {x.name}
          </Typography>
          <Link href={ROUTES.people.details(x.id)}>Details</Link>
        </Box>
      ))}
    </>
  );
};

export default PeoplesList;
