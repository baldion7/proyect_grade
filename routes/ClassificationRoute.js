import express from "express";
import {GetClassification,CreateClassification,GetClassificationbyid,UpdateClassification} from "../controllers/Classification.js";
const router = express.Router()
import {verifyUser} from "../middleware/AuthUser.js"
router.get('/api/classification',verifyUser,GetClassification);
router.get('/api/classification/:id',verifyUser,GetClassificationbyid);
router.post('/api/classification',verifyUser,CreateClassification);
router.patch('/api/classification/:id',verifyUser,UpdateClassification);


export default router;