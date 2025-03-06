import { Component } from "react";

import { Alert, AlertTitle, Button, Typography } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  componentDidCatch(error: Error) {
    this.setState({ hasError: true, error });
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.children !== this.props.children) {
      this.setState({ hasError: false, error: null });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert variant="outlined" color="error" sx={{ mt: 2 }}>
          <AlertTitle>Something went wrong 🥲</AlertTitle>
          <Typography>
            {this.state.error?.message ?? "Please try again later!"}
          </Typography>
          <Button
            variant="contained"
            color="success"
            onClick={() => window.location.reload()}
            sx={{ mt: 1 }}
          >
            Reload
          </Button>
        </Alert>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
