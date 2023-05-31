import express from "express";
import {CreatTypesDetails,GetTypesDetailsbyId,GetTypesDetails} from "../controllers/TypesDetails.js";
const router = express.Router()
import {verifyUser} from "../middleware/AuthUser.js"
router.post('/api/typesDetails',CreatTypesDetails);
router.get('/api/typesDetails/:id',GetTypesDetailsbyId);
router.get('/api/typesDetails',GetTypesDetails);

export default router;