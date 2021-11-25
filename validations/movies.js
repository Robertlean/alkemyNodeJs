const {body} = require('express-validator');
const path = require('path');

const db = require('../database/models');

module.exports = [
    body('image').custom((value, {req}) => {
        let extensions = ['.jpg', '.png', '.jpeg', '.gif', '.webp']
        if(!req.file && req.method != "PUT"){
            throw new Error("required")
        }
        if(req.file && !extensions.includes(path.extname(req.file.originalname))){
            throw new Error("Fromar error")
        }
        return true
    }),
    body('title').notEmpty().withMessage("required").isLength({max: 255}).withMessage("Max character exceeded"),
    body('creationDate').notEmpty().withMessage("required").isDate().withMessage("Format error"),
    body('rating').notEmpty().withMessage("required").isInt({min: 1, max: 5}).withMessage("Format error"),
    body('genderId').notEmpty().withMessage("required").isInt().withMessage("Format error").custom((value, {req}) =>{
        return fb.genders.findByPk(value)
        .then(gender =>{
            if(!gender){
                return Promise.reject();
            }
        })
        .catch(() => {
            Promise.reject("The gender doesn't exist")
        })
    })
]