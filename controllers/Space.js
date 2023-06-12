import {Space} from "../models/SpaceModel.js";
import {TypesSpace} from "../models/TypesSpaceModel.js";
import {Area} from "../models/AreaModel.js";
import {Floor} from "../models/FloorModel.js";
import {Building} from "../models/BuildingModel.js";
import {PersonnelResponsible} from "../models/PersonnelResponsibleModel.js";
import {AllowsClassifications} from "../models/AllowsClassifications.js";
import {User} from "../models/UserModel.js";
import Sequelize from "sequelize";


export const Getspaceareabyid = async (req, res) => {
    try {
        const response = await Space.findAll({
            where: {
                areaId: req.params.id
            },
            include: [
                {
                    model: TypesSpace
                },
                {
                    model: Area,
                    include: [
                        {
                            model: Floor,
                            include: [
                                {
                                    model: Building
                                }
                            ]

                        }
                    ]
                },
                {
                    model: PersonnelResponsible
                },
                {
                    model:User
                }
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const Deleteespace = async (req, res) => {
    try {
        const response = await Space.destroy({
            where: {
                Id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const Getspacebyid = async (req, res) => {
    try {
        const response = await Space.findOne({
            where: {
                Id: req.params.id
            },
            include: [
                {
                    model: TypesSpace
                },
                {
                    model: AllowsClassifications,

                },
                {
                    model: PersonnelResponsible
                },
                {
                    model:User
                }
            ]
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const Createspace = async (req, res) => {
    const {name, Personnelresponsibleid, typesspaceid, areaid} = req.body;
    try {
        let response;
        response = await Space.create({
            Location: name,
            PersonnelResponsibleId: Personnelresponsibleid,
            typesSpaceId: typesspaceid,
            areaId: areaid,
            userId: req.session.userId

        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const Updatespace = async (req, res) => {
    const space = await Space.findOne({
        where: {
            Id: req.params.id
        }
    });
    if (!space) return res.status(404).json({msg: "Datos no encontrados"});
    const {name, Personnelresponsibleid, typesspaceid} = req.body;
    try {

        await Space.update({
            Location: name,
            PersonnelResponsibleId: Personnelresponsibleid,
            typesSpaceId: typesspaceid,
        }, {
            where: {
                Id:space.Id
            }
        });

        res.status(200).json({msg: "Espacio Update"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const searchSpace = async (req, res) => {
    const { search } = req.body;
    try {
        const spaces = await Space.findAll({
            where: {
                [Sequelize.Op.or]: {
                    Technicallocation: {
                        [Sequelize.Op.like]: `%${search}%`,
                    },
                    Location: {
                        [Sequelize.Op.like]: `%${search}%`,
                    },
                },
            },
            include: [
                {
                    model: TypesSpace
                },
                {
                    model: Area,
                    include: [
                        {
                            model: Floor,
                            include: [
                                {
                                    model: Building
                                }
                            ]

                        }
                    ]
                },
                {
                    model: PersonnelResponsible
                },
                {
                    model:User
                }
            ]
        });

        res.status(200).json(spaces);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};








