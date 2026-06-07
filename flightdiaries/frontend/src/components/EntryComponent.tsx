import type { Entry } from "../types"

const EntryComponent = ({entry}: {entry: Entry}) => {
  return (
    <div>
      <h2>{entry.date}</h2>
      visibility: {entry.visibility}
      <br />
      weather: {entry.weather}
    </div>
  )
};

export default EntryComponent;