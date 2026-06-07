import { Entry, HealthCheckEntry, HealthCheckRating, HospitalEntry, OccupationalHealthcareEntry, Diagnosis } from "../../types";
import { assertNever } from "../../utils";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import WorkIcon from '@mui/icons-material/Work';

interface Props {
  entry: Entry;
  diagnoses?: Diagnosis[];
}

const HealthCheckComponent: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => (
  <div>
    <b>Health rating:</b> {HealthCheckRating[entry.healthCheckRating]}
  </div>
);

const HospitalComponent: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  if (!entry.discharge) return null;
  
  return (
    <div>
      <b>Discharge:</b> {entry.discharge.date} <i>{entry.discharge.criteria}</i>
    </div>
  );
};

const OccupationalComponent: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => (
  <div>
    <b>Employer:</b> {entry.employerName}
    {entry.sickLeave && (
      <div>
        <b>Sick leave:</b> {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
      </div>
    )}
  </div>
);

const EntryDetails: React.FC<Props> = ({ entry, diagnoses }) => {
  const renderEntryDetails = () => {
    switch (entry.type) {
      case 'HealthCheck':
        return <HealthCheckComponent entry={entry} />;
      case 'Hospital':
        return <HospitalComponent entry={entry} />;
      case 'OccupationalHealthcare':
        return <OccupationalComponent entry={entry} />;
      default:
        return assertNever(entry);
    }
  };

  const renderIcon = () => {
    switch (entry.type) {
      case 'HealthCheck':
        return <MonitorHeartIcon />;
      case 'Hospital':
        return <LocalHospitalIcon />;
      case 'OccupationalHealthcare':
        return <WorkIcon />;
      default:
        return assertNever(entry);
    }
  };

  return (
    <div style={{border: 'solid black 1px', padding: '1rem'}} key={entry.id}>
      {renderIcon()} {entry.date}
      <br />
      {entry.specialist}
      <p><i>{entry.description}</i></p>

      {entry.diagnosisCodes && (
        <ul>
          {entry.diagnosisCodes.map(code => (
            <li key={code}>
              {code} {diagnoses?.find(d => d.code === code)?.name}
            </li>
          ))}
        </ul>
      )}
      {renderEntryDetails()}
    </div>
  );
};

export default EntryDetails;