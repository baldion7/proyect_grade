import { Sequelize, Model, DataTypes } from 'sequelize';
export class Uts extends Model {
    static init(sequelize) {
        return super.init(
            {
        Id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Fullname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Acronym: {
        type: DataTypes.STRING,
            allowNull: false
    },
        Nit: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Website: {
            type: DataTypes.STRING,
            allowNull: false
        }
            },
            {
                sequelize,
                modelName: 'uts',
                timestamps: true
            }
        );
    }
}