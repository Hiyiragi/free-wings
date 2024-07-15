import { useState } from "react";

import { ButtonBase, Grid } from "@mui/material";

import AppDialog from "@features/ui/AppDialog";

import { TRIP_PREVIEW_IMAGES } from "../data";
import type { Trip } from "../type";
import UploadFileButton from "./UploadFileButton";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (previewImage: Trip["previewImage"]) => void;
}

export default function PreviewImageDialog({ isOpen, onClose, onSave }: Props) {
  const [selectedImage, setSelectedImage] =
    useState<Trip["previewImage"]>(null);

  const onSaveClick = () => {
    onSave(selectedImage);
  };
  return (
    <AppDialog
      isOpen={isOpen}
      onClose={onClose}
      onPrimaryButtonClick={onSaveClick}
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
                  selectedImage?.templateImageId === item.id
                    ? "primary.main"
                    : "white",
              }}
              onClick={() => {
                setSelectedImage({ templateImageId: item.id });
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
