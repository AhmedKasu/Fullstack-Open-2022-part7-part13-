import { Patient, PatientInfo } from '../types';

export const isFetched = (patient: Patient): patient is PatientInfo => {
  return (
    Object.keys(patient).includes('entries') &&
    Object.keys(patient).includes('ssn')
  );
};
