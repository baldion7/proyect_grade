import { Sequelize } from "sequelize";
import { AllowsClassificationsModel } from "../models/AllowsClassificationsModel.js"
import {AllowsTypesDetailsModel} from "../models/AllowsTypesDetailsModel.js"
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

db.AllowsClassificationsModel = AllowsClassificationsModel.init(db,Sequelize);
db.AllowsTypesDetailsModel = AllowsTypesDetailsModel.init(db,Sequelize);
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

db.Uts.hasMany(db.Campus);
db.Campus.belongsTo(db.Uts);

db.Campus.hasMany(db.Building);
db.Building.belongsTo(db.Campus);

db.Building.hasMany(db.Floor);
db.Floor.belongsTo(db.Building);

db.Floor.hasMany(db.Area);
db.Area.belongsTo(db.Floor);

db.TypesArea.hasMany(db.Area);
db.Area.belongsTo(db.TypesArea);

db.Area.hasMany(db.Space);
db.Space.belongsTo(db.Area);

db.TypesSpace.hasMany(db.Space);
db.Space.belongsTo(db.TypesSpace);

db.Space.hasMany(db.Equipment);
db.Equipment.belongsTo(db.Space);

db.Space.hasMany(db.AllowsClassificationsModel);
db.AllowsClassificationsModel.belongsTo(db.Space);

db.PersonnelResponsible.hasMany(db.Space);
db.Space.belongsTo(db.PersonnelResponsible);

db.Classification.hasMany(db.AllowsClassificationsModel);
db.AllowsClassificationsModel.belongsTo(db.Classification);

db.Classification.hasMany(db.TypesEquipment);
db.TypesEquipment.belongsTo(db.Classification);

db.TypesEquipment.hasMany(db.Equipment);
db.Equipment.belongsTo(db.TypesEquipment);

db.TypesEquipment.hasMany(db.AllowsTypesDetailsModel);
db.AllowsTypesDetailsModel.belongsTo(db.TypesEquipment);

//db.TypesEquipment.hasMany(db.TypesDetails);
//db.TypesDetails.belongsTo(db.TypesEquipment);

db.TypesDetails.hasMany(db.AllowsTypesDetailsModel);
db.AllowsTypesDetailsModel.belongsTo(db.TypesDetails);

db.TypesDetails.hasMany(db.DetailsEquipment);
db.DetailsEquipment.belongsTo(db.TypesDetails);

db.Equipment.hasMany(db.Parts);
db.Parts.belongsTo(db.Equipment);

db.Equipment.hasMany(db.DetailsEquipment);
db.DetailsEquipment.belongsTo(db.Equipment);

db.Users.hasMany(db.Equipment);
db.Equipment.belongsTo(db.Users);

db.Campus.hasMany(db.PersonnelResponsible);
db.PersonnelResponsible.belongsTo(db.Campus);

db.Campus.hasMany(db.Users);
db.Users.belongsTo(db.Campus);

db.Role.hasMany(db.Users);
db.Users.belongsTo(db.Role);


export default db;
