const User = require('../models/user');

// Handle errors
const handleErrors = (err) => {
  console.log('error code:- ', err.code);
  let errors = { name: '', email: '', password: '' };

  // duplicate error code
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    })
  }
  return errors;
}

module.exports.signup_post = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({ name, email, password });
    res.status(201).json(user);
  } catch (err) {
    const errors = handleErrors(err);
    console.log('Errors in signup_post request', err);
    res.status(400).json(errors);
  }

};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    /* const user = await User.create({ email, password }); */
    res.status(201).json(user);

  } catch (err) {
    console.log(err);
    res.status(400).send('error, User Not created');
  }
}; 