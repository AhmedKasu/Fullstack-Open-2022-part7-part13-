import { Router } from 'express';
import patientService from '../services/patientsService';
import { NewPatient, PublicPatient, Entry } from '../types';

import toNewPatientInputs from '../utils/patientEntryHelpers';
import toNewEntry from '../utils/newEntryHelper';

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
    const newPatientEntry = toNewPatientInputs(req.body as NewPatient);
    const newPatient: PublicPatient =
      patientService.addPatient(newPatientEntry);
    res.json(newPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry = patientService.addEntry(
      req.params.id,
      toNewEntry(req.body as Entry)
    );
    res.json(newEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
