
import configuration from "../config/index.js";
import exrpress from "express";
import axios from "axios";
import {planetModel} from "../model/planetModel.js"

const router = exrpress.Router();

export const getPlanets = async (req,res) =>
{
    try
    {
      const qpar = {}
      if(req.query.name)
      {
        qpar.name = req.query.name
      }
        const postGot = await planetModel.find(qpar);
        res.json(postGot)
    }
    catch(err)
    {
        res.json({message: err})
    }
};

export const createPlanet = async (req, res) => {

  const newPlanet  = new planetModel(
    {
        name: req.body.name,
        climate: req.body.climate,
        terrain: req.body.terrain,
    });
    
    try{

      const api = await axios.get(`${configuration.API_URL}planets/?search=${newPlanet.name}`);
      const totalFilms = 0;
      
      console.log(api.data.results[0])
      if(api.data.results.length > 0)
      {
        newPlanet.film_appearances =  api.data.results[0].films.length;
      }
      console.log(api.data.results[0].films.length)

      const existentPlanet = await planetModel.findOne({name: newPlanet.name})

      if(existentPlanet == null)
      {
        const savePlantet = await newPlanet.save();
        res.json(savePlantet)
      }
      else
      {
        console.log("naaaaao")
      }
    }
    catch(err)
    {
        res.status(500).send(err);
    }
};



export const findById = async (req,res) =>
{
    try
    {
        const postGot = await planetModel.findById(req.params.getId);
        res.json(postGot);
    }
    catch(err)
    {
        res.json({message: err})
    }
};

export const deletePlanet = async(req,res) => 
{
  try
  {
      const removedPostGot = await planetModel.remove({_id: req.params.postID});
      res.json(removedPostGot)

  }
  catch(err)
  {
      res.json({message: err})
  }
};

async function SeturnJson(planetName)
{
  console.groupCollapsed("bef");
  const res = await axios.get(`${configuration.API_URL}/planets/?search=${planetName}`);
  console.log(res);
  return res;
}

const varController = async function Start()
{
    const api = await returnJson('Tatooine')
    const nom = api.data.results[0].name;
    const film = api.data.results[0].films;
    console.log(api.data.results[0]);
    console.log(nom + "  " + film.length) 

}




