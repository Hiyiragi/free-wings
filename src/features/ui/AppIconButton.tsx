import { Button, type SxProps, type Theme } from "@mui/material";

interface Props {
  isSmall: boolean;
  children: JSX.Element;
  "aria-label": string;
  onClick: () => void;
  sx: SxProps<Theme>;
}

export default function AppIconButton(props: Props) {
  return (
    <Button
      variant="outlined"
      aria-label={props["aria-label"]}
      sx={{
        borderRadius: 2,
        width: props.isSmall ? 34 : 58,
        height: props.isSmall ? 34 : 58,
        minWidth: "auto",
        ...props.sx,
      }}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
}
