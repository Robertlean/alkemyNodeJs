const db = require('../database/models');
const {Op} = require('sequelize')

const {validationResult} = requiere('express-validator');

const fs = require('fs')
const path = require("path")

module.exports = {
    list: (req, res) => {
        db.movies.findAll({
            attributes: ["id", "image", "title", "creationDate"],
            where:{
                title:{
                    [Op.substring]: req.query.title ? req.query.title: ""
                },
                genreId: {
                    [Op.substring]: req.query.gender ? req.query.gender : ""
                }
            },
            order: [
                ["title", req.body.order && req.query.order.toUpperCase() == "DESC" ? req.query.order : "ASC"]
            ]
        })
        .then( movies => {
            movies.forEach(movie => {
                movie.image = `http://${req.get("host")}(movies/${movie.image})`
                movie.dataValues.url = `http://${req.get("host")}/movies/${movie.id}`
                movie.dataValues.id = undefined
            })
            const response = {
                meta: {
                    status: 200,
                    url: `http://${req.get("host"),req.originalUrl}`,
                    moviesQuantity: movies.lenth
                },
                movies: movies.length > 0 ? movies: "There aren't movies with these conditions"
            }
            res.status(200).json(response)
        })
        .catch(error => {
            const response = {
                status: 500,
                msg: "Internal server error"
            }
            res.status(500).json(response)
        })
    },

    detail: (req, res) => {
        if(!isNan(req.params.moviesid)){
            db.movies.findByPk(req.params.moviesid,{
                include: [
                    {association: "gender"},
                    {association: "characer",attributes: ["id", "image", "name"]}
                ]
            })
            .then(movie => {
                if(!movie){
                    return Promise.reject()
                }
                movie.image = `http://${req.get("host")}/movies/${movie.image}`
                movie.dataValues.genderID = undefined
                movie.gender.image = `http://${req.get("host")}/genders/${movie.gender.image}`
                movie.characters.forEach(character => character.image = `http://${req.get("host")}/characters/${character.image}`)
                movie.dataValues.character.forEach(character => {
                    character.dataValues.characterMovie = undefined
                    character.dataValues.url = `http://${req.get("host")}/character/${character.id}`
                    character.dataValues.id = undefined
                })
                const response = {
                    meta: {
                        status: 200,
                        url: `http://${req.get("host"),req.originalUrl}`,
                        CharacterQuantity: movie.characters.length
                    },
                    movie: movie
                }
                res.status(200).json(response)
            })
            .catch( error => {
                const response = {
                    status: 404,
                    msg: "The movie doesn't exist"
                }
                res.status(404).json(response)
            })
        }else{
            const response = {
                status: 400,
                msg: "The id must be numeric"
            }
            res.status(400).json(response)
        }
    },
    create: (req, res) =>{

    },
    update: (req, res) => {

    },
    destroy: (req, res) => {

    }
}