
const mongoose = require("mongoose");
if(process.env.NODE_ENV!='production')
    require("dotenv").config();

var DbConfigConnection = "";
var DbConnectedText = "";
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV == "dev") {
  DbConnectedText = "Dev Database";
}else if (process.argv[2] == "production") {
  DbConnectedText = "Dev production";
}
DbConfigConnection = process.env.DB_CONNECTION;

const dbConnection = mongoose.connect(
  DbConfigConnection,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(
        "An error was found while trying to connect the data base, and the error was " +
          err
      );
    } else {
      console.log("Connected to " + DbConnectedText);
    }
  }
);
module.exports = dbConnection;
