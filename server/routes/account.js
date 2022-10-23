const express = require('express')
const { authorizeBearerToken } = require('../middlewares/authMiddleware')

const accountController = require('../controllers/account')

const router = express.Router()

router.post('/changePassword', [authorizeBearerToken], accountController.changePassword)

router.post('/changeAccount', [authorizeBearerToken], accountController.changeAccount)

module.exports = router