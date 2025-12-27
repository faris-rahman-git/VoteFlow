
export interface IPollServices {
  generatePollCode(): Promise<string>;

  checkPollExpired(pollId: number): Promise<boolean>;
}
