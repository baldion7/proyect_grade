import express from "express";
import {GetTypesSpace,CreatTypesSpace} from "../controllers/TypesSpace.js";
const router = express.Router()
import {verifyUser} from "../middleware/AuthUser.js"
router.post('/api/TypesSpace',CreatTypesSpace);
router.get('/api/TypesSpace',GetTypesSpace);


export default router;