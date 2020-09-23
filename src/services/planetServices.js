
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

//export const getPlanets = async (req,res) =>
//{
//    try
//    {
//      const qpar = {}
//      if(req.query.name)
//      {
//        qpar.name = req.query.name
//      }
//        const postGot = await planetModel.find(qpar);
//        res.json(postGot)
//    }
//    catch(err)
//    {
//        res.json({message: err})
//    }
//};

export async function createPlanetService(model)
{
   const swapi = await axios.get(`${configuration.API_URL}planets/?search=${model.name}`);
  
  if(swapi.data.results.length > 0)
  {
    model.film_appearances =  swapi.data.results[0].films.length;
  }
  const existentPlanet = await planetModel.findOne({name: model.name})

  if(existentPlanet == null)
  {
    const savePlantet =  planetModel.create(model)
  }
  else
  {
    throw new ValidationError({message: `Planet ${model.name} has already been created`})
  }
  return savePlantet;
}

// export const createPlanet = async (req, res) => {

//   const newPlanet  = new planetModel(
//     {
//         name: req.body.name,
//         climate: req.body.climate,
//         terrain: req.body.terrain,
//     });
    
//     try{

//       const api = await axios.get(`${configuration.API_URL}planets/?search=${newPlanet.name}`);
      
//       if(api.data.results.length > 0)
//       {
//         newPlanet.film_appearances =  api.data.results[0].films.length;
//       }
//       console.log(api.data.results[0].films.length)

//       const existentPlanet = await planetModel.findOne({name: newPlanet.name})

//       if(existentPlanet == null)
//       {
//         const savePlantet = await newPlanet.save();
//         res.json(savePlantet)
//       }
//       else
//       {
//         console.log("naaaaao")
//       }
//     }
//     catch(err)
//     {
//         res.status(500).send(err);
//     }
// };

export async function findByIdService(ID)
{

  const planetReceived = await planetModel.findById(ID);

    if(planetReceived == null)
    {
      throw new NotFoundError({message: `ID ${ID} not found`})
    }

    return planetReceived
};

// export const findByIdService = async (req,res) =>
// {
//     try
//     {
//         const postGot = await planetModel.findById(req.params.getId);
//         res.json(postGot);
//     }
//     catch(err)
//     {
//         res.json({message: err})
//     }
// };

export async function deletePlanetService(ID) 
{

      const removedPlanet = await planetModel.remove({_id: ID});
      if(!removedPlanet)
      {
        throw new NotFoundError({message: `ID ${ID} not found`})
      }
      return (removedPlanet)
};