import express from "express";
import {verifyUser} from "../middleware/AuthUser.js";
import {GetareafloorsById,Createtarea,GetareaById,Updatetetarea} from "../controllers/Area.js"
const router = express.Router();
router.get('/api/area/floor/:id',verifyUser,GetareafloorsById);
router.get('/api/area/:id',verifyUser,GetareaById);
router.patch('/api/area/:id',verifyUser,Updatetetarea);
router.get('/api/area/bodega/:id',verifyUser,GetareafloorsById);
router.post('/api/area',verifyUser,Createtarea);

export default router;