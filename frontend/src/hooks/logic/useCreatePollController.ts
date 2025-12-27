import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCreatePoll } from "../api/useCreatePoll";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "@/redux/slice/LoaderSlice";
import { toast } from "sonner";
import { SUCCESS_MESSAGE } from "@/constants/success";
import { ERROR_MESSAGE } from "@/constants/errors";
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const useCreatePollController = (
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
  setQuestion: React.Dispatch<React.SetStateAction<string>>,
  setOptions: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isPending, isSuccess, isError, mutate, error, data } =
    useCreatePoll();

  useEffect(() => {
    dispatch(isPending ? showLoader() : hideLoader());
  }, [isPending]);

  useEffect(() => {
    if (isSuccess && data.pollCode) {
      const pollUrl = `${BASE_URL}/poll/${data.pollCode}`;

      //autocopy url
      navigator.clipboard.writeText(pollUrl);

      toast.success(SUCCESS_MESSAGE.CREATE_POLL);
      setOpen(false);
      setQuestion("");
      setOptions(["", ""]);
      navigate(`/poll/${data.pollCode}`);
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

  return { mutate };
};
