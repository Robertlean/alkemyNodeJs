const db = require('../database/models');
const {Op} = require("sequelize");

const {validationResult} = require("express-validator")

module.exports = {
    add: (req, res) =>{
        const error = validationResult(req)
        if(errors.isEmpty()){
            db.characterMovie.create({
                characterId: req.body.charactetId,
                movieId: req.body.movieId
            })
            .then(related =>{
                const response = {
                    status: 201,
                    msg: "Relationship created successfully"
                }
                res.status(201).json(response)
            })
            .catch(error =>{
                const response = {
                    status: 500,
                    msg: "Internal server error"
                }
                res.status(500).json(response)
            })
            
        }
    },
    delete: (req, res)=>{
        const errors = validationResult(req);
        if(error.isEmpty()){
            db.characterMovie.destroy({
                where: {
                    [Op.and]: [{characterId: req.body.characterId},{movieId: req.body.movieId}]
                }
            })
            .then(related => {
                const response = {
                    status: 200,
                    msg: "Relationship deleted successfully"
                }
                res.status(200).json(response)
            })
        }else{
            const response = {
                status: 400,
                msg: "Error when process the relationship",
                errors: errors.mapped()
            }
            res.status(400).json(response)
        }
    }
}