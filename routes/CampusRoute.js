import express from "express";
import {verifyUser} from "../middleware/AuthUser.js";
import {Getcampus} from "../controllers/Campus.js";
const router = express.Router();

router.get('/api/campus',verifyUser,Getcampus);
export default router;