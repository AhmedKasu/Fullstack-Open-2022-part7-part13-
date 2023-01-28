import { Entry, EntryFormValues, EntryType } from '../types';

export type FormError =
  | {
      [field: string]: string;
    }
  | {
      [field: string]: {
        [subField: string]: string;
      };
    };

const isDate = (date: string): boolean => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(date);
};

export const validateEntryInputs = (values: EntryFormValues): FormError => {
  const requiredError = 'Field is required';
  const malformatedError = 'Malformated field';
  const errors: FormError = {};

  let dischargeDate = '';
  let dischargeCriteria = '';

  //description validation
  if (!values.description) {
    errors.description = requiredError;
  } else if (values.description.length < 5 || Number(values.description)) {
    errors.description = malformatedError;
  }

  //date validation
  if (!values.date) {
    errors.date = requiredError;
  } else if (!isDate(values.date)) {
    errors.date = malformatedError;
  }

  //specialist validation
  if (!values.specialist) {
    errors.specialist = requiredError;
  } else if (values.specialist.length < 3) {
    errors.specialist = malformatedError;
  }

  //discharge date validation
  if (!values.discharge.date) {
    dischargeDate = requiredError;
  } else if (!isDate(values.discharge.date)) {
    dischargeDate = malformatedError;
  }

  // discharge criteria validation
  if (!values.discharge.criteria) {
    dischargeCriteria = requiredError;
  } else if (values.discharge.criteria.length < 5) {
    dischargeCriteria = malformatedError;
  }

  //setting discharge errors Object
  if (
    values.type === EntryType.Hospital &&
    (dischargeDate || dischargeCriteria)
  ) {
    errors.discharge = { date: dischargeDate, criteria: dischargeCriteria };
  }

  return errors;
};

type UnionOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;
type EntryWithoutId = UnionOmit<Entry, 'id'>;

export const valuesToSubmit = (values: EntryFormValues): EntryWithoutId => {
  let newValues: EntryWithoutId = { ...values, type: EntryType.HealthCheck };

  if (values.type === EntryType.HealthCheck) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { discharge, ...healthCheckValues } = values;
    newValues = { ...healthCheckValues, type: EntryType.HealthCheck };
  }
  if (values.type === EntryType.Hospital) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { healthCheckRating, ...hospitalValues } = values;
    newValues = { ...hospitalValues, type: EntryType.Hospital };
  }
  // if (values.type === EntryType.OccupationalHealthcare) {
  //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
  //   const { healthCheckRating, ...healthCareValues } = values;
  //   newValues = { ...healthCareValues, type: EntryType.OccupationalHealthcare };
  // }
  return newValues;
};
