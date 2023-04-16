import {Floor} from "../models/FloorModel.js";

export const GetfloorById =async(req, res)=>{
    try {
        let response;
        response = await Floor.findAll({
            where:{
                buildingId: req.params.id
            },

        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};