import { Feedback } from "@prisma/client";

export type extendedFeedback = Feedback & {
  votes: Vote[];
};
