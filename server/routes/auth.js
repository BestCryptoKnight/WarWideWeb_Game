const express = require('express')
const { authorizeBearerToken } = require('../middlewares/authMiddleware')

const authController = require('../controllers/auth')

const router = express.Router()

router.get('/getAccount', [authorizeBearerToken], authController.getAccount)

router.post('/register', authController.register)

router.post('/login', authController.login)

router.post('/changeAccount', [authorizeBearerToken], authController.changeAccount)

router.post('/changePassword', [authorizeBearerToken], authController.changePassword)

module.exports = router
