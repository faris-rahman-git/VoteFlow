import api from "@/configs/axios";
import type { CreatePollType, getPollIntype } from "@/types/pollTypes";
const POLL_API = "/poll";

export const createPollApi = async (data: CreatePollType) => {
  const res = await api.post(POLL_API + "/create-poll", data);
  return res.data;
};

export const getPollApi = async (data: getPollIntype) => {
  const res = await api.get(
    POLL_API + `/poll/${data.pollCode}/${data.voterId}`
  );
  return res.data;
};
