import FilesForm from "@features/trip/components/Files/FilesForm";

import { Trip, TripFile } from "../../type";
import ContentCard from "./ContentCard";

interface Props {
  trip: Trip;
  onUpdate: (data: Partial<Trip>) => void;
}

export default function Documents({ trip, onUpdate }: Props) {
  const onChange = (documents: TripFile[]) => {
    console.log("onChange called");
    onUpdate({ documents });
  };
  return (
    <ContentCard title="Documents">
      <FilesForm
        defaultFiles={trip.documents}
        onChange={onChange}
        type="document"
        autoUpload
      />
    </ContentCard>
  );
}
