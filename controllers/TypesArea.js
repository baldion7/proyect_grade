import {TypesArea} from "../models/TypesAreaModel.js";

export const CreatTypesArea =async(req, res)=>{
    const {Name,Description} = req.body;
    try {
        const respuesta =await TypesArea.create({
            Name:Name,
            Description:Description

        });
        res.status(201).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const GetTypesArea = async (req, res) => {
    try {
        const response = await TypesArea.findAll({

        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};