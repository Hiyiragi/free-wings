import { useState } from "react";
import {
  Controller,
  type SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import AddIcon from "@mui/icons-material/Add";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import {
  Checkbox,
  Grid,
  IconButton,
  InputBase,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { Colors } from "@config/styles";
import AppButton from "@features/ui/AppButton";

import { Trip } from "../type";

interface Props {
  defaultPackingLists: Trip["packingLists"];
  onSubmit: SubmitHandler<FormInput>;
  SubmitComponent: React.ReactNode;
}

interface FormInput {
  packingLists: Trip["packingLists"];
}

export default function PackingListsForm(props: Props) {
  const {
    handleSubmit,
    control,
    packingLists,

    onInputKeyDown,
    newListName,
    setNewListName,
    onAddPackingListClick,
    onRemovePackingListClick,
    onNewListInputKeyDown,
  } = usePackingListsForm(props);

  return (
    <Stack
      component="form"
      noValidate
      onSubmit={handleSubmit(props.onSubmit)}
      sx={{ width: "100%" }}
      gap={3}
    >
      <Stack gap={1}>
        <TextField
          label="List title"
          value={newListName}
          onChange={(event) => {
            setNewListName(event.target.value);
          }}
          inputProps={{
            autoFocus: true,
            onKeyDown: (event) => onNewListInputKeyDown(event),
          }}
          variant="standard"
          placeholder="👕 Clothes"
        />
        <AppButton
          disabled={!newListName}
          variant="text"
          startIcon={<AddIcon />}
          onClick={onAddPackingListClick}
          sx={{
            textTransform: "uppercase",
          }}
        >
          Add Checklist
        </AppButton>
      </Stack>
      <Grid container columns={{ xs: 1, md: 3, xl: 4 }} rowGap={2}>
        {packingLists.map((packingList, packingListIndex) => (
          <Grid
            item
            key={packingList.id}
            xs={1}
            sx={{
              borderRight: { xs: "none", md: 1 },
              borderBottom: { xs: 1, md: "none" },
              borderColor: "grey.200",
              pb: { xs: 2, md: 0 },
              px: { md: 2 },
              minHeight: { xs: 194, md: "auto" },
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              pl={1}
              pb={{ md: 0.5 }}
            >
              <Typography variant="body2">{packingList.name}</Typography>
              <IconButton
                onClick={() => onRemovePackingListClick(packingListIndex)}
                sx={{
                  mr: { xs: 1, md: 0 },
                }}
              >
                <DeleteOutlinedIcon
                  sx={{
                    color: Colors.secondaryBlue,
                  }}
                />
              </IconButton>
            </Stack>
            <Stack gap={1}>
              {packingList?.items?.map((item, itemIndex) => (
                <Stack direction="row" key={item.id}>
                  <Controller
                    name={`packingLists.${packingListIndex}.items.${itemIndex}.isChecked`}
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onChange={field.onChange}
                        inputProps={{
                          "aria-label": "Is packing list item checked",
                        }}
                      />
                    )}
                  />
                  <Controller
                    name={`packingLists.${packingListIndex}.items.${itemIndex}.text`}
                    control={control}
                    render={({ field: { ref, ...field } }) => (
                      <InputBase
                        inputRef={ref}
                        placeholder="Type here"
                        inputProps={{ "aria-label": "Packing List Item Name" }}
                        onKeyDown={(event) =>
                          onInputKeyDown(event, packingListIndex, itemIndex)
                        }
                        sx={{
                          textDecoration: item.isChecked
                            ? "line-through"
                            : "none",
                          width: "100%",
                        }}
                        id={`${packingList}.${packingListIndex}.items.${itemIndex}.id`}
                        {...field}
                      />
                    )}
                  />
                  {/* {errors.packingLists?.[packingListIndex]?.items?.[
                    itemIndex
                  ] && (
                    <FormHelperText error sx={{ ml: 1.5 }}>
                      {
                        errors.packingLists?.[packingListIndex]?.items?.[
                          itemIndex
                        ]?.text?.message
                      }
                    </FormHelperText>
                  )} */}
                </Stack>
              ))}
            </Stack>
          </Grid>
        ))}
      </Grid>
      {props.SubmitComponent}
    </Stack>
  );
}

function usePackingListsForm({ defaultPackingLists }: Props) {
  const [newListName, setNewListName] = useState("");
  const { watch, handleSubmit, setFocus, control } = useForm<FormInput>({
    defaultValues: {
      packingLists: defaultPackingLists,
    },
  });
  const { append, remove, update } = useFieldArray({
    control,
    name: "packingLists",
  });

  const onAddPackingListClick = () => {
    if (!newListName) {
      return;
    }
    append({
      id: uuidv4(),
      name: newListName,
      items: [{ id: uuidv4(), text: "", isChecked: false }],
    });
    setNewListName("");
  };

  const onRemovePackingListClick = (packingListIndex: number) => {
    remove(packingListIndex);
  };

  const onNewListInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onAddPackingListClick();
    }
  };

  const packingLists = watch("packingLists");

  const onInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    packingListIndex: number,
    itemIndex: number,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const newItems = [...packingLists[packingListIndex].items];
      newItems.splice(itemIndex + 1, 0, {
        id: uuidv4(),
        text: "",
        isChecked: false,
      });
      update(packingListIndex, {
        ...packingLists[packingListIndex],
        items: newItems,
      });
      setTimeout(() => {
        setFocus(
          `packingLists.${packingListIndex}.items.${itemIndex + 1}.text`,
        );
      }, 0);
    } else if (event.key === "Backspace") {
      if (
        !packingLists[packingListIndex].items[itemIndex].text &&
        packingLists[packingListIndex].items.length > 1
      ) {
        event.preventDefault();
        const newItems = [...packingLists[packingListIndex].items];
        newItems.splice(itemIndex, 1);
        update(packingListIndex, {
          ...packingLists[packingListIndex],
          items: newItems,
        });
        setTimeout(() => {
          setFocus(
            `packingLists.${packingListIndex}.items.${
              itemIndex === 0 ? 0 : itemIndex - 1
            }.text`,
          );
        }, 0);
      }
    }
  };
  return {
    handleSubmit,
    control,
    packingLists,
    onInputKeyDown,
    newListName,
    setNewListName,
    onAddPackingListClick,
    onRemovePackingListClick,
    onNewListInputKeyDown,
  };
}
