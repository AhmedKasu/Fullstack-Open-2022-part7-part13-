import { Router } from 'express';
import patientService from '../services/patientsService';
import { NewPatientFields, Patient } from '../types';

import toNewPatientEntry from '../utils';

const router = Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatient(req.params.id);
  if (patient) {
    res.send(patient);
  } else {
    res.status(404).send('Patient not found');
  }
});

router.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body as NewPatientFields);
    const newPatient: Patient = patientService.addPatient(newPatientEntry);
    res.json(newPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
