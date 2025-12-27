import api from "@/configs/axios";
import type {
  CreatePollInType,
  CreatePollOutType,
  GetPollIntype,
  GetPollOutType,
  SubmitVoteInType,
  SubmitVoteOutType,
} from "@/types/pollTypes";
const POLL_API = "/poll";

export const createPollApi = async (
  data: CreatePollInType
): Promise<CreatePollOutType> => {
  const res = await api.post(POLL_API + "/create-poll", data);
  return res.data;
};

export const getPollApi = async (
  data: GetPollIntype
): Promise<GetPollOutType> => {
  const res = await api.get(POLL_API + `/${data.pollCode}/${data.voterId}`);
  return res.data;
};

export const submitVoteApi = async (
  data: SubmitVoteInType
): Promise<SubmitVoteOutType> => {
  const res = await api.post(POLL_API + `/submit-vote`, data);
  return res.data;
};
