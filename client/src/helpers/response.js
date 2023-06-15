module.exports = (msg, data, status) => {
  return {
    success: status,
    message: msg,
    data: data,
  };
};
