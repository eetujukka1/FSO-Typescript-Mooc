import diganoses from "../../data/diagnoses";
import { Diagnosis } from "../types";

const getDiagnoses = (): Diagnosis[] => {
  return diganoses;
};

export default {
  getDiagnoses,
};