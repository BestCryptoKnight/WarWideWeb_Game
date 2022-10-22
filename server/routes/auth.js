const express = require('express')
const { authorizeBearerToken } = require('../middlewares/authMiddleware')

const authController = require('../controllers/auth')

const router = express.Router()

router.post('/register', authController.register)

router.post('/login', authController.login)

router.get('/getAccount', [authorizeBearerToken], authController.getAccount)

module.exports = router
