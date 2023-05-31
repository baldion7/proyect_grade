export const AdminView=(req,res)=>{
    res.render('pages/ViewUser', { title: 'Mi aplicación Node.js', perfil:req.session.name});
}
export const CampusView=(req,res)=>{
    res.render('pages/ViewCampus', { title: 'Mi aplicación Node.js', perfil:req.session.name});
}
export const prueba=(req,res)=>{
    res.render('pages/ViewEquipment', { title: 'Mi aplicación Node.js', perfil:req.session.name});
}
export const UserView=(req,res)=>{
    res.render('pages/user', { title: 'Mi aplicación Node.js' });
}
export const RegisterView=(req,res)=>{
    res.render('pages/register', { title: 'Mi aplicación Node.js' });
}
export const LoginView=(req,res)=>{
    res.render('pages/login', { title: 'Mi aplicación Node.js' });
}
export const ErrorView=(req,res)=>{
    res.render('pages/error', { title: 'Mi aplicación Node.js' });
}
export const ResetPasswordView=(req,res)=>{
    res.render('pages/forgot-password');
}
export const EquipmentView=(req,res)=>{
    res.render('pages/ViewEquipment',{ title: 'Mi aplicación Node.js', perfil:req.session.name});
}
export const BuldingView=(req,res)=>{
    const {ID} = req.body;
    res.render('pages/ViewBuilding', { title: 'Mi aplicación Node.js', perfil:req.session.name, id:ID});
}
export const TypesEquipmentView=(req,res)=>{
    const {ID} = req.body;
    res.render('pages/ViewTypesEquipment', { title: 'Mi aplicación Node.js', perfil:req.session.name, id:ID});
}

export const AreaView=(req,res)=>{
    const {ID,Name} = req.body;
    res.render('pages/ViewArea', { title: 'Mi aplicación Node.js', perfil:req.session.name, id:ID,name:Name});
}
export const ClassificationView=(req,res)=>{
    res.render('pages/ViewClassification', { title: 'Mi aplicación Node.js', perfil:req.session.name});
}