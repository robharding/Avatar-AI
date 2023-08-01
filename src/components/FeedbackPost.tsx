"use client";

import { FeedbackVoteRequest } from "@/lib/validators/feedback";
import { extendedFeedback } from "@/types/db";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Heart } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface FeedbackPostProps {
  feedback: extendedFeedback;
  userId: string;
}

const FeedbackPost: FC<FeedbackPostProps> = ({ feedback, userId }) => {
  const [voted, setVoted] = useState<boolean>(false);
  const [currentVotes, setCurrentVotes] = useState<number>(
    feedback.votes.length
  );

  useEffect(() => {
    feedback.votes.map((vote) => {
      if (vote.userId == userId) {
        setVoted(true);
      }
    });
  }, [feedback, userId]);

  const { mutate: upvoteFeedback } = useMutation({
    mutationFn: async (payload: FeedbackVoteRequest) => {
      await axios.post("/api/feedback/vote", payload);
    },
    onMutate() {
      if (voted) {
        setVoted(false);
        setCurrentVotes((prev) => prev - 1);
      } else {
        setVoted(true);
        setCurrentVotes((prev) => prev + 1);
      }
    },
    onError() {
      if (voted) {
        setVoted(false);
        setCurrentVotes((prev) => prev - 1);
      } else {
        setVoted(true);
        setCurrentVotes((prev) => prev + 1);
      }
    },
  });

  return (
    <div className="bg-secondary rounded px-4 py-4 flex items-center gap-4 max-w-lg shadow-md">
      <div
        onClick={() => upvoteFeedback({ feedbackId: feedback.id })}
        className="flex flex-row items-center gap-1 hover:cursor-pointer"
      >
        <Heart className={cn("h-4 w-4", voted && "text-accent fill-accent")} />
        {currentVotes}
      </div>
      {feedback.text}
    </div>
  );
};

export default FeedbackPost;
