require('dotenv').config();
const mongoose = require('mongoose')

let cachedConnection = null;

const connect = async () => {
  // Use cached connection if it exists
  if (cachedConnection) {
    return cachedConnection;
  }

  // If there's an active connection in mongoose, use it
  if (mongoose.connections[0].readyState) {
    cachedConnection = mongoose.connections[0];
    return cachedConnection;
  }

  const MongoUrl = process.env.NEXT_MONGODB_CONNECTION_STRING;

  try {
    cachedConnection = await mongoose.connect(MongoUrl);
    console.log('Connection Successfully');
    return cachedConnection;
  } catch (error) {
    console.log(error)
    throw new Error('Error Connecting Mongoose');
  }
};

module.exports = connect
