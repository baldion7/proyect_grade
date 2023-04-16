import express from "express";
import {Login,logOut,Me} from "../controllers/Auth.js"
const router = express.Router();
router.get('/api/me',Me);
router.post('/api/login',Login);
router.get('/api/logout',logOut);

export default router;