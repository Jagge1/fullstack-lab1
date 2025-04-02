const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const Dish = require('./dish.model.js');
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.static('frontend'));

mongoose.connect(process.env.MONG_URI);

app.get('/api/dishes', async (req, res) => {

});

app.get('/api/dishes/:name', async (req, res) => {

  const name = req.params;

});

app.post('/api/dishes', async (req, res) => {

});

app.put('/api/dishes/:id', async (req, res) => {

  const dishId = req.params;

});

app.delete('/api/dishes/:id', async (req, res) => {

  const dishId = req.params;

});

app.listen(port, ()=> console.log(`Server is listening to port: ${port}`));