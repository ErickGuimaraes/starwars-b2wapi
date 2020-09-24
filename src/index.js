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
  res.send(`Star wars Api Developed By Erick Oliveira` + 
  `<br> To Find all planets go to /Planets with a Get request` + 
  `<br> To Find a specific planet go to /planet/ID with a Get request` +
  `<br> To Delete a planet go to /Planets/ID  with a Delete request` + 
  `<br> To Create a planet send a Put request to /planet/ and send a Json with` +
  `<br> <pre>{`+
  `<br>     "name": "Name",`+
  `<br>     "climate": "Climate",`+
  `<br>     "terrain": "Terrain"`+
  `<br> }</pre>`+
  `<br> Search Feild: Name (/planets/?name:NameToFind)`
  );

});

app.listen(configuration.PORT, (req,res) => {
  
  console.log("Local Server Running");
});

module.exports = app;
