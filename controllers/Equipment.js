import { Area } from "../models/AreaModel.js";
import { Building } from "../models/BuildingModel.js";
import { Campus } from "../models/CampusModel.js";
import { Classification } from "../models/ClassificationModel.js";
import { Equipment } from "../models/EquipmentModel.js";
import { Floor } from "../models/FloorModel.js";
import { Parts } from "../models/PartsModel.js";
import { Space } from "../models/SpaceModel.js";
import { User } from "../models/UserModel.js";
import { Uts } from "../models/UtsModel.js";
import Sequelize, {Op} from "sequelize";
import {TypesSpace} from "../models/TypesSpaceModel.js";
import {TypesArea} from "../models/TypesAreaModel.js";
import {TypesEquipment} from "../models/TypesEquipmentModel.js";
export const GetEquiment =async(req, res)=>{
    try {
        let response;
        if(req.role === "admin"){
             response = await Equipment.findAll({
                 include: [
                     {
                         model: Space,
                         include: [
                             {
                                 model: Area,
                                 include: [
                                     {
                                         model: Floor,
                                         include: [
                                             {
                                                 model: Building,
                                                 include: [
                                                     {
                                                         model: Campus,
                                                         include: [
                                                             {
                                                                 model: Uts,
                                                             },
                                                         ],
                                                     },
                                                 ],
                                             },
                                         ],
                                     },
                                 ],
                             },
                         ],
                     },
                     {
                         model: TypesEquipment,
                         include: [
                             {
                                 model: Classification,
                             },
                         ],
                     },
                     {
                         model: Parts,
                     },
                     {
                         model: User,
                     },
                 ],
             });

        }else{
            response = await Equipment.findAll({
                where:{
                    userId: req.userId
                },
                include: [
                    {
                        model: Space,
                        include: [
                            {
                                model: Area,
                                include: [
                                    {
                                        model: Floor,
                                        include: [
                                            {
                                                model: Building,
                                                include: [
                                                    {
                                                        model: Campus,
                                                        include: [
                                                            {
                                                                model: Uts,
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        model: Classification,
                    },
                    {
                        model: Parts,
                    },
                    {
                        model: User,
                    },
                ],

            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const GetEquimentById =async(req, res)=>{
    try {
        const product = await Equipment.findOne({
            where:{
                Id: req.params.id
            }
        });
        if(!product) return res.status(404).json({msg: "Datos no encontrados"});
        let response;
            response = await Equipment.findOne({
                where:{
                    Id: product.Id
                },
                include: [
                    {
                        model: Space,
                        include: [
                            {
                                model: Area,
                                include: [
                                    {
                                        model: Floor,
                                        include: [
                                            {
                                                model: Building,
                                                include: [
                                                    {
                                                        model: Campus,
                                                        include: [
                                                            {
                                                                model: Uts,
                                                            },
                                                        ],
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        model: TypesEquipment,
                        include: [
                            {
                                model: Classification,
                            },
                        ],
                    },
                    {
                        model: Parts,
                    },
                    {
                        model: User,
                    },
                ],
            });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const CreateEq =async(req, res)=>{
    try {
        const bodega = await User.findOne({
            where: {
                Id: req.session.userId
            },
            include: {
                model: Campus,
                include: {
                    model: Building,
                    include: {
                        model: Floor,
                        include:
                            {
                                model: Area,
                                include: [{
                                    model: TypesArea,
                                    where: {
                                        [Op.or]: [
                                            {
                                                Name: {
                                                    [Op.like]: '%bodega%'
                                                }
                                            },
                                            {
                                                Name: {
                                                    [Op.like]: '%Bodega%'
                                                }
                                            },
                                            {
                                                Name: {
                                                    [Op.like]: '%Almacen%'
                                                }
                                            },
                                            {
                                                Name: {
                                                    [Op.like]: '%almacen%'
                                                }
                                            }
                                        ]
                                    }
                                },
                                    {
                                        model: Space,
                                        include: {
                                            model: TypesSpace,
                                            where: {
                                                [Op.or]: [
                                                    {
                                                        Name: {
                                                            [Op.like]: '%bodega%'
                                                        }
                                                    },
                                                    {
                                                        Name: {
                                                            [Op.like]: '%Bodega%'
                                                        }
                                                    },
                                                    {
                                                        Name: {
                                                            [Op.like]: '%Almacen%'
                                                        }
                                                    },
                                                    {
                                                        Name: {
                                                            [Op.like]: '%almacen%'
                                                        }
                                                    }
                                                ]
                                            }
                                        }

                                    }
                            ]
                            },


                    }
                }
            }
        });

        console.log(bodega.campus.buildings[0].floors[0].areas[0].spaces[0].Id)
    res.status(201).json(bodega);
} catch (error) {
    res.status(500).json({msg: error.message});
}
};
export const CreateEquiment =async(req, res)=>{
    var bodega=[];
    try {
         bodega = await User.findOne({
            where: {
                Id: req.session.userId
            },
            include: {
                model: Campus,
                include: {
                    model: Building,
                    include: {
                        model: Floor,
                        include:
                            {
                                model: Area,
                                include: [{
                                    model: TypesArea,
                                    where: {
                                        [Op.or]: [
                                            {
                                                Name: {
                                                    [Op.like]: '%bodega%'
                                                }
                                            },
                                            {
                                                Name: {
                                                    [Op.like]: '%Bodega%'
                                                }
                                            },
                                            {
                                                Name: {
                                                    [Op.like]: '%Almacen%'
                                                }
                                            },
                                            {
                                                Name: {
                                                    [Op.like]: '%almacen%'
                                                }
                                            }
                                        ]
                                    }
                                },
                                    {
                                        model: Space,
                                        include: {
                                            model: TypesSpace,
                                            where: {
                                                [Op.or]: [
                                                    {
                                                        Name: {
                                                            [Op.like]: '%bodega%'
                                                        }
                                                    },
                                                    {
                                                        Name: {
                                                            [Op.like]: '%Bodega%'
                                                        }
                                                    },
                                                    {
                                                        Name: {
                                                            [Op.like]: '%Almacen%'
                                                        }
                                                    },
                                                    {
                                                        Name: {
                                                            [Op.like]: '%almacen%'
                                                        }
                                                    }
                                                ]
                                            }
                                        }

                                    }
                                ]
                            },


                    }
                }
            }
        });

   var space=bodega.campus.buildings[0].floors[0].areas[0].spaces[0].Id;
    const {name,price,model,brand,imgequipment,fuction,datashoping,typesequipmentid} = req.body;
        const respuesta = await Equipment.create({
            Name: name,
            Price: price,
            Model: model,
            Brand: brand,
            DateShoping: datashoping,
            Function: fuction,
            ImgEquipment: imgequipment,
            spaceId: space,
            typesEquipmentId: typesequipmentid,
            userId: req.session.userId
        });
        res.status(201).json(respuesta);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const UpdateEquiment =async(req, res)=>{
        const product = await Equipment.findOne({
            where:{
                Id: req.params.id
            }
        });
        if(!product) return res.status(404).json({msg: "Datos no encontrados"});
        const {name,price,model,brand,imgequipment,fuction,datashoping,typesequipmentid,spaceid} = req.body;
        try {
         await Equipment.update({
             Name: name,
             Price: price,
             Model: model,
             Brand: brand,
             DateShoping: datashoping,
             Function: fuction,
             ImgEquipment: imgequipment,
             spaceId: spaceid,
             typesEquipmentId: typesequipmentid,
            }, {
                where: {
                    Id: product.Id
                }
            });
            res.status(200).json({msg: "User Update"});
        } catch (error) {
            res.status(500).json({msg: error.message});
        }

};
export const DeleteEquiment =async(req, res)=>{
    try {
        const equipment = await Equipment.findOne({
            where:{
                Id: req.params.id
            }
        });
        if(!equipment) return res.status(404).json({msg: "Datos no encontrados"});
        if(req.role === "admin"){
            await Equipment.destroy({
                where:{
                    Id: equipment.Id
                }
            });
        }else{
            if(req.userId !== equipment.userId) return res.status(403).json({msg: "acceso prohibido"});
        }
        res.status(200).json({msg: "Producto eliminado con éxito"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};

export const Postsearchequipment = async (req, res) => {
    const {search} = req.body;

    try {
      const  response = await Equipment.findAll({
            where: Sequelize.and(
                Sequelize.literal(`CONCAT(Equipment.Name, ' ', Equipment.Price, ' ', Equipment.Model, ' ', Equipment.Brand, ' ', Equipment.DateShoping, ' ', Equipment.Function) LIKE '%${search}%'`),

        ),
            include: [
                {
                    model: Space,
                    include: [
                        {
                            model: Area,
                            include: [
                                {
                                    model: Floor,
                                    include: [
                                        {
                                            model: Building,
                                            include: [
                                                {
                                                    model: Campus,
                                                    include: [
                                                        {
                                                            model: Uts,
                                                        },
                                                    ],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    model: TypesEquipment,
                    include: [
                        {
                            model: Classification
                        }
                    ],
                },
                {
                    model: Parts,
                },
                {
                    model: User,
                },
            ],
        });

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};