const mongoose = require('mongoose');

mongoose.Promise = Promise;
const db = mongoose.connection;

exports.connect = async (connStr) => {
  mongoose.connect(connStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

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

exports.close = () => db.close();
