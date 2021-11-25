const {body} = require("express-validator");
const path = require('path');

const db = require('../database/models');

module.exports = [
    body('image').custom((value, {req}) => {
        let extensions = ['.jpg', '.pmg', '.gif', '.webp']
        if(!req.file && req.method != "PUT"){
            throw new Error('required')
        }
        id(req.file && !extensions.includes(path.extname(req.file.originalname))){
            throw new Error('Format error')
        }
        return true
    }),
    body('name').notEmpty().withMessage("required").isLength({max: 255}).withMessage("Max character exceeded"),
    body('age').notEmpty().withMessage("required").isInt({min: 1}).withMessage("Format error"),
    body('history').notEmpty().withMessage("required").isLength({max: 1000}).withMessage("Max character exceeded")
]