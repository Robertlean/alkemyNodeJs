const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        db(null, path.join(__dirname, "../uploads/characters"))
    },
    filename: (req, file, cb) =>{
        cb(null, `imgage-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage})
module.exports = upload