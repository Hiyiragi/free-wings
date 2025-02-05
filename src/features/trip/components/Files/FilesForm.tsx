import { Fragment, useEffect, useRef } from "react";
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";

import { Stack } from "@mui/material";

import type { DocumentToUpload, TripFile } from "@features/trip/type";
import useToast from "@hooks/useToast";
import { getDownloadURL, useStorage } from "@services/firebase";

import { MAX_FILE_SIZE_MB } from "../../constants";
import DocumentCard from "./DocumentCard";
import UploadFileButton from "./UploadFileButton";

interface FormInput {
  files: DocumentToUpload[];
}

interface Props {
  defaultFiles: TripFile[];
  onSubmit: (files: TripFile[]) => void;
  SubmitComponent: React.ReactNode;
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
  } = useFilesUploadForm(props);
  return (
    <Stack
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      direction="row"
      gap={2}
      flexWrap="wrap"
      sx={{ width: "100%" }}
    >
      <UploadFileButton
        onClick={onFileAdd}
        mainText="Upload document"
        subText={`PDF (max .${MAX_FILE_SIZE_MB} MB)`}
        sx={{ width: { xs: "100%", md: 200 }, height: { xs: 140, md: 260 } }}
        showSubtext
      />

      {files.map((file, index) => {
        const showCard = Boolean(file?.url || file?.storagePath);
        return (
          <Fragment key={file.fileName}>
            {showCard && (
              <DocumentCard
                name={file.fileName}
                url={file.url}
                key={file.fileName}
                onRemoveClick={() => onFileRemove(index)}
                uploadProgress={upLoadProgresses[index]}
              />
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
                  onChange={(event) =>
                    onFieldInputChange(event, field.onChange)
                  }
                />
              )}
            />
          </Fragment>
        );
      })}
      {props.SubmitComponent}
    </Stack>
  );
}

function useFilesUploadForm(props: Props) {
  const { uploadFiles, upLoadProgresses } = useStorage({
    onAllUploadSuccess: (uploadFiles) => {
      props.onSubmit(uploadFiles);
    },
  });
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

  const files = watch("files");

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    const filteredFiles = [...data.files];
    if (!filteredFiles[filteredFiles.length - 1].fileName) {
      filteredFiles.pop();
    }
    uploadFiles("documents", filteredFiles);
  };

  const onFileAdd = () => {
    if (files.length === 0 || files[files.length - 1]?.fileName)
      append({
        fileName: "",
      });
    setTimeout(() => fileInputRef.current?.click(), 0);
  };

  const onFileRemove = (index: number) => {
    remove(index);
  };

  const onFieldInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    onChange: (newFile: DocumentToUpload) => void,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (files.find((existingfile) => existingfile.fileName === file.name)) {
      if (!files[files.length - 1].fileName) remove(files.length - 1);
      showErrorMessage("You have already uploaded a file with the same name!");
    }

    onChange({
      fileName: file?.name,
      file,
    });
  };

  useEffect(() => {
    files.forEach(async (file, index) => {
      if (file.url) {
        return;
      }
      let url: string | null = null;
      if (file.storagePath) {
        url = await getDownloadURL(file.storagePath);
      } else if (file.file) {
        url = URL.createObjectURL(file.file);
      }
      if (url) {
        update(index, {
          ...files[index],
          url: url,
        });
      }
    });
  }, [files, update]);

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
  };
}
