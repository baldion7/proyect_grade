import express from "express";
import {ResetPasswordView} from "../controllers/Views.js";
import {EmailForgotPassword} from "../controllers/Email.js";
import {ResetPassword, ResetPasswordToken} from "../controllers/User.js";

const router = express.Router()
router.get('/forgot-password',ResetPasswordView )
router.post('/forgot-password',EmailForgotPassword )
router.get('/reset-password/:token',ResetPasswordToken)
router.post('/reset-password',ResetPassword)

export default router;