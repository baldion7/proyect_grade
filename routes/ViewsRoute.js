import express from "express";
import {adminOnly, verifyUser,requireLogin,AtchUser} from "../middleware/AuthUser.js";
import {AdminView, UserView,RegisterView,LoginView,ErrorView,prueba,EquipmentView,CampusView,BuldingView,ClassificationView,TypesEquipmentView,AreaView} from "../controllers/Views.js";
const router = express.Router();
router.get('/admin',verifyUser,adminOnly,AdminView);
router.get('/user',verifyUser,UserView);
router.get('/register',RegisterView);
router.get('/login',requireLogin,LoginView);
router.get('/',adminOnly);
router.get('/error',ErrorView)
router.delete('/AtchUser',AtchUser);
router.get('/usuarios',prueba)
router.get('/equipment',EquipmentView)
router.get('/campus',CampusView)
router.post('/bulding',BuldingView)
router.post('/typesequipment',TypesEquipmentView)
router.post('/area',AreaView)
router.get('/classification',ClassificationView)
export default router;