const express = require("express");
const configuration = require("./config/index.js")
const planetsRoutes = require("./routes/planetsRoutes.js");

//MIDDLEWARE
const app = express();

app.use(express.json());

app.get("/", (req, res) =>
{
  res.send("Test Planets");

});

app.use(planetsRoutes); 

app.listen(configuration.PORT, (req,res) => {
  
  console.log("Local Server Running");
});

module.exports = app;
