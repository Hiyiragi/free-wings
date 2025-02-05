import { ref, uploadBytesResumable } from "firebase/storage";
import { useEffect, useState } from "react";

import { selectUser } from "@features/auth/store/authSlice";
import { DocumentToUpload, TripFile } from "@features/trip/type";
import { useAppSelector } from "@store/index";

import { storage } from "../firebase";

interface Props {
  onAllUploadSuccess: (uploadedFiles: TripFile[]) => void;
}

export function useStorage({ onAllUploadSuccess }: Props) {
  const user = useAppSelector(selectUser);
  const [state, setState] = useState<{
    upLoadProgresses: (number | undefined)[];
    upLoadErrors: string[];
    upLoadedFiles: TripFile[];
    totalFiles: number;
    uploadedFilesCount: number;
  }>({
    upLoadProgresses: [],
    upLoadErrors: [],
    upLoadedFiles: [],
    totalFiles: 0,
    uploadedFilesCount: 0,
  });

  useEffect(() => {
    if (state.totalFiles > 0 && state.uploadedFilesCount === state.totalFiles) {
      onAllUploadSuccess(state.upLoadedFiles);
    }
  });

  const uploadFiles = (path: string, files: DocumentToUpload[]) => {
    setState((prevState) => {
      return {
        ...prevState,
        totalFiles: files.length,
      };
    });

    files.forEach((file, index) => {
      if (!file?.file) return;
      const storageRef = ref(
        storage,
        `user-data/${user?.uid}/${path}/${file.fileName}`,
      );
      const uploadTask = uploadBytesResumable(storageRef, file.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const newProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setState((prevState) => {
            const newProgresses = [...prevState.upLoadProgresses];
            newProgresses[index] = newProgress;
            return {
              ...prevState,
              upLoadProgresses: newProgresses,
            };
          });
        },
        (error) => {
          setState((prevState) => {
            const newErrors = [...prevState.upLoadErrors];
            newErrors[index] = `Something went wrong: ${error.message}`;
            return {
              ...prevState,
              upLoadErrors: newErrors,
            };
          });
          setState((prevState) => {
            const newProgresses = [...prevState.upLoadProgresses];
            newProgresses[index] = undefined;
            const newErrors = [...prevState.upLoadErrors];
            newErrors[index] = `Something went wrong: ${error.message}`;
            return {
              ...prevState,
              upLoadProgresses: newProgresses,
              upLoadErrors: newErrors,
            };
          });
        },
        () => {
          setState((prevState) => {
            const newProgresses = [...prevState.upLoadProgresses];
            newProgresses[index] = undefined;
            const newUploadedFiles = [...prevState.upLoadedFiles];
            newUploadedFiles[index] = {
              fileName: file.fileName,
              storagePath: uploadTask.snapshot.ref.fullPath,
            };
            return {
              ...prevState,
              upLoadedFiles: newUploadedFiles,
              upLoadProgresses: newProgresses,
              uploadedFilesCount: ++prevState.uploadedFilesCount,
            };
          });
        },
      );
    });
  };

  return { uploadFiles, ...state };
}
