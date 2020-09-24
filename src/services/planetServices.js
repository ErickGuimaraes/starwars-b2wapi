const configuration = require ("../config/index.js");
const axios = require ("axios");
const NotFoundError = require ("../errors/not-found-error.js")
const ValidationError = require ("../errors/validation-error.js")
const {planetModel, planetSchema} = require ("../model/planetModel.js")


async function getPlanetsService(planetQuery)
{
  const queryParam = {}
  
  console.log(planetQuery)
  console.log("-----------------")
  console.log(planetQuery.name)

  if(planetQuery.name != null)
  {
    queryParam.name = planetQuery.name
  }
  
  const planetsGot = await planetModel.find(queryParam)
  
  if(!planetsGot)
  {
    throw new NotFoundError({message: `Planet ${planetQuery.name} not found`})
  }
  return planetsGot
};

async function createPlanetService(data)
{
  const {name} = data

  const swapi = await axios.get(`${configuration.API_URL}planets/?search=${name}`);
   
  const planetUpdated = swapi.data.count > 0 ? { ...data, "film_appearances": swapi.data.results[0].films.length} : { ...data, "film_appearances": 0}

  const existentPlanet = await planetModel.findOne({name: name})

  const savePlantet =  planetModel.create(planetUpdated)

  if(existentPlanet != null || !savePlantet)
  {
    throw new ValidationError({message: `Planet ${planetUpdated.name} has already been created`})
  }
  return savePlantet;
}

async function findByIdService(ID)
{
  const planetReceived = await planetModel.findById(ID);

    if(planetReceived == null)
    {
      throw new NotFoundError({message: `ID ${ID} not found`})
    }

    return planetReceived
};

async function deletePlanetService(ID) 
{

      const removedPlanet = await planetModel.remove({_id: ID});
      if(!removedPlanet)
      {
        throw new NotFoundError({message: `ID ${ID} not found`})
      }
      return (removedPlanet)
};

module.exports ={deletePlanetService, findByIdService, createPlanetService, getPlanetsService}