import React, { useId, useState } from "react";

import MiniBus from "./MiniBus";
import StandardBus from "./StandardBus";
import LargeBus from "./LargeBus";

import "../../../resources/css/seats.css";

function Seats() {
  const busFormOptions = {
    mini: {
      seats: 16,
      doors: 1,
      type: "Mini",
    },
    standard: {
      seats: 23,
      doors: 2,
      type: "Standard",
    },
    large: {
      seats: 32,
      doors: 2,
      type: "Large",
    },
  };

  const [busType, setBusType] = useState(<MiniBus />);
  const [formOptions, setFormOptions] = useState(busFormOptions.mini);

  const Form = function () {
    const seatsNumberID = useId();
    const doorsNumberID = useId();

    const busTypeHandler = function (e) {
      switch (e.target.value) {
        case "standard":
          setBusType(<StandardBus />);
          setFormOptions(busFormOptions.standard);
          break;

        case "large":
          setBusType(<LargeBus />);
          setFormOptions(busFormOptions.large);
          break;

        default:
          setBusType(<MiniBus />);
          setFormOptions(busFormOptions.mini);
          break;
      }
    };

    return (
      <>
        <div className="form-wrapper">
          <div>
            <label htmlFor={seatsNumberID}>Number of seats:</label>
            <input
              type="number"
              name="seatsNumber"
              id={seatsNumberID}
              defaultValue={formOptions.seats}
              disabled
            />
          </div>

          <div>
            <label htmlFor={doorsNumberID}>Number of doors:</label>
            <input
              type="number"
              name="doorsNumber"
              id={doorsNumberID}
              defaultValue={formOptions.doors}
              disabled
            />
          </div>

          <div>
            <label>
              Choose bus type:
              <select
                name="busType"
                defaultValue={formOptions.type.toLowerCase()}
                onChange={busTypeHandler}
              >
                <option value="mini">Mini</option>
                <option value="standard">Standard</option>
                <option value="large">Large</option>
              </select>
            </label>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="left">
        <Form />
      </div>
      <div className="right">{busType}</div>
    </>
  );
}

export default Seats;
