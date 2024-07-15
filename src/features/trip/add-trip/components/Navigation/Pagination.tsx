import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { MobileStepper } from "@mui/material";

import AppButton from "@features/ui/AppButton";
import { useBreakpoints } from "@hooks/useBreakpoints";
import { useAppDispatch, useAppSelector } from "@store/index";

import { WIZARD_STEPS } from "../../data";
import { previousStep, selectCurrentStep } from "../../store/tripWizardSlice";

export default function Pagination() {
  const { md, lg } = useBreakpoints();
  const currentStep = useAppSelector(selectCurrentStep);
  const dispatch = useAppDispatch();

  const onBackButtonClick = () => dispatch(previousStep());

  return (
    <MobileStepper
      variant={lg ? "dots" : "text"}
      steps={WIZARD_STEPS.length}
      position="static"
      activeStep={currentStep}
      nextButton={
        <AppButton fullWidth={!md} type="submit" endIcon={<ArrowForward />}>
          Next
        </AppButton>
      }
      backButton={
        <AppButton
          fullWidth={!md}
          variant="outlined"
          startIcon={<ArrowBack />}
          sx={{
            visibility: currentStep === 0 ? "hidden" : "visible",
          }}
          onClick={onBackButtonClick}
        >
          Back
        </AppButton>
      }
      sx={{
        ".MuiMobileStepper-dots": {
          visibility: "hidden",
        },
        display: "flex",
        gap: 2,
        whiteSpace: "nowrap",
        position: "absolute",
        left: 0,
        bottom: 0,
        width: "100%",
        p: { xs: 2, md: 3 },
        borderRadius: 4,
      }}
    />
  );
}
