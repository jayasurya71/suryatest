const config = require('pando-env');
const wrapper = require('./middlewares/perf-wrapper');

const mongoConnect = async (mongoose) => {

  wrapper.wrap(mongoose.mongo, (collection, operation, timeMicroSeconds, query, responseErr) => {
    logger.info(`[mongodb] ${collection}.${operation}.(${JSON.stringify(query)}) - ${timeMicroSeconds}µs`);
  });

  const connectOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    poolSize: Number(`${config.get('service:poolSize')}`),
    useUnifiedTopology: true
  };

  mongoose.connect(`${config.get('service:url')}`, connectOptions);

  mongoose.connection.on('connected', () => {
    logger.info(`[mongodb] default connection open to ${config.get('service:url')}`);
  });

  mongoose.connection.on('error', (err) => {
    logger.info(`[mongodb] default connection error: ${err}`);
  });

  mongoose.connection.on('disconnected', () => {
    logger.info('[mongodb] default connection disconnected');
  });
};

module.exports = { mongoConnect };
