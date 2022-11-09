const info = (...params) => {
  if (process.env !== 'test') console.log(...params);
};

const error = (...params) => {
  if (process.env !== 'test') console.error(...params);
};

module.exports = {
  info,
  error,
};
