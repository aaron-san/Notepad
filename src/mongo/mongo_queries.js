const { MongoClient } = require("mongodb");
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = "mongodb://localhost:27017";
// Create an instance of MongoClient
const client = new MongoClient(url);

// Database Name
// const dbName = "financial_data";
const dbName = "stock_data";

async function main() {
  // Use connect method to connect to the server
  await client.connect();

  console.log("Connected successfully to server");
  const db = client.db(dbName);

  await listDatabases(client);

  // const collection = db.collection("ratios");

  // the following code examples can be pasted here...

  // Insert a Document
  // const insertResult = await collection.insertMany([
  //   { a: 1 },
  //   { a: 2 },
  //   { a: 3 },
  // ]);
  // console.log("Inserted documents =>", insertResult);

  // Find All Documents
  // const findResult = await collection.find({}).limit(2).toArray();
  // const findResult = await collection
  //   .find({ ticker: /^B/ })
  //   .limit(15)
  //   .toArray();
  // console.log("Found documents =>", findResult);

  // Find Documents with a Query Filter
  // const filteredDocs = await collection.find({ a: 3 }).toArray();
  // console.log("Found documents filtered by { a: 3 } =>", filteredDocs);

  // Update a document
  // const updateResult = await collection.updateOne({ a: 3 }, { $set: { b: 1 } });
  // console.log("Updated documents =>", updateResult);

  // Remove a document
  // const deleteResult = await collection.deleteMany({ a: 3 });
  // console.log("Deleted documents =>", deleteResult);

  // Index a Collection
  // const indexName = await collection.createIndex({ a: 1 });
  // console.log("index name =", indexName);

  return "done.";
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}
