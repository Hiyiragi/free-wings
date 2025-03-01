import { useAppDispatch, useAppSelector } from "@store/index";

import FilesForm from "../../../components/Files/FilesForm";
import type { TripFile } from "../../../type";
import { selectWizardTrip, setPhotos } from "../../store/tripWizardSlice";
import Pagination from "../Navigation/Pagination";

export default function Photos() {
  const { onSubmit, photos, onChange } = usePhotosForm();
  return (
    <FilesForm
      SubmitComponent={<Pagination />}
      onSubmit={onSubmit}
      defaultFiles={photos}
      onChange={onChange}
      type="photo"
    />
  );
}

function usePhotosForm() {
  const trip = useAppSelector(selectWizardTrip);

  const dispatch = useAppDispatch();

  const onSubmit = (data: TripFile[]) => {
    dispatch(setPhotos(data));
    // TODO: save wizard data
  };

  const onChange = (data: TripFile[]) => {
    dispatch(setPhotos(data));
  };

  return {
    onSubmit,
    photos: trip.photos,
    onChange,
  };
}
