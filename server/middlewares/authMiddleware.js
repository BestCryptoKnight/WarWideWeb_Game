const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../constants')

const signToken = (payload = {}, expiresIn = '12h') => {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn })
  return token
}

const authorizeBearerToken = async (request, response, next) => {
  try {
    const token = request.headers.authorization?.split(' ')[1]
    console.log('token: ', token)
    if (!token) {
      return response.status(400).json({
        message: 'Token not provided',
      })
    }
    else {
      const auth = jwt.verify(token, JWT_SECRET)
      if (!auth) {
        return response.status(401).json({
          message: 'Unauthorized - invalid token',
        })
      }
      console.log('auth: ', auth)
      request.auth = auth
      next()
    }
  } catch (error) {
    console.error('Error occured here: ',error);
    return response.status(401).json({
      message: 'Unauthorized - invalid token',
    })
  }
}

module.exports = {
  authorizeBearerToken,
  signToken,
}
