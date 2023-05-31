import express from "express";
import {verifyUser} from "../middleware/AuthUser.js";
import {Getspace} from "../controllers/Space.js";

const router = express.Router()
router.get('/api/space/:id',verifyUser,Getspace)

export default router;