import { MongoClient, ServerApiVersion } from "mongodb";
export const collectionNameObj = {
  servicesCollection: "services",
  userCollection: "user",
  bookingCollection: "booking",
};
export default async function dbConnect(collectionName) {
  const uri = process.env.NEXT_PUBLIC_MONGODB_URL;
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
