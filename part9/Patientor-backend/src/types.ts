export type Diagnose = {
  code: string;
  name: string;
  latin?: string;
};

export type Patient = {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
};

export type NewPatient = Omit<Patient, 'id' | 'entries'>;

export type NewPatientFields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;
