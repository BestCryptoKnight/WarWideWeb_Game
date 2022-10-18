//const app = require('../utils/app');
const express = require('express');
app = express();

const authRoutes = require("./auth");
const roomRoutes = require("./room");
const imageRoutes = require('./image')

app.use("/auth", authRoutes);
app.use("/room", roomRoutes);
app.use('/image', imageRoutes);

module.exports = app;