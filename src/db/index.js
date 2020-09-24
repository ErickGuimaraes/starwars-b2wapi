const dotenv = require ("dotenv");
const mongoose = require ("mongoose");
const configuration = require(`../config/index.js`)

const  dbConnection = mongoose.connect(configuration.DB_CONNECTION,
  {
    useNewUrlParser: true, 
    useUnifiedTopology: true} ,
    (err)=> 
{
    if(err)
    {
        console.log("An error was found while trying to connect the data base, and the error was " + err);
    }
    else{
    console.log("Connected to database")
    }
});
module.exports = dbConnection

