"use client";

import { FeedbackVoteRequest } from "@/lib/validators/feedback";
import { extendedFeedback } from "@/types/db";
import { Vote } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface FeedbackProps {
  feedback: extendedFeedback[];
}

const Feedback: FC<FeedbackProps> = ({ feedback }) => {
  const router = useRouter();

  const { mutate: upvoteFeedback } = useMutation({
    mutationFn: async (payload: FeedbackVoteRequest) => {
      await axios.post("/api/feedback/vote", payload);
    },
    onSuccess() {
      router.refresh();
    },
  });

  return (
    <div className="flex flex-row flex-wrap gap-2 mt-10 text-sm">
      {feedback.map((feedback) => (
        <div
          key={feedback.id}
          className="bg-secondary rounded px-4 py-4 flex items-center gap-4 max-w-lg"
        >
          <div
            onClick={() => upvoteFeedback({ feedbackId: feedback.id })}
            className="flex flex-row items-center gap-1 hover:cursor-pointer"
          >
            <Heart className="h-4 w-4" />
            {feedback.votes.length}
          </div>
          {feedback.text}
        </div>
      ))}
    </div>
  );
};

export default Feedback;
