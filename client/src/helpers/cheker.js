const isEmpty = function (obj) {
  return Object.keys(obj).length === 0;
};

function isObjectValuesEmpty(obj, value = "default") {
  switch (value) {
    case "departure":
      return (
        obj.departure !== "" && Object.values(obj).some((value) => value !== "")
      );

    case "arrival":
      return (
        obj.arrival !== "" && Object.values(obj).some((value) => value !== "")
      );

    case "both":
      return obj.departure !== "" && obj.arrival !== "";

    default:
      return Object.values(obj).some((value) => value !== "");
  }
}

export { isEmpty, isObjectValuesEmpty };
