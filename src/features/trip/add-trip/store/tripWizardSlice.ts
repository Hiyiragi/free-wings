import { PURGE } from "redux-persist";
import { v4 as uuidv4 } from "uuid";

import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { RootState } from "@store/index";

import type { Trip } from "../../type";

interface TripWizardState {
  trip: Trip;
  currentStep: number;
}

const getInitialState = () => {
  return {
    trip: {
      id: uuidv4(),
      name: "",
      previewImage: null,
      description: "",
      startDate: null,
      endDate: null,
      locationFrom: "",
      destinations: [{ id: uuidv4(), name: "" }],
      places: [],
      expenses: [],
      documents: [],
      packingLists: [],
      photos: [],
    },
    currentStep: 0,
  };
};

const initialState: TripWizardState = getInitialState();

export const tripWizardSlice = createSlice({
  name: "tripWizard",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.currentStep += 1;
    },
    previousStep: (state) => {
      if (state.currentStep === 0) {
        throw Error("You are already on the first step. You can't go back");
      }
      state.currentStep -= 1;
    },
    setTravelInformation: (
      state,
      action: PayloadAction<
        Pick<
          Trip,
          "startDate" | "endDate" | "name" | "description" | "previewImage"
        >
      >,
    ) => {
      state.trip.name = action.payload.name;
      state.trip.description = action.payload.description;
      state.trip.startDate = action.payload?.startDate;
      state.trip.endDate = action.payload.endDate;
      state.trip.previewImage = action.payload.previewImage;
    },
    setDestinations: (state, action: PayloadAction<Trip["destinations"]>) => {
      state.trip.destinations = action.payload;
    },
    setLocationFrom: (state, action: PayloadAction<Trip["locationFrom"]>) => {
      state.trip.locationFrom = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return getInitialState();
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  nextStep,
  previousStep,
  setTravelInformation,
  setDestinations,
  setLocationFrom,
} = tripWizardSlice.actions;

export const selectCurrentStep = (state: RootState) =>
  state.tripWizard.currentStep;

export const selectWizardTrip = (state: RootState) => state.tripWizard.trip;

export default tripWizardSlice.reducer;
