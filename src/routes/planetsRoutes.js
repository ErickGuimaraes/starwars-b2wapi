import express from "express"
import {getPlanets, createPlanet, findById, deletePlanet} from "../controllers/planetsController.js";

const router = express.Router();

router.get("/", getPlanets);

router.get("/:ID", findById)

router.post("/", createPlanet);

router.delete("/:ID", deletePlanet);

export const planetsRoutes = router;