import express from "express";
import {AtchUser} from "../middleware/AuthUser.js";
import {AdminView, UserView,RegisterView,LoginView,ErrorView,EquipmentView,CampusView,BuldingView,ClassificationView,TypesEquipmentView,AreaView,SpaceView,PersonnelResponsibleView} from "../controllers/Views.js";
const router = express.Router();
router.get('/admin',AdminView);
router.get('/user',UserView);
router.get('/register',RegisterView);
router.get('/login',LoginView);
router.get('/',LoginView);
router.get('/error',ErrorView)
router.delete('/AtchUser',AtchUser);
router.get('/equipment',EquipmentView)
router.get('/campus',CampusView)
router.post('/bulding',BuldingView)
router.post('/typesequipment',TypesEquipmentView)
router.post('/area',AreaView)
router.get('/classification',ClassificationView)
router.post('/space',SpaceView)
router.get('/personnelresponsible',PersonnelResponsibleView)
//ajustes de seguridad
export default router;
