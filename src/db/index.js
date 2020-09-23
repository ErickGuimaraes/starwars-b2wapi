import dotenv from "dotenv"
import mongoose from "mongoose";


//const result = dotenv.config({path: `./.env'`});

//console.log(__dirname)
//console.log(__filename)

export const  dbConnection = mongoose.connect("mongodb+srv://erick:12349876zxy@cluster0.jyz0i.mongodb.net/starwarsapi?retryWrites=true&w=majority",
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

