import { Request, Response } from "express";
import { IController } from "../../../app/providers/controller/IController";
import { PollErrors } from "../../../domain/constants/errors";
import { validatePollCode } from "../../utils/validatePollCode";
import { IGetPollUseCase } from "../../../app/useCases/interfaces/IGetPollUseCase";
import { getPollIntype } from "../types/pollTypes";

export class getPollController implements IController {
  constructor(private getPollUseCase: IGetPollUseCase) {}

  async handle(req: Request, res: Response): Promise<void> {
    const { pollCode, voterId } = req.params as getPollIntype;

    if (!validatePollCode(pollCode)) {
      res.status(400).json({ message: PollErrors.INVALID_POLL_LINK });
      return;
    }

    
    if (!voterId) {
      res.status(400).json({ message: PollErrors.USERID_NOT_FOUND });
      return;
    }

    const result = await this.getPollUseCase.execute(pollCode , voterId);

    res.status(result.statusCode).json(result.data);
    return;
  }
}
