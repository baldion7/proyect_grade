import express from "express";
import {adminOnly, verifyUser,requireLogin,AtchUser} from "../middleware/AuthUser.js";
import {AdminView, UserView,RegisterView,LoginView,ErrorView,prueba,EquipmentView,CampusView,BuldingView,ClassificationView,TypesEquipmentView,AreaView,SpaceView,PersonnelResponsibleView} from "../controllers/Views.js";
const router = express.Router();
router.get('/admin',verifyUser,adminOnly,AdminView);
router.get('/user',verifyUser,UserView);
router.get('/register',RegisterView);
router.get('/login',LoginView,adminOnly);
router.get('/',LoginView);
router.get('/error',ErrorView)
router.delete('/AtchUser',AtchUser);
router.get('/usuarios',verifyUser,prueba)
router.get('/equipment',verifyUser,EquipmentView)
router.get('/campus',verifyUser,CampusView)
router.post('/bulding',verifyUser,BuldingView)
router.post('/typesequipment',verifyUser,TypesEquipmentView)
router.post('/area',verifyUser,AreaView)
router.get('/classification',verifyUser,ClassificationView)
router.post('/space',verifyUser,SpaceView)
router.get('/personnelresponsible',verifyUser,PersonnelResponsibleView)
export default router;