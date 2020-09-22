import express from "express"
import {planetsController} from "../controllers/planetsController.js";
import axios from "axios";
import {planetSchema, planetModel} from "../model/planetModel.js"
import mongodb from "mongodb"
import {
    createPlanet, 
    getPlanets, 
    findById,
    deletePlanet} from "../services/planetServices.js"

const router = express.Router();

router.get("/", getPlanets);

//router.get("/", findByName);

router.get("/:ID", findById)

router.post("/", createPlanet);

router.delete("/:ID", deletePlanet);

export const planetsRoutes = router;