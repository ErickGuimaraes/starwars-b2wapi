import axios from "axios"
class Api{
  static async getPlanets(planet)
 {
     const res =  (await axios.get(`https://swapi.dev/api/planets/?search=${planet}`)).data;
     const mit = JSON.parse(res);
     console.log(mit)
     console.log("ok");
 }
 }


export const planetsController  = {



  
//  async list(request, response)
//  {
//    return response.json({})
//  }

};