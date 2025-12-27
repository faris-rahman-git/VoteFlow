export interface ITransactionService {
  createPollTransaction(
    pollCode: string,
    question: string,
    options: string[],
    expiresAt: Date
  ): Promise<void>;

  createVoteTransaction(pollId: number, optionId: number, voterId: string): Promise<void>;
}
