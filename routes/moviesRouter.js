const express = require("express");
const router = express.Router();

const controller = require("../controllers/moviesController");

const upload = require("../middlewares/moviesUploads");
//const validations = require("../validations/movies")

router.get("/", controller.list);
router.get("/:moviesid", controller.detail);
router.post("/", upload.single("image"),/*  validations, */ controller.create);
router.put("/:moviesid", upload.single("image"),/*  validations, */ controller.update);
router.delete("/:moviesid", controller.destroy);

module.exports = router