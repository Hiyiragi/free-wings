import { enqueueSnackbar } from "notistack";

import { isAction, isRejectedWithValue } from "@reduxjs/toolkit";
import type { Middleware } from "@reduxjs/toolkit";

// 类型守卫: 确保 action.error 存在并具有正确的类型
function hasErrorField(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: any,
): action is { error: { name?: string; message?: string } } {
  return action && typeof action.error === "object" && action.error !== null;
}

// 类型守卫: 确保 action.payload 存在
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function hasPayload(action: any): action is { payload: string } {
  return action && typeof action.payload === "string";
}

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isAction(action)) {
    if (isRejectedWithValue(action) || hasErrorField(action)) {
      if (action.error?.name === "ConditionError") return;

      enqueueSnackbar(
        hasPayload(action)
          ? action.payload
          : action.error?.message ?? "Something went wrong!",
        {
          variant: "error",
        },
      );
    }
  }

  return next(action);
};
