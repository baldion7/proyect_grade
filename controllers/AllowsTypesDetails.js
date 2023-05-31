import {AllowsTypesDetailsModel} from "../models/AllowsTypesDetailsModel.js";

import {TypesDetails} from "../models/TypesDetailsModel.js";

export const CreateAllowsTypesDetails =async(req, res)=>{
    const {Typesequipmentid,Typesdetailid} = req.body;
    try {
        const respuesta =await AllowsTypesDetailsModel.create({
            typesEquipmentId :Typesequipmentid,
            typesDetailId:Typesdetailid
        });
        res.status(201).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const GetAllowsTypesDetails = async (req, res) => {
    try {
        const response = await AllowsTypesDetailsModel.findAll({
            where: {
                typesEquipmentId: req.params.id
            },
            include: [
        {
            model: TypesDetails,
        }
        ]
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const DeleteAllowsTypesDetails = async (req, res) => {
    try {
        const response = await AllowsTypesDetailsModel.destroy({
            where: {
                typesEquipmentId: req.params.id
            }
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};


