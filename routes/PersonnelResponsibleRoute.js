import express from "express";
import {DeletePersonnelResponsible,CreatePersonnelResponsible,GetPersonnelResponsible,GetPersonnelResponsibleByemail,PostsearchPersonnelResponsible,UpdatePersonnelResponsible} from "../controllers/PersonnelResponsible.js";
import {adminOnly, verifyUser} from "../middleware/AuthUser.js"
import {GetUserByid} from "../controllers/User.js";
const router = express.Router();
router.get('/api/personnelresponsible',verifyUser,adminOnly,GetPersonnelResponsible);
router.post('/api/personnelresponsible',verifyUser,adminOnly,CreatePersonnelResponsible);
router.post('/api/searchpersonnelresponsible',verifyUser,adminOnly,PostsearchPersonnelResponsible);
router.patch('/api/personnelresponsible/:id',verifyUser,adminOnly,UpdatePersonnelResponsible);
router.delete('/api/personnelresponsible/:id',verifyUser,adminOnly,DeletePersonnelResponsible);
router.post('/api/personnelresponsible/email',verifyUser,adminOnly,GetPersonnelResponsibleByemail);

export default router;