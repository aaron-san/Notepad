// const { MongoClient } = require("mongodb");
// // or as an es module:
// // import { MongoClient } from 'mongodb'

// // Connection URL
// const url = "mongodb://localhost:27017";
// const client = new MongoClient(url);

// // Database Name
// const dbName = "myProject";

// async function main() {
//   // Use connect method to connect to the server
//   await client.connect();
//   console.log("Connected successfully to server");
//   const db = client.db(dbName);
//   const collection = db.collection("documents");

//   // the following code examples can be pasted here...

//   return "done.";
// }

// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());

// var MongoClient = require("mongodb").MongoClient;
// var url = "mongodb://localhost:27017/fin_data";

// MongoClient.connect(url, function (err, db) {
//   if (err) throw err;
//   console.log("Database created!");

//   // db.getCollectionNames();
//   db.close();
// });

// const MongoClient = require("mongodb").MongoClient;

// // Connection url
// var url = "mongodb://localhost:27017/test";
// const client = new MongoClient(url, { useUnifiedTopology: true }); // { useUnifiedTopology: true } removes connection warnings;

// const dbName = "test";

// client
//   .connect()
//   .then(
//     (client) => client.db(dbName).listCollections().toArray() // Returns a promise that will resolve to the list of the collections
//   )
//   .then((cols) => console.log("Collections", cols))
//   .finally(() => client.close());

const MongoClient = require("mongodb").MongoClient;

const url = "mongodb://localhost:27017/";
const client = new MongoClient(url, { useUnifiedTopology: true }); // useUnifiedTopology removes a warning

// Connect
client
  .connect()
  .then(
    (client) => client.db().admin().listDatabases() // Returns a promise that will resolve to the list of databases
  )
  .then((dbs) => {
    console.log("Mongo databases", dbs);
  })
  .finally(() => client.close()); // Closing after getting the data
