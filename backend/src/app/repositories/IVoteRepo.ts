export interface IVoteRepo {
  getTotalVotes(pollId: number): Promise<number>;

  hasVoted(
    pollId: number,
    voterId: string
  ): Promise< number | null >;
}
