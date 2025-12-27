import { ResponseDTO } from "../../../domain/entity/ResponseDTO";
import { IPollServices } from "../../providers/IPollServices";
import { ITransactionService } from "../../providers/ITransactionService";
import { ICreatePollUseCase } from "../interfaces/ICreatePollUseCase";

export class CreatePollUseCase implements ICreatePollUseCase {
  constructor(
    private pollServices: IPollServices,
    private transactionService: ITransactionService
  ) {}

  async execute(
    question: string,
    options: string[],
    expiresAt: string
  ): Promise<ResponseDTO> {
    const pollCode = await this.pollServices.generatePollCode();

    await this.transactionService.createPollTransaction(
      pollCode,
      question,
      options,
      new Date(expiresAt)
    );

    return {
      statusCode: 200,
      data: { pollCode },
    };
  }
}
