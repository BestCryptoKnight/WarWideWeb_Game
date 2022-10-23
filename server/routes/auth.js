const express = require('express')
const { authorizeBearerToken } = require('../middlewares/authMiddleware')

const authController = require('../controllers/auth')

const router = express.Router()

router.get('/getAccount', [authorizeBearerToken], authController.getAccount)

router.post('/register', authController.register)

router.post('/login', authController.login)

module.exports = router
