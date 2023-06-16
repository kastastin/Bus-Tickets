const getDateAndTime = function (timeStr) {
  const date = new Date(timeStr);

  const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: false };
  const timeString = date.toLocaleString("uk-UA", timeOptions);

  const dateOptions = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour12: false,
  };
  const dateString = date
    .toLocaleString("uk-UA", dateOptions)
    .split("/")
    .reverse()
    .join(".");

  return `${dateString} | ${timeString}`;
};

export { getDateAndTime };
