import express from "express";
import {GetEquiment, GetEquimentById, CreateEquiment,UpdateEquiment, DeleteEquiment,CreateEq,Postsearchequipment} from "../controllers/Equipment.js";
import {verifyUser} from "../middleware/AuthUser.js";
import {GetProductsPartsByid} from "../controllers/Parts.js"
const router = express.Router();
router.get('/api/equipment',verifyUser,GetEquiment);
router.get('/api/equipment/:id',verifyUser,GetEquimentById);
router.post('/api/equipment',CreateEquiment);
router.patch('/api/equipment/:id',verifyUser,UpdateEquiment);
router.delete('/api/equipment/:id',verifyUser,DeleteEquiment);
router.post('/api/equipment/parts',verifyUser,GetProductsPartsByid);
router.post('/api/equipment/search',Postsearchequipment);
router.get('/api/prueba',CreateEq);
export default router;