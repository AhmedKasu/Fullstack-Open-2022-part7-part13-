import { Gender, HealthCheckRating } from '../types';

export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

export const isSsnFormat = (ssn: string): boolean => {
  return ssn.match(/^\d{6}[-]\d{4}$/) !== null;
};

export const isObject = (param: unknown): boolean => {
  return typeof param === 'object' || param instanceof Object;
};

export const objectHasKey = (obj: object, key: string): boolean => {
  return Object.keys(obj).includes(key);
};

enum EntryType {
  HealthCheck = 'HealthCheck',
  OccupationalHealthcare = 'OccupationalHealthcare',
  Hospital = 'Hospital',
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEntryType = (type: any): type is EntryType => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(EntryType).includes(type);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

export const isValidRating = (param: unknown): boolean => {
  return Number(param) > -1 && Number(param) < 4;
};
