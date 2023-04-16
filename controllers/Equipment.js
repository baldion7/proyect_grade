import { Area } from "../models/AreaModel.js";
import { Building } from "../models/BuildingModel.js";
import { Campus } from "../models/CampusModel.js";
import { Classification } from "../models/ClassificationModel.js";
import { Equipment } from "../models/EquipmentModel.js";
import { Floor } from "../models/FloorModel.js";
import { Parts } from "../models/PartsModel.js";
import { Space } from "../models/SpaceModel.js";
import { User } from "../models/UserModel.js";
import { Uts } from "../models/UtsModel.js";
import {Op} from "sequelize";
import {Role} from "../models/RoleModel.js";
export const GetEquiment =async(req, res)=>{
    try {
        let response;
        if(req.role === "admin"){
             response = await Equipment.findAll({
                 include: [
                     {
                         model: Space,
                         include: [
                             {
                                 model: Area,
                                 include: [
                                     {
                                         model: Floor,
                                         include: [
                                             {
                                                 model: Building,
                                                 include: [
                                                     {
                                                         model: Campus,
                                                         include: [
                                                             {
                                                                 model: Uts,
                                                             },
                                                         ],
                                                     },
                                                 ],
                                             },
                                         ],
                                     },
                                 ],
                             },
                         ],
                     },
                     {
                         model: Classification,
                     },
                     {
                         model: Parts,
                     },
                     {
                         model: User,
                     },
                 ],
             });

        }else{
            response = await Equipment.findAll({
                where:{
                    userId: req.userId
                },
                include: [
                    {
                        model: Space,
                        include: [
                            {
                                model: Area,
                                include: [
                                    {
                                        model: Floor,
                                        include: [
                                            {
                                                model: Building,
                                                include: [
                                                    {
                                                        model: Campus,
                                                        include: [
                                                            {
                                                                model: Uts,
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        model: Classification,
                    },
                    {
                        model: Parts,
                    },
                    {
                        model: User,
                    },
                ],

            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const GetEquimentById =async(req, res)=>{
    try {
        const product = await Equipment.findOne({
            where:{
                Id: req.params.id
            }
        });
        if(!product) return res.status(404).json({msg: "Datos no encontrados"});
        let response;
            response = await Equipment.findOne({
                where:{
                    Id: product.Id
                },
                include: [
                    {
                        model: Space,
                        include: [
                            {
                                model: Area,
                                include: [
                                    {
                                        model: Floor,
                                        include: [
                                            {
                                                model: Building,
                                                include: [
                                                    {
                                                        model: Campus,
                                                        include: [
                                                            {
                                                                model: Uts,
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        model: Classification,
                    },
                    {
                        model: Parts,
                    },
                    {
                        model: User,
                    },
                ],
            });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const CreateEquiment =async(req, res)=>{
    const {name,price,model,brand,classificationid,spaceid,imgequipment,fuction,datashoping,maker} = req.body;
    try {
    const respuesta =await Equipment.create({
            Name: name,
            Price: price,
            Maker:maker,
            Model:model,
            Brand:brand,
            DateShoping:datashoping,
            Function:fuction,
            ImgEquipment:imgequipment,
            spaceId:spaceid,
            classificationId:classificationid,
            userId: req.session.userId
        });
        res.status(201).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const UpdateEquiment =async(req, res)=>{
    try {
        const product = await Equipment.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!product) return res.status(404).json({msg: "Datos no encontrados"});
        const {name, price} = req.body;
        if(req.role === "admin"){
            await Equipment.update({name, price},{
                where:{
                    id: product.id
                }
            });
        }else{
            if(req.userId !== product.userId) return res.status(403).json({msg: "acceso prohibido"});
            await Equipment.update({name, price},{
                where:{
                    [Op.and]:[{id: product.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Producto actualizado con éxito"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const DeleteEquiment =async(req, res)=>{
    try {
        const equipment = await Equipment.findOne({
            where:{
                Id: req.params.id
            }
        });
        if(!equipment) return res.status(404).json({msg: "Datos no encontrados"});
        if(req.role === "admin"){
            await Equipment.destroy({
                where:{
                    Id: equipment.Id
                }
            });
        }else{
            if(req.userId !== equipment.userId) return res.status(403).json({msg: "acceso prohibido"});
        }
        res.status(200).json({msg: "Producto eliminado con éxito"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
