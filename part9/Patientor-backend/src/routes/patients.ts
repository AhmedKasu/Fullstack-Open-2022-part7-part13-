import { Router } from 'express';
import patientService from '../services/patientsService';
import { Patient, NewPatient } from '../types';

const router = Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body as NewPatient;

  const newPatient: Patient = patientService.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  });
  res.json(newPatient);
});

export default router;
