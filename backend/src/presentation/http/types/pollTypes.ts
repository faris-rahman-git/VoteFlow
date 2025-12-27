export type CreatePollType = {
    question: string;
    options: string[];
    expiresAt: string
}

export type GetPollIntype = {
  pollCode: string;
  voterId: string;
};

export type SubmitVoteInType = {
  pollId: number;
  optionId: number;
  voterId: string;
};

export type SubmitVoteOutType = {
  isActive: boolean;
  hasVoted: number;
  options: Record<number, number>;
  totalVotes: number;
};