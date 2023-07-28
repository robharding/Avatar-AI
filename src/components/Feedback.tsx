"use client";

import { Feedback } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Heart } from "lucide-react";
import { FC } from "react";

interface FeedbackProps {
  feedback: Feedback[];
}

const Feedback: FC<FeedbackProps> = ({ feedback }) => {
  const { mutate: upvoteFeedback } = useMutation({
    mutationFn: async (id: string) => {},
  });

  return (
    <div className="flex flex-row flex-wrap gap-2 mt-10 text-sm">
      {feedback.map((feedback) => (
        <div
          key={feedback.id}
          className="bg-secondary rounded px-4 py-4 flex items-center gap-4 max-w-lg"
        >
          <div
            onClick={() => upvoteFeedback(feedback.id)}
            className="flex flex-row items-center gap-1 hover:cursor-pointer"
          >
            <Heart className="h-4 w-4" />
            {feedback.votes}
          </div>
          {feedback.text}
        </div>
      ))}
    </div>
  );
};

export default Feedback;
