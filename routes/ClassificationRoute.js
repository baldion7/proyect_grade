import express from "express";
import {GetClassification} from "../controllers/Classification.js";
const router = express.Router()
import {verifyUser} from "../middleware/AuthUser.js"
router.get('/api/classification',verifyUser,GetClassification);

export default router;