import { Sequelize, Model, DataTypes } from 'sequelize';

export class TypesDetails extends Model {
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
                Description: {
                    type: DataTypes.STRING,
                    allowNull: false
                }

            },
            {
                sequelize,
                modelName: 'typesDetails',
                timestamps: true
            }
        );
    }
}
