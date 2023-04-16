import { Sequelize, Model, DataTypes } from 'sequelize';

export class Classification extends Model {
    static init(sequelize) {
        return super.init(
            {
                Id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                Classification:{
                    type: DataTypes.STRING,
                    allowNull: false
                },
            },
            {
                sequelize,
                modelName: 'classification',
                timestamps: true
            }
        );
    }
}
