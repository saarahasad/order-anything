const mongoose = require('mongoose');
const express = require('express');
const app = express();
mongoose.connect('mongodb://localhost:27017/order-anything');

mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(express.json());

app.use('/api',require('../routes/api'));
