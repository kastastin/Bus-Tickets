import React from "react";
import spinner from "../resources/Spinner.gif";

import "../resources/css/loader.css";

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
