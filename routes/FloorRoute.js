import express from "express";
import {verifyUser} from "../middleware/AuthUser.js";
import {GetfloorById} from "../controllers/Floor.js";
const router = express.Router()
router.post('/api/floor/:id',verifyUser,GetfloorById);

export default router;