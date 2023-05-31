import { Sequelize, Model, DataTypes } from 'sequelize';
export class Campus extends Model {
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
                Email: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                Phone: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                Schedules: {
                    type: DataTypes.STRING,
                    allowNull: false
                }
            },
            {
                sequelize,
                modelName: 'campus',
                timestamps: true
            }
        );
    }
}
