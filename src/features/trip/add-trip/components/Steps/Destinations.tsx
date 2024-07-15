import { Controller, type SubmitHandler, useForm } from "react-hook-form";

import { Stack, TextField } from "@mui/material";

import { useAppSelector } from "@store/index";

import { Trip } from "../../../type";
import { selectWizardTrip } from "../../store/tripWizardSlice";
import Pagination from "../Navigation/Pagination";

export interface FormInput {
  locationFrom: Trip["locationFrom"];
}

export default function Destinations() {
  const { handleSubmit, onSubmit, control } = useTravelInfoForm();

  return (
    <Stack
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: "100%" }}
      gap={3}
    >
      <Controller
        name="locationFrom"
        control={control}
        render={({ field: { ref, ...field }, fieldState }) => (
          <TextField
            inputRef={ref}
            margin="normal"
            required
            fullWidth
            id="locationFrom"
            label="LocationFrom"
            variant="standard"
            helperText={
              fieldState.error?.message ?? `${field.value.length}/200`
            }
            error={Boolean(fieldState.error)}
            {...field}
          />
        )}
      />
      <Pagination />
      {/* <PreviewImageDialog
        isOpen={isOpen}
        onSave={onPrimaryButtonClick}
        onClose={close}
      /> */}
    </Stack>
  );
}

function useTravelInfoForm() {
  const trip = useAppSelector(selectWizardTrip);
  const { handleSubmit, control, watch } = useForm<FormInput>({
    defaultValues: {
      locationFrom: trip.locationFrom,
    },
  });
  const formValues = watch();
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    //TODO: save Step Info
    console.log(data);
  };
  return {
    handleSubmit,
    onSubmit,
    control,
    formValues,
  };
}
