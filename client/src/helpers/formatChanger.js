const getDateAndTime = function (value) {
  const dateTime = new Date(value);
  const dateOptions = { year: "2-digit", month: "2-digit", day: "2-digit" };
  const timeOptions = { hour: "2-digit", minute: "2-digit" };

  const dateString = dateTime
    .toLocaleString("uk-UA", dateOptions)
    .split("/")
    .reverse()
    .join(".");

  const timeString = dateTime.toLocaleString("en-US", {
    hour12: false,
    ...timeOptions,
  });

  return `${dateString} | ${timeString}`;
};

const getFormattedPhone = function (value) {
  const countryCode = value.substring(0, 3);
  const number = value.substring(3);

  return `+${countryCode} (${number.substring(0, 3)}) ${number.substring(
    3,
    6
  )}-${number.substring(6)}`;
};

export { getDateAndTime, getFormattedPhone };
