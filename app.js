let express = require("express");
let app = express();
require("dotenv").config();

// setting up a server
app.listen(3000);

// learning end points of URL
let people = {
  alice: { name: "alice", age: 22 },
  cynthia: { name: "cynthia", age: 24 },
  uracha: { name: "uracha", age: 30 },
};

// getting the query parameter
app.get("/profile", (request, response) => {
  let name = request.query.name;

  if (people[name]) {
    response.json(people[name]);
  } else {
    response.json("Not Found");
  }
});

// this colon mean its a paramter

app.get("/profile/:name", (request, response) => {
  let name = request.params.name;
  if (people[name]) {
    response.json(people[name]);
  } else {
    response.json("Not Found");
  }
});

console.log(__dirname);

// setting up a path
// app.get("/hello", (request, response) => {
//   response.send("Hello World");
// });

// setting a static assets/ images and script

app.use("/pics", express.static(__dirname + "/images"));

// what is middlewear /it intercepts the path

// if we dont give a path it executes for all get requests.
// app.use without path will do it for every single request

// app.get("/hello", (request, response, next) => {
//   console.log(request.ip + request.method);
//   next();
// });

// // setting an html file
// app.get("/hello", (request, response) => {
//   response.sendFile(__dirname + "/index.html");
// });

// chaining middlewear

app.get(
  "/hello",
  (request, response, next) => {
    console.log(request.ip + request.method);
    next();
  },
  (request, response) => {
    response.sendFile(__dirname + "/index.html");
  }
);

// serve json file
//  send an object

let person = {
  name: "Samuel",
  age: 27,
};

app.get("/person", (request, response) => {
  response.json(person);
});
