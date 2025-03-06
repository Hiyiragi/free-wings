import AddIcon from "@mui/icons-material/Add";
import { Box, Link, Stack, Typography } from "@mui/material";

import { AppRoutes } from "@config/routes";
import AppButton from "@features/ui/AppButton";

import noTrips from "../../assets/noTrips.png";

export default function NoTrips() {
  return (
    <Stack
      justifyContent={{ xs: "flex-start", md: "center" }}
      alignItems="center"
      width="100%"
      height={{ xs: "auto", md: "100%" }}
      gap={2}
    >
      <Box
        component="img"
        src={noTrips}
        alt="Traveler with backpack"
        sx={{
          display: "block",
          width: 360,
        }}
      />
      <Stack gap={3} width="100%" alignItems="center">
        <Stack
          sx={{
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            mb={{
              xs: 1,
              md: 2,
            }}
          >
            No upcoming trips
          </Typography>
          <Typography color="text.secondary">
            Let's plan your next trip!
          </Typography>
        </Stack>
        <AppButton
          sx={{
            maxWidth: 445,
          }}
          fullWidth
          LinkComponent={Link}
          href={AppRoutes.addTrip}
          loading={false}
          endIcon={<AddIcon />}
        >
          Go Travel
        </AppButton>
      </Stack>
    </Stack>
  );
}
