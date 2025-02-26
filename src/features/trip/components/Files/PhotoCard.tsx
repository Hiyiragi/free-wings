import CloseIcon from "@mui/icons-material/Close";
import { Box, CircularProgress, Link, Stack } from "@mui/material";

import AppIconButton from "@features/ui/AppIconButton";
import { useBreakpoints } from "@hooks/useBreakpoints";

interface Props {
  src?: string | null;
  onRemoveClick: () => void;
  uploadProgress: number | undefined;
  isRemoving: boolean;
}

export default function DocumentCard({
  src,
  onRemoveClick,
  uploadProgress,
  isRemoving,
}: Props) {
  const { md } = useBreakpoints();
  return (
    <Box
      sx={{
        position: "relative",
        borderRadius: 4,
        height: "100%",
        width: "100%",
        overflow: "hiddden",
      }}
    >
      {uploadProgress != undefined && (
        <CircularProgress
          variant="determinate"
          value={uploadProgress}
          sx={{
            position: "absolute",
            top: "calc(50% - 1.25rem)",
            left: "calc(50% - 1.25rem)",
          }}
        />
      )}
      <AppIconButton
        isSmall={!md}
        variant="contained"
        aria-label="remove photo"
        onClick={onRemoveClick}
        sx={{
          position: "absolute",
          top: 12,
          right: 12,
          opacity: uploadProgress ? 0.2 : 1,
        }}
        isLoading={isRemoving}
        disabled={isRemoving}
      >
        <CloseIcon fontSize={md ? "medium" : "small"} />
      </AppIconButton>
      <Stack
        href={isRemoving ? " " : src ?? "#"}
        component={Link}
        target={isRemoving ? "_self" : "_blank"}
        rel="noopener noreferrer"
        gap={2}
        sx={{
          width: "100%",
          height: "100%",

          textDecoration: "none",
          opacity: uploadProgress ? 0.2 : 1,
        }}
      >
        <Box
          component="img"
          src={src ?? ""}
          alt="custom photo"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Stack>
    </Box>
  );
}
