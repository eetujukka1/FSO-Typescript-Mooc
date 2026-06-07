import zod from 'zod';
import { Gender, NewPatient, HealthCheckRating, NewEntry } from "./types";

export const newPatientSchema = zod.object({
  name: zod.string(),
  dateOfBirth: zod.string().date(),
  ssn: zod.string(),
  gender: zod.enum(Gender),
  occupation: zod.string(),
});

export const newEntryBaseSchema = zod.object({
  description: zod.string(),
  date: zod.string().date(),
  specialist: zod.string(),
  diagnosisCodes: zod.array(zod.string()).optional(),
});

export const newHealthCheckEntrySchema = newEntryBaseSchema.extend({
  type: zod.literal('HealthCheck'),
  healthCheckRating: zod.enum(HealthCheckRating),
});

export const newHospitalEntrySchema = newEntryBaseSchema.extend({
  type: zod.literal('Hospital'),
  discharge: zod.object({
    date: zod.string().date(),
    criteria: zod.string(),
  }).optional()
});

export const newOccupationalHealthcareEntrySchema = newEntryBaseSchema.extend({
  type: zod.literal('OccupationalHealthcare'),
  employerName: zod.string(),
  sickLeave: zod.object({
    endDate: zod.string().date(),
    startDate: zod.string().date(),
  }).optional()
});

const toNewPatient = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    return newPatientSchema.parse(object);
  }
  throw new Error('Incorrect data: some fields are missing');
};

const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }
  
  if (!('type' in object) || typeof object.type !== 'string') {
    throw new Error('Missing or invalid entry type');
  }

  switch (object.type) {
    case 'HealthCheck':
      return newHealthCheckEntrySchema.parse(object);
    case 'OccupationalHealthcare':
      return newOccupationalHealthcareEntrySchema.parse(object);
    case 'Hospital':
      return newHospitalEntrySchema.parse(object);
    default:
      throw new Error(`Invalid entry type: ${object.type}`);
  }
};

export default {
  toNewPatient,
  toNewEntry
};