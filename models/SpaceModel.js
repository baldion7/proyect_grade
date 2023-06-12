
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