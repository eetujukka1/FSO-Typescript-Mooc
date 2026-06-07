import type { Entry } from "../types";
import EntryComponent from './EntryComponent'

const Content = ({entries}: {entries: Entry[]}) => {
  return (
    <>
      {entries.map(entry => 
        <EntryComponent entry={entry} key={entry.id} />
      )}
    </>
  )
}

export default Content;