const express = require('express')

const app = express()

const authRoutes = require("./auth");
const roomRoutes = require("./room");
const imageRoutes = require('./image');
const balanceRoutes = require('./balance');

app.use("/auth", authRoutes);
app.use("/room", roomRoutes);
app.use('/image', imageRoutes);
app.use('/balance', balanceRoutes);

module.exports = app;