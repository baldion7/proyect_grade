import { Sequelize, Model, DataTypes } from 'sequelize';

export class Floor extends Model {
    static init(sequelize) {
        return super.init(
            {
                Id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                Floornumber: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                }
            },
            {
                sequelize,
                modelName: 'floor',
                timestamps: true
            }
        );
    }
}
