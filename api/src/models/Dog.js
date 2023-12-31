const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('dog',
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            image: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            height: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            weight: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            life_span: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            idApi: {
                type: DataTypes.INTEGER,
            }
        },
        {
            timestamps: false,
        }
    );
};
