const getDateAndTime = function (value) {
  const dateTime = new Date(value);
  const dateOptions = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour12: false,
  };
  const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: false };

  const dateString = dateTime
    .toLocaleString("uk-UA", dateOptions)
    .split("/")
    .reverse()
    .join(".");

  const timeString = dateTime.toLocaleString("uk-UA", timeOptions);

  return `${dateString} | ${timeString}`;
};

export { getDateAndTime };
