import { useState, useEffect } from "react";
import type { Entry } from "./types";
import { getAllEntries } from "./services/entryService";
import Content from "./components/Content";
import EntryForm from "./components/EntryForm";

const App = () => {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    getAllEntries().then(data => {
      setEntries(data);
    });
  }, []);

  return (
    <>
      <EntryForm entries={entries} setEntries={setEntries}/>
      <Content entries={entries}/>
    </>
  );
};

export default App;