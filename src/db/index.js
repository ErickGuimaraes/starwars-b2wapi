const dotenv = require ("dotenv");
const mongoose = require ("mongoose");
const configuration = require(`../config/index.js`)

var DbConfigConnection = configuration.DB_TEST_CONNECTION;
var DbConnectedText = "Test Database"
if(process.argv[2] == "dev")
{
    DbConfigConnection = configuration.DB_CONNECTION;
    DbConnectedText = "Dev Database"
}

const  dbConnection = 

mongoose.connect(DbConfigConnection,
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
    console.log("Connected to " + DbConnectedText)
    }
});
module.exports = dbConnection

