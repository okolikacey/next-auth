import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect("mongodb://localhost/auth-demo");
  return client;
}
