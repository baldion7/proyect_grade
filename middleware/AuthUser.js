import {User} from "../models/UserModel.js";
import {Role} from "../models/RoleModel.js";
export const verifyUser= async (req,res,next)=>{
    if (!req.session.userId){
        return res.render('pages/login', { title: 'Mi aplicación Node.js' });
    }
    const user= await User.findOne({
        where:{
            Id: req.session.userId
        },
        include: {
            model: Role,
        },
    });
    if (!user) {
        res.render('pages/register', { title: 'Mi aplicación Node.js' });
    }
    req.userId=user.Id;
    req.role=user.role.Name;
    next();
}

export const adminOnly= async (req,res,next)=>{
    if (!req.session.userId){
        return  res.redirect('/login');
    }
    const user= await User.findOne({
        where:{
            id: req.session.userId
        },include: {
            model: Role,
        },
    });
    if (!user) {
        return res.redirect('/register');
    };
    if (user.role.Name!=="admin"){
        return res.redirect('/user');
    }
    req.userId=user.id;
    req.role=user.role.Name;
    next();
}
export const requireLogin = async (req, res, next) => {
    if (!req.session.userId) {
        return next();
    }

    const user = await User.findOne({
        where: {
            id: req.session.userId
        },

    });

    if (!user) {
        return res.redirect('/register');
    }

    req.userId = user.id;
    req.role = user.role;

    if (user.role === 'admin') {
        return res.redirect('/admin');
    } else {
        return res.redirect('/user');
    }
};
export const AtchUser= async (req,res,next)=>{
    if (!req.session.userId){
        return  res.redirect('/login');
    }
    const user= await User.findOne({
        where:{
            id: req.session.userId
        }
    });
    if (!user) {
        return res.redirect('/register');
    };
    if (user.role!=="admin"){
        return res.redirect('/user');
    }else{
        return res.redirect('/admin');
    }

}