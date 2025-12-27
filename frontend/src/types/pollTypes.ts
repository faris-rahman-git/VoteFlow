export type CreatePollInType = {
  question: string;
  options: string[];
  expiresAt: string;
};

export type CreatePollOutType = {
  pollCode: string;
};

export type GetPollIntype = {
  pollCode: string;
  voterId: string;
};

export type GetPollOutType = {
  isActive: boolean;
  hasVoted: number;
  poll: {
    id: number;
    question: string;
    expiresAt: Date;
  };
  options: {
    id: number;
    text: string;
    count: number;
  }[];
  totalVotes: number;
};

export type SubmitVoteInType = {
  pollId: number;
  optionId: number;
  voterId: string;
};

export type SubmitVoteOutType = {
  hasVoted: number;
  options: Record<number, number>;
  totalVotes: number;
};

export type LiveResultType = {
  options: Record<number, number> | null;
  totalVotes: number;
};
