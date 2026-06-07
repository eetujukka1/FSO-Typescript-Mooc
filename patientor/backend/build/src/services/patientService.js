"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_1 = __importDefault(require("../../data/patients"));
const getPatients = () => {
    return patients_1.default;
};
const getNonSensitivePatients = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const getPatient = (id) => {
    const patient = patients_1.default.find((p) => p.id === id);
    if (!patient) {
        throw new Error(`Patient with id ${id} not found`);
    }
    return patient;
};
const addPatient = (patient) => {
    const newPatient = Object.assign({ id: (0, uuid_1.v1)() }, patient);
    patients_1.default.push(newPatient);
    return newPatient;
};
const addEntry = (entry, id) => {
    var _a;
    const newEntry = Object.assign({ id: (0, uuid_1.v1)() }, entry);
    const patient = patients_1.default.find(p => p.id === id);
    if (!patient) {
        throw new Error(`Patient with id ${id} not found`);
    }
    (_a = patient.entries) === null || _a === void 0 ? void 0 : _a.push(newEntry);
    return newEntry;
};
exports.default = {
    getPatients,
    getNonSensitivePatients,
    getPatient,
    addPatient,
    addEntry
};
