import axios from "axios";
import { useState } from "react";
import { addNewEntry } from "../services/entryService";
import { type Entry } from "../types";
import { Weather, Visibility } from "../types";

const EntryForm = ({setEntries, entries}: {setEntries: React.Dispatch<React.SetStateAction<Entry[]>>, entries: Entry[]}) => {
  const [notification, setNotification] = useState('');
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState('');

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const newEntry = await addNewEntry({
        date,
        visibility,
        weather,
        comment,
      });
      setEntries(entries.concat(newEntry));

      setDate('');
      setVisibility(Visibility.Great);
      setWeather(Weather.Sunny);
      setComment('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setNotification(error.response?.data || error.message);
        setTimeout(() => {
          setNotification('')
        }, 5000);
      } else {
        console.log('Unexpected error:', error);
      }
    }
  };
  return (
      <div>
        <h2>Add new entry</h2>
        <div style={{ color: 'red' }}>{notification}</div>
        date
        <input type="date" value={date} onChange={e => setDate(e.target.value)} /><br/>
        <div>
          visibility<br/>
          {Object.values(Visibility).map(v => (
            <label key={v}>
              <input
                type="radio"
                checked={visibility === v}
                onChange={() => setVisibility(v)}
              />
              {v}
            </label>
          ))}
        </div>
        <div>
          weather<br/>
          {Object.values(Weather).map(w => (
            <label key={w}>
              <input
                type="radio"
                checked={weather === w}
                onChange={() => setWeather(w)}
              />
              {w}
            </label>
          ))}
        </div>
        comment
        <input value={comment} onChange={e => setComment(e.target.value)} /><br/>
        <button onClick={handleSubmit}>Add</button>
      </div>
  )
};

export default EntryForm;