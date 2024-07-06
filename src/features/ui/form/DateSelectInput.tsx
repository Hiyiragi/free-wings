import { type Control, Controller } from "react-hook-form";

import { DatePicker } from "@mui/x-date-pickers";

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any, unknown>;
  name: string;
  requiredErrorText?: string;
  maxDate?: Date | null;
  minDate?: Date | null;
  label: string;
}

export default function DateSelectInput({
  control,
  name,
  requiredErrorText,
  maxDate,
  label,
  minDate,
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: requiredErrorText }}
      render={({ field: { ref, ...field }, fieldState }) => (
        <DatePicker
          inputRef={ref}
          label={label}
          slotProps={{
            textField: {
              variant: "standard",
              inputRef: ref,
              helperText: fieldState.error?.message,
              error: Boolean(fieldState.error),
            },
            inputAdornment: { position: "start" },
          }}
          {...field}
          sx={{
            width: "100%",
            "& .MuiSvgIcon-root": { ml: 0.1 },
          }}
          maxDate={maxDate}
          minDate={minDate}
        />
      )}
    />
  );
}
