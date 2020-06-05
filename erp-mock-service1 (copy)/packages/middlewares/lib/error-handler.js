// const Raven = require('raven');

function errorHandler(logger) {
  return (err, req, res, next) => {
    // Raven.captureException(err);
    logger.error(`Error: ${err.stack}`);
    res.sendStatus(500);
  };
}

module.exports = errorHandler;
