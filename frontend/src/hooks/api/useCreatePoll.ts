import { createPollApi } from "@/services/pollServices";
import { useMutation } from "@tanstack/react-query";

export const useCreatePoll = () => {
  return useMutation({
    mutationFn: createPollApi,
  });
};
