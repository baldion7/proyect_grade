import express from "express";
import {verifyUser} from "../middleware/AuthUser.js";
import {GetareaById} from "../controllers/Area.js"
const router = express.Router();
router.post('/api/area/:id',verifyUser,GetareaById);
export default router;