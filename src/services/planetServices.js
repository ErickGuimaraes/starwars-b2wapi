const configuration = require("../config/index.js");
const axios = require("axios");
const NotFoundError = require("../errors/not-found-error.js");
const ValidationError = require("../errors/validation-error.js");
const { planetModel } = require("../model/planetModel.js");

async function getPlanetsService(planetQuery) {
  const queryParam = {};

  if (planetQuery.name != null) {
    queryParam.name = planetQuery.name;
  }

  const planetsGot = await planetModel.find(queryParam);

  if (!planetsGot) {
    throw new NotFoundError({
      message: `Planet ${planetQuery.name} not found`,
    });
  }
  return planetsGot;
}

async function createPlanetService(data) {
  const { name } = data;

  const existentPlanet = await planetModel.findOne({ name: name });
  if (existentPlanet != null) {
    throw new ValidationError({
      message: `Planet ${name} has already been created`,
    });
  }

  const swapi = await axios.get(
    `${configuration.API_URL}planets/?search=${name}`
  );

  const planetUpdated =
    swapi.data.count > 0
      ? { ...data, film_appearances: swapi.data.results[0].films.length }
      : { ...data, film_appearances: 0 };

  const savePlanet = planetModel.create(planetUpdated);

  if (!savePlanet) {
    throw new ValidationError({
      message: `Planet ${name} has already been created`,
    });
  }
  return savePlanet;
}

async function findByIdService(ID) {
  const planetReceived = await planetModel.findById(ID);

  if (planetReceived == null) {
    throw new NotFoundError({ message: `ID ${ID} not found` });
  }

  return planetReceived;
}

async function deletePlanetService(ID) {
  const removedPlanet = await planetModel.deleteOne({ _id: ID });
  if (!removedPlanet) {
    throw new NotFoundError({ message: `ID ${ID} not found` });
  }
  return removedPlanet;
}

module.exports = {
  deletePlanetService,
  findByIdService,
  createPlanetService,
  getPlanetsService,
};
