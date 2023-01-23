import patients from '../../data/patients';

import { Patient, PublicPatient, NewPatient, Entry } from '../types';

import { v1 as uuid } from 'uuid';

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
  const id: string = uuid();
  const newPatient: Patient = { ...patient, id, entries: [] };

  patients.push(newPatient);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const publicPatient: PublicPatient = (({ entries, ssn, ...object }) =>
    object)(newPatient);

  return publicPatient;
};

const addEntry = (patientId: string, entry: Entry): Entry | undefined => {
  const id: string = uuid();
  const patient = patients.find((patient) => patient.id === patientId);
  if (patient) {
    const newEntry: Entry = { ...entry, id };
    patient.entries.push(newEntry);
    return newEntry;
  }
  return undefined;
};

export default { getPatients, addPatient, getPatient, addEntry };
