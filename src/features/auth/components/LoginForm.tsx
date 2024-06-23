import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { Navigate, useLocation } from "react-router-dom";

import { Box, Link, Stack, TextField, Typography } from "@mui/material";

import { AppRoutes } from "@config/routes";
import AppButton from "@features/ui/AppButton";
import { useAppDispatch, useAppSelector } from "@store/index";

import { loginUser } from "../store/authActions";
import { selectAuth } from "../store/authSlice";

interface FormInput {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { handleSubmit, onSubmit, control } = useLoginForm();

  const auth = useAppSelector(selectAuth);
  const location = useLocation();

  if (auth.user) {
    // Send them back to the page they tried to visit when they were
    // redirected to the login page.
    const from = location.state?.from?.pathname || AppRoutes.dashboard;
    return <Navigate to={from} replace />;
  }

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: "100%" }}
    >
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
            autoFocus
            variant="standard"
            helperText={fieldState.error?.message}
            error={Boolean(fieldState.error)}
            sx={{ mb: 3 }}
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
            sx={{ mb: { xs: 3, md: 5 } }}
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
        Login
      </AppButton>
      <Stack direction="row" spacing={0.5} justifyContent="center">
        <Typography variant="body1" color="text.secondary">
          Don't have an account yet?
        </Typography>
        <Link href={AppRoutes.signUP} variant="body2">
          Sign Up
        </Link>
      </Stack>
    </Box>
  );
}

function useLoginForm() {
  const dispatch = useAppDispatch();

  const { handleSubmit, control } = useForm<FormInput>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FormInput> = (data) => {
    dispatch(
      loginUser({
        password: data.password,
        email: data.email,
      }),
    );
  };
  return {
    handleSubmit,
    onSubmit,
    control,
  };
}
