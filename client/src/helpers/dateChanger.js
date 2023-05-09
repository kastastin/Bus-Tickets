function getDateAndTime(value) {
  const dateTime = new Date(value);
  const dateOptions = { year: "2-digit", month: "2-digit", day: "2-digit" };
  const timeOptions = { hour: "2-digit", minute: "2-digit" };

  const dateString = dateTime
    .toLocaleString("en-US", dateOptions)
    .replace(/\//g, ".");

  const timeString = dateTime.toLocaleString("en-US", timeOptions);
  
  return `${dateString} | ${timeString}`;
}

export { getDateAndTime };
