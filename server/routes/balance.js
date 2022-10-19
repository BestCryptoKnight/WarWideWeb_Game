const express = require("express");
const router = express.Router();
const balanceController = require("../controllers/balance");

router.get("/", balanceController.balance_index);
router.post("/", balanceController.balance_create_post);
router.get("/:name", balanceController.balance_details);
router.patch("/:name", balanceController.balance_update);
router.put('/history', balanceController.balance_history);

module.exports = router;