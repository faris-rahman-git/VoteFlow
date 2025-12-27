import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "@/redux/slice/LoaderSlice";
import { toast } from "sonner";
import { useGetPoll } from "../api/useGetPoll";
import type { GetPollOutType } from "@/types/pollTypes";
import { ERROR_MESSAGE } from "@/constants/errors";
import { useNavigate } from "react-router-dom";

export const useGetPollController = (
  setPollDetails: React.Dispatch<React.SetStateAction<GetPollOutType | null>>,
) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isPending, isSuccess, isError, mutate, error, data } = useGetPoll();

  useEffect(() => {
    dispatch(isPending ? showLoader() : hideLoader());
  }, [isPending]);

  useEffect(() => {
    if (isSuccess) {
      setPollDetails(data);
      console.log("useGetPollController" ,data);
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
      navigate("/");
    }
  }, [isError, error]);

  return { mutate };
};
