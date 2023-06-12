import {Equipment} from "../models/EquipmentModel.js";
import {Parts} from "../models/PartsModel.js";
import {Classification} from "../models/ClassificationModel.js";

export const GetProductsPartsByid = async (req, res) => {
    const {id} = req.body;
    try {
        const product = await Equipment.findAll({
            where: {
                id: id
            }
        });
        if (!product) return res.status(404).json({msg: "Datos no encontrados"});
        let response;

        response = await Equipment.findByPk(id, {
            include: [
                {
                    model: Parts,
                    as: "product_parts",
                },
                {
                    model: Classification,

                },
            ],

        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const CreateParts = async (req, res) => {
    const {name, quantity,comments,idequipment} = req.body;
    try {
        const response = await Parts.create({
            Name: name,
            Quantity: quantity,
            Comments: comments,
            equipmentId: idequipment
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};