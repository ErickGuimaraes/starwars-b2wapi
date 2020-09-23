import express from "express";
import configuration from "./config/index.js"
import axios from "axios";
import {planetsRoutes} from "./routes/planetsRoutes.js"; 
import mongoose from 'mongoose';
import {dbConnection} from './db/index.js';

//MIDDLEWARE
const app = express();

app.use(express.json());

app.use("/planets", planetsRoutes);

app.get("/", (req, res) =>
{
  console.log(res.status(200).json({ok: "ok"}))
  res.send("Test Planets");

});

app.use('/planets', planetsRoutes); 

app.listen(configuration.PORT, (req,res) => {
  
  console.log("Local Server Running");
});

