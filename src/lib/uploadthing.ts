import { generateReactHelpers } from "@uploadthing/react/hooks";

import type { ImageFileRouter } from "@/app/api/uploadthing/core";

export const { uploadFiles, useUploadThing } =
  generateReactHelpers<ImageFileRouter>();
