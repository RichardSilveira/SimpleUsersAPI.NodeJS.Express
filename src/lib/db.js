const mongoose = require('mongoose');

mongoose.Promise = Promise;

module.exports.connect = async (connStr) => {
  mongoose.connect(connStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;

  db.on('connected', () => {
    console.log('Connection Established');
  });

  db.on('reconnected', () => {
    console.log('Connection Reestablished');
  });

  db.on('disconnected', () => {
    console.log('Connection Disconnected');
  });

  db.on('close', () => {
    console.log('Connection Closed');
  });

  db.on('error', (error) => {
    console.log(`ERROR: ${error}`);
  });
};
