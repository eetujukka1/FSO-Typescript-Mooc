import { v1 as uuid } from 'uuid';
import patients from "../../data/patients";
import { Patient, NewEntry, Entry, NonSensitivePatient, NewPatient } from "../types";

const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatient = (id: string): Patient => {
  const patient = patients.find((p) => p.id === id);
  if (!patient) {
    throw new Error(`Patient with id ${id} not found`);
  }
  return patient;
};

const addPatient = ( patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient,
  };

  patients.push(newPatient);

  return newPatient;
};

const addEntry = (entry: NewEntry, id: string): Entry => {
  const newEntry = {
    id: uuid(),
    ...entry
  };
  
  const patient = patients.find(p => p.id === id);
  if (!patient) {
    throw new Error(`Patient with id ${id} not found`);
  }

  patient.entries?.push(newEntry);
  return newEntry;
};

export default {
  getPatients,
  getNonSensitivePatients,
  getPatient,
  addPatient,
  addEntry
};