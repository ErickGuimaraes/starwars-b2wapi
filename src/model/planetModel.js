const mongoose = require("mongoose");

const planetSchema = mongoose.Schema(
    {
      name: 
      { 
        type: String, 
        required: true  
      },
      climate: 
      { 
        type: String,
        required: true
      },
      terrain: 
      { 
        type: String,
        required: true 
      },
      film_appearances:
      {
        type: Number,
        default: 0
      },
    },
    { versionKey: false }
  );
  
  const planetModel = mongoose.model("Planet", planetSchema);
  
  module.exports = {planetSchema, planetModel};