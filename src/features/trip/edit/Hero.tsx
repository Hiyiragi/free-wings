import { Box, Stack, Typography } from "@mui/material";

import { usePreviewImageSrc } from "../hooks/usePreviewImageSrc";
import type { Trip } from "../type";

interface Props {
  trip: Trip;
}

export default function Hero({ trip }: Props) {
  const previewImageSrc = usePreviewImageSrc(trip.previewImage);
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{
        mt: 2,
        mb: {
          xs: 2,
          md: 3,
        },
        width: "100%",
        height: {
          xs: 181,
          md: 241,
        },
        borderRadius: 4,
        overflow: "hidden",
        position: "relative",
        "&:before": {
          content: '""',
          display: "block",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url("${previewImageSrc}")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
        }}
      >
        <Typography variant="h2" color="white">
          {trip.name}
        </Typography>
      </Box>
    </Stack>
  );
}
