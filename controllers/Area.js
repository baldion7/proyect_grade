import {Area} from "../models/AreaModel.js";
import {Floor} from "../models/FloorModel.js";
import {Campus} from "../models/CampusModel.js";
import {Building} from "../models/BuildingModel.js";
import Sequelize, {Op} from "sequelize";
import {TypesArea} from "../models/TypesAreaModel.js";
import {User} from "../models/UserModel.js";

export const GetareafloorsById = async (req, res) => {
    try {
        let response;
        response = await Area.findAll({
            where: {
                floorId: req.params.id
            },

        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const GetareaById = async (req, res) => {
    try {
        let response;
        response = await Area.findOne({
            where: {
                Id: req.params.id
            },
            include:[
                {
                    model: Floor,
                    include:[
                        {
                            model:Building,

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
export const Createarea = async (req, res) => {
    const {name, description, floorid, typesAreaid} = req.body;
    try {
        let response;
        response = await Area.create({
            Name: name,
            Description: description,
            floorId: floorid,
            typesAreaId: typesAreaid,
            TypeArea: "prueba",
            userId: req.session.userId

        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const Updatearea = async (req, res) => {
    const areas = await Area.findOne({
        where: {
            Id: req.params.id
        }
    });
    if (!areas) return res.status(404).json({msg: "Datos no encontrados"});
    const {name, description, floorid, typesAreaid} = req.body;
    try {
        await Area.update({
            Name: name,
            Description: description,
            floorId: floorid,
            typesAreaId: typesAreaid,
        }, {
            where: {
                Id: areas.Id
            }
        });
        res.status(200).json({msg: "Campus Update"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const SearchArea =async(req, res)=>{
    const { search,Id } = req.body;
    try {
        let response;
        response = await Building.findByPk(Id,{
            include: [
                {
                    model: Floor,
                    include: [
                        {
                            model: Area,
                            where: {
                                [Op.or]: [
                                    { name: { [Op.like]: `%${search}%` } },
                                    { description: { [Op.like]: `%${search}%` } }
                                ]
                            },
                            include:[
                                {
                                    model:TypesArea
                                },
                                {
                                    model:User
                                }
                            ]
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




