import { LinkProps } from "@mui/material/Link";
import { createTheme } from "@mui/material/styles";

import { Colors } from "./Colors";
import { FontFamily } from "./FontFamilies";
import { FontWeights } from "./FontWeights";
import LinkBehavior from "./LinkBehavior";

const theme = createTheme({
  palette: {
    primary: {
      main: "#729E65",
    },
    text: {
      primary: "#223644",
      secondary: "#64727C",
    },
    error: {
      main: "#EB5757",
    },
    grey: { [100]: "#F9F9F9", [200]: "#EAEAEA" },
  },
  components: {
    MuiInputBase: {
      defaultProps: {
        style: {
          fontSize: "1rem",
          lineHeight: "1.5rem",
          fontFamily: FontFamily.poppins,
          fontWeight: FontWeights.regular,
        },
      },
    },
    MuiFormControl: {
      defaultProps: {
        sx: {
          mb: 0,
          mt: 0,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          lineHeight: "1.313rem",
          fontFamily: FontFamily.roboto,
        },
      },
    },
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
    MuiButton: {
      styleOverrides: {
        startIcon: {
          "& svg": {
            fontSize: "1.5rem !important",
          },
        },
        endIcon: {
          "& svg": {
            fontSize: "1.5rem !important",
          },
        },
      },
    },
    MuiStepIcon: {
      styleOverrides: {
        root: {
          color: Colors.disabled,
          "&.Mui-Completed, &.Mui-active": {
            color: Colors.secondaryBlue,
          },
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        root: {
          ".Mui-disabled": {
            fontWeight: FontWeights.regular,
          },
          ".Mui-active": {
            fontWeight: FontWeights.medium,
          },
          ".Mui-completed": {
            fontWeight: FontWeights.regular,
          },
        },
      },
    },
    MuiBreadcrumbs: {
      defaultProps: {
        style: {
          fontSize: "1rem",
          lineHeight: "1.5rem",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          "& button": {
            minHeight: 65,
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: Colors.disabled,
        },
      },
    },
  },
});

theme.typography.h1 = {
  fontSize: "2rem",
  lineHeight: "3rem",
  fontFamily: FontFamily.poppins,
  fontWeight: FontWeights.medium,
  [theme.breakpoints.down("md")]: {
    fontSize: "1.5rem",
    lineHeight: "2.25rem",
  },
};

theme.typography.h2 = {
  fontSize: "1.875rem",
  lineHeight: "2.813rem",
  fontFamily: FontFamily.poppins,
  fontWeight: FontWeights.medium,
  [theme.breakpoints.down("md")]: {
    fontSize: "1.375rem",
    lineHeight: "2.063rem",
  },
};

theme.typography.h4 = {
  fontSize: "1.5rem",
  lineHeight: "2.25rem",
  fontFamily: FontFamily.poppins,
  fontWeight: FontWeights.medium,
  [theme.breakpoints.down("md")]: {
    fontSize: "1.25rem",
    lineHeight: "1.875rem",
  },
};

theme.typography.h5 = {
  fontSize: "1.375rem",
  lineHeight: "2.063rem",
  fontFamily: FontFamily.poppins,
  fontWeight: FontWeights.medium,
};

theme.typography.h6 = {
  fontSize: "1.25rem",
  lineHeight: "1.875rem",
  fontFamily: FontFamily.poppins,
  fontWeight: FontWeights.medium,
  [theme.breakpoints.down("md")]: {
    fontSize: "1.125rem",
    lineHeight: "1.688rem",
  },
};

theme.typography.body1 = {
  fontSize: "1.125rem",
  lineHeight: "1.688rem",
  fontFamily: FontFamily.poppins,
  fontWeight: FontWeights.regular,
  [theme.breakpoints.down("md")]: {
    fontSize: "1rem",
    lineHeight: "1.5rem",
  },
};

theme.typography.body2 = {
  fontSize: "1.125rem",
  lineHeight: "1.688rem",
  fontFamily: FontFamily.poppins,
  fontWeight: FontWeights.medium,
  [theme.breakpoints.down("md")]: {
    fontSize: "1rem",
    lineHeight: "1.5rem",
  },
};

theme.typography.subtitle1 = {
  fontSize: "1rem",
  lineHeight: "1.5rem",
  fontFamily: FontFamily.poppins,
  fontWeight: FontWeights.regular,
};

theme.typography.subtitle2 = {
  fontSize: "1rem",
  lineHeight: "1.5rem",
  fontFamily: FontFamily.poppins,
  fontWeight: FontWeights.medium,
};

theme.typography.caption = {
  fontSize: "0.875rem",
  lineHeight: "1.313rem",
  fontFamily: FontFamily.poppins,
  fontWeight: FontWeights.regular,
};

export default theme;
