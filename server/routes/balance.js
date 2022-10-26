const express = require("express");
const router = express.Router();
const { authorizeBearerToken } = require('../middlewares/authMiddleware')

const balanceController = require("../controllers/balance");

router.get("/", balanceController.balance_index);
router.get('/getavailability', balanceController.getAvailability);
router.get("/getBalance", [authorizeBearerToken], balanceController.balance_details);
router.post('/withdraw', [authorizeBearerToken], balanceController.withdraw);
router.post('/deposit', [authorizeBearerToken], balanceController.deposit);
router.post('/payGameFee', balanceController.payGameFee);
router.post('/gameEnd', balanceController.gameEnd);

module.exports = router;