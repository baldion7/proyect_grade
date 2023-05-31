import {DetailsEquipment} from "../models/DetailsEquipmentModel.js";
import {TypesDetails} from "../models/TypesDetailsModel.js";

export const CreateDetailsEquipment =async(req, res)=>{
    const {equipmentId,typesDetailId,Details} = req.body;
    try {
        const respuesta =await DetailsEquipment.create({
            Details:Details,
            typesDetailId:typesDetailId,
            equipmentId:equipmentId
        });
        res.status(201).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const GetDetailsEquipment = async (req, res) => {
    try {
        const response = await DetailsEquipment.findAll({
            where: {
                equipmentId: req.params.id
            }
            ,
            include: [
                {
                    model: TypesDetails,
                }
            ]
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};