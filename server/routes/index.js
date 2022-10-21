const express = require('express')

const app = express()

const authRoutes = require("./auth");
const imageRoutes = require('./image');
const balanceRoutes = require('./balance');
const gameRoutes = require('./game');

app.use("/auth", authRoutes);
app.use('/image', imageRoutes);
app.use('/balance', balanceRoutes);
app.use('/game', gameRoutes);

module.exports = app;