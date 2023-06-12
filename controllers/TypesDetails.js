import {TypesDetails} from "../models/TypesDetailsModel.js";

export const CreatTypesDetails =async(req, res)=>{
    const {Name,Description,typesEquipmentId} = req.body;
    try {
        const respuesta =await TypesDetails.create({
            Name:Name,
            Description:Description,
            userId: req.session.userId
        });
        res.status(201).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const GetTypesDetailsbyId = async (req, res) => {
    try {
        const response = await TypesDetails.findAll({
            where: {
                typesEquipmentId: req.params.id
            }
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const GetTypesDetails = async (req, res) => {
    try {
        const response = await TypesDetails.findAll({

        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};