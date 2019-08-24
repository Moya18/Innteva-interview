const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
   username: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true
   },
   names: {
      type: String,
      required: true
   },
   paternal_surname: {
      type: String,
      required: true
   },
   maternal_surname: String,
   age: Number,
   role: {
      type: Number,
      required: true
   },
   permissions: {
      type: [String],
      required: true
   },
   status: {
      type: String
   }
});

module.exports = mongoose.model('User', userSchema);

