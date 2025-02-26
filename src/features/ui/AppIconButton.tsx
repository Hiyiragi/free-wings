import { LoadingButton } from "@mui/lab";
import { type SxProps, type Theme } from "@mui/material";

interface Props {
  isSmall?: boolean;
  children: JSX.Element;
  "aria-label": string;
  onClick: () => void;
  sx?: SxProps<Theme>;
  disabled: boolean;
  variant?: "outlined" | "contained";
  isLoading?: boolean;
}

export default function AppIconButton(props: Props) {
  return (
    <LoadingButton
      loading={props.isLoading}
      variant={props.variant ?? "outlined"}
      aria-label={props["aria-label"]}
      sx={{
        borderRadius: 2,
        width: { xs: props.isSmall ? 34 : 48, md: props.isSmall ? 34 : 58 },
        height: { xs: props.isSmall ? 34 : 48, md: props.isSmall ? 34 : 58 },
        minWidth: "auto",
        ...props.sx,
      }}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </LoadingButton>
  );
}
