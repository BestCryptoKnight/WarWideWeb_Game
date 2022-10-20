const express = require("express");
const router = express.Router();
const { authorizeBearerToken } = require('../middlewares/jsonwebtoken')

const balanceController = require("../controllers/balance");

router.get("/", balanceController.balance_index);
router.get('/getavailability', balanceController.getAvailability);
router.get("/:name", balanceController.balance_details);
router.get("/:name", balanceController.balance_details);

router.post("/", balanceController.balance_create_post);
router.post('/withdraw', [authorizeBearerToken], balanceController.withdraw);
router.post('/deposit', [authorizeBearerToken], balanceController.deposit);
router.post('/payGameFee', balanceController.payGameFee);
router.post('/gameEnd', balanceController.gameEnd);

module.exports = router;