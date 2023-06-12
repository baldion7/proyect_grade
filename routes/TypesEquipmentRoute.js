import express from "express";
import {GetTypesEquipment,GetClassificationTypesEquipmentbyId,DeleteTypesEquipment,CreatTypesEquipment,GetTypesEquipmentbyId,UpdateTypesEquipment,SearchTypesEquipment} from "../controllers/TypesEquipment.js";
const router = express.Router()
import {verifyUser} from "../middleware/AuthUser.js";
router.post('/api/TypesEquipment',verifyUser,CreatTypesEquipment);
router.get('/api/Classification/TypesEquipment/:id',verifyUser,GetClassificationTypesEquipmentbyId);
router.get('/api/TypesEquipment/:id',verifyUser,GetTypesEquipmentbyId);
router.get('/api/TypesEquipment',verifyUser,GetTypesEquipment);
router.post('/api/TypesEquipment/search',verifyUser,SearchTypesEquipment);
router.patch('/api/TypesEquipment/:id',verifyUser,UpdateTypesEquipment);
router.delete('/api/TypesEquipment/:id',verifyUser,DeleteTypesEquipment)

export default router;