const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const fullDetails = new Schema({
//   first_name: String,
//   last_name: String,
//   email: String,
//   phone: Number,
//   class: { type: Array, default: [] }
// })

const teacher = new Schema({
  name: String,
  class: { type: Array, default: [] }
})

// module.exports = mongoose.model('Teacher', fullDetails);
module.exports = mongoose.model('Teacher', teacher);