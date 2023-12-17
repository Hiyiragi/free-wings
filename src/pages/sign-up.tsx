import { Typography } from "@mui/material";

import { APP_NAME } from "@config/constants";
import SignUpForm from "@features/auth/components/SignUpForm";

export default function SignupPage() {
  return (
    <>
      <Typography component="h1" variant="h2" mb={1}>
        Sign Up
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        Become a user of {APP_NAME}
      </Typography>
      <SignUpForm />
    </>
  );
}
