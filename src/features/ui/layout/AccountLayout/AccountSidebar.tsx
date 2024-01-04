import { NavLink } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  Avatar,
  Box,
  ButtonBase,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Stack,
  Typography,
} from "@mui/material";

import { AppRoutes } from "@config/routes/AppRoutes";
import { Colors, theme } from "@config/styles";
import { selectUser } from "@features/auth/store/authSlice";
import AppButton from "@features/ui/AppButton";
import Logo from "@features/ui/logo/Logo";
import { useBreakpoints } from "@hooks/useBreakpoints";
import { logout } from "@services/api";
import { useAppSelector } from "@store/index";

import { ACCOUNT_LINKS } from "./data";

interface Props {
  onClose: () => void;
  isMinimized?: boolean;
}

export default function AccountSidebar({ isMinimized, onClose }: Props) {
  const { md } = useBreakpoints();
  const user = useAppSelector(selectUser);
  const userInitial = user?.displayName?.[0];

  const onLinkClick = () => {
    if (!md) {
      onClose();
    }
  };

  const onLogout = () => {
    logout();
  };
  return (
    <Stack
      sx={{
        justifyContent: "space-between",
        height: "100%",
        py: 3,
        px: 2,
      }}
    >
      <Box>
        <Box mb={6}>
          <Logo isMinimized={isMinimized} />
        </Box>
        <Stack
          direction="row"
          gap={3}
          mb={4}
          alignItems="center"
          justifyContent={isMinimized ? "center" : "flex-start"}
        >
          <Avatar sx={{ height: 48, width: 48, background: Colors.disabled }}>
            {userInitial}
          </Avatar>
          {!isMinimized && <Typography variant="body1">Andrew</Typography>}
        </Stack>
        <List>
          {ACCOUNT_LINKS.map(({ Icon, text, path }) => (
            <ListItem key={text} disablePadding>
              <NavLink
                to={path}
                style={{
                  width: "100%",
                  textDecoration: "none",
                }}
                onClick={onLinkClick}
              >
                {({ isActive }) => (
                  <ListItemButton
                    sx={{
                      borderRadius: 2,
                      mb: 1,
                      background: isActive
                        ? Colors.secondaryGreen
                        : "transparent",
                      color: isActive
                        ? theme.palette.primary.main
                        : theme.palette.text.primary,
                      px: isMinimized ? 1 : 2,
                      justifyContent: isMinimized ? "center" : "flex-start",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: isActive
                          ? theme.palette.primary.main
                          : theme.palette.text.secondary,
                        minWidth: isMinimized ? "inherit" : 56,
                      }}
                    >
                      <Icon fontSize="large" />
                    </ListItemIcon>
                    {!isMinimized && (
                      <Typography variant={isActive ? "body2" : "body1"}>
                        {text}
                      </Typography>
                    )}
                  </ListItemButton>
                )}
              </NavLink>
            </ListItem>
          ))}
        </List>
        <AppButton
          sx={{ mt: 2 }}
          LinkComponent={Link}
          fullWidth
          variant="contained"
          href={AppRoutes.addTrip}
          loading={false}
          onClick={onLinkClick}
        >
          <Stack
            component="span"
            direction="row"
            gap={1}
            justifyContent="center"
            alignItems="center"
          >
            {!isMinimized && "Go Travel"} <AddIcon />
          </Stack>
        </AppButton>
      </Box>
      <ButtonBase
        sx={{ height: 51, px: 2, py: 1, width: "fit-content", borderRadius: 2 }}
        onClick={onLogout}
      >
        <LogoutIcon sx={{ mr: isMinimized ? 0 : 4, color: "text.secondary" }} />
        {!isMinimized && (
          <Typography component="span" variant="body1">
            Logout
          </Typography>
        )}
      </ButtonBase>
    </Stack>
  );
}
