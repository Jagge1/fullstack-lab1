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
    return res.status(500).json({message: error.message})
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
    return res.status(500).json({message: error.message})
  }
});

app.post('/api/dishes', async (req, res) => {   
    const {name} = req.body;

    try {
      const dish = await Dish.find({name: name});

      if (dish.length > 0){
        return res.status(409).json({message: 'Error: Dish already exists'})
      }
      const newDish = await Dish.create(req.body)
      res.status(201).json({newDish})

    } catch (error) {
      return res.status(500).json({error: error.message});
    }
});

app.put('/api/dishes/:id', async (req, res) => {
  try {
    const {id} = req.params;

    const dish = await Dish.findByIdAndUpdate(id, req.body);

    if (!dish) {
      return res.status(404).json({message: 'Error: Dish not found'})
    }

    res.status(200).json(dish)
    
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
});

app.delete('/api/dishes/:id', async (req, res) => {
  try {
    const {id} = req.params;

    const dish = await Dish.findByIdAndDelete(id);

    if (dish === null ) {
      return res.status(404).json({message: 'Error: Dish not found'})
    }
    res.status(204).end()
    
  } catch (error) {
    return res.status(500).json({error: error.message})
  }
});

app.listen(port, ()=> console.log(`Server is listening to port: ${port}`));