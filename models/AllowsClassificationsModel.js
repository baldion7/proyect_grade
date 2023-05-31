import { Sequelize, Model, DataTypes } from 'sequelize';

export class AllowsClassificationsModel extends Model {
    static init(sequelize) {
        return super.init(
            {
                Id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                }
            },
            {
                sequelize,
                modelName: 'allowsClassifications',
                timestamps: true
            }
        );
    }
}
