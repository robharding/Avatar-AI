import { getAuthSession } from "@/lib/auth";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const getUser = async () => (await getAuthSession())?.user;

export const imageFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      const user = await getUser();
      if (!user) throw new Error("Unauthorized");

      return { userId: user.id };
    })
    .onUploadComplete(async ({}) => {}),
} satisfies FileRouter;

export type ImageFileRouter = typeof imageFileRouter;
