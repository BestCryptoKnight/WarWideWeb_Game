let c_users = [];

// joins the user to the specific chatroom
function join_User(id, username, room) {
  try {
    const p_userNew = { id, username, room };
    let isRoom =
      c_users.findIndex((p_user) => p_user.room === room) == -1 ? false : true;
    let isUser =
      c_users.findIndex((p_user) => p_user.username === username) == -1
        ? false
        : true;
    isRoom
      ? isUser
        ? (c_users[
            c_users.findIndex((p_user) => p_user.username === username)
          ].id = id)
        : c_users.push(p_userNew)
      : c_users.push(p_userNew);

    console.log(c_users, "-------c_users");
    return c_users.find((p_user) => p_user.username === p_userNew.username);
  } catch (error) {
    console.log(error);
  }
}

function broadcastToRoomUsers(room) {
  try {
    const room_users = c_users.filter((user) => user.room === room);
    return room_users;
  } catch (error) {
    console.log(error);
  }
}

// Gets a particular user id to return the current user
function get_Current_User(id) {
  try {
    return c_users.find((p_user) => p_user.id === id);
  } catch (error) {
    console.log(error);
  }
}

// called when the user leaves the chat and its user object deleted from array
function user_Disconnect(id) {
  try {
    const index = c_users.findIndex((p_user) => p_user.id === id);

    if (index !== -1) {
      return c_users.splice(index, 1)[0];
    }
  } catch (error) {
    console.log(error);
  }
}

function setWinner(bidValueArray, price) {
  try{
    let winner = {};
    if (bidValueArray[0].value == "") {
      return bidValueArray[1];
    } else if (bidValueArray[1].value == "") {
      return bidValueArray[0];
    } else {
      winner =
        Math.abs(bidValueArray[0].value - price) >
        Math.abs(bidValueArray[1].value - price)
          ? bidValueArray[1]
          : bidValueArray[0];
    }
    return winner;
  }catch(error){
    console.log(error);
  }

}

module.exports = {
  join_User,
  broadcastToRoomUsers,
  get_Current_User,
  user_Disconnect,
  setWinner,
  // getAvailablity,
};
