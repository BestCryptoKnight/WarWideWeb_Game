const express = require('express')
const gameController = require('../controllers/game')
const router = express.Router()

router.get('/', gameController.loadData);

module.exports = router
