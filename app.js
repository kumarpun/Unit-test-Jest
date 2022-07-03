const express = require("express");
const todoRoutes = require("./routes/todo.routes");
const app = express();

// middelware for passing json
app.use(express.json());

app.use("/todos", todoRoutes);

app.get("/", (req, res) => {
      res.json("hello world!");  
});

// app.listen(3000, () => {
//   console.log("server is running!");
// });

module.exports = app;