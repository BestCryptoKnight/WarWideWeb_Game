const joi = require('joi')
const bcrypt = require('bcrypt')
const Room = require('../../models/Room')
// const {signToken} = require('../../middlewares/jsonwebtoken')

async function createRoom(request, response, next) {
  try {
    // Validate request data
    await joi
      .object({
        roomname: joi.string().required(),
        price: joi.string().required(),
      })
      .validateAsync(request.body)
      
  } catch (error) {
    
    return response.status(400).json({
      error: 'ValidationError',
      message: error.message,
    })
  }

  try {
    const {roomname, price} = request.body

    // Verify account username as unique
    // const existingAccount = await Account.findOne({username})
    // if (existingAccount) {
    //   return response.status(400).json({
    //     error: username,
    //     message: 'An account already exists with that "username"',
    //   })
    // }

    // Encrypt password
    // const salt = await bcrypt.genSalt(10)
    // const hash = await bcrypt.hash(password, salt)

    // Create account
    const newRoom = new Room({roomname: roomname, price: price  });
    console.log(newRoom);

    await newRoom.save()

    // // Remove password from response data
    // newAccount.password = undefined
    // delete newAccount.password

    // // Generate access token
    // const token = signToken({uid: newAccount._id, role: newAccount.role})

    response.status(201).json({
      message: 'Succesfully created',
      data: newRoom,
    })
  } catch (error) {
    console.error(error)
    return response.status(500).send()
  }
}

module.exports = createRoom
