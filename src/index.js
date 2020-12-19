const express = require("express");

const planetsRoutes = require("./routes/planetsRoutes.js");
const dbConnection = require("./db/index.js");
const swaggerUI = require('swagger-ui-express'), 
      swaggerDocument = require('./Swagger.json');
if(process.env.NODE_ENV!='production')
  require("dotenv").config();
const app = express();

app.use(express.json());

app.use(planetsRoutes);

app.get("/", (req, res) => {
  res.send(
    `<h1>To see de documentation go to  <a href="http://localhost:3000/starwarsapi/">Star wars API by Erick Oliveira</a> `
  );
});

app.use('/starWarsApi', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.listen(process.env.PORT, (req, res) => {
  console.log("Local Server Running");
});

module.exports = app;
