import { PeopleAPI } from "@/types/people";
import {
  Avatar,
  Stack,
  Typography,
} from "@mui/material";

interface Props {
  person: PeopleAPI;
}

export const PersonDetails = ({ person }: Props) => {
  return (
    <Stack gap={3} pt={6}>
      <Avatar>{person.name.charAt(0)}</Avatar>
      <Stack gap={1}>
        <Typography variant="h2">{person.name}</Typography>
        <Typography variant="subtitle1">Gender: {person.gender}</Typography>
        <Typography variant="subtitle2">
          Birth year: {person.birth_year}
        </Typography>
      </Stack>
    </Stack>
  );
};
