import { createNextRouteHandler } from "uploadthing/next";
import { imageFileRouter } from "./core";

export const { GET, POST } = createNextRouteHandler({
  router: imageFileRouter,
});
