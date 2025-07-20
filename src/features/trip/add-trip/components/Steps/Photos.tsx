import { useNavigate } from "react-router-dom";

import { AppRoutes } from "@config/routes";
import { useAddTripMutation } from "@features/trip/store/tripsApi";
import { useAppDispatch, useAppSelector } from "@store/index";

import FilesForm from "../../../components/Files/FilesForm";
import type { TripFile } from "../../../type";
import {
  resetWizard,
  selectWizardTrip,
  setPhotos,
} from "../../store/tripWizardSlice";
import Pagination from "../Navigation/Pagination";

export default function Photos() {
  const { onSubmit, photos, onFileStorageRemoval, isLoading } = usePhotosForm();
  return (
    <FilesForm
      SubmitComponent={<Pagination isLoading={isLoading} />}
      onSubmit={onSubmit}
      defaultFiles={photos}
      onFileStorageRemoval={onFileStorageRemoval}
      type="photo"
    />
  );
}

function usePhotosForm() {
  const trip = useAppSelector(selectWizardTrip);
  const navigate = useNavigate();

  const [addTrip, { isLoading }] = useAddTripMutation();

  const dispatch = useAppDispatch();

  const onSubmit = async (data: TripFile[]) => {
    if (isLoading) return;
    dispatch(setPhotos(data));
    const result = await addTrip({ ...trip, photos: data });
    if (!("error" in result)) {
      navigate(AppRoutes.trips);
      dispatch(resetWizard());
    }
  };

  const onFileStorageRemoval = (data: TripFile[]) => {
    dispatch(setPhotos(data));
  };

  return {
    onSubmit,
    photos: trip.photos,
    onFileStorageRemoval,
    isLoading,
  };
}
