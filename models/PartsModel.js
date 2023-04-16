import { Sequelize, Model, DataTypes } from 'sequelize';
export class Parts extends Model {
    static init(sequelize) {
        return super.init(
            {
                Id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                Name: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                Quantity: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                Comments: {
                    type: DataTypes.STRING,
                    allowNull: false
                }
            },
            {
                sequelize,
                modelName: 'parts',
                timestamps: true
            }
        );
    }
}
