import { ResponseDTO } from "../../../domain/entity/ResponseDTO";

export interface ICreatePollUseCase {
  execute(question: string, options: string[] , expiresAt: string): Promise<ResponseDTO>;
}
