import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config({path: '../.env'});
console.log(process.env.DB_CONNECTION)

export const  dbConnection = mongoose.connect(process.env.DB_CONNECTION,
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

