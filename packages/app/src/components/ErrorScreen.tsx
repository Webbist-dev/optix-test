import React, { useState } from "react";
import {
  Alert,
  AlertTitle,
  Stack,
  Button,
  Snackbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";

interface ErrorScreenProps {
  error: Error | null;
  onRetry: () => void;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ error, onRetry }) => {
  const [showAlert, setShowAlert] = useState<boolean>(!!error);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  if (!error) return null;

  return (
    <Stack spacing={2} alignItems="center">
      <Typography variant="h6" mb={2}>
        Oops! Something went wrong.
      </Typography>
      <SentimentDissatisfiedIcon fontSize="large" color="error" />
      <Button
        onClick={onRetry}
        color="primary"
        variant="contained"
        sx={{ mt: 2 }}
      >
        Retry?
      </Button>
      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{
          vertical: isDesktop ? "top" : "bottom",
          horizontal: isDesktop ? "right" : "center",
        }}
      >
        <Alert severity="error" onClose={() => setShowAlert(false)}>
          <AlertTitle>Error</AlertTitle>
          {error.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default ErrorScreen;
