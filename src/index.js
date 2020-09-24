const { Console } = require("console");
const express = require("express");
const configuration = require("./config/index.js")


const planetsRoutes = require("./routes/planetsRoutes.js");
const dbConnection = require("./db/index.js")

const app = express();

app.use(express.json());

app.use(planetsRoutes); 

app.get("/", (req, res) =>
{
  res.send("Test Planets");

});

app.listen(configuration.PORT, (req,res) => {
  
  console.log("Local Server Running");
});

module.exports = app;
