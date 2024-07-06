import { Controller, type SubmitHandler, useForm } from "react-hook-form";

import ImageSearchIcon from "@mui/icons-material/ImageSearch";
import { ButtonBase, Stack, TextField, Typography } from "@mui/material";

import { Colors } from "@config/styles";
import DateSelectInput from "@features/ui/form/DateSelectInput";
import useDialog from "@services/firebase/hooks/useDialog";

import PreviewImageDialog from "../../../components/PreviewImageDialog";
import Pagination from "../Navigation/Pagination";

export interface FormInput {
  previewImage: string | null;
  name: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
}

export default function TravelInfoForm() {
  const { handleSubmit, onSubmit, control, formValues } = useTravelInfoForm();
  const { isOpen, close, toggle, open } = useDialog(false);

  return (
    <Stack
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: "100%" }}
      gap={3}
    >
      <Stack direction={{ xs: "column", md: "row" }} gap={3}>
        <ButtonBase
          onClick={open}
          sx={{
            border: 1,
            borderColor: "text.secondary",
            minWidth: { xs: "100%", md: 152 },
            height: 152,
            borderRadius: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 0.5,
          }}
        >
          <ImageSearchIcon sx={{ color: Colors.disabled }} />
          <Typography variant="subtitle1" color={Colors.disabled}>
            Preview Image
          </Typography>
        </ButtonBase>
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
                autoFocus
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
              requiredErrorText="Please specify start date!"
              maxDate={formValues.endDate}
              label="Start date"
            />
            <DateSelectInput
              control={control}
              name="endDate"
              requiredErrorText="Please specify end date!"
              minDate={formValues.startDate}
              label="End date"
            />
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
            required
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
      <Pagination />
      <PreviewImageDialog isOpen={isOpen} toggle={toggle} onClose={close} />
    </Stack>
  );
}

function useTravelInfoForm() {
  const { handleSubmit, control, watch } = useForm<FormInput>({
    defaultValues: {
      previewImage: null,
      name: "",
      description: "",
      startDate: null,
      endDate: null,
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
