const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Schema for a dish
const DishSchema = new Schema({
  name: String,
  ingredients: Array,
  cookingSteps: Array,
  cookingTime: String,
  flavorProfile: Array,
  origin: String
});

const Dish = mongoose.model('Dish', DishSchema);

//Exports the model
module.exports = Dish;
