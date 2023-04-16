import {Building} from "../models/BuildingModel.js";

export const GetbuildingsById =async(req, res)=>{
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