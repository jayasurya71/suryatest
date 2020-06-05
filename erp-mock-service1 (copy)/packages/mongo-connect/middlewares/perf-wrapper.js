const COLLECTION_METHODS = [
  'aggregate',
  'bulkWrite',
  'count',
  'createIndex',
  'deleteMany',
  'deleteOne',
  'distinct',
  'drop',
  'dropAllIndexes',
  'dropIndex',
  'ensureIndex',
  'find',
  'findAndModify',
  'findAndRemove',
  'findOne',
  'findOneAndDelete',
  'findOneAndReplace',
  'findOneAndUpdate',
  'geoHaystackSearch',
  'geoNear',
  'group',
  'indexes',
  'indexExists',
  'indexInformation',
  'initializeOrderedBulkOp',
  'initializeUnorderedBulkOp',
  'insert',
  'insertMany',
  'insertOne',
  'isCapped',
  'listIndexes',
  'mapReduce',
  'options',
  'parallelCollectionScan',
  'reIndex',
  'remove',
  'rename',
  'replaceOne',
  'save',
  'stats',
  'update',
  'updateMany',
  'updateOne',
];

function wrapFunction(proto, fnName, interceptor) {
  const original = proto[fnName];

  if (!original) return;

  proto[`_wrap_${fnName}`] = original;

  proto[fnName] = function () {
    const args = Array.prototype.slice.call(arguments, 0);
    const startTime = process.hrtime();

    let callback = args[args.length - 1];
    const self = this;

    function timingCallback(err) {
      const time = process.hrtime(startTime);
      const timeMicroSeconds = time[0] * 1000000 + Math.round(time[1] / 1000);
      const callArgs = args;

      interceptor(self.collectionName, fnName, timeMicroSeconds, callArgs, err);
      if (callback) return callback(...arguments);
    }

    if (typeof callback !== 'function') {
      callback = null;
    } else {
      args[args.length - 1] = timingCallback;
    }

    return original.apply(this, args);
  };
}

function wrap(mongoLibrary, interceptor) {
  const CollectionPrototype = mongoLibrary.Collection.prototype;

  COLLECTION_METHODS.forEach((fnName) => {
    wrapFunction(CollectionPrototype, fnName, interceptor);
  });
}

function unwrap(mongoLibrary) {
  const CollectionPrototype = mongoLibrary.Collection.prototype;

  COLLECTION_METHODS.forEach((fnName) => {
    if (CollectionPrototype[`_wrap_${fnName}`]) {
      CollectionPrototype[fnName] = CollectionPrototype[`_wrap_${fnName}`];
      delete CollectionPrototype[`_wrap_${fnName}`];
    }
  });
}

module.exports = {
  wrap,
  unwrap,
};
