const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your full name'],
    lowercase: true,
    minlength: [4, 'Please enter full name']
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters']
  }
});

//fire a function before doc is saved to db
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  console.log('user is about to created and saved', this);
  next();
})

//  fire a function after doc  saved to db
/* userSchema.post('save', async function (doc, next) {
  console.log('new user was created', doc);
  next();
}) */

userSchema.statics.login = async function (email, password) {

  const user = await this.findOne({ email });

  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    } throw Error('incorrect  password');

  } throw Error('incorrect email');

};

const User = mongoose.model('user', userSchema);

module.exports = User;