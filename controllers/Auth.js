import { User } from "../models/UserModel.js";
import { Role } from "../models/RoleModel.js";
import argon2 from "argon2";
export const Login = async (req, res) => {
    const { email ,password} = req.body;
    if (!email || !password) {
        return res.status(400).json({ msg: "Ingrese un correo electrónico y una contraseña" });
    }

    const user = await User.findOne({
        where: {
            email: email,
        },
        include: {
            model: Role,
        },
    });

    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });
    const match = await argon2.verify(user.password, password);
    if (!match) return res.status(400).json({ msg: "Contraseñas incorrectas" });
    req.session.userId = user.Id;
    req.session.name = `${user.Name} ${user.Lastname}`;
    const name = user.name;
    const lastname = user.Lastname;
    const emaill = user.email;
    const rol = user.role.Name;

    if (rol === "admin") {
        res.redirect("/admin");
    } else if (rol === "user") {
        res.redirect("/user");
    } else {
        res.redirect("/login");
    }
};
export const Me = async (req,res)=>{
    if (!req.session.userId){
        return res.status(401).json({msg:"Por favor, ingrese a su cuenta"});
    }
    const user= await User.findOne({
        where:{
            id: req.session.userId
        }
    });
    if (!user) return res.status(404).json({msg:"Usuario no encontrado"});
    res.status(200).json(user);
};
export const logOut = (req, res)=>{
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "No puedo cerrar sesión"})
        res.redirect("/");
    })
}
