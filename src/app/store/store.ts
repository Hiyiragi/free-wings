import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@features/auth/store/authSlice";

import { rtkQueryErrorLogger } from "./middleware/errorMiddleware";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(rtkQueryErrorLogger),
});
