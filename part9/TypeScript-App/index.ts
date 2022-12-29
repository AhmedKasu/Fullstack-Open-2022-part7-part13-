import express from 'express';

import helloRouter from './routers/hello';
import bmiCalculatorROuter from './routers/bmiCalculator';
import calculateExercisesRouter from './routers/exercisesCalculatorRouter';

const app = express();
app.use(express.json());

app.use('/hello', helloRouter);
app.use('/bmi', bmiCalculatorROuter);
app.use('/exercises', calculateExercisesRouter);

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
