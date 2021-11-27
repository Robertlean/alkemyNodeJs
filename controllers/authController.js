const db = require('../database/models')

const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
const API_KEY = process.env.SENDGRID_KEY;
const transporter = nodemailer.createTransport(sgTransport({
    auth: {
        api_key: API_KEY
    }
}))

const jwt = require("jsonwebtoken");

module.exports= {
    register: (req, res) => {
        const errors = validationResult(req);
        if(errors.isEmpty()){
            db.users.create({
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 10)
            })
            .then(newUser => {
                const response = {
                    status: 200,
                    msg: "Registration successfully check your email to see the welcome message"
                }
                transporter.sendMail({
                    to: newUser.email,
                    from: procces.env.SENDGRID_EMAIL,
                    subject: "Challenge Alkemy Backend NodeJs",
                    html: "<h3>Bienvenido!! Grcias por registrarte</h3><p>Ya podes explorar el mundo de Disney</p><span> Mensaje creado por Roberto Veintemilla</span>"
                })
                .then(result => {
                    console.log(result)
                })
                .catch(error => console.log(error))

                res.status(200).json(response)
            })
            .catch( error =>{
                const response = {
                    status: 500,
                    msg: "Internal server error please try letter"
                }
                res.status(500).json(response)
            })
        }else{
            const response = {
                status: 400,
                msg: "error when process the registration",
                errors: errors.mapped()
            }
            res.status(400).json(response)
        }
    },
    login: (req, res) => {
        const errors = validationResult(req);
        if(errors.isEmpty()){
            db.users.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then( user => {
                if(!user){
                    return Promise.rejected()
                }else{
                    const expireToken = 300;
                    const session = {
                        id: user.id,
                        name: user.email
                    }
                    const token = jwt.sign(session, process.env.JWT_SECRET, {expiresIN: expireToken})
                    const response = {
                        status: 200,
                        msg: `welcome ${user.email}`,
                        "expire in": `${exprireToken / 60} min`,
                        token: token
                    };
                    res.status(200).json(response)
                }
            }).catch(error => {
                const response = {
                    status: 401,
                    msg: "Invalid credentials"
                }
                res.status(401).json(response)
            })
        }else{
            const response = {
                status:401,
                msg: "Invalid credentials"
            }
            res.status(401).json(response)
        }
    }
}