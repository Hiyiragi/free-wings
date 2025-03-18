import { Trip } from "@features/trip/type";
import { useAppDispatch, useAppSelector } from "@store/index";

import Pagination from "../../../add-trip/components/Navigation/Pagination";
import PlacesForm from "../../../components/PlacesFrom";
import {
  nextStep,
  selectWizardTrip,
  setPlaces,
} from "../../store/tripWizardSlice";

export default function Places() {
  const { onSubmit, places } = usePlacesForm();
  return (
    <PlacesForm
      SubmitComponent={<Pagination />}
      onSubmit={onSubmit}
      defaultPlaces={places}
      autoFocus
    />
  );
}

function usePlacesForm() {
  const trip = useAppSelector(selectWizardTrip);

  const dispatch = useAppDispatch();

  const onSubmit = (places: Trip["places"]) => {
    dispatch(setPlaces(places));
    dispatch(nextStep());
  };

  return {
    onSubmit,
    places: trip.places,
  };
}
