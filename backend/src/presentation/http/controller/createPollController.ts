import { Request, Response } from "express";
import { IController } from "../../../app/providers/controller/IController";
import { CreatePollType } from "../../../domain/types/usecase/createPollTypes";
import { ICreatePollUseCase } from "../../../app/useCases/interfaces/ICreatePollUseCase";
import { PollErrors } from "../../../domain/constants/errors";

export class createPollController implements IController {
  constructor(private createPollUseCase: ICreatePollUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { options, question, expiresAt } = req.body as CreatePollType;

    if (
      !options ||
      !question ||
      !options.length ||
      !question.trim() ||
      !expiresAt
    ) {
      res.status(400).send({
        message: PollErrors.INVALID_POLL_INPUT,
      });
      return;
    }

    if (options.length < 2) {
      res.status(400).send({ message: PollErrors.MIN_OPTIONS });
      return;
    }

    if (options.length > 10) {
      res.status(400).send({ message: PollErrors.MAX_OPTIONS });
      return;
    }
    const canCreatePoll = options.every((opt) => opt.trim() !== "");
    if (!canCreatePoll) {
      res.status(400).send({ message: PollErrors.INVALID_OPTIONS });
      return;
    }

    if (expiresAt < new Date().toISOString() || expiresAt === "Invalid Date") {
      res.status(400).send({ message: PollErrors.INVALID_DATE });
      return;
    }

    const result = await this.createPollUseCase.execute(
      question,
      options,
      expiresAt
    );

    res.status(result.statusCode).json(result.data);
    return;
  }
}
