import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

import { Box, Link, Stack, TextField, Typography } from "@mui/material";

import { AppRoutes } from "@config/routes";
import AppButton from "@features/ui/AppButton";
import { auth } from "@services/firebase";
import { useAppDispatch, useAppSelector } from "@store/index";

import { registerUser } from "../store/authActions";

import { selectAuth, setUserName, selectUser } from "../store/authSlice";


interface FormInput {
  email: string;
  password: string;
  name: string;
  passwordRepeat: string;
}

export default function SignUpForm() {
  const { handleSubmit, onSubmit, password, control } = useSignUpForm();

  const auth = useAppSelector(selectAuth);
  if (auth.user) {

  const user = useAppSelector(selectUser);
  if (user) {

    return <Navigate to={AppRoutes.dashboard} replace />;
  }
  return (
    <>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: "100%" }}
      >
        <Controller
          name="name"
          control={control}
          rules={{ required: "Please specify your name!" }}
          render={({ field, fieldState }) => (
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              autoComplete="name"
              autoFocus
              variant="standard"
              helperText={fieldState.error?.message}
              error={Boolean(fieldState.error)}
              sx={{ mb: 3, mt: 0 }}
              {...field}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          rules={{ required: "Please specify email address!" }}
          render={({ field, fieldState }) => (
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              variant="standard"
              helperText={fieldState.error?.message}
              error={Boolean(fieldState.error)}
              sx={{ mb: 3, mt: 0 }}
              {...field}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{ required: "Please specify your password!" }}
          render={({ field, fieldState }) => (
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              variant="standard"
              helperText={fieldState.error?.message}
              error={Boolean(fieldState.error)}
              sx={{ mb: 3, mt: 0 }}
              {...field}
            />
          )}
        />

        <Controller
          name="passwordRepeat"
          control={control}
          rules={{
            required: "Please confirm your password!",
            validate: (confirmPassword) =>
              confirmPassword !== password
                ? "Password doesn't match!"
                : undefined,
          }}
          render={({ field, fieldState }) => (
            <TextField
              margin="normal"
              required
              fullWidth
              label="Confirm Password"
              type="password"
              id="passwordRepeat"
              autoComplete="current-password"
              variant="standard"
              helperText={fieldState.error?.message}
              error={Boolean(fieldState.error)}
              sx={{ mb: { xs: 3, md: 5 }, mt: 0 }}
              {...field}
            />
          )}
        />


        <AppButton
          loading={auth.status === "loading"}
          type="submit"
          variant="contained"
          sx={{ mb: 2 }}
          fullWidth
        >

       
          Sign up
        </AppButton>
        <Stack direction="row" spacing={0.5} justifyContent="center">
          <Typography variant="body1" color="text.secondary">
            Do you have an account already?
          </Typography>
          <Link href={AppRoutes.login} variant="body2">
            Login
          </Link>
        </Stack>
      </Box>
    </>
  );
}

function useSignUpForm() {
  const dispatch = useAppDispatch();
  const { handleSubmit, control, watch } = useForm<FormInput>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordRepeat: "",
    },
  });
  const password = watch("password");
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    await dispatch(
      registerUser({
        name: data.name,
        password: data.password,
        email: data.email,
      }),
    ).unwrap();
    dispatch(setUserName(auth.currentUser?.displayName));
  };
  return {
    handleSubmit,
    onSubmit,
    password,
    control,
  };
}
