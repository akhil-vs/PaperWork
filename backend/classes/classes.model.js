const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  grade: Number,
  division: String,
  teachers: Array,
  students: Array
})

module.exports = mongoose.model('Class', schema);