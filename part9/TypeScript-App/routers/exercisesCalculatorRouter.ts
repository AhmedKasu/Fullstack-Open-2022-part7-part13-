import { Router } from 'express';
import ExercisesValuesDTO from '../dtos/exercises_values';
import calculateExercises from '../exerciseCalculator';

const router = Router();

router.post('/', (req, res) => {
  const { daily_exercises, target } = req.body as ExercisesValuesDTO;

  if (!daily_exercises || daily_exercises.length < 1 || !target) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  if (
    !Array.isArray(daily_exercises) ||
    daily_exercises.some((value) => isNaN(value)) ||
    isNaN(target)
  ) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const result = calculateExercises(
    daily_exercises.map((e) => Number(e)),
    Number(target)
  );

  return res.json(result);
});
export default router;
