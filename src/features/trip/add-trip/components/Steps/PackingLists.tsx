import { SubmitHandler } from "react-hook-form";

import { Trip } from "@features/trip/type";
import { useAppDispatch, useAppSelector } from "@store/index";

import PackingListsForm from "../../../components/PackingListsForm";
import {
  nextStep,
  selectWizardTrip,
  setPackingLists,
} from "../../store/tripWizardSlice";
import Pagination from "../Navigation/Pagination";

interface FormInput {
  packingLists: Trip["packingLists"];
}

export default function PackingLists() {
  const { onSubmit, packingLists } = usePackingLists();
  return (
    <PackingListsForm
      SubmitComponent={<Pagination />}
      onSubmit={onSubmit}
      defaultPackingLists={packingLists}
    />
  );
}

function usePackingLists() {
  const trip = useAppSelector(selectWizardTrip);

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    dispatch(setPackingLists(data.packingLists));
    dispatch(nextStep());
  };

  return {
    onSubmit,
    packingLists: trip.packingLists,
  };
}
