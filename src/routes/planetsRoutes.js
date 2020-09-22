import express from "express"
import {planetsController} from "../controllers/planetsController.js";
import axios from "axios";
import {planetSchema, planetModel} from "../model/planetModel.js"
import mongodb from "mongodb"
import {
    createPlanet, 
    getAllPlanets, 
    findByName,
    findById,
    deletePlanet} from "../services/planetServices.js"

const router = express.Router();

router.get("/", getAllPlanets);

router.get("/:name", findByName);

router.get("/:getId", findById)

router.post("/", createPlanet);

router.delete("/:postID", deletePlanet);

export const planetsRoutes = router;