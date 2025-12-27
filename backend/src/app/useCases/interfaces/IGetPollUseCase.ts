import { ResponseDTO } from "../../../domain/entity/ResponseDTO";

export interface IGetPollUseCase {
  execute(pollCode: string , voterId: string): Promise<ResponseDTO>;
}
