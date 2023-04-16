import {Campus} from "../models/CampusModel.js";

export const Getcampus = async (req, res) => {
    try {
        const response = await Campus.findAll({

        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};