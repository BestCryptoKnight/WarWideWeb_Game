let c_users = [];
const Balance = require("../models/Balance");

// joins the user to the specific chatroom
function join_User(id, username, room) {
  const p_user = { id, username, room };
  if (c_users.findIndex((p_user) => p_user.id === id) == -1) {
    c_users.push(p_user);
  }
  return p_user;
}

function broadcastToRoomUsers(room) {
  const room_users = c_users.filter((user) => user.room === room);
  return room_users;
}

// Gets a particular user id to return the current user
function get_Current_User(id) {
  return c_users.find((p_user) => p_user.id === id);
}

// called when the user leaves the chat and its user object deleted from array
function user_Disconnect(id) {
  const index = c_users.findIndex((p_user) => p_user.id === id);

  if (index !== -1) {
    return c_users.splice(index, 1)[0];
  }
}

function setWinner(bidValueArray, price) {
  let winner = {};
  console.log(bidValueArray);
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
}
// async function getAvailablity(username) {
//   let availability = false;
//   const user = await Balance.findOne({ name: username });

//   if (user.pay_date == undefined) {
//     availability = false;
//     return availability;
//   } else {
//     console.log("--------------");
//     const passed = new Date().getTime() - new Date(user.pay_date).getTime();
//     const hours = Math.floor(passed / 1000) / 3600;

//     if (hours <= 24) {
//       availability = true;
//       console.log(hours);
//     } else return false;
//   }
//   return availability;
// }

module.exports = {
  join_User,
  broadcastToRoomUsers,
  get_Current_User,
  user_Disconnect,
  setWinner,
  // getAvailablity,
};
