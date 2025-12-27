import { ResponseDTO } from "../../../domain/entity/ResponseDTO";

export interface ISubmitVoteUseCase {
  execute(pollId: number ,optionId: number, voterId: string): Promise<ResponseDTO>;
}
