import express from "express";
import {GetTypesArea,CreatTypesArea} from "../controllers/TypesArea.js";
const router = express.Router()
import {verifyUser} from "../middleware/AuthUser.js"
router.post('/api/TypesArea',CreatTypesArea);
router.get('/api/TypesArea',GetTypesArea);

export default router;