export type CreatePollType = {
  question: string;
  options: string[];
  expiresAt: string;
};

export type getPollIntype = {
  pollCode: string;
  voterId: string;
};

export type getPollOutType = {
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
