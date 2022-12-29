import { Router } from 'express';
import calculateBmi from '../bmiCalculator';

const router = Router();

router.get('/', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!height || !weight) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const bmi = calculateBmi(height, weight);
  return res.json({ weight, height, bmi });
});

export default router;
