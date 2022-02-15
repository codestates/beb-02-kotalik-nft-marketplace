import express from "express";
import create from "./create.js";
import mypage from "./mypage.js";

const router = express.Router();

 router.use("/create", create);
 router.use("/mypage", mypage);

export default router;