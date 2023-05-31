import { Sequelize, Model, DataTypes } from 'sequelize';

export class DetailsEquipment extends Model {
    static init(sequelize) {
        return super.init(
            {
                Id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                Details: {
                    type: DataTypes.STRING,
                    allowNull: false
                }
            },
            {
                sequelize,
                modelName: 'detailsEquipment',
                timestamps: true
            }
        );
    }
}
