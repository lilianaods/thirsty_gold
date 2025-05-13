import { DateValidator } from "../interfaces/dateValidator";
import { Validation } from "../interfaces/validation";
import { InvalidParamError } from "../presentations/api/errors/invalid-param-error";

export class DateValidation implements Validation {
  constructor(
    private readonly fieldName: string,
    private readonly dateValidator: DateValidator
  ) {}

  validate(data: any): Error | void {
    const isValid = this.dateValidator.isValid(data[this.fieldName]);
    if (!isValid) {
      return new InvalidParamError(this.fieldName);
    }
  }
}
