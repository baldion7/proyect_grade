import express from "express";
import {verifyUser} from "../middleware/AuthUser.js";
import {Getspaceareabyid,Createspace,Getspacebyid,Updatespace,Deleteespace,searchSpace} from "../controllers/Space.js";

const router = express.Router()
router.get('/api/space/area/:id',verifyUser,Getspaceareabyid)
router.get('/api/space/:id',verifyUser,Getspacebyid)
router.post('/api/space',verifyUser,Createspace)
router.post('/api/space/search',verifyUser,searchSpace)
router.patch('/api/space/:id',verifyUser,Updatespace)
router.delete('/api/space/:id',verifyUser,Deleteespace)

export default router;