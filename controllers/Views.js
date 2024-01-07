export const AdminView=(req,res)=>{
    res.render('pages/ViewUser', { title: 'Usuarios', perfil:"j"});
}
export const CampusView=(req,res)=>{
    res.render('pages/ViewCampus', { title: 'Regionales', perfil:"j"});
}
export const UserView=(req,res)=>{
    res.render('pages/ViewUser', { title: 'Usuario', perfil:"j" });
}
export const PersonnelResponsibleView=(req,res)=>{
    res.render('pages/ViewPersonnelResponsible', { title: 'Responsable', perfil:"j"});
}
export const RegisterView=(req,res)=>{
    res.render('pages/register', { title: 'Registro' });
}
export const LoginView=(req,res)=>{
    res.render('pages/login');
}
export const ErrorView=(req,res)=>{
    res.render('pages/error', { title: 'Mi aplicación Node.js' });
}
export const ResetPasswordView=(req,res)=>{
    res.render('pages/forgot-password');
}
export const EquipmentView=(req,res)=>{
    res.render('pages/ViewEquipment',{ title: 'Equipos', perfil:"j"});
}
export const BuldingView=(req,res)=>{
    const {ID} = req.body;
    res.render('pages/ViewBuilding', { title: 'Edificios', perfil:"j", id:1});
}
export const TypesEquipmentView=(req,res)=>{
    const {ID} = req.body;
    res.render('pages/ViewTypesEquipment', { title: 'Categorías', perfil:"j", id:1});
}

export const AreaView=(req,res)=>{
    const {ID,Name} = req.body;
    res.render('pages/ViewArea', { title: 'Áreas', perfil:req.session.name, id:ID,name:Name});
}
export const SpaceView=(req,res)=>{
    const {ID,Name} = req.body;
    res.render('pages/ViewSpace', { title: 'Espacios', perfil:req.session.name, id:ID,name:Name});
}
export const ClassificationView=(req,res)=>{
    res.render('pages/ViewClassification', { title: 'Clasificación', perfil:req.session.name});
}
