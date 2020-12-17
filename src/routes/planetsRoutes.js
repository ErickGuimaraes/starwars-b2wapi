const express = require("express");
const {
  getPlanets,
  createPlanet,
  findById,
  deletePlanet,
} = require("../controllers/planetsController.js");

const router = express.Router();

router.get("/planets", getPlanets);

router.get("/planets/:ID", findById);

router.post("/planets", createPlanet);

router.delete("/planets/:ID", deletePlanet);

module.exports = router;
