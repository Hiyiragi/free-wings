import {
  Controller,
  type SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack, TextField } from "@mui/material";

import AppButton from "@features/ui/AppButton";
import AppIconButton from "@features/ui/AppIconButton";
import { useAppDispatch, useAppSelector } from "@store/index";

import { MAX_TRIP_DESTINATIONS } from "../../../constants";
import { Trip } from "../../../type";
import {
  nextStep,
  selectWizardTrip,
  setDestinations,
  setLocationFrom,
} from "../../store/tripWizardSlice";
import Pagination from "../Navigation/Pagination";

export interface FormInput {
  locationFrom: Trip["locationFrom"];
  destinations: Trip["destinations"];
}

export default function Destinations() {
  const {
    handleSubmit,
    onSubmit,
    control,
    destinations,
    addDestination,
    removeDestination,
  } = useDestinationsForm();

  return (
    <Stack
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: "100%" }}
      gap={2}
    >
      <Stack gap={3}>
        <Controller
          name="locationFrom"
          control={control}
          rules={{ required: "Please specify where your trip starts!" }}
          render={({ field: { ref, ...field }, fieldState }) => (
            <TextField
              autoFocus
              inputRef={ref}
              margin="normal"
              required
              fullWidth
              id="locationFrom"
              label="From"
              variant="standard"
              helperText={fieldState.error?.message}
              error={Boolean(fieldState.error)}
              {...field}
            />
          )}
        />
        <Pagination />
        {destinations.map((destination, index) => (
          <Stack
            gap={1}
            direction="row"
            key={destination.id}
            alignItems="flex-end"
          >
            <Controller
              name={`destinations.${index}.name`}
              control={control}
              rules={{ required: "Please specify your destination!" }}
              render={({ field: { ref, ...field }, fieldState }) => (
                <TextField
                  inputRef={ref}
                  margin="normal"
                  required
                  fullWidth
                  id={`${destination}.${index}`}
                  label={`Destionation ${index + 1}`}
                  variant="standard"
                  helperText={fieldState.error?.message}
                  error={Boolean(fieldState.error)}
                  {...field}
                />
              )}
            />
            {index !== 0 && (
              <AppIconButton
                aria-label="Remove Destination"
                onClick={() => removeDestination(index)}
              >
                <DeleteIcon />
              </AppIconButton>
            )}
          </Stack>
        ))}
      </Stack>
      {destinations.length < MAX_TRIP_DESTINATIONS && (
        <AppButton
          variant="text"
          startIcon={<AddIcon />}
          onClick={addDestination}
        >
          ADD DESTINATION
        </AppButton>
      )}
    </Stack>
  );
}

function useDestinationsForm() {
  const trip = useAppSelector(selectWizardTrip);
  const dispatch = useAppDispatch();
  const { handleSubmit, control } = useForm<FormInput>({
    defaultValues: {
      locationFrom: trip.locationFrom,
      destinations: trip.destinations,
    },
  });
  const {
    fields: destinations,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "destinations",
  });
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    dispatch(setDestinations(data.destinations));
    dispatch(setLocationFrom(data.locationFrom));
    dispatch(nextStep());
  };
  const addDestination = () => {
    append({
      id: uuidv4(),
      name: "",
    });
  };
  const removeDestination = (index: number) => {
    remove(index);
  };
  return {
    handleSubmit,
    onSubmit,
    control,
    destinations,
    addDestination,
    removeDestination,
  };
}
