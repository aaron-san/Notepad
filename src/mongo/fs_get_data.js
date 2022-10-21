var fs = require("fs");
var path = require("path");

// fs.readFile(path.join(__dirname, ''))
fs.readFile(
  path.join(__dirname, "data", "customers.csv"),
  "utf-8",
  function (err, data) {
    if (err) throw err;
    console.log(data);
    console.log(typeof data);
    console.log(data[0]);
    console.log(data[1]);
  }
);

fs.writeFile(
  path.join(__dirname, "data", "message.txt"),
  "Hi, there!",
  function (err) {
    if (err) throw err;
    console.log("Writing complete.");
  }
);
