module.exports = {
  permit: require('./authority-check'),
  httpContext: require('./http-context'),
  allowHeaders: require('./allow-headers'),
  errorHandler: require('./error-handler'),
  setRequestId: require('./request-id'),
  requestLogger: require('./request-logger'),
  passportJWT: require('./passport-jwt'),
};
