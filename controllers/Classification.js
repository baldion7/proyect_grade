import {Classification} from "../models/ClassificationModel.js";
import Sequelize from 'sequelize';
import {User} from "../models/UserModel.js";
export const GetClassification = async (req, res) => {
    try {
        const response = await Classification.findAll({
         
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const SearchClassification = async (req, res) => {
    const { search } = req.body;
    try {
        const classifications = await Classification.findAll({
            where: {
                [Sequelize.Op.or]: {
                    Name: {
                        [Sequelize.Op.like]: `%${search}%`,
                    },
                    Description: {
                        [Sequelize.Op.like]: `%${search}%`,
                    },
                },
            },
            include:[
                {
                    model:User
                }
            ]
        });

        res.status(200).json(classifications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
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
export const DeleteClassification = async (req, res) => {
    try {
        const response = await Classification.destroy({
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
    const {name,descripcion} = req.body;
    try {
        const response = await Classification.create({
            Name:name,
            Description:descripcion,
            userId: req.session.userId
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

    const {name,descripcion} = req.body;
    try {
        await Classification.update({
            Name:name,
            Description:descripcion,
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
