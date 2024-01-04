import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "@store/types";

import { loginUser, registerUser } from "./authActions";

interface UserInfo {
  displayName: string | null | undefined;
  email: string;
  uid: string;
}

export interface AuthState {
  user: UserInfo | null;
  status: "loading" | "idle" | "failed" | "succeeded";
  error?: string | null;
}

const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoaded(state, action: PayloadAction<UserInfo>) {
      state.user = action.payload;
      state.status = "succeeded";
      state.error = null;
    },
    logout(state) {
      state.user = null;
      state.status = "succeeded";
      state.error = null;
    },
    setUserName(state, action: PayloadAction<string | null | undefined>) {
      if (state.user) {
        state.user.displayName = action.payload;
      }
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null; //reset of the error when using the function again we dont show the previous error
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      }),
});

// Action creators are generated for each case reducer function
export const { userLoaded, logout, setUserName } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
