import {User} from "../models/UserModel.js";
import { Role } from "../models/RoleModel.js";
import argon2 from "argon2";
import Sequelize from 'sequelize';
import {EmailRegister} from "./Email.js"
import {Campus} from "../models/CampusModel.js";
import jwt from "jsonwebtoken";
export const GetUser = async (req, res) => {
    try {
        const response = await User.findAll({
            include: [{
                model: Role,
            },
                {
                    model: Campus,
                },
                ]

        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const GetUserByid = async (req, res) => {
    try {
        const response = await User.findOne({
            where: {
                Id: req.params.id
            },
            include:{
                model:Role
            }
        });
        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const GetUserByemail = async (req, res) => {
    const {email} = req.body;
    try {
        const response = await User.findOne({
            where: {
                email: email
            }
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const searchUser = async (req, res) => {
    const { search } = req.body;
    try {
        const response = await User.findAll({
            where: Sequelize.and(
                Sequelize.literal(`CONCAT(User.Name, ' ', User.Lastname, ' ', User.Phone, ' ', User.Country, ' ', User.Typedocument, ' ', User.Document, ' ', User.burden, ' ', User.email) LIKE '%${search}%'`)
            ),
            include: [
                {
                    model: Role,
                },
                {
                    model: Campus,
                },
            ],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};



export const CreateUser = async (req, res) => {
    const {name, lastname, document_type,ducument,country, phone_number,email,charge,campus, rol,password} = req.body;
    const hashPassword = await argon2.hash(password);
    try {
        const response= await User.create({
            Name: name,
            Lastname: lastname,
            Phone:phone_number,
            Country:country,
            Typedocument:document_type,
            Document:ducument,
            burden:charge,
            email: email,
            password: hashPassword,
            campusId:campus,
            roleId: rol
        });
        await EmailRegister(email, password);

    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const UpdateUser = async (req, res) => {

    const user = await User.findOne({
        where: {
            Id: req.params.id
        }
    });
    if (!user) return res.status(404).json({msg: "User tidak ditemukan"});
    const {name, lastname, document_type,ducument,country, phone_number,email,charge, rol,campus} = req.body;
    try {
        await User.update({
            Name: name,
            Lastname: lastname,
            Phone:phone_number,
            Country:country,
            Typedocument:document_type,
            Document:ducument,
            burden:charge,
            email: email,
            campusId:campus,
            roleId: rol
        }, {
            where: {
                Id: user.Id
            }
        });
        res.status(200).json({msg: "User Update"})
    } catch (error) {
        res.status(500).json({msg: error.message + "none"});
    }
};

export const DeleteUser = async (req, res) => {
    const user = await User.findOne({
        where: {
            Id: req.params.id
        }
    });
    if (!user) return res.status(404).json({msg: "User tidak ditemukan"});
    try {
        await User.destroy({
            where: {
                Id: user.Id
            }
        });
        res.status(200).json({msg: "user Destroy"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
};

export const ResetPasswordToken = (req, res) => {
    const {token} = req.params;

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            return res.render('pages/reset-password');
        }

        res.render('pages/reset-password', {token});
    });
}

export const ResetPassword=async (req, res) => {
    const { token, password, passwordConfirm } = req.body;

    if (password !== passwordConfirm) {
        return res.render('pages/reset-password');
    }

    jwt.verify(token, 'secret', async (err, decoded) => {
        if (!decoded) {
            return res.render('pages/error' );
        }
        if (err) {
            return res.render('pages/reset-password' );
        }

        const user = await User.findOne({ where: { email: decoded.email } });

        if (!user) {
            return res.render('pages/reset-password' );
        }
        const  hashPassword = await argon2.hash(password);
        await User.update( {
                password: hashPassword,
            },
            {
                where: { Id: user.Id }
            });
        res.render('pages/login' );
    });
}