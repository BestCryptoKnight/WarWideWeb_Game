const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../constants')

const signToken = (payload = {}, expiresIn = '12h') => {
  console.log('payload: ', payload);
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn })
  console.log('token: ', token);
  return token
}

const authorizeBearerToken = async (request, response, next) => {
  try {
    console.log('authorization: ', request.headers.authorization)
    const token = request.headers.authorization?.split(' ')[1]
    if (!token) {
      return response.status(400).json({
        message: 'Token not provided',
      })
    }
    else {
      console.log('token: ', token)
      const auth = await jwt.verify(token, JWT_SECRET)
      if (!auth) {
        return response.status(401).json({
          message: 'Unauthorized - invalid token',
        })
      }
      request.auth = auth
      console.log('auth: ', auth)
      next()
    }
  } catch (error) {
    console.error(error)
    return response.status(401).json({
      message: 'Unauthorized - invalid token',
    })
  }
}

module.exports = {
  authorizeBearerToken,
  signToken,
}
