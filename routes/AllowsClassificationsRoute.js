import express from "express";
import {CreateAllowsClassifications,GetAllowsClassifications,DeleteAllowsClassifications} from "../controllers/AllowsClassifications.js";
const router = express.Router()
import {verifyUser} from "../middleware/AuthUser.js"
router.post('/api/allowsclassifications',CreateAllowsClassifications);
router.post('/api/allowsclassifications/space',GetAllowsClassifications);
router.delete('/api/allowsclassifications/:id',DeleteAllowsClassifications);

export default router;