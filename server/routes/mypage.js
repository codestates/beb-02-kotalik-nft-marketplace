import express from "express";
import userInfo from "../models/userInfo";
import metadata from "../models/metada";

const router = express.Router();

router.get('/mypage', (req, res) => {
    const userId = req.params.userId;
    try {
        userInfo.findOne({id:userId}, (err, result) => {
            res.json(result);
        });
    } catch(err) {
        res.json(err);
    }
});

router.get('/mypage/collection', (req, res) => {
    const adress = req.params.adress;
    try {
        metadata.find({adress:adress}, (err, result) => {
            res.json(result);
        });
    } catch(err) {
        res.json(err);
    }
});

export default router;