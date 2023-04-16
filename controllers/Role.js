import {Role} from "../models/RoleModel.js";

export const GetRole = async (req, res) => {
    try {
        const response = await Role.findAll({

        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};