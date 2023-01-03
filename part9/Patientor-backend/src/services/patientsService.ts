import patients from '../../data/patients.json';

import { Patient, NewPatient } from '../types';

import { v1 as uuid } from 'uuid';
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
const id: string = uuid();

const getPatients = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient: Patient = { id, ...patient };

  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, addPatient };
