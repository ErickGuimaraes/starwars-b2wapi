
import config from "../config";
import axios from "axios";
import {planetModel} from "../model/planetModel"

export const createPlanet = async (reqt, res) => {
    const planet = req.body;
    const url = config.API_URL;
  
    try {
      const { data } = await axios.get(`${url}/planets/?name=${planetModel}`);
      const { id } = data;
      const planetsDB = { ...pokemon, number: id };
  
      const dbResponse = await planetsModel.create(planetsDB);
      res.send(dbResponse);
    } catch (error) {
      res.status(500).send(error);
    }
  };

  