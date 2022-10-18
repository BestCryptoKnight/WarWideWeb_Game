const room = require('../../models/Room')

function createRoom(request, response) {
    const {name, price} = request.body;
    // Create room
    const newRoom = new room({name : name, price : price});

    newRoom
    .save()
    .then((room)=>{
      response.status(201).json({
        message: 'Succesfully created',
        data: room,
      })
    })
    .catch((error)=>{
      console.log(error);
      response.status(402).json(error);
    });
}

module.exports = createRoom
