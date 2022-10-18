const room = require('../../models/Room')

async function deleteRoom(request, response) {
    try {
        const { roomName } = request.body;
        
        await room.deleteOne({ roomName }).then(result =>{
            console.log(roomName)
           console.log(result); 
        });
    
      } catch (error) {
        console.error(error);
        response.status(500).send();
      }
}

module.exports = deleteRoom
