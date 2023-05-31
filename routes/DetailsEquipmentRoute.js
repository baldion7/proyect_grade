import express from "express";
import {GetDetailsEquipment,CreateDetailsEquipment} from "../controllers/DetailsEquipment.js";
const router = express.Router()
import {verifyUser} from "../middleware/AuthUser.js"
router.post('/api/Detailsequipment',CreateDetailsEquipment);
router.get('/api/Detailsequipment/:id',GetDetailsEquipment);

export default router;