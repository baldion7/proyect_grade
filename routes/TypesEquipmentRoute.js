import express from "express";
import {GetTypesEquipment,GetClassificationTypesEquipmentbyId,CreatTypesEquipment,GetTypesEquipmentbyId,UpdateTypesEquipment} from "../controllers/TypesEquipment.js";
const router = express.Router()
import {verifyUser} from "../middleware/AuthUser.js"
router.post('/api/TypesEquipment',CreatTypesEquipment);
router.get('/api/Classification/TypesEquipment/:id',GetClassificationTypesEquipmentbyId);
router.get('/api/TypesEquipment/:id',GetTypesEquipmentbyId);
router.get('/api/TypesEquipment',GetTypesEquipment);
router.patch('/api/TypesEquipment/:id',UpdateTypesEquipment);

export default router;