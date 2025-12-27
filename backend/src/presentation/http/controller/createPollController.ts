import { Request, Response } from "express";
import { IController } from "../../../app/providers/controller/IController";
import { ICreatePollUseCase } from "../../../app/useCases/interfaces/ICreatePollUseCase";
import { POLL_ERRORS } from "../../../domain/constants/errors";
import { CreatePollType } from "../types/pollTypes";

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
      res.status(400).json({
        message: POLL_ERRORS.INVALID_POLL_INPUT,
      });
      return;
    }

    if (options.length < 2) {
      res.status(400).json({ message: POLL_ERRORS.MIN_OPTIONS });
      return;
    }

    if (options.length > 10) {
      res.status(400).json({ message: POLL_ERRORS.MAX_OPTIONS });
      return;
    }
    const canCreatePoll = options.every((opt) => opt.trim() !== "");
    if (!canCreatePoll) {
      res.status(400).json({ message: POLL_ERRORS.INVALID_OPTIONS });
      return;
    }

    if (expiresAt < new Date().toISOString() || expiresAt === "Invalid Date") {
      res.status(400).json({ message: POLL_ERRORS.INVALID_DATE });
      return;
    }

    if (question.length > 300) {
      res.status(400).json({ message: POLL_ERRORS.QUESTION_TOO_LONG });
      return;
    }
    if (options.every((opt) => opt.length > 100)) {
      res.status(400).json({ message: POLL_ERRORS.OPTIONS_TOO_LONG });
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
