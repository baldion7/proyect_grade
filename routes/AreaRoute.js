import express from "express";
import {verifyUser} from "../middleware/AuthUser.js";
import {GetareafloorsById,Createarea,GetareaById,Updatearea,SearchArea,} from "../controllers/Area.js"
const router = express.Router();
router.get('/api/area/floor/:id',verifyUser,GetareafloorsById);
router.get('/api/area/:id',verifyUser,GetareaById);
router.patch('/api/area/:id',verifyUser,Updatearea);
router.get('/api/area/bodega/:id',verifyUser,GetareafloorsById);
router.post('/api/area',verifyUser,Createarea);
router.post('/api/Area/search',verifyUser,SearchArea);

export default router;