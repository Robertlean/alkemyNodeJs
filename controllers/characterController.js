const db = require('../database/models');
const {Op} = require("sequelize");

const {validationResult} = require("express-validator")

const fs = require('fs')
const path = require('path')

module.exports={
    list: (req, res) => {
        db.characters.findAll({
            include: req.query.movie ? [{
                association: "movies",
                where: {
                    id: {
                        [Op.substring]: req.query.movie ? req.query.movie: ""
                    }
                }
            }]: null,
            where: {
                name: {
                    [Op.substring]: req.query.name ? req.query.name : ""
                },
                age: {
                    [Op.substring]: req.query.age ? req.query.age : ""
                },
                weight: {
                    [Op.substring]: req.query.weight ? req.query.weight : ""
                }
            },
            order: [
                ["name", req.query.order && req.query.order.toUpperCase() == "DESC" ? req.query.order: "ASC"]
            ]
        })
        .then( characters => {
            characters.forEach(char => {
                char.image = `http://${req.get("host")}/characters/${char.image}`;
                char.dataValues.url = `http://${req.get("host")}/characters/${char.id}`;
                char.dataValues.id = undefined;
                char.dataValues.movies = undefined;
            });
            const response = {
                meta: {
                    status: 200,
                    url: `http://${req.get("host")}${req.originalUrl}`,
                    characterQuantity: characters.length
                },
                characters: characters.length > 0 ? characters : "There are not charactes with these conditions"
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
    detail: (req, res) =>{
        if (!isNan(req.params.charid)){
            db.characters.findByPk(req.params.charid,{
                include: [{association:'movies', attributes:['id', 'image', 'title']}]
            })
            .then(char => {
                char.image = `http://${req.get("host")}/characters/${char.image}`;
                char.movies.forEach(movie => movie.image = `http://${req.get("host")}/movies/${movie.image}`)
                char.dataValues.movies.forEach(movie => {
                    movie.dataValues.characterMovie = undefined;
                    movie.dataValues.url = `http://${req.get("host")}/movies/${movie.id}`;
                    movie.dataValues.id = undefined
                })
                const respone = {
                    meta: {
                        status: 200,
                        url: `http://${req.get("host"),req.originalUrl}`,
                        moviesQuantity: char.movies.length
                    },
                    character: character
                }
                res.status(200).json(response)
            })
            .catch(error => {
                const response = {
                    status: 400,
                    msg: "The character doesn't exist"
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
    },
    create: (req, res) => {
        const errors = validationResult(req);
        if(errors.isEmpty()){
            db.characters.create({
                image: req.file.filename,
                name:req.body.name,
                age: +req.body.age,
                weight: +req.body.weight,
                history: req.body.history
            })
            .then(newCharacter => {
                const response = {
                    status: 201,
                    msg: "Character created successfully",
                    url: `http://${req.get("host")}/characters/${newCharacter.id}`
                }
                res.status(201).json(response)
            })
            .catch(error => {
                req.file ? fs.unlinkSync(path.join(__dirname,"..","images", "characters",req.file.filename)): null
                const response = {
                    status: 500,
                    msg: "Internal server error"
                }
                res.status(500).json(response)
            })
        }else{
            req.file ? fs.unlinkSync(path.join(__dirname,"..","images", "characters",req.file.filename)): null;
            const response = {
                status: 400,
                msg: "Error when creating the character",
                errors: errors.mapped()
            }
        }        
    },
    update: (req, res) => {
        let oldImage;
        const errors = validationResult(req);
        db.characters.findByPk(req.params.charid)
        .then(character => {
            if(!character){
                return Promise.reject();
            }else if(errors.isEmpty()){
                oldImage = character.image;
                db.characters.update({
                    image: req.file ? req.file.filename : oldImage,
                    name: req.body.name,
                    age: +req.body.age,
                    weight: +req.body.weight,
                    history: req.body.history
                },{
                    where: {
                        id: character.id
                    }
                })
                .then(result => {
                    req.file ? fs.unlinkSync(path.join(__dirname, "..","images","characters",oldImage)): null
                    const response = {
                        status: 200,
                        msg: "Character update successfully",
                        url: `http://${req.get("host")}/characters/${character.id}`
                    }
                    res.status(200).json(response)
                })
                .catch(error => {
                    req.file ? fs.unlinkSync(path.join(__dirname,"..","images","characters",req.file.filename)): null
                    const response = {
                        status: 500,
                        msg: "Internal server error"
                    }
                    res.status(500).json(response)
                })
            }else{
                req.file ? fs.unlinkSync(path.join(__dirname,"..","images", "characters",req.file.filename)): null
                const response = {
                    status: 400,
                    msg: "Error when update the character",
                    errors: errors.mapped()
                }
                res.status(400).json(response)
            }
        })
        .catch(error => {
            req.file ? fs.unlinkSync(path.join(__dirname,"..","images", "characters",req.file.filename)): null;
            const response = {
                status: 400,
                msg: "The character doesn't exist"
            }
            res.status(400).json(response)
        })
    },
    destroy: (req, res) => {
        if(!isNan(req.params.charid)){
            db.characters.findByPk(req.params.charid)
            .then(char => {
                if(!char){
                    return Promise.reject()
                }else{
                    fs.unlinkSync(path.join(__dirname,"..","images","characters",char.image));
                    db.characters.destroy({
                        where: {
                            id: req.params.charid
                        }
                    })
                    .then(result => {
                        const response = {
                            status: 200,
                            msg: "Character deleted successfully",
                            url: `http://${req.get("host")}/characters/${req.params.charid}`
                        }
                        res.status(200).json(response)
                    })
                    .catch( error => {
                        const response = {
                            status: 500,
                            msg: "Internal server error"
                        }
                        res.status(500).json(response)
                    })
                }
            })
            .catch( error => {
                const response = {
                    status: 400,
                    msg: "The character doesn't exist"
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