import patients from '../../data/patients.json';

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
  const patient = patients.find((patient) => patient.id === id);
  if (patient && !('entries' in patient)) {
    return { ...patient, entries: [] };
  } else {
    return undefined;
  }
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = { id, ...patient, entries: [] };

  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, addPatient, getPatient };
