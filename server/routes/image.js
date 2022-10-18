const express = require("express");
const router = express.Router();
const imageController = require("../controllers/image");

router.get("/", imageController.image_index);
router.post("/", imageController.image_create_post);
router.post("/read", imageController.read_excel);
router.get("/:id", imageController.image_details);
router.patch("/:id", imageController.image_update);
router.delete("/:id", imageController.image_delete);

module.exports = router;