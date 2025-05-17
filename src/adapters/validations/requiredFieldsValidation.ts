import { Validation } from "../interfaces";
import { MissingParamError } from "../presentations/api/errors";

export class RequiredFieldsValidation implements Validation {
  constructor(private readonly fieldName: string) {}

  validate(data: any): Error | void {
    if (!data[this.fieldName]) {
      return new MissingParamError(this.fieldName);
    }
  }
}
