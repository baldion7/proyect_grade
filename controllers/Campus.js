import Sequelize from "sequelize";
import {Campus} from "../models/CampusModel.js";
import {User} from "../models/UserModel.js";
import {Floor} from "../models/FloorModel.js";
import {Building} from "../models/BuildingModel.js";

export const Getcampus = async (req, res) => {
    try {
        const response = await Campus.findAll({});
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const Getcampususer = async (req, res) => {
    try {
        let response;
        response = await User.findAll({
            where: {
                Id: req.params.id
            },
            include: {
                model: Campus,

            }
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const GetcampusById = async (req, res) => {
    try {

        const response = await Campus.findOne({
            where: {
                Id:  req.params.id
            },
            include: [
                {
                    model: Building,
                    include:[
                        {
                            model: Floor
                        }
                    ]
                }
            ]
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const CreateCampus = async (req, res) => {
    const {name, address, email, phone, schedules, utid} = req.body;
    try {
        let response;
        response = await Campus.create({
            Name: name,
            Address: address,
            Email: email,
            Phone: phone,
            Schedules: schedules,
            utId: utid
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const UpdateCampus = async (req, res) => {
    const campus = await Campus.findOne({
        where: {
            Id: req.params.id
        }
    });
    if (!campus) return res.status(404).json({msg: "Datos no encontrados"});

    const {name, address, email, phone, schedules} = req.body;
    try {
        await Campus.update({
            Name: name,
            Address: address,
            Email: email,
            Phone: phone,
            Schedules: schedules,
        }, {
            where: {
                Id: campus.Id
            }
        });
        res.status(200).json({msg: "Campus Update"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const Deletecampus = async (req, res) => {
    const campus = await Campus.findOne({
        where: {
            Id: req.params.id
        }
    });
    if (!campus) return res.status(404).json({msg: "Datos no encontrados"});

    try {
        await Campus.destroy({
            where: {
                Id: campus.Id
            }
        });
        res.status(200).json({msg: "Campus Update"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const PostsearchCampus = async (req, res) => {
    const {search} = req.body;

    try {
        const response = await Campus.findAll({
            where: Sequelize.and(
                Sequelize.literal(`CONCAT(Name, ' ', Address,' ',Phone,' ',Email,' ',Schedules) LIKE '%${search}%'`)
            )

        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};