import React, { useEffect, useId, useState } from "react";
import MiniBus from "./MiniBus";
import StandardBus from "./StandardBus";
import LargeBus from "./LargeBus";
import "../../../resources/css/seats.css";

function Seats({ localBus, setLocalBus }) {
  const busFormOptions = {
    mini: {
      seats: 16,
      doors: 1,
      type: "Mini",
      component: <MiniBus />,
    },
    standard: {
      seats: 23,
      doors: 2,
      type: "Standard",
      component: <StandardBus />,
    },
    large: {
      seats: 32,
      doors: 2,
      type: "Large",
      component: <LargeBus />,
    },
  };

  const [component, setComponent] = useState(
    localBus.type ? busFormOptions[localBus.type]["component"] : <StandardBus />
  );

  useEffect(() => {
    if (!!!localBus.type) {
      setLocalBus((prevState) => ({
        ...prevState,
        seats: 23,
        type: "standard",
      }));
    }
    // eslint-disable-next-line
  }, []);

  const Form = function () {
    const seatsNumberID = useId();
    const doorsNumberID = useId();

    const busTypeHandler = function (e) {
      const type = e.target.value;

      setLocalBus((prevState) => ({
        ...prevState,
        seats: busFormOptions[type]["seats"],
        type: type,
      }));

      switch (type) {
        case "mini":
          setComponent(<MiniBus />);
          break;

        case "standard":
          setComponent(<StandardBus />);
          break;

        case "large":
          setComponent(<LargeBus />);
          break;

        default:
          return;
      }
    };

    const getDefaultValue = function (field) {
      return !!localBus.type
        ? busFormOptions[localBus.type][field]
        : busFormOptions.standard.seats;
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
              defaultValue={getDefaultValue("seats")}
              disabled
            />
          </div>

          <div>
            <label htmlFor={doorsNumberID}>Number of doors:</label>
            <input
              type="number"
              name="doorsNumber"
              id={doorsNumberID}
              defaultValue={getDefaultValue("doors")}
              disabled
            />
          </div>

          <div>
            <label>
              Choose bus type:
              <select
                name="busType"
                defaultValue={
                  !!localBus.type
                    ? localBus.type.toLowerCase()
                    : busFormOptions.standard.type.toLowerCase()
                }
                onChange={busTypeHandler}
                disabled={!!localBus?.reservedSeats?.length}
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
      <div className="right">{component}</div>
    </>
  );
}

export default Seats;
