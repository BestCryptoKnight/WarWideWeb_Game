const express = require('express')
// const { authorizeBearerToken } = require('../middlewares/jsonwebtoken')
const createRoom = require('../apis/room/createRoom')
const getRoom = require('../apis/room/getRoom')
const deleteRoom = require('../apis/room/deleteRoom')

const { response } = require('../utils/app')
//const getRoom = require('../apis/room/get-room')

// initialize router
const router = express.Router()

// POST at route: http://localhost:8080/room/createRoom
router.post('/createroom', createRoom)
router.get('/getroom', getRoom)
router.post('/deleteroom', deleteRoom)

// POST at path: http://localhost:8080/room/getRoom
//router.get('/getRoom', [], getRoom)

// GET at path: http://localhost:8080/room/deleteRoom
// router.post('/deleteRoom', [], deleteRoom)

module.exports = router
