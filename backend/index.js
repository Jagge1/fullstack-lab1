require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Dish = require('./dish.model.js');
const app = express();
const port = 5000;

app.use(express.json());
app.use(express.static('frontend'));

mongoose.connect(process.env.MONG_URI);

app.get('/api/dishes', async (req, res) => {

  try {

    const dishes = await Dish.find({});

    res.status(200).json(dishes);
    console.log('Debug')
    
  } catch (error) {
    res.status(500).json({message: error.message})
  }
});

app.get('/api/dishes/:name', async (req, res) => {

  const {name} = req.params;

  try {
    //Array of dishes of searched name
    const dish = await Dish.find({name: name}); 

    //Checks if array is empty
    if (!dish.length) {
       return res.status(404).json({message: 'Error: Dish not found'})   
    } else {
      res.status(200).json(dish);
    }

  } catch (error) {
    res.status(500).json({message: error.message})
  }

});

app.post('/api/dishes', async (req, res) => {

});

app.put('/api/dishes/:id', async (req, res) => {

  const {dishId} = req.params;

});

app.delete('/api/dishes/:id', async (req, res) => {

  const {dishId} = req.params;

});

app.listen(port, ()=> console.log(`Server is listening to port: ${port}`));