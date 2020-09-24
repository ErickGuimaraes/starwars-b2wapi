const { createPlanetService,
    getPlanetsService,
    findByIdService,
    deletePlanetService
} = require ("../services/planetServices.js")

const getPlanets = async (req,res) =>
{
    try
    {
        const planetsRes = await getPlanetsService(req.query)

        return  res.status(200).json(planetsRes);
    }
    catch(err){
        console.log(err);
        return res.status(err.statusCode || 500).json(
           {
                error: err.name,
                message: err.message
           })
    }
};
 
const createPlanet = async (req,res) =>
{
    try
    {
       const {name, climate , terrain} = req.body  
  
        const newPlanet = await createPlanetService({name, climate , terrain})
        console.log(newPlanet)

        return res.status(201).json(newPlanet)
    }
    catch(err)
    {
        console.log(err);
        return res.status(err.statusCode || 500).json(
           {
                error: err.name,
                message: err.message
           })
    }
}

const findById = async (req,res) =>
{
    try
    {
        
        const planetFound = await findByIdService(req.params.ID);
        return res.status(200).json(planetFound)

    }
    catch(err)
    {
        console.log(err);
        return res.status(err.statusCode || 500).json(
           {
                error: err.name,
                message: err.message
           })
    }
};

const deletePlanet = async(req,res) =>
{
    try
{
    const planetFound = await deletePlanetService(req.params.ID);
    return res.status(200).json(planetFound)

}
catch(err)
{
    console.log(err);
    return res.status(err.statusCode || 500).json(
       {
            error: err.name,
            message: err.message
       })
}
};
module.exports = {deletePlanet, findById, createPlanet, getPlanets}