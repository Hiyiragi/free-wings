import { useAppDispatch, useAppSelector } from "@store/index";

import type { TripFile } from "../../../../trip/type";
import FilesForm from "../../../components/Files/FilesForm";
import {
  nextStep,
  selectWizardTrip,
  setDocuments,
} from "../../store/tripWizardSlice";
import Pagination from "../Navigation/Pagination";

export default function Documents() {
  const { onSubmit, documents } = useDocumentsForm();
  return (
    <FilesForm
      SubmitComponent={<Pagination />}
      onSubmit={onSubmit}
      defaultFiles={documents}
    />
  );
}

function useDocumentsForm() {
  const trip = useAppSelector(selectWizardTrip);

  const dispatch = useAppDispatch();

  const onSubmit = (data: TripFile[]) => {
    dispatch(setDocuments(data));
    dispatch(nextStep());
  };

  return {
    onSubmit,
    documents: trip.documents,
  };
}
