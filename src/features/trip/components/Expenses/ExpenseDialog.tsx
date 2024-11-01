import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import {
  Box,
  FormHelperText,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { useBreakpoints } from "@hooks/useBreakpoints";

import AppDialog from "../../../ui/AppDialog";
import { EXPENSES_CATEGORIES, EXPENSE_ICON_BY_CATEGORY } from "../../data";
import type { Expense } from "../../type";
import ExpenseCategoryIcon from "./ExpenseCategoryIcon";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (addedExpense: Expense) => void;
}

interface FormInput {
  category: Expense["category"];
  amount: Expense["amount"];
  description: Expense["description"];
}

export default function ExpenseDialog({ isOpen, onClose, onSave }: Props) {
  const { md } = useBreakpoints();
  const {
    control,
    onSubmit,
    handleSubmit,
    errors,
    register,
    selectedCategory,
    onCategoryClick,
    onReset,
  } = useExpenseForm({
    onSave,
    isOpen,
    onClose,
  });
  return (
    <AppDialog
      title="Add expense"
      isOpen={isOpen}
      onClose={onReset}
      primaryButtonText="Save"
      isForm
      onPrimaryButtonClick={handleSubmit(onSubmit)}
      maxWidth={684}
    >
      <Stack sx={{ width: "100%" }} gap={4}>
        <Box>
          <Grid
            container={!md}
            display={{ md: "flex", xs: "grid" }}
            gridTemplateColumns="repeat(3, 75px)"
            columnGap={{ xs: 5, sm: 20, md: 0 }}
            justifyContent="space-between"
            rowGap={2}
          >
            {EXPENSES_CATEGORIES.map(({ id, category }) => {
              const iconInfo = EXPENSE_ICON_BY_CATEGORY[category];
              return (
                <Grid
                  item
                  gap={1}
                  alignItems="center"
                  display="flex"
                  flexDirection="column"
                  key={id}
                >
                  <ExpenseCategoryIcon
                    color={iconInfo.color}
                    backgroundColor={iconInfo.backgroundColor}
                    borderColor={
                      selectedCategory === category
                        ? EXPENSE_ICON_BY_CATEGORY[category].color
                        : "white"
                    }
                    onClick={() => onCategoryClick(category)}
                    category={category}
                  >
                    {<iconInfo.icon fontSize="large" />}
                  </ExpenseCategoryIcon>
                  <Typography variant="subtitle1">{category}</Typography>
                </Grid>
              );
            })}
          </Grid>
          <input
            type="hidden"
            {...register("category", {
              required: "please select a category",
            })}
          />
          {errors.category && (
            <FormHelperText error>{errors.category?.message}</FormHelperText>
          )}
        </Box>
        <Stack gap={3}>
          <Controller
            name="amount"
            control={control}
            rules={{
              required: "Please specify the amount!",
              validate: {
                positiveNumber: (value) =>
                  value > 0 ? undefined : "Amount should be greater than zero",
              },
            }}
            render={({ field: { ref, ...field }, fieldState }) => (
              <TextField
                type="number"
                inputRef={ref}
                margin="normal"
                fullWidth
                id="amount"
                label="Amount"
                variant="standard"
                helperText={fieldState.error?.message}
                error={Boolean(fieldState.error)}
                {...field}
              />
            )}
          />
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
      </Stack>
    </AppDialog>
  );
}

function useExpenseForm({ onSave, onClose }: Props) {
  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
    setValue,
    watch,
    reset,
    resetField,
    trigger,
  } = useForm<FormInput>({
    defaultValues: {
      amount: 0,
      description: "",
      category: undefined,
    },
  });

  const selectedCategory = watch("category");

  const onReset = () => {
    resetField("category");
    reset();
    onClose();
  };

  const onCategoryClick = (category: Expense["category"]) => {
    setValue("category", category);
    trigger("category");
  };

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    onSave({ id: uuidv4(), ...data });
    onReset();
  };
  return {
    handleSubmit,
    onSubmit,
    control,
    errors,
    register,
    setValue,
    selectedCategory,
    onCategoryClick,
    onReset,
  };
}
