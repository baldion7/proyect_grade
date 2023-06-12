import express from "express";
import {PostbuildingsById,Getbuildings,Getcampususerbuildings,DeleteBuilding,Getcampusbuildings,CreateBuilding,updateeBuilding,PostbuildingsfloorById,GetbuildingareaById,searchBuilding} from "../controllers/Building.js"
import {verifyUser} from "../middleware/AuthUser.js";
const router = express.Router();
router.post('/api/building/:id',verifyUser,PostbuildingsById);
router.get('/api/building/:id',verifyUser,Getbuildings);
router.get('/api/building/floors/:id',verifyUser,PostbuildingsfloorById);
router.patch('/api/building/:id',verifyUser,updateeBuilding)
router.post('/api/building/',verifyUser,CreateBuilding);
router.post('/api/search/building',verifyUser,searchBuilding);
router.get('/api/building/campus/user',verifyUser,Getcampususerbuildings);
router.get('/api/building/campus/:id',verifyUser,Getcampusbuildings);
router.get('/api/area/building/:id',verifyUser,GetbuildingareaById);
router.delete('/api/building/:id',verifyUser,DeleteBuilding);
export default router;