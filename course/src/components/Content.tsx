import type { JSX } from "react";
import type { CoursePart } from '../types'
import Part from "./Part";

const Content = ({ parts }: { parts: CoursePart[] }): JSX.Element => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.name} part={part}/>
      ))}
    </>
  );
}

export default Content;