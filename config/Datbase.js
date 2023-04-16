import { Sequelize } from "sequelize";
import { AllowsClassifications } from "../models/AllowsClassifications.js"
import { Area } from "../models/AreaModel.js";
import { Building } from "../models/BuildingModel.js";
import { Campus } from "../models/CampusModel.js";
import { Classification } from "../models/ClassificationModel.js";
import { Equipment } from "../models/EquipmentModel.js";
import { Floor } from "../models/FloorModel.js";
import { Parts } from "../models/PartsModel.js";
import { Role } from "../models/RoleModel.js";
import { Space } from "../models/SpaceModel.js";
import { User } from "../models/UserModel.js";
import { Uts } from "../models/UtsModel.js";

const db = new Sequelize("auth_db", "root", "", {
    host: "localhost",
    dialect: "mysql",
    freezeTableName: true
});
db.AllowsClassificationsModel = AllowsClassifications.init(db,Sequelize);
db.Area = Area.init(db, Sequelize);
db.Building = Building.init(db, Sequelize);
db.Campus = Campus.init(db, Sequelize);
db.Classification = Classification.init(db, Sequelize);
db.Equipment = Equipment.init(db, Sequelize);
db.Floor = Floor.init(db, Sequelize);
db.Parts = Parts.init(db, Sequelize);
db.Role = Role.init(db, Sequelize);
db.Space = Space.init(db, Sequelize);
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

db.Area.hasMany(db.Space);
db.Space.belongsTo(db.Area);

db.Space.hasMany(db.Equipment);
db.Equipment.belongsTo(db.Space);

db.Classification.hasMany(db.Equipment);
db.Equipment.belongsTo(db.Classification);

db.Equipment.hasMany(db.Parts);
db.Parts.belongsTo(db.Equipment);

db.Users.hasMany(db.Equipment);
db.Equipment.belongsTo(db.Users);

db.Campus.hasMany(db.Users);
db.Users.belongsTo(db.Campus);

db.Role.hasMany(db.Users);
db.Users.belongsTo(db.Role);

db.Space.hasMany(db.AllowsClassificationsModel);
db.AllowsClassificationsModel.belongsTo(db.Space);

db.Classification.hasMany(db.AllowsClassificationsModel);
db.AllowsClassificationsModel.belongsTo(db.Classification);

export default db;
