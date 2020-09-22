import express from "express"
import {planetsController} from "../controllers/planets.js";
import axios from "axios";
import {planetSchema, planetModel} from "../model/planetModel.js"
import mongodb from "mongodb"

const router = express.Router();

router.get("/", async (req,res) =>
{
    try
    {
        const postGot = await planetModel.find();
        res.json(postGot)

    }
    catch(err)
    {
        res.json({message: err})
    }
});

router.get("/:name", async (req,res) =>
{

    try
    {


        const postGot = await planetModel.find({name: req.params.name});
        res.json(postGot)

    }
    catch(err)
    {
        res.json({message: err})
    }
})


router.post("/", async (req,res) => {

    const post  = new planetModel(
    {
        name: req.body.name,
        climate: req.body.climate,
        terrain: req.body.terrain
    });
    try{
    const savedPOst = await post.save()

    res.json(savedPOst)
    }
    catch(err)
    {
        res.json({message: err})
    }
});

router.delete("/:postID", async (req,res) =>
{
    try
    {
        const removedPostGot = await planetModel.remove({_id: req.params.postID});
        res.json(removedPostGot)

    }
    catch(err)
    {
        res.json({message: err})
    }
})
router.get("/planets")

export const planetsRoutes = router;