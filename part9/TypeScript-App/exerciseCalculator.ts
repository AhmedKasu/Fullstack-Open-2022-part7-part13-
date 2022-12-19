interface ExerciseValues {
  dailyExercises: Array<number>;
  target: number;
}

const parseExerciseArguments = (args: Array<string>): ExerciseValues => {
  if (args.length < 6) throw new Error('Not enough arguments');

  const target = Number(args[2]);
  if (isNaN(target)) throw new Error('Target must be a number');

  const dailyExercises = args.slice(3).map((d) => Number(d));

  if (dailyExercises.some((d) => isNaN(d)))
    throw new Error('Daily exercises must be numbers');

  return {
    dailyExercises,
    target,
  };
};

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  dailyExercises: Array<number>,
  target: number
): Result => {
  const total = dailyExercises.reduce((a, b) => a + b, 0);
  const average = total / dailyExercises.length;
  const success = average >= target;
  const rating = success ? 3 : average < target && average > target / 2 ? 2 : 1;
  return {
    periodLength: dailyExercises.length,
    trainingDays: dailyExercises.filter((d) => d > 0).length,
    success,
    rating,
    ratingDescription:
      rating === 3
        ? 'well done'
        : rating === 2
        ? 'not too bad but could be better'
        : 'try harder the next time',
    target,
    average,
  };
};

try {
  const { dailyExercises, target } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(dailyExercises, target));
} catch (error) {
  if (error instanceof Error) {
    console.log('Error, something bad happened, message: ', error.message);
  }
}
