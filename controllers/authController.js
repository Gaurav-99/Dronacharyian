const User = require('../models/user');
const jwt = require('jsonwebtoken');


// Handle errors
const handleErrors = (err) => {
  
  ///console.log('error code:- ', err.code);
  let errors = { name: '', email: '', password: '' };

  // handle Login errors
  if (err.message === 'incorrect email') {
    errors.email = 'Email is Not Registered!';
  }

  if (err.message === 'incorrect  password') {
    errors.password = 'Entered Password is incorrect!';
  }


  // duplicate error code
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }
  // validation errors for registering a user
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    })
  }

  return errors;
}

// Create token
const maxAge = 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, 'dronaAcharya', {
    expiresIn: maxAge
  });
};

module.exports.signup_post = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });

  } catch (err) {
    const errors = handleErrors(err);
    console.log('Errors in signup_post request', err);
    res.status(400).json({ errors });
  }

};

module.exports.login_post = async (req, res) => {

  const { email, password } = req.body;
  try {

    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });

  } catch (err) {
    const errors = handleErrors(err);
    console.log(errors);
    res.status(400).json({ errors });
  }

}; 