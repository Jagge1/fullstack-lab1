const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DishSchema = new Schema({
  name: String,
  ingredients: Array,
  cookingSteps: Array,
  cookingTime: String,
  flavorProfile: Array,
  origin: String
});

const Dish = mongoose.model('Dish', DishSchema);

module.exports = Dish;
