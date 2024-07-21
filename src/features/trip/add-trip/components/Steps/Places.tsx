import { SubmitHandler } from "react-hook-form";

import { Trip } from "@features/trip/type";
import { useAppDispatch, useAppSelector } from "@store/index";

import Pagination from "../../../add-trip/components/Navigation/Pagination";
import PlacesForm from "../../../components/PlacesFrom";
import {
  nextStep,
  selectWizardTrip,
  setPlaces,
} from "../../store/tripWizardSlice";

interface FormInput {
  places: Trip["places"];
}

export default function Places() {
  const { onSubmit, places } = usePlacesForm();
  return (
    <PlacesForm
      SubmitComponent={<Pagination />}
      onSubmit={onSubmit}
      defaultPlaces={places}
    />
  );
}

function usePlacesForm() {
  const trip = useAppSelector(selectWizardTrip);

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    dispatch(setPlaces(data.places));
    dispatch(nextStep());
  };

  return {
    onSubmit,
    places: trip.places,
  };
}
