import { Sequelize, Model, DataTypes } from 'sequelize';

export class Equipment extends Model {
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
                    allowNull: false,
                },
                Price: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                Model: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                Brand: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                DateShoping: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                Function: {
                    type: DataTypes.STRING,
                    allowNull: false,
                }
                ,
                ImgEquipment:  {
                    type: DataTypes.TEXT('long'),
                    allowNull: false,
                }
            },
            {
                sequelize,
                modelName: 'equipment',
                timestamps: true
            }
        );
    }
}
