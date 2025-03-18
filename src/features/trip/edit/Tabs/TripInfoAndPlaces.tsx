import debounce from "lodash.debounce";
import { useCallback, useEffect } from "react";
import { Controller, type UseFormWatch, useForm } from "react-hook-form";

import PaidIcon from "@mui/icons-material/Paid";
import { InputLabel, Stack, TextField, Typography } from "@mui/material";

import { Colors } from "@config/styles";
import PlacesForm from "@features/trip/components/PlacesFrom";
import DateSelectInput from "@features/ui/form/DateSelectInput";

import type { Trip } from "../../type";
import ContentCard from "./ContentCard";

export interface FormInput {
  name: Trip["name"];
  description: Trip["description"];
  startDate: Trip["startDate"];
  endDate: Trip["endDate"];
}

interface Props {
  trip: Trip;
  onUpdate: (data: Partial<Trip>) => void;
}

export default function TripInfoAndPlaces(props: Props) {
  const totalBudget: number = 360;
  const { control, formValues } = useTravelInfoForm(props);

  const onPlacesChange = (newPlaces: Trip["places"]) => {
    props.onUpdate({
      places: newPlaces,
    });
  };

  return (
    <Stack gap={3}>
      <ContentCard title="Trip Details">
        <Stack component="form" noValidate sx={{ width: "100%" }} gap={3}>
          <Stack direction={{ xs: "column", md: "row" }} gap={3}>
            <Stack sx={{ width: "100%" }} gap={3}>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Please specify trip name!" }}
                render={({ field: { ref, ...field }, fieldState }) => (
                  <TextField
                    inputRef={ref}
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Trip Name"
                    variant="standard"
                    helperText={fieldState.error?.message}
                    error={Boolean(fieldState.error)}
                    {...field}
                  />
                )}
              />
              <Stack direction="row" gap={2}>
                <DateSelectInput
                  control={control}
                  name="startDate"
                  requireErrorText="Please specify start date!"
                  maxDate={formValues.endDate}
                  label="Start date"
                  fullWidth={false}
                  sx={{
                    svg: {
                      color: Colors.secondaryBlue,
                    },
                    maxWidth: 150,
                  }}
                />
                <DateSelectInput
                  control={control}
                  name="endDate"
                  requireErrorText="Please specify end date!"
                  minDate={formValues.startDate}
                  label="End date"
                  fullWidth={false}
                  sx={{
                    svg: {
                      color: Colors.secondaryBlue,
                    },
                    maxWidth: 150,
                  }}
                />
                <Stack gap={0.5}>
                  <InputLabel
                    sx={{
                      fontSize: "0.875rem",
                      lineHeight: "1.313rem",
                    }}
                  >
                    Budget
                  </InputLabel>
                  <Stack direction="row" gap={1}>
                    <PaidIcon
                      sx={{
                        color: Colors.secondaryBlue,
                      }}
                    />
                    <Typography variant="subtitle1">${totalBudget}</Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          <Controller
            name="description"
            control={control}
            render={({ field: { ref, ...field }, fieldState }) => (
              <TextField
                inputRef={ref}
                margin="normal"
                fullWidth
                id="description"
                label="Description"
                multiline
                maxRows={6}
                inputProps={{ maxLength: 200 }}
                variant="standard"
                helperText={
                  fieldState.error?.message ?? `${field.value.length}/200`
                }
                error={Boolean(fieldState.error)}
                {...field}
              />
            )}
          />
        </Stack>
      </ContentCard>
      <ContentCard title="Places">
        <PlacesForm
          defaultPlaces={props.trip.places}
          onChange={onPlacesChange}
          autoFocus={false}
        />
      </ContentCard>
    </Stack>
  );
}

function useTravelInfoForm({ trip, onUpdate }: Props) {
  const { control, watch } = useForm<FormInput>({
    defaultValues: {
      name: trip.name,
      description: trip.description,
      startDate: trip.startDate,
      endDate: trip.endDate,
    },
  });
  const formValues = watch();

  useWatchChange(onUpdate, watch);

  return {
    control,
    formValues,
  };
}

function useWatchChange(
  onUpdate: (data: Partial<Trip>) => void,
  watch: UseFormWatch<FormInput>,
) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onUpdateDebounced = useCallback(
    debounce((data: Partial<Trip>) => {
      onUpdate(data);
    }, 500),
    [],
  );

  useEffect(() => {
    const formUpdateSubcription = watch((newValues) => {
      onUpdateDebounced(newValues);
    });

    return () => formUpdateSubcription.unsubscribe();
  }, [onUpdateDebounced, watch]);
}
