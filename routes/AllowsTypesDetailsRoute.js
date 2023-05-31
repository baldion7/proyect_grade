import express from "express";
import {GetAllowsTypesDetails,CreateAllowsTypesDetails,DeleteAllowsTypesDetails} from "../controllers/AllowsTypesDetails.js";
const router = express.Router()
import {verifyUser} from "../middleware/AuthUser.js"
router.post('/api/allowstypesdetails',CreateAllowsTypesDetails);
router.get('/api/allowstypesdetails/:id',GetAllowsTypesDetails);
router.delete('/api/allowstypesdetails/:id',DeleteAllowsTypesDetails);


export default router;