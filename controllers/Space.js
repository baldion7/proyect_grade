import {Space} from "../models/SpaceModel.js";

export const Getspace = async (req, res) => {
    try {
        const response = await Space.findAll({
            where:{
                areaId : req.params.id
            },
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};