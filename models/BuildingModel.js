import { Sequelize, Model, DataTypes } from 'sequelize';

export class Building extends Model {
    static init(sequelize) {
        return super.init(
            {
                Id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                Name: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                Address: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                Description: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                Dateconstruction: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
            },
            {
                sequelize,
                modelName: 'building',
                timestamps: true
            }
        );
    }
}
