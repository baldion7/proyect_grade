import Sequelize from "sequelize";
import {TypesEquipment} from "../models/TypesEquipmentModel.js";
import {AllowsTypesDetails} from "../models/AllowsTypesDetails.js";
import {User} from "../models/UserModel.js";
import {Classification} from "../models/ClassificationModel.js";


export const CreatTypesEquipment = async (req, res) => {
    const {name, description, classificationid} = req.body;
    try {
        const respuesta = await TypesEquipment.create({
            Name: name,
            Description: description,
            classificationId: classificationid,
            userId: req.session.userId
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const SearchTypesEquipment = async (req, res) => {
    const {search, Id} = req.body;
    try {
        const types = await TypesEquipment.findAll({
            where: {
                [Sequelize.Op.and]: [
                    {
                        [Sequelize.Op.or]: {
                            Name: {
                                [Sequelize.Op.like]: `%${search}%`,
                            },
                            Description: {
                                [Sequelize.Op.like]: `%${search}%`,
                            },
                        },
                    },
                    {
                        classificationId: Id,
                    },
                ],
            },
            include:[
                {
                    model:User
                },
                {
                    model:Classification
                }
            ],
        });

        res.status(200).json(types);
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    }
};


export const UpdateTypesEquipment = async (req, res) => {
    const typesequipment = await TypesEquipment.findOne({
        where: {
            Id: req.params.id
        }
    });
    if (!typesequipment) return res.status(404).json({msg: "Datos no encontrados"});

    const {name, description} = req.body;
    try {
        await TypesEquipment.update({
            Name: name,
            Description: description,
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
            include: [
                {
                    model: User
                },{
                    model: Classification
                }
            ]
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message, hola: "hola" });
    }
};


export const GetTypesEquipmentbyId = async (req, res) => {
    try {
        const response = await TypesEquipment.findOne({
            where: {
                Id: req.params.id
            },
            include: [
                {
                    model: AllowsTypesDetails
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
        const response = await TypesEquipment.findAll({});

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const DeleteTypesEquipment = async (req, res) => {
    try {
        const response = await TypesEquipment.destroy({
            where: {
                Id: req.params.id
            }
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};