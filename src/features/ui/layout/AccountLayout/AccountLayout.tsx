import { useState } from "react";
import { Outlet } from "react-router-dom";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  type CSSObject,
  Drawer,
  IconButton,
  type Theme,
  Toolbar,
  styled,
} from "@mui/material";

import { theme } from "@config/styles";
import AppIconButton from "@features/ui/AppIconButton";
import { useBreakpoints } from "@hooks/useBreakpoints";

import AccountSidebar from "./AccountSidebar";

const DESKTOP_DRAWER_WIDTH = 288;

const DESKTOP_MINIMIZED_DRAWER_WIDTH = 94;

const TOOLBAR_STYLES = { mt: 2, mb: 1 };

const openedMixin = (theme: Theme): CSSObject => ({
  width: DESKTOP_DRAWER_WIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: DESKTOP_MINIMIZED_DRAWER_WIDTH,
});

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: DESKTOP_DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function ResponsiveDrawer() {
  const { md, xl } = useBreakpoints();
  const [isOpen, setOpen] = useState(xl);

  const closeDrawer = () => {
    setOpen(false);
  };

  const handleDrawerToggle = () => {
    setOpen(!isOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "grey.100",
        minHeight: { md: "100vh" },
        height: { xs: "100vh", md: "auto" },
        maxHeight: { xs: "-webkit-fill-available", md: "auto" },
      }}
    >
      {/* Desktop Drawer */}
      {md && (
        <>
          <StyledDrawer variant="permanent" open={isOpen}>
            <AccountSidebar onClose={closeDrawer} isMinimized={!isOpen} />
          </StyledDrawer>
          <AppIconButton
            isSmall
            aria-label="sidebar toggle button"
            onClick={handleDrawerToggle}
            sx={{
              borderRadius: 1,
              position: "absolute",
              top: 27,
              left: `calc(${
                isOpen ? DESKTOP_DRAWER_WIDTH : DESKTOP_MINIMIZED_DRAWER_WIDTH
              }px - 17px)`,
              background: "white",
              transition: theme.transitions.create("left", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
              ":hover": {
                background: "white",
              },
              zIndex: theme.zIndex.drawer + 1,
            }}
          >
            {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </AppIconButton>
        </>
      )}
      {/* Mobile Drawer */}

      {!md && (
        <>
          <AppBar
            position="fixed"
            sx={{ boxShadow: "none", backgroundColor: "grey.100" }}
          >
            <Toolbar sx={TOOLBAR_STYLES}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon sx={{ color: "primary.main", fontSize: 40 }} />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="temporary"
            open={isOpen}
            onClose={closeDrawer}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: DESKTOP_DRAWER_WIDTH,
              },
            }}
          >
            <AccountSidebar onClose={handleDrawerToggle} />
          </Drawer>
        </>
      )}
      <Box
        component="main"
        sx={{
          pt: {
            xs: 0,
            md: 4,
          },
          px: {
            xs: 2,
            md: 7,
          },
          pb: 4,
          width: "100%",
        }}
      >
        <Toolbar sx={{ display: { md: "none" }, ...TOOLBAR_STYLES }} />
        <Outlet />
      </Box>
    </Box>
  );
}
