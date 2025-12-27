import { Request, Response } from "express";
import { IController } from "../../../app/providers/controller/IController";
import { POLL_ERRORS } from "../../../domain/constants/errors";
import { SubmitVoteInType } from "../types/pollTypes";
import { ISubmitVoteUseCase } from "../../../app/useCases/interfaces/ISubmitVoteUseCase";

export class SubmitVoteController implements IController {
  constructor(private submitVoteUseCase: ISubmitVoteUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { optionId, pollId, voterId } = req.body as SubmitVoteInType;

    if (!optionId || !pollId) {
      res.status(400).json({ message: POLL_ERRORS.POLL_NOT_FOUND });
      return;
    }

    if (!voterId) {
      res.status(400).json({ message: POLL_ERRORS.USERID_NOT_FOUND });
      return;
    }

    const result = await this.submitVoteUseCase.execute(
      pollId,
      optionId,
      voterId
    );

    res.status(result.statusCode).json(result.data);
    return;
  }
}
