const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(express.bodyParser())

mongoose.connect(process.env.MONG_URI);


