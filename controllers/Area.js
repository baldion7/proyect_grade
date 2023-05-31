import {Area} from "../models/AreaModel.js";
import {Floor} from "../models/FloorModel.js";
import {Campus} from "../models/CampusModel.js";

export const GetareafloorsById = async (req, res) => {
    try {
        let response;
        response = await Area.findAll({
            where: {
                floorId: req.params.id
            },

        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const GetareaById = async (req, res) => {
    try {
        let response;
        response = await Area.findOne({
            where: {
                Id: req.params.id
            },
            include:[
                {
                    model: Floor
                }
            ]
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const Createtarea = async (req, res) => {
    const {name, description, floorid, typesAreaid} = req.body;
    try {
        let response;
        response = await Area.create({
            Name: name,
            Description: description,
            floorId: floorid,
            typesAreaId: typesAreaid,
            TypeArea: "prueba"

        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const Updatetetarea = async (req, res) => {
    const areas = await Area.findOne({
        where: {
            Id: req.params.id
        }
    });
    if (!areas) return res.status(404).json({msg: "Datos no encontrados"});
    const {name, description, floorid, typesAreaid} = req.body;
    try {
        await Area.update({
            Name: name,
            Description: description,
            floorId: floorid,
            typesAreaId: typesAreaid
        }, {
            where: {
                Id: areas.Id
            }
        });
        res.status(200).json({msg: "Campus Update"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};


