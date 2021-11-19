module.exports = (sequelize,dataTypes) =>{
    const alias = "charactermovies";
    const cols = {
        id : {
            type : dataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true,
            allowNull : false
        },
        characterId : {
            type : dataTypes.INTEGER,
            allowNull : false
        },
        movieId : {
            type : dataTypes.INTEGER,
            allowNull : false
        }
    };
    const config = {
        timestamps : false,
        tableName : "charactermovies"
    };
    const CharacterMovie = sequelize.define(alias,cols,config);
    return CharacterMovie
}