import {Classification} from "../models/ClassificationModel.js";

export const GetClassification = async (req, res) => {
    try {
        const response = await Classification.findAll({
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};