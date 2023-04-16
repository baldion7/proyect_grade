import {Building} from "../models/BuildingModel.js";

export const PostbuildingsById =async(req, res)=>{
    try {
        let response;
        response = await Building.findAll({
            where:{
                campusId: req.params.id
            },

        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const Getbuildings =async(req, res)=>{
    try {
        let response;
        response = await Building.findAll({

        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};