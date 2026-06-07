"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importDefault(require("../utils"));
const patientsRouter = express_1.default.Router();
patientsRouter.get('/', (_req, res) => {
    res.send(patientService_1.default.getNonSensitivePatients());
});
patientsRouter.get('/:id', (req, res) => {
    res.send(patientService_1.default.getPatient(req.params.id));
});
patientsRouter.post('/', (req, res) => {
    try {
        const newPatient = utils_1.default.toNewPatient(req.body);
        const addedPatient = patientService_1.default.addPatient(newPatient);
        res.json(addedPatient);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
patientsRouter.post('/:id/entries', (req, res) => {
    try {
        const newEntry = utils_1.default.toNewEntry(req.body);
        const addedEntry = patientService_1.default.addEntry(newEntry, req.params.id);
        res.json(addedEntry);
    }
    catch (error) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }
});
exports.default = patientsRouter;
