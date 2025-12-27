import axios from "axios";
import { useEffect } from "react";
import { toast } from "sonner";
import type { GetPollOutType } from "@/types/pollTypes";
import { ERROR_MESSAGE } from "@/constants/errors";
import { useSubmitVote } from "../api/useSubmitVote";

export const useSubmitVoteController = (
  setPollDetails: React.Dispatch<React.SetStateAction<GetPollOutType | null>>,
  pollDetails: GetPollOutType,
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { isPending, isSuccess, isError, mutate, error, data } =
    useSubmitVote();

  useEffect(() => {
    if (isPending) {
      setSubmitting(true);
    } else {
      setSubmitting(false);
    }
  }, [isPending]);

  useEffect(() => {
    if (isSuccess) {
      setPollDetails({
        ...pollDetails,
        isActive: data.isActive,
        hasVoted: data.hasVoted,
        options: pollDetails.options.map((opt) => ({
          ...opt,
          count: data.options[opt.id] ?? 0,
        })),
        totalVotes: data.totalVotes,
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG
        );
      } else {
        toast.error(error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG);
      }
    }
  }, [isError, error]);

  return { mutate, isPending };
};
