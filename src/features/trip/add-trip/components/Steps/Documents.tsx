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
  const { onSubmit, documents, onChange } = useDocumentsForm();
  return (
    <FilesForm
      SubmitComponent={<Pagination />}
      onSubmit={onSubmit}
      defaultFiles={documents}
      onChange={onChange}
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

  const onChange = (data: TripFile[]) => {
    dispatch(setDocuments(data));
  };

  return {
    onSubmit,
    documents: trip.documents,
    onChange,
  };
}
