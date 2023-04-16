import express from "express";
import {PostbuildingsById,Getbuildings} from "../controllers/Building.js"
import {verifyUser} from "../middleware/AuthUser.js";
const router = express.Router();
router.post('/api/building/:id',verifyUser,PostbuildingsById);
router.post('/api/building/',verifyUser,Getbuildings);
export default router;