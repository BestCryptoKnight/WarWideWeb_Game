const express = require("express");
const router = express.Router();
const balanceController = require("../controllers/balance");

router.get("/", balanceController.balance_index);
router.post("/", balanceController.balance_create_post);
router.get("/:name", balanceController.balance_details);
router.post('/withdraw', balanceController.withdraw);
router.post('/deposit', balanceController.deposit);
router.post('/payGameFee', balanceController.payGameFee);
router.post('/gameEnd', balanceController.gameEnd);

module.exports = router;