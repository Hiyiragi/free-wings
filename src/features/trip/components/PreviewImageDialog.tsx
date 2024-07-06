import { useState } from "react";

import { ButtonBase, Grid } from "@mui/material";

import AppDialog from "@features/ui/AppDialog";

import { TRIP_PREVIEW_IMAGES, type TripPreviewImage } from "../data";
import UploadFileButton from "./UploadFileButton";

interface Props {
  isOpen: boolean;
  toggle: () => void;
  onClose: () => void;
}

function PreviewImageDialog({ isOpen, toggle, onClose }: Props) {
  const [selectedImage, setSelectedImage] = useState<TripPreviewImage | null>(
    null,
  );
  return (
    <AppDialog
      isOpen={isOpen}
      onClose={onClose}
      onPrimaryButtonClick={toggle}
      title="Select your preview image"
      primaryButtonText="save"
    >
      <Grid container spacing={{ xs: 0.5, md: 1.5 }} columns={{ xs: 2, md: 3 }}>
        {TRIP_PREVIEW_IMAGES.map((item) => (
          <Grid item key={item.id} xs={1} md={1}>
            <ButtonBase
              sx={{
                borderRadius: 4,
                overflow: "hidden",
                border: 4,
                borderColor:
                  selectedImage?.id === item.id ? "primary.main" : "white",
              }}
              onClick={() => {
                setSelectedImage(item);
              }}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                style={{ width: "100%" }}
              />
            </ButtonBase>
          </Grid>
        ))}
        <Grid item xs={1} md={1}>
          <UploadFileButton
            mainText="Upload Preview Photo"
            subText="PNG or PDF (max. 3MB)"
            sx={{ border: 4, borderColor: "white" }}
          />
        </Grid>
      </Grid>
    </AppDialog>
  );
}

export default PreviewImageDialog;
