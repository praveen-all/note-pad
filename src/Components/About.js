import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
export default function About() {
  const a = useContext(noteContext);

  return (
    <div>
      <h1>This is about componenet </h1>
    </div>
  );
}
