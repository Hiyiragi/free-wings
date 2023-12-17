import { Button, type SxProps, type Theme, Typography } from "@mui/material";

interface Props {
  type: "button" | "submit" | "reset";
  variant?: "text" | "contained" | "outlined";
  fullWidth?: boolean;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

export default function AppButton({
  type,
  variant = "contained",
  children,
  fullWidth,
  sx,
}: Props) {
  return (
    <Button
      type={type}
      variant={variant}
      fullWidth={fullWidth}
      sx={{
        borderRadius: 2,
        height: { xs: 48, md: 56 },
        textTransform: "none",
        ...sx,
      }}
    >
      <Typography variant="body2" component="span">
        {children}
      </Typography>
    </Button>
  );
}