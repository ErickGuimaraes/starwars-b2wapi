
import configuration from "../config/index.js";
import exrpress from "express";
import axios from "axios";
import NotFoundError from "../errors/not-found-error.js"
import ValidationError from "../errors/validation-error.js"
import {planetModel, planetSchema} from "../model/planetModel.js"

const router = exrpress.Router();

export async function getPlanetsService(planetName)
{
  const queryParam = {}
  
  if(planetName.name != null)
  {
    queryParam.name = planetName.name
  }
  
  const planetsGot = await planetModel.find(queryParam)
  if(!planetsGot)
  {
    throw new NotFoundError({message: `Planet ${planetName} not found`})
  }
  return planetsGot
};

export async function createPlanetService(data)
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

export async function findByIdService(ID)
{
  const planetReceived = await planetModel.findById(ID);

    if(planetReceived == null)
    {
      throw new NotFoundError({message: `ID ${ID} not found`})
    }

    return planetReceived
};

export async function deletePlanetService(ID) 
{

      const removedPlanet = await planetModel.remove({_id: ID});
      if(!removedPlanet)
      {
        throw new NotFoundError({message: `ID ${ID} not found`})
      }
      return (removedPlanet)
};