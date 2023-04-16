import { Sequelize, Model, DataTypes } from 'sequelize';
export class Role extends Model {
    static init(sequelize) {
        return super.init(
            {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Name:{
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true,
        }
    },
            },
            {
                sequelize,
                modelName: 'role',
                timestamps: true
            }
        );
    }
}