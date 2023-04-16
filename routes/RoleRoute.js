import express from "express";
import {GetRole} from "../controllers/Role.js";
import {verifyUser,adminOnly} from "../middleware/AuthUser.js";
const router = express.Router()
router.get('/api/role',verifyUser,adminOnly,GetRole);
export default router;