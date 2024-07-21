import {
  Controller,
  type SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { Checkbox, FormHelperText, InputBase, Stack } from "@mui/material";

import { Trip } from "../type";

interface Props {
  defaultPlaces: Trip["places"];
  onSubmit: SubmitHandler<FormInput>;
  SubmitComponent: React.ReactNode;
}

interface FormInput {
  places: Trip["places"];
}

export default function PlacesForm(props: Props) {
  const { handleSubmit, control, places, errors, onInputKeyDown } =
    usePlacesForm(props);

  return (
    <Stack
      component="form"
      noValidate
      onSubmit={handleSubmit(props.onSubmit)}
      sx={{ width: "100%" }}
      gap={1}
    >
      {places.map((place, index) => (
        <Stack key={place.id}>
          <Stack gap={0.25} direction="row" key={place.id}>
            <Controller
              name={`places.${index}.isChecked`}
              control={control}
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onChange={field.onChange}
                  inputProps={{ "aria-label": "Is place visited checkbox" }}
                />
              )}
            />
            <Controller
              name={`places.${index}.name`}
              control={control}
              rules={{ required: "Please specify your destination!" }}
              render={({ field: { ref, ...field } }) => (
                <InputBase
                  autoFocus
                  inputRef={ref}
                  placeholder="Type here"
                  inputProps={{ "aria-label": "Place Name" }}
                  onKeyDown={(event) => onInputKeyDown(event, index)}
                  sx={{
                    textDecoration: place.isChecked ? "line-through" : "none",
                    width: "100%",
                  }}
                  id={`${place}.${index}`}
                  {...field}
                />
              )}
            />
          </Stack>
          {errors.places?.[index] && (
            <FormHelperText error sx={{ ml: 1.5 }}>
              {errors.places?.[index]?.name?.message}
            </FormHelperText>
          )}
        </Stack>
      ))}
      {props.SubmitComponent}
    </Stack>
  );
}

function usePlacesForm({ defaultPlaces }: Props) {
  const {
    watch,
    handleSubmit,
    setFocus,
    control,
    formState: { errors },
  } = useForm<FormInput>({
    defaultValues: {
      places: defaultPlaces,
    },
  });
  const { insert, remove } = useFieldArray({
    control,
    name: "places",
  });

  const places = watch("places");

  const onInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      insert(
        index + 1,
        {
          id: uuidv4(),
          name: "",
          isChecked: false,
        },
        { shouldFocus: true },
      );
    } else if (event.key === "Backspace") {
      if (places[index].name.length === 0 && index !== 0) {
        event.preventDefault();
        remove(index);
        setFocus(`places.${index - 1}.name`);
      }
    }
  };
  return {
    handleSubmit,
    control,
    places,
    errors,
    onInputKeyDown,
  };
}
