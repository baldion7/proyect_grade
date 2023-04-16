import {AllowsClassifications} from "../models/AllowsClassifications.js";

export const CreateAllowsClassifications =async(req, res)=>{
    const {spaceId,classificationId} = req.body;
    try {
        const respuesta =await AllowsClassifications.create({
            classificationId:classificationId,
            spaceId:spaceId
        });
        res.status(201).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const GetAllowsClassifications = async (req, res) => {
    try {
        const response = await AllowsClassifications.findAll({
            where: {
                spaceId: req.params.id
            }
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};