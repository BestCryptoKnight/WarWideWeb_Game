const express = require('express')

const app = express()

const authRoutes = require("./auth");
const imageRoutes = require('./image');
const balanceRoutes = require('./balance');
const gameRoutes = require('./game');
const accountRoutes = require('./account');
const emailRoutes = require('./email');

app.use("/auth", authRoutes);
app.use('/image', imageRoutes);
app.use('/balance', balanceRoutes);
app.use('/game', gameRoutes);
app.use('/account', accountRoutes);
app.use('/email', emailRoutes);

module.exports = app;