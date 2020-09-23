import express from "express"
import {getPlanetsController} from "../controllers/planetsController.js";
import axios from "axios";
import {planetSchema, planetModel} from "../model/planetModel.js"
import {
    createPlanet, 
    getPlanets, 
    findById,
    deletePlanet} from "../services/planetServices.js"

const router = express.Router();

router.get("/", getPlanetsController);

router.get("/:ID", findById)

router.post("/", createPlanet);

router.delete("/:ID", deletePlanet);

export const planetsRoutes = router;