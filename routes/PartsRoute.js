import express from "express";
import {GetProductsPartsByid} from "../controllers/Parts.js";
const router = express.Router()
router.get('/api/parts/:id',GetProductsPartsByid )
export default router;