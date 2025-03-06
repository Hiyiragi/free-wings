import AddIcon from "@mui/icons-material/Add";
import { Box, CircularProgress, Link, Stack, Typography } from "@mui/material";

import { AppRoutes } from "@config/routes";
import AppButton from "@features/ui/AppButton";

import { useGetTripsQuery } from "../../store/tripsApi";
import NoTrips from "./NoTrips";
import TripsList from "./TripsList";

export default function AllTrips() {
  const {
    data: trips,
    isError,
    isLoading,
    isSuccess,
    error,
  } = useGetTripsQuery();

  if (isLoading) {
    return (
      <Stack justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Stack>
    );
  } else if (isSuccess) {
    if (trips.length == 0) {
      return <NoTrips />;
    }
    return (
      <Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={{
            xs: 2,
            md: 3,
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{
              py: {
                xs: 1,
                md: 0,
              },
            }}
          >
            All Trips
          </Typography>
          <AppButton
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
            }}
            LinkComponent={Link}
            href={AppRoutes.addTrip}
            loading={false}
            endIcon={<AddIcon />}
          >
            Go Travel
          </AppButton>
        </Stack>
        <TripsList trips={trips} />
      </Box>
    );
  } else if (isError) {
    throw error;
  }

  return null;
}
