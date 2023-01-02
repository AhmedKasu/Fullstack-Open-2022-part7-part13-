import { Router } from 'express';

import diagnosesService from '../services/diagnoses';

const router = Router();

router.get('/', (_req, res) => {
  res.send(diagnosesService.getDiagnoses());
});

export default router;
