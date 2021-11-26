const db = require('../database/models');
const {Op} = require('sequelize')

const {validationResult} = require('express-validator');

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
                    {association: "character",attributes: ["id", "image", "name"]}
                ]
            })
            .then(movie => {
                if(!movie){
                    return Promise.reject()
                }
                movie.image = `http://localhost/movies/${movie.image}`
                movie.dataValues.genderID = undefined
                movie.gender.image = `http://localhost/genders/${movie.gender.image}`
                movie.characters.forEach(character => character.image = `http://localhost/characters/${character.image}`)
                movie.dataValues.character.forEach(character => {
                    character.dataValues.characterMovie = undefined
                    character.dataValues.url = `http://localhost/character/${character.id}`
                    character.dataValues.id = undefined
                })
                const response = {
                    meta: {
                        status: 200,
                        url: `http://${req.get("host")}${req.originalUrl}`,
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
        const errors = validationResult(req);
        if(errors.isEmpty()){
            db.movies.create({
                image: req.file.filename,
                title: req.body.title,
                creationDate: req.body.creationDate,
                rating: +req.body.rating,
                genderId: +req.body.genderId
            })
            .then( newMovie =>{
                const response = {
                    status: 201,
                    msg: "Movie created successfully",
                    url: `http://${req.get("host")}/movies/${newMovie.id}`
                }
                res.status(201).json(response)
            })
            .catch(error => {
                req.file ? fs.inlinkSync(path.join(__dirname,"../images/movies", req.file.filename)) : null;
                const response = {
                    status: 500,
                    msg: "Internal server error aqui"
                }
                res.status(500).json(response)
            })
        }else{
            req.file ? fs.inlinkSync(path.join(__dirname,"../images/movies", req.file.filename)) : null;
            const response = {
                status: 400,
                msg: "Error when creating the movie",
                errors: errors.mapped()
            }
            res.status(400).json(response)
        }
    },
    update: (req, res) => {
        let oldImage;
        const errors = valiationResult(req);
        db.movies.findByPk(req.params,moviesid)
        .then(movie => {
            if(!movie){
                return Promise.reject()
            }
            if(errors.isEmpty()){
                oldImage = movie.image
                db.movies.update({
                    image: req.file ? req.file.filename : movie.image,
                    title: req.body.title,
                    creationDate: req.body.creationDate,
                    rating: +req.body.rating,
                    genderId: +req.body.genderId
                },{
                    where: {
                        id: movie.id
                    }
                })
                .then(updatedMovie => {
                    req.file ? fs.inlinkSync(path.join(__dirname,"../images/movies", oldImage)) : null;
                    const response = {
                        status: 200,
                        msg: "Movie updated successfully",
                        url: `http://${req.get("host")}/movies/${movie.id}`
                    }
                    res.status(200).json(response)
                })
                .catch(error =>{
                    req.file ? fs.inlinkSync(path.join(__dirname,"../images/movies", req.file.filename)) : null;
                    const response = {
                        status: 500,
                        msg: "Inernal server error"
                    }
                    res.status(500).json(response)
                })
            }else{
                req.file ? fs.inlinkSync(path.join(__dirname,"../images/movies", req.file.filename)) : null;
                const reponse = {
                    status: 400,
                    msg: "Error when updated the movie",
                    errors: errors.mapped()
                }
                res.status(400).json(response)
            }
        })
        .catch(error => {
            req.file ? fs.inlinkSync(path.join(__dirname,"../images/movies", req.file.filename)) : null;
            const response = {
                status: 400,
                msg: "The movie doesn't exist"
            }
            res.status(400).json(response)
        })
    },
    destroy: (req, res) => {
        if(!isNan(req.params.movieid)){
            db.movies.findByPk(req.params.movieid)
            .then(movie => {
                if(!movie){
                    return Promise.reject()
                }
                req.file ? fs.inlinkSync(path.join(__dirname,"../images/movies", req.file.filename)) : null;
                db.movies.destroy({
                    where: {
                        id: movie.id
                    }
                })
                .then(result => {
                    const response = {
                        status: 200,
                        msg: "Movie deleted successfully",
                        url: `http://${req.get("host")}/movies/${req.params.movieid}`
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
            })
            .catch(error => {
                const response = {
                    status: 400,
                    msg: "The movie doesn't exist"
                }
                res.status(400).json(response)
            })
        }else{
            const response = {
                status: 400,
                msg: "The id must be numeric"
            }
            res.status(400).json(response)
        }
    }
}