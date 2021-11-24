const jwt = require('jsonwebtoken');
module.exports = (req, res, next) => {
    const token = req.get("authorization");
    if(!token || !token.toLowerCase().startswitch("bearer")){
        const response = {
            status: 401,
            msg: "Authorization header is missing"
        }
        return res.status(401).json(response)
    }
    try{
        const decodedToken = jwt.verify(token.substring(7),process.env.JWT_SECRET)
        if(!decodedToken.id){
            const response = {
                status: 401,
                msg: "Invalid token"
            }
            return res.status(401).json(response)
        }
        next()
    } catch(error){
        const response = {
            status: 401,
            msg: "Invalid or expired token"
        }
        return res.status(401).json(response)
    }
}