import { useEffect, useRef } from "react";
import {
  Controller,
  SubmitHandler,
  type UseFieldArrayUpdate,
  useFieldArray,
  useForm,
} from "react-hook-form";

import { Box, FormHelperText, Stack } from "@mui/material";

import type { DocumentToUpload, TripFile } from "@features/trip/type";
import useToast from "@hooks/useToast";
import { getDownloadURL, useStorage } from "@services/firebase";

import {
  ACCEPTED_DOCUMENT_FORMATS,
  ACCEPTED_PHOTO_FORMATS,
  MAX_FILE_SIZE_MB,
  MAX_TRIP_PHOTOS,
} from "../../constants";
import DocumentCard from "./DocumentCard";
import PhotoCard from "./PhotoCard";
import UploadFileButton from "./UploadFileButton";

interface FormInput {
  files: DocumentToUpload[];
}

interface Props {
  defaultFiles: TripFile[];
  onSubmit: (files: TripFile[]) => void;
  onChange: (files: TripFile[]) => void;
  SubmitComponent: React.ReactNode;
  type: "document" | "photo";
}

export default function FilesForm(props: Props) {
  const {
    onSubmit,
    files,
    handleSubmit,
    control,
    onFieldInputChange,
    onFileRemove,
    onFileAdd,
    fileInputRef,
    upLoadProgresses,
    removingFilePath,
    upLoadErrors,
  } = useFilesUploadForm(props);

  const isPhotosForm = props.type === "photo";
  const isDocumentsForm = props.type === "document";
  const acceptedFileFormats = isPhotosForm
    ? ACCEPTED_PHOTO_FORMATS
    : ACCEPTED_DOCUMENT_FORMATS;

  return (
    <Stack
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      direction="row"
      gap={{ xs: 1, md: 2 }}
      flexWrap="wrap"
      sx={{ width: "100%" }}
    >
      <UploadFileButton
        onClick={onFileAdd}
        mainText={`Upload ${props.type}`}
        subText={`${acceptedFileFormats} (max .${MAX_FILE_SIZE_MB} MB)`}
        sx={{
          width: { xs: "100%", md: isPhotosForm ? 261 : 200 },
          height: { xs: 140, md: isPhotosForm ? 250 : 260 },
        }}
        showSubtext
      />

      {files.map((file, index) => {
        const showCard = Boolean(file?.url || file?.storagePath);
        return (
          <Stack
            key={file.fileName}
            sx={{
              height: isPhotosForm ? { xs: 171, md: 250 } : 260,
            }}
          >
            {showCard && (
              <>
                {isDocumentsForm && (
                  <DocumentCard
                    name={file.fileName}
                    url={file.url}
                    key={file.fileName}
                    onRemoveClick={() => onFileRemove(index)}
                    uploadProgress={upLoadProgresses[index]}
                    isRemoving={Boolean(
                      file.storagePath && file.storagePath === removingFilePath,
                    )}
                  />
                )}
                {isPhotosForm && (
                  <Box
                    sx={{
                      width: { xs: 171, md: 261 },
                      height: { xs: 171, md: 250 },
                    }}
                  >
                    <PhotoCard
                      src={file.url}
                      key={file.fileName}
                      onRemoveClick={() => onFileRemove(index)}
                      uploadProgress={upLoadProgresses[index]}
                      isRemoving={Boolean(
                        file.storagePath &&
                          file.storagePath === removingFilePath,
                      )}
                    />
                  </Box>
                )}
              </>
            )}
            {upLoadErrors[index] && (
              <FormHelperText error>{upLoadErrors[index]}</FormHelperText>
            )}
            <Controller
              name={`files.${index}`}
              control={control}
              rules={{ required: "Please specify trip name!" }}
              render={({ field }) => (
                <input
                  ref={files.length - 1 === index ? fileInputRef : null}
                  type="file"
                  id="fileInput"
                  hidden
                  accept={acceptedFileFormats}
                  onChange={(event) =>
                    onFieldInputChange(event, field.onChange)
                  }
                />
              )}
            />
          </Stack>
        );
      })}
      {props.SubmitComponent}
    </Stack>
  );
}

function useFilesUploadForm(props: Props) {
  const { showErrorMessage } = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { watch, handleSubmit, control } = useForm<FormInput>({
    defaultValues: {
      files: props.defaultFiles,
    },
  });

  const { append, remove, update } = useFieldArray({
    control,
    name: "files",
  });
  const {
    uploadFiles,
    upLoadProgresses,
    removingFilePath,
    removeFile,
    isLoading,
    upLoadErrors,
  } = useStorage({
    onAllUploadSuccess: (uploadedFiles) => {
      props.onSubmit(uploadedFiles);
    },
    onOneUploadSuccess: (uploadedFile, index) => {
      update(index, uploadedFile);
    },
  });
  const disableChange = isLoading || Boolean(removingFilePath);

  const files = watch("files");

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    if (!data?.files || data?.files.length === 0) {
      props.onSubmit([]);
      return;
    }

    const filteredFiles = [...data.files];
    if (!filteredFiles[filteredFiles.length - 1].fileName) {
      filteredFiles.pop();
    }
    uploadFiles(`${props.type}s`, filteredFiles);
  };

  const onFileAdd = () => {
    if (disableChange) return;

    if (
      props.type === "photo" &&
      files.length >= MAX_TRIP_PHOTOS &&
      !(!files[files.length - 1].fileName && files.length === MAX_TRIP_PHOTOS)
    ) {
      return showErrorMessage(
        `You can upload at most ${MAX_TRIP_PHOTOS} photos`,
      );
    }

    if (files.length === 0 || files[files.length - 1]?.fileName)
      append({
        fileName: "",
      });
    setTimeout(() => fileInputRef.current?.click(), 0);
  };

  const onFileRemove = async (index: number) => {
    if (disableChange) return;
    const file = files[index];
    if (file.storagePath) {
      const wasFileRemoved = await removeFile(file.storagePath);
      if (wasFileRemoved) {
        remove(index);
        props.onChange([...files.slice(0, index), ...files.slice(index + 1)]);
      }
    } else {
      remove(index);
      props.onChange([...files.slice(0, index), ...files.slice(index + 1)]);
    }
  };

  const onFieldInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (newFile: DocumentToUpload) => void,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 1024 * 1024 * MAX_FILE_SIZE_MB) {
      return showErrorMessage(
        `File size too big. Max size is ${MAX_FILE_SIZE_MB}MB`,
      );
    }

    if (files.find((existingfile) => existingfile.fileName === file.name)) {
      if (!files[files.length - 1].fileName) remove(files.length - 1);
      return showErrorMessage(
        "You have already uploaded a file with the same name!",
      );
    }

    onChange({
      fileName: file?.name,
      file,
      url: URL.createObjectURL(file),
    });
  };

  useFilesUrlsUpdate(files, update);

  return {
    onSubmit,
    files,
    handleSubmit,
    control,
    onFieldInputChange,
    onFileRemove,
    onFileAdd,
    fileInputRef,
    upLoadProgresses,
    disableChange,
    removingFilePath,
    upLoadErrors,
  };
}

function useFilesUrlsUpdate(
  files: DocumentToUpload[],
  update: UseFieldArrayUpdate<FormInput, "files">,
) {
  useEffect(() => {
    files.forEach(async (file, index) => {
      if (!file.url && file.storagePath) {
        const url = await getDownloadURL(file.storagePath);
        if (url) {
          update(index, {
            ...files[index],
            url,
          });
        }
      }
    });
  }, [files, update]);
}
