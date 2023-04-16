import {Area} from "../models/AreaModel.js";

export const GetareaById =async(req, res)=>{
    try {
        let response;
        response = await Area.findAll({
            where:{
                floorId: req.params.id
            },

        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};