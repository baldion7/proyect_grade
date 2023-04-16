import express from "express";
import {GetbuildingsById} from "../controllers/Building.js"
import {verifyUser} from "../middleware/AuthUser.js";
const router = express.Router();
router.post('/api/building/:id',verifyUser,GetbuildingsById);
export default router;