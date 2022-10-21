const client = new MongoClient(url);
await client.connect();
const collection = client.db().collection("collection");

try {
  await collection.insertOne({ _id: 1 });
  await collection.insertOne({ _id: 1 }); // duplicate key error
} catch (error) {
  if (error instanceof MongoServerError) {
    console.log(`Error worth logging: ${error}`); // special case for some reason
  }
  throw error; // still want to crash
}
