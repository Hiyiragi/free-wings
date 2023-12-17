export function mapAuthCodeToMessage(errorCode: string) {
  let errorMessage = "An unknown error occurred, please try again";
  switch (errorCode) {
    case "auth/email-already-exists":
      errorMessage = "User with this email address already exists";
      break;
    case "auth/invalid-email":
      errorMessage = "Please specify a valid email address";
      break;
    case "auth/weak-password":
      errorMessage = "Your password is too weak, please use a more complex one";
      break;
    case "auth/too-many-requests":
      errorMessage = "Too many requests, please try again in 5 minutes";
      break;
    case "auth/email-already-in-use":
      errorMessage = "You already have an account, please log in";
      break;
    case "auth/user-not-found":
    case "auth/wrong-password":
      errorMessage = "Invalid email or password";
      break;
    default:
      errorMessage = "An error occurred";
      break;
  }

  return errorMessage;
}
