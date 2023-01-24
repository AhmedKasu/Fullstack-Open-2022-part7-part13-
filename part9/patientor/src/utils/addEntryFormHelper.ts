import { HealthCheckEntryFormValues } from '../AddEntryModal/AddEntryForm';

type FormError = {
  [field: string]: string;
};

export const validateHealthCheckEntry = (
  values: HealthCheckEntryFormValues
): FormError => {
  const requiredError = 'Field is required';
  const malformatedError = 'Incorrect field format';
  const errors: { [field: string]: string } = {};
  if (!values.description) {
    errors.description = requiredError;
  } else if (values.description.length < 5 || Number(values.description)) {
    errors.description = malformatedError;
  }
  if (!values.date) {
    errors.date = requiredError;
  } else if (values.date.match(/^\d{4}[-]\d{2}[-]\d{2}$/) === null) {
    errors.date = malformatedError;
  }
  if (!values.specialist) {
    errors.specialist = requiredError;
  } else if (values.specialist.length < 3) {
    errors.specialist = malformatedError;
  }
  return errors;
};
