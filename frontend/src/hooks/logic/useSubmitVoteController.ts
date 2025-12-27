import axios from "axios";
import { useEffect } from "react";
import { toast } from "sonner";
import type { GetPollOutType } from "@/types/pollTypes";
import { ERROR_MESSAGE } from "@/constants/errors";
import { useSubmitVote } from "../api/useSubmitVote";
import { SUCCESS_MESSAGE } from "@/constants/success";
import socket from "@/configs/socket";

export const useSubmitVoteController = (
  setPollDetails: React.Dispatch<React.SetStateAction<GetPollOutType | null>>,
  pollId: number,
  setSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
  handleGetPollMutate: () => void,
  voterId: string
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
      toast.success(SUCCESS_MESSAGE.VOTE_SUBMITTED);
      console.log("useSubmitVoteController", data);
      setPollDetails((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          isActive: data.isActive,
          hasVoted: data.hasVoted,
          options: data.options
            ? prev.options.map((opt) => ({
                ...opt,
                count: data.options![opt.id] ?? 0,
              }))
            : prev.options,
          totalVotes: data.totalVotes,
        };
      });
      if (data.isActive) {
        socket.emit("join_live", {
          pollId,
          voterId,
          isSwitch: true,
        });
      }
    }

  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG
        );
        if (
          error.response?.data?.message === ERROR_MESSAGE.POLL_EXPIRED ||
          error.response?.data?.message === ERROR_MESSAGE.VOTE_ALREADY_SUBMITTED
        ) {
          handleGetPollMutate();
        }
      } else {
        toast.error(error.message || ERROR_MESSAGE.SOMETHING_WENT_WRONG);
      }
    }
  }, [isError, error]);

  return { mutate, isPending };
};
