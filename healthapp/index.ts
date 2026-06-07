import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercise } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    const bmi = calculateBmi(Number(height), Number(weight));
    res.send({
      weight: Number(weight),
      height: Number(height),
      bmi
    });
  } else {
    res.status(400).send({ error: 'malformatted parameters' });
  };
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {daily_exercises, target} = req.body;

  if (!daily_exercises || !target ) {
    return res.status(400).send({ error: 'parameters missing"' });
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  if (isNaN(Number(target)) || !daily_exercises.every((e: number) => !isNaN(Number(e)))) {
    return res.status(400).send({ error: 'malformatted parameters"' });
  }

  const results = calculateExercise(Number(target), daily_exercises as number[]);
  return res.send(results);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});