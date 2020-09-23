import express from "express"
import { 
    getPlanets} from "../services/planetServices.js"

const getPlanetsController = async (req,res) =>
{
    try
    {
        const planetName = req.query.name
        const planetsRes = await getPlanets(planetName)
        return res.staus(200).json(planetsRes)
    }
    catch(err){
        return res.staus(err.statusCode || 500).json(
            {
                error: err.name,
                message: err.message
            })
    }
};
 
export {getPlanetsController}