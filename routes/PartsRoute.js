import express from "express";
import {GetProductsPartsByid,CreateParts} from "../controllers/Parts.js";
const router = express.Router()
router.get('/api/parts/:id',GetProductsPartsByid )
router.post('/api/parts',CreateParts )
export default router;