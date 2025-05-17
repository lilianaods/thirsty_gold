import { LogErrorRepository } from "../../usecases";
import { Controller, HttpRequest, HttpResponse } from "../interfaces";

export class LogErrorControllerDecorator implements Controller {
  constructor(
    private readonly controller: Controller,
    private readonly logErrorRepository: LogErrorRepository
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const response = await this.controller.handle(httpRequest);
    if (response.statusCode === 500) {
      await this.logErrorRepository.log(response.body.stack);
    }
    return response;
  }
}
