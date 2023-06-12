import { Sequelize } from "sequelize";
import { AllowsClassifications } from "../models/AllowsClassifications.js"
import {AllowsTypesDetails} from "../models/AllowsTypesDetails.js"
import { Area } from "../models/AreaModel.js";
import { Building } from "../models/BuildingModel.js";
import { Campus } from "../models/CampusModel.js";
import { Classification } from "../models/ClassificationModel.js";
import { DetailsEquipment } from "../models/DetailsEquipmentModel.js";
import { Equipment } from "../models/EquipmentModel.js";
import { Floor } from "../models/FloorModel.js";
import { Parts } from "../models/PartsModel.js";
import { PersonnelResponsible } from "../models/PersonnelResponsibleModel.js";
import { Role } from "../models/RoleModel.js";
import { Space } from "../models/SpaceModel.js";
import { TypesArea } from "../models/TypesAreaModel.js";
import { TypesDetails } from "../models/TypesDetailsModel.js";
import { TypesEquipment } from "../models/TypesEquipmentModel.js";
import { TypesSpace } from "../models/TypesSpaceModel.js";
import { User } from "../models/UserModel.js";
import { Uts } from "../models/UtsModel.js";

const db = new Sequelize("auth_db", "root", "", {
    host: "localhost",
    dialect: "mysql",
    freezeTableName: true
});

db.AllowsClassifications = AllowsClassifications.init(db,Sequelize);
db.AllowsTypesDetails = AllowsTypesDetails.init(db,Sequelize);
db.Area = Area.init(db, Sequelize);
db.Building = Building.init(db, Sequelize);
db.Campus = Campus.init(db, Sequelize);
db.Classification = Classification.init(db, Sequelize);
db.DetailsEquipment = DetailsEquipment.init(db, Sequelize);
db.Equipment = Equipment.init(db, Sequelize);
db.Floor = Floor.init(db, Sequelize);
db.Parts = Parts.init(db, Sequelize);
db.PersonnelResponsible = PersonnelResponsible.init(db, Sequelize);
db.Role = Role.init(db, Sequelize);
db.Space = Space.init(db, Sequelize);
db.TypesArea = TypesArea.init(db, Sequelize);
db.TypesDetails = TypesDetails.init(db, Sequelize);
db.TypesEquipment = TypesEquipment.init(db, Sequelize);
db.TypesSpace = TypesSpace.init(db, Sequelize);
db.Users = User.init(db, Sequelize);
db.Uts = Uts.init(db, Sequelize);

db.Uts.hasMany(db.Campus, {
    onDelete: 'CASCADE'
});
db.Campus.belongsTo(db.Uts);

db.Campus.hasMany(db.Building, {
    onDelete: 'CASCADE'
});
db.Building.belongsTo(db.Campus);

db.Building.hasMany(db.Floor, {
    onDelete: 'CASCADE'
});
db.Floor.belongsTo(db.Building);

db.Floor.hasMany(db.Area, {
    onDelete: 'CASCADE'
});
db.Area.belongsTo(db.Floor);

db.TypesArea.hasMany(db.Area, {
    onDelete: 'CASCADE'
});
db.Area.belongsTo(db.TypesArea);

db.Area.hasMany(db.Space, {
    onDelete: 'CASCADE'
});
db.Space.belongsTo(db.Area);

db.TypesSpace.hasMany(db.Space, {
    onDelete: 'CASCADE'
});
db.Space.belongsTo(db.TypesSpace);

db.Space.hasMany(db.Equipment, {
    onDelete: 'CASCADE'
});
db.Equipment.belongsTo(db.Space);

db.Space.hasMany(db.AllowsClassifications, {
    onDelete: 'CASCADE'
});
db.AllowsClassifications.belongsTo(db.Space);

db.PersonnelResponsible.hasMany(db.Space, {
    onDelete: 'CASCADE'
});
db.Space.belongsTo(db.PersonnelResponsible);

db.Classification.hasMany(db.AllowsClassifications, {
    onDelete: 'CASCADE'
});
db.AllowsClassifications.belongsTo(db.Classification);

db.Classification.hasMany(db.TypesEquipment, {
    onDelete: 'CASCADE'
});

db.TypesEquipment.belongsTo(db.Classification);

db.TypesEquipment.hasMany(db.AllowsTypesDetails, {
    onDelete: 'CASCADE'
});

db.AllowsTypesDetails.belongsTo(db.TypesEquipment);

db.TypesEquipment.hasMany(db.TypesDetails,{
    onDelete: 'CASCADE'
});

db.TypesDetails.belongsTo(db.TypesEquipment);

db.TypesDetails.hasMany(db.AllowsTypesDetails, {
    onDelete: 'CASCADE'
});
db.AllowsTypesDetails.belongsTo(db.TypesDetails);

db.TypesDetails.hasMany(db.DetailsEquipment, {
    onDelete: 'CASCADE'
});
db.DetailsEquipment.belongsTo(db.TypesDetails);

db.Equipment.hasMany(db.Parts, {
    onDelete: 'CASCADE'
});
db.Parts.belongsTo(db.Equipment);

db.TypesEquipment.hasMany(db.Equipment, {
    onDelete: 'CASCADE'
});
db.Equipment.belongsTo(db.TypesEquipment);


db.Equipment.hasMany(db.DetailsEquipment, {
    onDelete: 'CASCADE'
});
db.DetailsEquipment.belongsTo(db.Equipment);

db.Users.hasMany(db.Equipment, {
    onDelete: 'CASCADE'
});
db.Equipment.belongsTo(db.Users);

db.Users.hasMany(db.Area, {
    onDelete: 'CASCADE'
});
db.Area.belongsTo(db.Users);

db.Users.hasMany(db.Building, {
    onDelete: 'CASCADE'
});
db.Building.belongsTo(db.Users);

db.Users.hasMany(db.Space, {
    onDelete: 'CASCADE'
});
db.Space.belongsTo(db.Users);

db.Users.hasMany(db.TypesEquipment, {
    onDelete: 'CASCADE'
});
db.TypesEquipment.belongsTo(db.Users);

db.Campus.hasMany(db.PersonnelResponsible, {
    onDelete: 'CASCADE'
});
db.PersonnelResponsible.belongsTo(db.Campus);

db.Campus.hasMany(db.Users, {
    onDelete: 'CASCADE'
});
db.Users.belongsTo(db.Campus);

db.Role.hasMany(db.Users, {
    onDelete: 'CASCADE'
});
db.Users.belongsTo(db.Role);


export default db;
