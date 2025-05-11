import { AddTask } from "../../../usecases/addTask";
import { Controller } from "../../interfaces/controller";
import { DateValidator } from "../../interfaces/dateValidator";
import { HttpRequest, HttpResponse } from "../../interfaces/http";
import { InvalidParamError } from "../../presentations/api/errors/invalid-param-error";
import { MissingParamError } from "../../presentations/api/errors/missing-param-error";
import {
  badRequest,
  created,
} from "../../presentations/api/httpResponses/httpResponses";

export class AddTaskController implements Controller {
  constructor(
    private readonly addTask: AddTask,
    private readonly dateValidator: DateValidator
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ["title", "description", "date"];

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return Promise.resolve(badRequest(new MissingParamError(field)));
      }
    }
    const { title, description, date } = httpRequest.body;

    const isValid = this.dateValidator.isValid(date);

    if (!isValid) {
      return Promise.resolve(badRequest(new InvalidParamError("date")));
    }

    const task = await this.addTask.add({
      title,
      description,
      date,
    });
    return Promise.resolve(created(task));
  }
}
