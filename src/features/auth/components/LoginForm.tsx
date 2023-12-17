import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";

import { Box, Link, Stack, TextField, Typography } from "@mui/material";

import { AppRoutes } from "@config/routes";
import AppButton from "@features/ui/AppButton";
import { useAppDispatch, useAppSelector } from "@store/index";

import { loginUser } from "../store/authActions";
import { selectUser } from "../store/authSlice";

interface FormInput {
  email: string;
  password: string;
}

export default function LoginForm() {
  const { handleSubmit, onSubmit, control } = useLoginForm();
  const user = useAppSelector(selectUser);
  if (user) {
    return <Navigate to={AppRoutes.dashboard} replace />;
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
            sx={{ mb: { xs: 3, md: 5 }, mt: 0 }}
            {...field}
          />
        )}
      />

      <AppButton type="submit" variant="contained" sx={{ mb: 2 }} fullWidth>
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
