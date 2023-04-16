import express from "express";
import {CreateAllowsClassifications,GetAllowsClassifications} from "../controllers/AllowsClassifications.js";
const router = express.Router()
import {verifyUser} from "../middleware/AuthUser.js"
router.post('/api/allowsclassifications',CreateAllowsClassifications);
router.get('/api/allowsclassifications/space/:id',GetAllowsClassifications);

export default router;