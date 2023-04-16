
import { Sequelize, Model, DataTypes } from 'sequelize';
export class Space extends Model {
    static init(sequelize) {
        return super.init(
            {
    Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Technicallocation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Location: {
        type: DataTypes.STRING,
        allowNull: false
    },
            },
            {
                sequelize,
                modelName: 'space',
                timestamps: true
            }
        );
    }
}