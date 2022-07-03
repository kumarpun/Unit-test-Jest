const express = require("express");
const todoRoutes = require("./routes/todo.routes");
const app = express();
const mongodb = require("./mongodb/mongodb.connect");

mongodb.connect();

// middelware for passing json
app.use(express.json());

app.use("/todos", todoRoutes);

app.get("/", (req, res) => {
      res.json("hello world!");  
});

module.exports = app;