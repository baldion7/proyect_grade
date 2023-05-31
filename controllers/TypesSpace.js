import {TypesSpace} from "../models/TypesSpaceModel.js";

export const CreatTypesSpace =async(req, res)=>{
    const {Name,Description} = req.body;
    try {
        const respuesta =await TypesSpace.create({
            Name:Name,
            Description:Description
        });
        res.status(201).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const GetTypesSpace = async (req, res) => {
    try {
        const response = await TypesSpace.findAll({

        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};