import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URL; 

export default async function dbConnect(collectionName) {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();
  const db = client.db(process.env.DB_NAME); 
  return db.collection(collectionName); 
}
