import mongoose from 'mongoose';

const connect = async () => {
  if (mongoose.connections[0].readyState) return;
  const MongoUrl = process.env.NEXT_MONGODB_CONNECTION_STRING;

  try {
    await mongoose.connect(MongoUrl),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
    console.log('Connection Successfully');
  } catch (error) {
    throw new Error('Error Connecting Mongoose');
  }
};

export default connect;
