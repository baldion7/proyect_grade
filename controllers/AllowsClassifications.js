import {AllowsClassifications} from "../models/AllowsClassifications.js";
import Sequelize from "sequelize";
import {Space} from "../models/SpaceModel.js";

export const CreateAllowsClassifications = async (req, res) => {
    const {spaceid, classificationid} = req.body;
    try {
        const respuesta = await AllowsClassifications.create({
            spaceId: spaceid,
            classificationId: classificationid,
        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const DeleteAllowsClassifications = async (req, res) => {
    try {
        const respuesta = await AllowsClassifications.destroy({
            where: {
                spaceId: req.params.id,
            }

        });
        res.status(200).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};


export const GetAllowsClassifications = async (req, res) => {
    const { classificationid, spaceid  } = req.body;
    try {
        const response = await AllowsClassifications.findAll({
            where: {
                classificationId: classificationid
            },
            include: [
                {
                    model: Space,
                    where: {
                        areaId: spaceid
                    }
                }
            ]
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

