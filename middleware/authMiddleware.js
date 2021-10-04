const jwt = require('jsonwebtoken');

const requireAuth = (req,res,next) => {

  const token = req.cookie.jwt;

  // Check json web token exists and is verified
}
