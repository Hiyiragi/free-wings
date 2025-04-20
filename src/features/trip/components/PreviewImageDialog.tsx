import { useEffect, useRef, useState } from "react";

import { ButtonBase, Grid } from "@mui/material";

import AppDialog from "@features/ui/AppDialog";
import { useBreakpoints } from "@hooks/useBreakpoints";
import useToast from "@hooks/useToast";
import { useStorage } from "@services/firebase";

import PhotoCard from "../components/Files/PhotoCard";
import { ACCEPTED_PHOTO_FORMATS } from "../constants";
import { TRIP_PREVIEW_IMAGES } from "../data";
import type { PreviewImage, Trip } from "../type";
import UploadFileButton from "./Files/UploadFileButton";

interface Props {
  isOpen: boolean;
  defaultPreviewImage: PreviewImage | null;
  defaultPreviewImageSrc: string;
  onClose: () => void;
  onSave: (previewImage: Trip["previewImage"]) => void;
  //will be called while removing uploaded file
  onChange?: (previewImage: Trip["previewImage"]) => void;
}

export default function PreviewImageDialog({
  isOpen,
  defaultPreviewImage,
  defaultPreviewImageSrc,
  onClose,
  onSave,
  onChange,
}: Props) {
  const { md } = useBreakpoints();
  const { showErrorMessage } = useToast();

  const {
    uploadFiles,
    upLoadProgresses,
    removingFilePath,
    removeFile,
    isLoading,
    upLoadErrors,
    resetState,
  } = useStorage({
    onAllUploadSuccess: (uploadedFiles) => {
      if (uploadedFiles[0].storagePath) {
        onSave({ storagePath: uploadedFiles[0].storagePath });
      }
    },
  });

  const CustomImageInputRef = useRef<HTMLInputElement | null>(null);
  const [customImageFile, setCustomImageFile] = useState<null | File>();
  const [customPreviewImageSrc, setCustomPreviewImageSrc] = useState<
    null | string | undefined
  >(defaultPreviewImageSrc);
  const [selectedImage, setSelectedImage] =
    useState<Trip["previewImage"]>(defaultPreviewImage);

  const onTemplateImageClick = (itemId: string) => {
    if (!isLoading && !removingFilePath) {
      setSelectedImage({ templateImageId: itemId });
    }
  };

  const onCancel = () => {
    setSelectedImage(defaultPreviewImage);
    onClose();
  };

  //Custom Image Modifications
  const onCustomImageUploadClick = () => {
    CustomImageInputRef?.current?.click();
  };

  const onCustomImageRemoveClick = async () => {
    const newSelectedPreviewImage = {
      templateImageId: TRIP_PREVIEW_IMAGES[TRIP_PREVIEW_IMAGES.length - 1].id,
    };
    setSelectedImage(newSelectedPreviewImage);
    if (defaultPreviewImage?.storagePath) {
      await removeFile(defaultPreviewImage.storagePath);
      onChange?.(newSelectedPreviewImage);
      setCustomPreviewImageSrc(null);
    } else {
      setCustomImageFile(null);
    }
  };

  const selectCustomPreviewImage = () => {
    if (customImageFile) {
      setSelectedImage({ url: URL.createObjectURL(customImageFile) });
    } else if (defaultPreviewImage?.storagePath) {
      setSelectedImage(defaultPreviewImage);
    }
  };

  const onCustomImageFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const imgFile = event.target?.files?.[0];
    if (imgFile) {
      setCustomImageFile(event.target?.files?.[0]);
      setSelectedImage({ url: URL.createObjectURL(imgFile) });
    }
  };

  const onSaveClick = async () => {
    if (!selectedImage) {
      showErrorMessage("Please select an image");
      return;
    }
    if (selectedImage.url && !selectedImage.storagePath && customImageFile) {
      uploadFiles("preview-image", [
        { fileName: customImageFile.name, file: customImageFile },
      ]);
    } else if (
      selectedImage.templateImageId &&
      defaultPreviewImage?.storagePath
    ) {
      await removeFile(defaultPreviewImage?.storagePath);
      onSave(selectedImage);
    } else {
      onSave(selectedImage);
    }
  };

  //File upload erros displaying
  useEffect(() => {
    if (upLoadErrors[0]) {
      showErrorMessage(upLoadErrors[0]);
      resetState();
    }
  }, [upLoadErrors, showErrorMessage, resetState]);

  return (
    <AppDialog
      isOpen={isOpen}
      onClose={onCancel}
      onPrimaryButtonClick={onSaveClick}
      title="Select your preview image"
      primaryButtonText="save"
      isLoading={isLoading}
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
                onTemplateImageClick(item.id);
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
          {customImageFile ||
          (defaultPreviewImage?.storagePath && customPreviewImageSrc) ? (
            <PhotoCard
              src={
                customImageFile
                  ? URL.createObjectURL(customImageFile)
                  : customPreviewImageSrc
              }
              onRemoveClick={onCustomImageRemoveClick}
              uploadProgress={upLoadProgresses[0]}
              isRemoving={Boolean(removingFilePath)}
              onClick={selectCustomPreviewImage}
              enableBorders
              borderColor={
                selectedImage?.url || selectedImage?.storagePath
                  ? "primary.main"
                  : "white"
              }
            />
          ) : (
            <>
              <UploadFileButton
                mainText="Upload Preview Photo"
                subText="PNG or PDF (max. 3MB)"
                sx={{ border: 4, borderColor: "white" }}
                showSubtext={md}
                onClick={onCustomImageUploadClick}
              />
              <input
                ref={CustomImageInputRef}
                type="file"
                id="fileInput"
                hidden
                accept={ACCEPTED_PHOTO_FORMATS}
                onChange={onCustomImageFileInputChange}
              />
            </>
          )}
        </Grid>
      </Grid>
    </AppDialog>
  );
}
