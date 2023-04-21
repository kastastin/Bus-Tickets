import React from "react";
import spinner from "../resources/Spinner.gif";

function Loader() {
  return (
    <div className="loader-container">
      <div className="loader">
        <img src={spinner} alt="Spinner" />
      </div>
    </div>
  );
}

export default Loader;
