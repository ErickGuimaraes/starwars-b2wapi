import mongoose from "mongoose";

const planetSchema = mongoose.Schema(
    {
      name: 
      { 
        type: String, 
        required: true  
      },
      climate: 
      { 
        type: String 
      },
      terrain: 
      { 
        type: String 
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
  
  export {planetSchema, planetModel};