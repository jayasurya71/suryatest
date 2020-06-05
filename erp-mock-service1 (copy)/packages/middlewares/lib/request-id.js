const uuid = require('uuid/v4');
const httpContext = require('./http-context');

const setRequestId = (req, res, next) => {
  const attributeName = 'requestId';
  const headerName = 'X-Request-Id';
  req[attributeName] = req.header(attributeName) || uuid();
  httpContext.set('requestId', req[attributeName]);
  res.setHeader(headerName, req[attributeName]);
  next();
};

module.exports = setRequestId;
