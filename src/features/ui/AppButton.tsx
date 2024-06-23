import LoadingButton from "@mui/lab/LoadingButton";
import { type SxProps, type Theme, Typography } from "@mui/material";

interface Props {
  type?: "button" | "submit" | "reset";
  variant?: "text" | "contained" | "outlined";
  fullWidth?: boolean;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
  loading?: boolean;
  LinkComponent?: React.ElementType;
  href?: string;
  onClick?: () => void;
  endIcon?: React.ReactNode;
  startIcon?: React.ReactNode;
}

export default function AppButton({
  href,
  LinkComponent,
  type = "button",
  variant = "contained",
  children,
  fullWidth,
  sx,
  endIcon,
  loading,
  startIcon,
  onClick,
}: Props) {
  return (
    <LoadingButton
      href={href}
      LinkComponent={LinkComponent}
      type={type}
      variant={variant}
      fullWidth={fullWidth}
      loading={loading}
      onClick={onClick}
      sx={{
        borderRadius: 2,
        height: { xs: 48, md: 56 },
        textTransform: "none",
        ...sx,
      }}
      endIcon={endIcon}
      startIcon={startIcon}
    >
      <Typography variant="body2" component="span">
        {children}
      </Typography>
    </LoadingButton>
  );
}
