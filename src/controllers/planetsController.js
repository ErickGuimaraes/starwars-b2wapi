import express from "express";
var app = express();
import { 
    getPlanets} from "../services/planetServices.js"

const getPlanetsController = async (req,res) =>
{
    try
    {
        const planetsRes = await getPlanets(req.query)

        return res.status(200).json(planetsRes);
    }
    catch(err){
        console.log(err);
        //return res.staus(err.statusCode || 500).json(
            //{
                //error: err.name,
                //message: err.message
            //})
    }
};
 
export {getPlanetsController}