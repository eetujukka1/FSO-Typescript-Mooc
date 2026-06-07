"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newOccupationalHealthcareEntrySchema = exports.newHospitalEntrySchema = exports.newHealthCheckEntrySchema = exports.newEntryBaseSchema = exports.newPatientSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const types_1 = require("./types");
exports.newPatientSchema = zod_1.default.object({
    name: zod_1.default.string(),
    dateOfBirth: zod_1.default.string().date(),
    ssn: zod_1.default.string(),
    gender: zod_1.default.enum(types_1.Gender),
    occupation: zod_1.default.string(),
});
exports.newEntryBaseSchema = zod_1.default.object({
    description: zod_1.default.string(),
    date: zod_1.default.string().date(),
    specialist: zod_1.default.string(),
    diagnosisCodes: zod_1.default.array(zod_1.default.string()).optional(),
});
exports.newHealthCheckEntrySchema = exports.newEntryBaseSchema.extend({
    type: zod_1.default.literal('HealthCheck'),
    healthCheckRating: zod_1.default.enum(types_1.HealthCheckRating),
});
exports.newHospitalEntrySchema = exports.newEntryBaseSchema.extend({
    type: zod_1.default.literal('Hospital'),
    discharge: zod_1.default.object({
        date: zod_1.default.string().date(),
        criteria: zod_1.default.string(),
    }).optional()
});
exports.newOccupationalHealthcareEntrySchema = exports.newEntryBaseSchema.extend({
    type: zod_1.default.literal('OccupationalHealthcare'),
    employerName: zod_1.default.string(),
    sickLeave: zod_1.default.object({
        endDate: zod_1.default.string().date(),
        startDate: zod_1.default.string().date(),
    }).optional()
});
const toNewPatient = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
        return exports.newPatientSchema.parse(object);
    }
    throw new Error('Incorrect data: some fields are missing');
};
const toNewEntry = (object) => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if (!('type' in object) || typeof object.type !== 'string') {
        throw new Error('Missing or invalid entry type');
    }
    switch (object.type) {
        case 'HealthCheck':
            return exports.newHealthCheckEntrySchema.parse(object);
        case 'OccupationalHealthcare':
            return exports.newOccupationalHealthcareEntrySchema.parse(object);
        case 'Hospital':
            return exports.newHospitalEntrySchema.parse(object);
        default:
            throw new Error(`Invalid entry type: ${object.type}`);
    }
};
exports.default = {
    toNewPatient,
    toNewEntry
};
