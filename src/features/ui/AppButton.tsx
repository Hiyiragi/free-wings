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
  disabled?: boolean;
  isSmall?: boolean;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning";
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
  disabled,
  isSmall,
  color,
}: Props) {
  return (
    <LoadingButton
      disabled={disabled}
      href={href}
      LinkComponent={LinkComponent}
      type={type}
      variant={variant}
      fullWidth={fullWidth}
      loading={loading}
      onClick={onClick}
      color={color}
      sx={{
        borderRadius: 2,
        height: {
          xs: variant === "text" || isSmall ? 42 : 48,
          md: variant === "text" || isSmall ? 48 : 56,
        },
        textTransform: "none",
        ...sx,
        width: fullWidth ? "100%" : "fit-content",
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
