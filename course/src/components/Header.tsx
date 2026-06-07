import type { JSX } from "react";

const Header = ({ name }: { name: string }): JSX.Element => {
  return (
    <h1>{name}</h1>
  )
}

export default Header;