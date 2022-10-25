let c_users = [];
const Balance = require("../models/Balance");

// joins the user to the specific chatroom
function join_User(id, username, room) {
  const p_userNew = { id, username, room };
  let isRoom =
    c_users.findIndex((p_user) => p_user.roomname === room) == -1
      ? false
      : true;
  let isUser =
    c_users.findIndex((p_user) => p_user.username === room) == -1
      ? false
      : true;
  isRoom
    ? isUser
      ? (c_users(c_users.findIndex((p_user) => (p_user.id = id))).id = id)
      : c_users.push(p_userNew)
    : c_users.push(p_userNew);
  console.log(c_users, "---------users");
  return c_users.find((p_user) => p_user === p_userNew);
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
  // console.log(c_users,"--------room ");
  // for (var i = 0; i < c_users.length; i++) {
  //   if (c_users[i].room === room) {
  //     c_users.splice(i, 1);
  //     i--;
  //   }
  // }
  // const index = c_users.findIndex((p_user) => p_user.room === room);
  // return index;
  const index = c_users.findIndex((p_user) => p_user.id === id);

  if (index !== -1) {
    return c_users.splice(index, 1)[0];
  }
}

function setWinner(bidValueArray, price) {
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
