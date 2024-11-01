import { useEffect, useRef } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import AppIconButton from "@features/ui/AppIconButton";

import { EXPENSE_ICON_BY_CATEGORY } from "../../data";
import type { Trip } from "../../type";
import ExpenseCategoryIcon from "./ExpenseCategoryIcon";

interface Props {
  expenses: Trip["expenses"];
  onDelete: (expenseId: string) => void;
}

export default function ExpensesTable({ expenses, onDelete }: Props) {
  const bottomBoxRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    bottomBoxRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [expenses]);
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography component="span" variant="subtitle2">
                Category
              </Typography>
            </TableCell>
            <TableCell>
              <Typography component="span" variant="subtitle2">
                Description
              </Typography>
            </TableCell>
            <TableCell>
              <Typography component="span" variant="subtitle2">
                Amount
              </Typography>
            </TableCell>
            <TableCell>
              <Typography component="span" variant="subtitle2">
                Action
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((expense) => {
            const iconInfo = EXPENSE_ICON_BY_CATEGORY[expense.category];
            return (
              <TableRow
                key={expense.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>
                  <Stack component="span" alignItems="center" direction="row">
                    <ExpenseCategoryIcon
                      category={expense.category}
                      color={iconInfo.color}
                      backgroundColor={iconInfo.backgroundColor}
                      borderColor="transparent"
                      isSmall
                    >
                      {<iconInfo.icon fontSize="large" />}
                    </ExpenseCategoryIcon>
                    <Typography component="span" variant="subtitle1">
                      {expense.category}
                    </Typography>
                  </Stack>
                </TableCell>
                <TableCell sx={{ width: 200, maxWidth: 200 }}>
                  <Typography
                    component="span"
                    variant="subtitle1"
                    sx={{ wordWrap: "break-word" }}
                  >
                    {expense.description}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component="span" variant="subtitle1">
                    ${expense.amount}
                  </Typography>
                </TableCell>
                <TableCell>
                  <AppIconButton
                    aria-label="Remove Expense"
                    onClick={() => onDelete(expense.id)}
                  >
                    <DeleteIcon />
                  </AppIconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Box ref={bottomBoxRef} />
    </TableContainer>
  );
}
