import { submitVoteApi } from "@/services/pollServices";
import { useMutation } from "@tanstack/react-query";

export const useSubmitVote = () => {
  return useMutation({
    mutationFn: submitVoteApi,
  });
};
