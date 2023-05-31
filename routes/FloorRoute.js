import express from "express";
import {verifyUser} from "../middleware/AuthUser.js";
import {GetfloorById,Getfloor,Createfloor} from "../controllers/Floor.js";
const router = express.Router()
router.get('/api/floors/:id',verifyUser,GetfloorById);
router.get('/api/floors',verifyUser,Getfloor);
router.post('/api/floors',verifyUser,Createfloor);

export default router;