import { Step, StepLabel, Stepper } from "@mui/material";

import { useBreakpoints } from "@hooks/useBreakpoints";

import type { WizardSteps } from "../../types";

interface Props {
  currentStep: number;
  steps: WizardSteps[];
}

export default function DesktopStepper({ currentStep, steps }: Props) {
  const { xl } = useBreakpoints();

  return (
    <Stepper
      activeStep={currentStep}
      alternativeLabel={!xl}
      sx={{ display: { xs: "none", lg: "flex" }, mb: 8, ml: -1 }}
    >
      {steps.map(({ title }) => {
        return (
          <Step key={title}>
            <StepLabel
              StepIconProps={{
                sx: {
                  height: { xl: 49, xs: 35 },
                  width: { xl: 49, xs: 35 },
                },
              }}
            >
              {title}
            </StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
}
