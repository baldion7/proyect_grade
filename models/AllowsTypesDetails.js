import { Sequelize, Model, DataTypes } from 'sequelize';

export class AllowsTypesDetails extends Model {
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
                modelName: 'allowstypesdetails',
                timestamps: true
            }
        );
    }
}
