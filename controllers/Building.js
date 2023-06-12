import Sequelize from 'sequelize';
import {Building} from "../models/BuildingModel.js";
import {User} from "../models/UserModel.js";
import {Campus} from "../models/CampusModel.js";
import {Floor} from "../models/FloorModel.js";
import {Area} from "../models/AreaModel.js";
import {TypesArea} from "../models/TypesAreaModel.js";
import {TypesEquipment} from "../models/TypesEquipmentModel.js";

export const PostbuildingsById = async (req, res) => {
    try {
        let response;
        response = await Building.findAll({
            where: {
                campusId: req.params.id
            },
            include: [
                {
                    model: Campus,

                },
                {
                    model: Floor,

                }
            ]

        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const PostbuildingsfloorById = async (req, res) => {
    try {
        let response;
        response = await Building.findAll({
            where: {
                Id: req.params.id
            },
            include: [
                {
                    model: Campus,

                },
                {
                    model: Floor,

                }
            ]

        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const Getbuildings = async (req, res) => {
    try {
        let response;
        response = await Building.findOne({
            where: {
                Id: req.params.id
            },
            include: [
                {
                    model: Campus,

                },
                {
                    model: Floor,

                }
            ]
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const searchBuilding = async (req, res) => {
    const { search } = req.body;
    try {
        const buildings = await Building.findAll({
            where: {
                [Sequelize.Op.or]: [
                    {
                        Name: {
                            [Sequelize.Op.like]: `%${search}%`,
                        },
                    },
                    {
                        Description: {
                            [Sequelize.Op.like]: `%${search}%`,
                        },
                    },
                    {
                        Address: {
                            [Sequelize.Op.like]: `%${search}%`,
                        },
                    },
                    {
                        Dateconstruction: {
                            [Sequelize.Op.like]: `%${search}%`,
                        },
                    },
                ],
            },
            include: [
                {
                    model: Campus,
                },
                {
                    model: Floor,
                },
                {
                    model:User
                }
            ],
        });

        res.status(200).json(buildings);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};





export const Getcampususerbuildings = async (req, res) => {
    try {
        let response;
        response = await User.findAll({
            where: {
                Id: req.session.userId
            },
            include: {
                model: Campus,
                include: {
                    model: Building,
                    attributes: ['id', 'name']
                }
            }
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const Getcampusbuildings = async (req, res) => {
    try {
        let response;
        response = await Building.findAll({
            where: {
                campusId: req.params.id
            },
            include: [
                {
                    model: Campus,

                },
                {
                    model: Floor,

                },
                {
                    model: User,

                },
            ]

        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const CreateBuilding = async (req, res) => {
    const {name, address, description, dateconstruction, campusId} = req.body;
    try {
        const response = await Building.create({
            Name: name,
            Address: address,
            Description: description,
            Dateconstruction: dateconstruction,
            campusId: campusId,
            userId: req.session.userId
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const updateeBuilding = async (req, res) => {
    const building = await Building.findOne({
        where: {
            Id: req.params.id
        }
    });
    if (!building) return res.status(404).json({msg: "Datos no encontrados"});

    const {name, address, description, dateconstruction} = req.body;
    try {
        await Building.update({
            Name: name,
            Address: address,
            Description: description,
            Dateconstruction: dateconstruction,
        }, {
            where: {
                Id: building.Id
            }
        });

        res.status(200).json({msg: "Campus Update"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const GetbuildingareaById =async(req, res)=>{
    try {
        let response;
        response = await Building.findByPk(req.params.id,{
            include: [
                {
                    model: Floor,
                    include: [
                        {
                            model: Area,
                            include:[
                                {
                                    model:TypesArea
                                },
                                {
                                    model: User,

                                },
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

export const DeleteBuilding = async (req, res) => {
    try {
        const response = await Building.destroy({
            where: {
                Id: req.params.id
            }
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};