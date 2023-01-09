import patients from '../../data/patients';

import { Patient, PublicPatient, NewPatient } from '../types';

import { v1 as uuid } from 'uuid';
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const id: string = uuid();

const getPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatient = (id: string): Patient | undefined => {
  const patient: Patient | undefined = patients.find(
    (patient) => patient.id === id
  );
  if (patient) {
    return patient;
  } else {
    return undefined;
  }
};

const addPatient = (patient: NewPatient): PublicPatient => {
  const newPatient: Patient = { id, ...patient, entries: [] };

  patients.push(newPatient);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const publicPatient: PublicPatient = (({ entries, ssn, ...object }) =>
    object)(newPatient);

  return publicPatient;
};

export default { getPatients, addPatient, getPatient };
