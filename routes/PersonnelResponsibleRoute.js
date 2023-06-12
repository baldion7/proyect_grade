import express from "express";
import {
    DeletePersonnelResponsible,
    CreatePersonnelResponsible,
    GetPersonnelResponsible,
    GetPersonnelResponsibleByemail,
    PostsearchPersonnelResponsible,
    UpdatePersonnelResponsible,
    GetPersonnelResponsibleCampus,
    GetPersonnelResponsibleById
} from "../controllers/PersonnelResponsible.js";
import {adminOnly, verifyUser} from "../middleware/AuthUser.js"

const router = express.Router();
router.get('/api/personnelresponsible',verifyUser,adminOnly,GetPersonnelResponsible);
router.get('/api/personnelresponsible/:id',verifyUser,adminOnly,GetPersonnelResponsibleById);
router.get('/api/personnelresponsible/campus/:id',verifyUser,adminOnly,GetPersonnelResponsibleCampus);
router.post('/api/personnelresponsible',verifyUser,adminOnly,CreatePersonnelResponsible);
router.post('/api/personnelresponsible/search',verifyUser,adminOnly,PostsearchPersonnelResponsible);
router.patch('/api/personnelresponsible/:id',verifyUser,adminOnly,UpdatePersonnelResponsible);
router.delete('/api/personnelresponsible/:id',verifyUser,adminOnly,DeletePersonnelResponsible);
router.post('/api/personnelresponsible/email',verifyUser,adminOnly,GetPersonnelResponsibleByemail);

export default router;