import { MongoClient } from 'mongodb';

let client;

const mongoConnect = async collection => {
  const uri = `mongodb+srv://${process.env.NEXT_PUBLIC_DB_USERNAME}:${process.env.NEXT_PUBLIC_DB_PASSWORD}@cluster0.utybv.mongodb.net/palasio-quiz?retryWrites=true&w=majority`;
  client = await MongoClient.connect(uri);

  console.log('connected');
  const db = client.db();

  const dbCollection = db.collection(collection);

  return dbCollection;
};

const closeClient = () => {
  if (client) {
    client.close();
    client = '';
  }
};

export { mongoConnect, closeClient };
