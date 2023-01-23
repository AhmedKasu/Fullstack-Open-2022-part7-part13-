/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from '../types';
import { parseDate, parseName } from './patientEntryHelpers';
import {
  isDate,
  isString,
  isObject,
  objectHasKey,
  isEntryType,
  isHealthCheckRating,
  isValidRating,
} from './utils';

const parseLongTextInputs = (text: unknown): string => {
  if (!text || !isString(text) || text.length < 5) {
    throw new Error(`Incorrect or missing: ${text}`);
  }
  return text;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): string[] => {
  if (
    Array.isArray(diagnosisCodes) &&
    diagnosisCodes.length > 0 &&
    diagnosisCodes.every((code: unknown) => isString(code))
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return diagnosisCodes;
  }
  throw new Error('Incorrect or missing diagnosis codes: ' + diagnosisCodes);
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist) || specialist.length < 3) {
    throw new Error('Incorrect or missing specialist: ' + specialist);
  }
  return specialist;
};

const parseEntryType = (type: unknown): string => {
  if (!type || !isEntryType(type)) {
    throw new Error('Incorrect or missing type: ' + type);
  }
  return type;
};

const parseHealthCheckRating = (healthCheckRating: unknown): number => {
  if (
    !isValidRating(healthCheckRating) ||
    !isHealthCheckRating(healthCheckRating)
  ) {
    throw new Error(
      'Incorrect or missing health check rating: ' + healthCheckRating
    );
  }
  return healthCheckRating;
};

type Discharge = {
  date: string;
  criteria: string;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (
    discharge &&
    isObject(discharge) &&
    objectHasKey(discharge, 'date') &&
    objectHasKey(discharge, 'criteria')
  ) {
    const dischargeObj = discharge as Discharge;
    return {
      ...dischargeObj,
      date: parseDate(dischargeObj.date),
      criteria: parseLongTextInputs(dischargeObj.criteria),
    };
  }
  throw new Error('Incorrect or missing discharge: ' + discharge);
};

type SickLeave = {
  startDate: string;
  endDate: string;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (
    sickLeave &&
    isObject(sickLeave) &&
    objectHasKey(sickLeave, 'startDate') &&
    objectHasKey(sickLeave, 'endDate')
  ) {
    const sickLeaveObj = sickLeave as SickLeave;
    return {
      ...sickLeaveObj,
      startDate: parseDate(sickLeaveObj.startDate),
      endDate: parseDate(sickLeaveObj.endDate),
    };
  }
  throw new Error('Incorrect or missing sick leave: ' + sickLeave);
};

const isHealthCheckEntry = (entry: any): entry is HealthCheckEntry => {
  return (
    entry.type === 'HealthCheck' && isHealthCheckRating(entry.healthCheckRating)
  );
};

const isHospitalEntry = (entry: any): entry is HospitalEntry => {
  return (
    entry.type === 'Hospital' &&
    isDate(String(entry.discharge.date)) &&
    isString(entry.discharge.criteria)
  );
};

export const isOccupationalHealthcareEntry = (
  entry: any
): entry is OccupationalHealthcareEntry => {
  return (
    entry.type === 'OccupationalHealthcare' &&
    isString(entry.employerName) &&
    (entry.sickLeave === undefined ||
      (isDate(String(entry.sickLeave.startDate)) &&
        isDate(String(entry.sickLeave.endDate))))
  );
};

type EntryFields = {
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes?: Array<unknown>;
  type: unknown;
  healthCheckRating?: unknown;
  discharge?: {
    date: unknown;
    criteria: unknown;
  };
  employerName?: unknown;
  sickLeave?: {
    startDate: unknown;
    endDate: unknown;
  };
};
const toNewEntry = ({
  description,
  date,
  specialist,
  diagnosisCodes,
  type,
  healthCheckRating,
  discharge,
  employerName,
  sickLeave,
}: EntryFields): Entry => {
  console.log('toNewEntry', healthCheckRating);

  const newEntry = {
    description: parseLongTextInputs(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist),
    diagnosisCodes: diagnosisCodes
      ? parseDiagnosisCodes(diagnosisCodes)
      : undefined,
    type: parseEntryType(type),
    healthCheckRating: isValidRating(healthCheckRating)
      ? parseHealthCheckRating(healthCheckRating)
      : undefined,
    discharge: discharge ? parseDischarge(discharge) : undefined,
    employerName: employerName ? parseName(employerName) : undefined,
    sickLeave: sickLeave ? parseSickLeave(sickLeave) : undefined,
  };
  console.log('newentry', newEntry);

  if (isHealthCheckEntry(newEntry)) {
    return newEntry;
  } else if (isHospitalEntry(newEntry)) {
    return newEntry;
  } else if (isOccupationalHealthcareEntry(newEntry)) {
    return newEntry;
  } else {
    throw new Error('Incorrect or missing entry fields');
  }
};

export default toNewEntry;
