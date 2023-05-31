import Sequelize from "sequelize";
import {TypesEquipment} from "../models/TypesEquipmentModel.js";
import {AllowsTypesDetailsModel} from "../models/AllowsTypesDetailsModel.js";
import {Classification} from "../models/ClassificationModel.js";


export const CreatTypesEquipment =async(req, res)=>{
    const {name,description, classificationid} = req.body;
    try {
        const respuesta =await TypesEquipment.create({
            Name:name,
            Description:description,
            classificationId: classificationid
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const UpdateTypesEquipment = async (req, res)=>{
    const typesequipment = await TypesEquipment.findOne({
        where: {
            Id: req.params.id
        }
    });
    if (!typesequipment) return res.status(404).json({msg: "Datos no encontrados"});

    const {name,description} = req.body;
    try {
        await TypesEquipment.update({
            Name:name,
            Description:description,
        }, {
            where: {
                Id: typesequipment.Id
            }
        });
        res.status(200).json({msg: "Categoria Update"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const GetClassificationTypesEquipmentbyId = async (req, res) => {
    try {
        const response = await TypesEquipment.findAll({
            where: {
                classificationId: req.params.id
            },

        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const GetTypesEquipmentbyId = async (req, res) => {
    try {
        const response = await TypesEquipment.findOne({
            where: {
                Id: req.params.id
            },
            include:[
                {
                    model:AllowsTypesDetailsModel
                }
            ]
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const GetTypesEquipment = async (req, res) => {
    try {
        const response = await TypesEquipment.findAll({

        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};