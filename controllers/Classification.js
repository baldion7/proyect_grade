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

export const GetClassificationbyid = async (req, res) => {
    try {
        const response = await Classification.findOne({
            where:{
                Id:req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const CreateClassification = async (req, res) => {
    const {name,descripcion,classificationcriteria} = req.body;
    try {
        const response = await Classification.create({
            Name:name,
            Description:descripcion,
            ClassificationCriteria:classificationcriteria
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const UpdateClassification = async (req, res) => {
    const classification = await Classification.findOne({
        where: {
            Id: req.params.id
        }
    });
    if (!classification) return res.status(404).json({msg: "Datos no encontrados"});

    const {name,descripcion,classificationcriteria} = req.body;
    try {
        await Classification.update({
            Name:name,
            Description:descripcion,
            ClassificationCriteria:classificationcriteria
        }, {
            where: {
                Id: classification.Id
            }
        });
        res.status(200).json({msg: "Campus Update"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
