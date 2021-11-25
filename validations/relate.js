const {body} = require('express-validator');
const path = require('path');

const db = require('../database/models');

module.exports = [
    body('characterId').notEmpty().withMessage("required").custom((value, {req}) => {
        return db.characters.findByPk(value)
        .then(character => {
            if(!character){
                return Promise.reject();
            }
        })
        .catch(()=> Promise.reject("The character doesn't exist"))
    }),
    body('movieId').notEmpty().withMessage("required").custom((value,{req}) => {
        return db.movies.findByPk(value)
        .then(movie =>{
            if(!movie){
                return Promise.reject()
            }
        })
        .catch(() => Promise.reject("The movie doesn't exist"))
    })
]