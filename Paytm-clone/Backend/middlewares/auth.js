const jwt = require('jsonwebtoken')
const JWT_SECRET = require("../config");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({
      message: 'Authorization header missing',
    });
  }
  const token = authHeader.split(' ')[1];
  try {
    const user = jwt.verify(token, JWT_SECRET)
    req.userId = user.userId
    next()

  }
  catch (e) {
    res.status(403).json({
      message: 'Authorization error'
    })
  }
}

module.exports = authMiddleware
