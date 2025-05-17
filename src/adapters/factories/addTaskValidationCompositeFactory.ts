import { DateValidatorAdapter } from "../dateValidatorAdapter";
import { Validation } from "../interfaces";
import { DateValidation } from "../validations/dateValidation";
import { RequiredFieldsValidation } from "../validations/requiredFieldsValidation";
import { ValidationComposite } from "../validations/validationComposite";

export function addTaskValidationCompositeFactory(): ValidationComposite {
  const validations: Validation[] = [];

  for (const field of ["title", "description", "date"]) {
    validations.push(new RequiredFieldsValidation(field));
  }

  validations.push(new DateValidation("date", new DateValidatorAdapter()));

  return new ValidationComposite(validations);
}
