import express from "express";
import {verifyUser} from "../middleware/AuthUser.js";
import {Getcampus,Getcampususer,CreateCampus,GetcampusById,UpdateCampus,PostsearchCampus,Deletecampus} from "../controllers/Campus.js";
const router = express.Router();

router.get('/api/campus',verifyUser,Getcampus);
router.get('/api/campus/:id',verifyUser,GetcampusById);
router.delete('/api/campus/:id',verifyUser,Deletecampus);
router.patch('/api/campus/:id',verifyUser,UpdateCampus);
router.get('/api/campus/user',verifyUser,Getcampususer);
router.post('/api/campus',verifyUser,CreateCampus);
router.post('/api/campus/search',verifyUser,PostsearchCampus);
export default router;