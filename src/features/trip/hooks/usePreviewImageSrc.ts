import { TRIP_PREVIEW_IMAGES } from "../data";
import type { PreviewImage } from "../type";

export function usePreviewImageSrc(previewImage?: PreviewImage | null) {
  const previewImageSrc = previewImage?.templateImageId
    ? TRIP_PREVIEW_IMAGES.find(
        (item) => item.id === previewImage?.templateImageId,
      )?.src
    : null;
  return previewImageSrc;
}
