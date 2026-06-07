import { useState, SyntheticEvent } from "react";

import { TextField, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import { Diagnosis, EntryFormValues } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  diagnoses: Diagnosis[];
}

const AddEntryForm = ({ onCancel, onSubmit, diagnoses }: Props) => {
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [specialist, setSpecialist] = useState<string>('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);

  const [employerName, setEmployerName] = useState<string>('');

  const [sickLeave, setSickLeave] = useState<{ startDate: string, endDate: string } | null>(null);
  const [discharge, setDischarge] = useState<{ date: string; criteria: string }>({ date: '', criteria: '' });
  const [type, setType] = useState<'HealthCheck' | 'OccupationalHealthcare' | 'Hospital'>('HealthCheck');

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    
    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes: diagnosisCodes.length > 0 ? diagnosisCodes : undefined
    };

    switch (type) {
      case 'HealthCheck':
        onSubmit({
          ...baseEntry,
          type: 'HealthCheck',
          healthCheckRating
        });
        break;
      case 'OccupationalHealthcare':
        onSubmit({
          ...baseEntry,
          type: 'OccupationalHealthcare',
          employerName,
          sickLeave: sickLeave?.startDate && sickLeave?.endDate ? {
            startDate: sickLeave.startDate,
            endDate: sickLeave.endDate
          } : undefined
        });
        console.log(sickLeave);
        break;
      case 'Hospital':
        onSubmit({
          ...baseEntry,
          type: 'Hospital',
          ...(discharge.date && discharge.criteria ? { discharge } : {})
        });
        break;
    }
  };

  const renderSpecialFields = () => {
    switch (type) {
      case 'HealthCheck':
        return (
          <FormControl fullWidth margin="normal">
            <InputLabel id="health-check-rating-label">Health check rating</InputLabel>
            <Select
              labelId="health-check-rating-label"
              value={healthCheckRating}
              label="Health check rating"
              onChange={({ target }) => setHealthCheckRating(Number(target.value))}
            >
              <MenuItem value={0}>0 - Health</MenuItem>
              <MenuItem value={1}>1 - Low Risk</MenuItem>
              <MenuItem value={2}>2 - High Risk</MenuItem>
              <MenuItem value={3}>3 - Critical Risk</MenuItem>
            </Select>
          </FormControl>
        );
      case 'OccupationalHealthcare':
        return (
          <>
            <TextField
              label="Employer name"
              fullWidth
              margin="normal"
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
            />
            <TextField
              label="Sick leave start date"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              value={sickLeave?.startDate || ''}
              onChange={({ target }) => 
                setSickLeave({
                  ...(sickLeave || { startDate: '', endDate: '' }),
                  startDate: target.value
                })
              }
            />
            <TextField
              label="Sick leave end date"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              value={sickLeave?.endDate || ''}
              onChange={({ target }) =>
                setSickLeave({
                  ...(sickLeave || { startDate: '', endDate: '' }),
                  endDate: target.value
                })
              }
            />
          </>
        );
      case 'Hospital':
        return (
          <>
            <TextField
              label="Discharge date"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              value={discharge.date}
              onChange={({ target }) => setDischarge({ ...discharge, date: target.value })}
            />
            <TextField
              label="Discharge criteria"
              fullWidth
              margin="normal"
              value={discharge.criteria}
              onChange={({ target }) => setDischarge({ ...discharge, criteria: target.value })}
            />
          </>
        );
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '1em' }}>
        <FormControl fullWidth>
          <InputLabel>Entry Type</InputLabel>
          <Select
            value={type}
            label="Entry Type"
            onChange={(e) => setType(e.target.value as 'HealthCheck' | 'OccupationalHealthcare' | 'Hospital')}
          >
            <MenuItem value="HealthCheck">Health Check</MenuItem>
            <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
          </Select>
        </FormControl>
      </div>
      <form onSubmit={addEntry}>
        <TextField
          label="Description"
          fullWidth 
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Date"
          type="date"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="diagnosis-codes-label">Diagnosis codes</InputLabel>
          <Select
            labelId="diagnosis-codes-label"
            multiple
            value={diagnosisCodes}
            label="Diagnosis codes"
            onChange={({ target }) => {
              const value = target.value;
              setDiagnosisCodes(typeof value === "string" ? value.split(",") : value);
            }}
            renderValue={(selected) => selected.join(", ")}
          >
            {diagnoses.map((diagnosis) => (
              <MenuItem key={diagnosis.code} value={diagnosis.code}>
                {diagnosis.code} {diagnosis.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {renderSpecialFields()}
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
