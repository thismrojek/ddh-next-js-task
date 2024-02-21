import { useForm, Controller } from "react-hook-form";

import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  TextField,
  Select,
  Stack,
} from "@mui/material";
import { useSearchPeople } from "@/hooks/useSearchPeople";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  StarshipDTO,
  availableStarshipsClasses,
  starshipSchema,
} from "@/pages/api/starship";
import { useCreateStarship } from "@/hooks/useCreateStarship";

const StarshipForm = () => {
  const {
    control,
    handleSubmit,
    setValue,
  } = useForm({
    resolver: zodResolver(starshipSchema),
  });

  const { options, setSearchValue } = useSearchPeople();
  const { createStarshipAsync, isPending } = useCreateStarship();

  const onSubmit = handleSubmit(async (formData) => {
    try {
      await createStarshipAsync(formData as StarshipDTO);
      alert("Starship added successfully!");
    } catch (error) {
      console.error("Error adding starship:", error);
      alert("An error occurred while adding starship.");
    }
  });

  return (
    <Box py={10}>
      <form>
        <Stack gap={2}>
          <Controller
            name="model"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                helperText={error ? error.message : null}
                error={!!error}
                onChange={onChange}
                value={value}
                label="Model"
              />
            )}
          />
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                helperText={error ? error.message : null}
                error={!!error}
                onChange={onChange}
                value={value}
                label="Name"
              />
            )}
          />
          <Controller
            name="pilot"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <Autocomplete
                {...field}
                onInputChange={(_, value) => setSearchValue(value)}
                onChange={(_event, newValue) => {
                  if (newValue) setValue("pilot", newValue);
                }}
                options={options || []}
                getOptionLabel={(option) => option.name || ""}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Pilot"
                    helperText={error ? error.message : null}
                    error={!!error}
                  />
                )}
                filterOptions={(x) => x}
                isOptionEqualToValue={(option, value) =>
                  option.url === value.url
                }
              />
            )}
          />
          <Controller
            name="starship_class"
            control={control}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <FormControl error={!!error}>
                <InputLabel id="demo-simple-select-label">
                  Starship class
                </InputLabel>
                <Select
                  value={value}
                  onChange={(event) => onChange(event.target.value)}
                  label="Starship class"
                >
                  {availableStarshipsClasses.map((starshipClassName) => (
                    <MenuItem key={starshipClassName} value={starshipClassName}>
                      {starshipClassName}
                    </MenuItem>
                  ))}
                </Select>
                {error && <FormHelperText>{error.message}</FormHelperText>}
              </FormControl>
            )}
          />
          <Controller
            name="cost_in_credits"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                helperText={error ? error.message : null}
                error={!!error}
                onChange={(event) => onChange(Number(event.target.value))}
                value={value}
                label="Cost in credits"
                type="number"
              />
            )}
          />
          <Controller
            name="length"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                helperText={error ? error.message : null}
                error={!!error}
                onChange={onChange}
                value={value}
                label="Length"
              />
            )}
          />
          <Controller
            name="max_atmosphering_speed"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                helperText={error ? error.message : null}
                error={!!error}
                onChange={onChange}
                value={value}
                label="Max atmosphering speed"
              />
            )}
          />
          <Button
            disabled={isPending}
            onClick={onSubmit}
            variant="contained"
            color="primary"
          >
            Add Starship
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default StarshipForm;
