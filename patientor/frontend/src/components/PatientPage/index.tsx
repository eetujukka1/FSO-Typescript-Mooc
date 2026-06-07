import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Patient, Diagnosis, EntryFormValues } from "../../types";
import patientService from '../../services/patients';
import diagnosesService from "../../services/diagnoses";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";
import { Button } from "@mui/material";
import axios from "axios";

const PatientPage = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const id = useParams().id;

  useEffect(() => {
    if (id) {
      patientService.getOne(id)
        .then(data => setPatient(data));
    }
    diagnosesService.getAll()
      .then(data => setDiagnoses(data));
  }, [id]);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      if (id) {
        const entry = await patientService.addEntry(values, id);
        setPatient(prevPatient => {
          if (!prevPatient) return prevPatient;
          return {
            ...prevPatient,
            entries: prevPatient.entries ? [...prevPatient.entries, entry] : [entry]
          };
        });
        setModalOpen(false);
      }
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  return (
    <div className="App">
      {patient && (
        <div>
          <h2>{patient.name}</h2>

          <div>
            ssn: {patient.ssn}<br />
            gender: {patient.gender}<br />
            occupation: {patient.occupation}
          </div>

          {patient.entries && (
            <div>
              <h3>Entries</h3>

              {patient.entries.map(entry => (
                <EntryDetails key={entry.id} entry={entry} diagnoses={diagnoses}/>
              ))}
            </div>
          )}
        </div>
      )}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        diagnoses={diagnoses ?? []}
        error={error}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
    </div>
  );
};

export default PatientPage;
