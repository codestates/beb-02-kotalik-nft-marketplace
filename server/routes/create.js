import express from "express";
import metadata from "../models/metada";

const router = express.Router();

router.post('/create', async(req, res) => {
    const metadata = new metadata({
        address : req.body.address,
        name : req.body.name,
        description : req.body.description,
        attributes : req.body.attributes,
    });

    metadata
        .save()
        .then((data) => {

        })
        .catch((err) => {
            res.json(err);
        });

})

export default router;