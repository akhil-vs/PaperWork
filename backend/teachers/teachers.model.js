const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fullDetails = new Schema({
  name: String,
  email: String,
  phone: Number,
})

const miniDetails = new Schema({
  name: String
})

module.exports = mongoose.model('Teacher', fullDetails);
module.exports = mongoose.model('MiniTeacher', miniDetails);