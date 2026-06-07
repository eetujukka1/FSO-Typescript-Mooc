import type { JSX } from "react";
import type { CoursePart } from '../types'
import { assertNever } from "../utils";

const Part = ({ part }: { part: CoursePart }): JSX.Element => {
  return (
    <div>
      {(() => {
        switch (part.kind) {
          case 'basic':
            return (
              <div>
                <h3>{part.name} (Exercises: {part.exerciseCount})</h3>
                <p><em>{part.description}</em></p>
              </div>
            );
          case 'group':
            return (
              <div>
                <h3>{part.name} (Exercises: {part.exerciseCount})</h3>
                <p>Group projects: {part.groupProjectCount}</p>
              </div>
            );
          case 'background':
            return (
              <div>
                <h3>{part.name} (Exercises: {part.exerciseCount})</h3>
                <p><em>{part.description}</em></p>
                <p>Background material: {part.backgroundMaterial}</p>
              </div>
            );
          case 'special':
            return (
              <div>
                <h3>{part.name} (Exercises: {part.exerciseCount})</h3>
                <p><em>{part.description}</em></p>
                <p>Requirements: </p>
                <ul>
                  {part.requirements.map((r) => {
                    return (
                      <ul key={r}>{r}</ul>
                    )
                  })}
                </ul>
              </div>
            )
          default:
            return assertNever(part);
        }
      })()}
    </div>
  );
};

export default Part;