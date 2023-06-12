import Sequelize from 'sequelize';
import {PersonnelResponsible} from "../models/PersonnelResponsibleModel.js"
import {Campus} from "../models/CampusModel.js";


export const GetPersonnelResponsible = async (req, res) => {
    try {
        const response = await PersonnelResponsible.findAll({
            include: [
                {
                    model: Campus,
                },
            ]

        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const GetPersonnelResponsibleById = async (req, res) => {
    try {
        const response = await PersonnelResponsible.findOne({
            where:{
               Id: req.params.id
            },
            include: [
                {
                    model: Campus,
                },
            ]

        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const GetPersonnelResponsibleCampus = async (req, res) => {
    try {
        const response = await PersonnelResponsible.findAll({
            where: {
                campusId: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};


export const GetPersonnelResponsibleByemail = async (req, res) => {
    const {email} = req.body;
    try {
        const response = await PersonnelResponsible.findOne({
            where: {
                email: email
            }
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const PostsearchPersonnelResponsible = async (req, res) => {
    const { search } = req.body;
    try {
        const response = await PersonnelResponsible.findAll({
            where: Sequelize.and(
                Sequelize.literal(`CONCAT(PersonnelResponsible.Name, ' ', PersonnelResponsible.Lastname, ' ', PersonnelResponsible.Phone, ' ', PersonnelResponsible.Country, ' ', PersonnelResponsible.Typedocument, ' ', PersonnelResponsible.Document, ' ', PersonnelResponsible.burden, ' ', PersonnelResponsible.email) LIKE '%${search}%'`)
            ),
            include: [
                {
                    model: Campus,
                },
            ],
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


export const CreatePersonnelResponsible = async (req, res) => {
    const {name, lastname, document_type, ducument, country, phone_number, email, charge, campus} = req.body;
    try {
        const response = await PersonnelResponsible.create({
            Name: name,
            Lastname: lastname,
            Phone: phone_number,
            Country: country,
            Typedocument: document_type,
            Document: ducument,
            burden: charge,
            email: email,
            campusId: campus,
        });

    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const UpdatePersonnelResponsible = async (req, res) => {

    const user = await PersonnelResponsible.findOne({
        where: {
            Id: req.params.id
        }
    });
    if (!user) return res.status(404).json({msg: "User tidak ditemukan"});
    const {name, lastname, document_type, ducument, country, phone_number, email, charge} = req.body;
    try {
        await PersonnelResponsible.update({
            Name: name,
            Lastname: lastname,
            Phone: phone_number,
            Country: country,
            Typedocument: document_type,
            Document: ducument,
            burden: charge,
            email: email,
        }, {
            where: {
                Id: user.Id
            }
        });
        res.status(200).json({msg: "User Update"})
    } catch (error) {
        res.status(500).json({msg: error.message + "none"});
    }
};

export const DeletePersonnelResponsible = async (req, res) => {
    const user = await PersonnelResponsible.findOne({
        where: {
            Id: req.params.id
        }
    });
    if (!user) return res.status(404).json({msg: "User tidak ditemukan"});
    try {
        await PersonnelResponsible.destroy({
            where: {
                Id: user.Id
            }
        });
        res.status(200).json({msg: "user Destroy"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
};

