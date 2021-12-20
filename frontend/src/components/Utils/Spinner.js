import React from "react";
import "../../styles/Spinner.css";
function Spinner({ black }) {
  return <div className={`spinner ${black && "black"}`}></div>;
}

export default Spinner;
