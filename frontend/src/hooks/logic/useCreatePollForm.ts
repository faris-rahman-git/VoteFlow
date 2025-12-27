import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useCreatePoll } from "../api/useCreatePoll";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader } from "@/redux/slice/LoaderSlice";
import { toast } from "sonner";
const BASE_API = import.meta.env.VITE_BASE_API;

export const useCreatePollForm = (
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
      console.log(data);
      const pollUrl = `${BASE_API}/poll/${data.pollCode}`;

      //autocopy url
      navigator.clipboard.writeText(pollUrl);

      toast.success("Poll created successfully! Poll URL copied to clipboard.");
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
          error.response?.data?.message ||
            "Somthing went wrong! Please try again."
        );
      } else {
        toast.error(error.message || "Somthing went wrong! Please try again.");
      }
    }
  }, [isError, error]);

  return { mutate };
};
