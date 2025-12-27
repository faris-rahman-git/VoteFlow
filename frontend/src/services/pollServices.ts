import api from "@/configs/axios";
import type { CreatePollType } from "@/types/createPollTypes";
const POLL_API = "/poll";

export const createPollApi = async (data: CreatePollType) => {
  const res = await api.post(POLL_API + "/create-poll", data);
  return res.data;
};
