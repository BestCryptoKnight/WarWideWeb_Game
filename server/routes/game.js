const express = require('express')
const gameController = require('../controllers/game')
const { authorizeBearerToken } = require('../middlewares/authMiddleware')
const router = express.Router()

router.get('/', gameController.loadData);
router.post('/joinRoom', authorizeBearerToken, gameController.joinRoom);

module.exports = router
