import express from "express";
import {PostbuildingsById,Getbuildings,Getcampususerbuildings,Getcampusbuildings,CreateBuilding,updateeBuilding,PostbuildingsfloorById,GetbuildingareaById} from "../controllers/Building.js"
import {verifyUser} from "../middleware/AuthUser.js";
const router = express.Router();
router.post('/api/building/:id',verifyUser,PostbuildingsById);
router.get('/api/building/:id',verifyUser,Getbuildings);
router.get('/api/building/floors/:id',verifyUser,PostbuildingsfloorById);
router.patch('/api/building/:id',updateeBuilding)
router.post('/api/building/',verifyUser,CreateBuilding);
router.get('/api/building/campus/user',Getcampususerbuildings);
router.get('/api/building/campus/:id',Getcampusbuildings);
router.get('/api/area/building/:id',verifyUser,GetbuildingareaById);
export default router;