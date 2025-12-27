export type CreatePollType = {
    question: string;
    options: string[];
    expiresAt: string
}

export type getPollIntype = {
  pollCode: string;
  voterId: string;
};
