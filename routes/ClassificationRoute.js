import express from "express";
import {GetClassification,CreateClassification,DeleteClassification,GetClassificationbyid,UpdateClassification,SearchClassification} from "../controllers/Classification.js";
const router = express.Router()
import {verifyUser} from "../middleware/AuthUser.js"
router.get('/api/classification',verifyUser,GetClassification);
router.get('/api/classification/:id',verifyUser,GetClassificationbyid);
router.post('/api/classification',verifyUser,CreateClassification);
router.post('/api/classification/search',verifyUser,SearchClassification);
router.patch('/api/classification/:id',verifyUser,UpdateClassification);
router.delete('/api/classification/:id',verifyUser,DeleteClassification);


export default router;