import { getPollApi } from "@/services/pollServices";
import { useMutation } from "@tanstack/react-query";

export const useGetPoll = () => {
  return useMutation({
    mutationFn: getPollApi,
  });
};
