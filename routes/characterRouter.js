const express = require("express");
const router = express.Router();

const controller = require("../controllers/characterController");

const upload = require("../middlewares/characterUploads");
//const validations = require("../validations/characters");

router.get("/", controller.list);
router.get("/:charid", controller.detail);
router.post("/", upload.single("image")/* , validations */, controller.create);
router.put("/:charid", upload.single("image")/* , validations */, controller.update);
router.delete("/:charid", controller.destroy)

module.exports = router