module.exports = (sequelize, dataTypes) => {
    const alias = "characters";
    const cols = {
        id: {
            type: dataTpes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        image: {
            type: dataTypes.STRING,
            allowNull: false
        },
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        age: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        weight: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        history: {
            type: dataTypes.STRING,
            allowNull: false
        }
    };
    const config = {
        timestamps: false,
        tableName: "characters"
    };
    const Character = sequelize.define(alias, cols, config);
    Character.associate = (models) =>{
        Character.belongsToMany(models.movies, {
            as: "movies",
            through: "characterMovie",
            foreignKey: "characterId",
            otherKey: "movieId"
        })
    }
    return Character
}