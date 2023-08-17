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
router.get('/api/users',GetUser);
router.get('/api/users/:id',GetUserByid);
router.post('/api/users',CreateUser);
router.post('/api/searchuser',searchUser);
router.patch('/api/users/:id',UpdateUser);
router.delete('/api/users/:id',DeleteUser);
router.post('/api/user/email',GetUserByemail);

export default router;