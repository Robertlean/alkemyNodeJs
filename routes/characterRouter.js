const express = require("express");
const router = express.Router();

const controller = require("../controllers/charactersController");

const upload = require("../middlewares/charactersUploads");
const validations = require("../validations/characters");

router.get("/", controller.list);
router.get("/:charid", controller.detail);
router.post("/", upload.single("image"), validations, controller.create);
router.put("/:charid", upload.single("image"), validations, controller.update);
router.delete("/:charid", controller.destroy)

module.exports = router