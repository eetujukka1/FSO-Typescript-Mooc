interface ExerciseReview {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
};

interface ExerciseValues {
  target: number;
  exerciseData: number[];
}

const parseArguments = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (args.slice(2).every((i) => !isNaN(Number(i)))) {
    const target = Number(args[1]);
    const exerciseData = args.slice(3).map((i) => Number(i));
    return {
      target,
      exerciseData
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateExercise = (target: number, excerciseData: number[]): ExerciseReview => {
  const periodLength = excerciseData.length;
  const trainingDays = excerciseData.filter((h) => h > 0).length;
  const average = excerciseData.reduce((a, b) => a + b, 0) / periodLength;

  const ratio = average / target;
  const rating = ratio >= 1 ? 3 : ratio >= 0.75 ? 2 : 1;

  const ratingDescription =
    rating === 3
      ? "target met, very good"
      : rating === 2
      ? "not too bad but could be better"
      : "below expectation";

  return {
    periodLength,
    trainingDays,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average
  };
};

try {
  const { target, exerciseData } = parseArguments(process.argv);
  console.log(calculateExercise(target, exerciseData));
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  };
  console.log(errorMessage);
};
