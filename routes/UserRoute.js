import express from "express";
import {
    GetUserByid,
    GetUser,
    CreateUser,
    UpdateUser,
    DeleteUser,searchUser,GetUserByemail
} from "../controllers/User.js";
import {verifyUser, adminOnly} from "../middleware/AuthUser.js";

const router = express.Router();
router.get('/api/users',verifyUser,adminOnly,GetUser);
router.get('/api/users/:id',verifyUser,adminOnly,GetUserByid);
router.post('/api/users',verifyUser,adminOnly,CreateUser);
router.post('/api/searchuser',verifyUser,adminOnly,searchUser);
router.patch('/api/users/:id',verifyUser,adminOnly,UpdateUser);
router.delete('/api/users/:id',verifyUser,adminOnly,DeleteUser);
router.post('/api/user/email',verifyUser,adminOnly,GetUserByemail);

export default router;