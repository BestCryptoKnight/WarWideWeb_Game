require("dotenv").config(); // Secures variables
const app = require("./utils/app"); // Backend App (server)
const mongo = require("./utils/mongo"); // MongoDB (database)
const { gameEnd } = require("./controllers/balance");

const {
  get_Current_User,
  user_Disconnect,
  broadcastToRoomUsers,
  join_User,
  setWinner,
} = require("./socket/dummyuser");

const { loadData } = require("./controllers/game/index");

const Routes = require("./routes/index");
const cors = require("cors");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

const { PORT } = require("./constants");
const { BASECLIENTURL } = require("./constants");
const { valid } = require("joi");
mongo.connect();

app.use("/api", Routes);

app.use(cors());

var http = require("http").createServer(app);

let io = http.listen(PORT, () => {
  console.log(`✅ Server is listening on port: ${PORT}`);
});

const server = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let validArray = [];
let bidValueArray = [];

//initializing the socket io connection
server.on("connection", (socket) => {
  console.log("connected");
  //for a new user joining the room
  socket.on("joinRoom", ({ username, room }) => {
    //* create user
    try {
      console.log(socket.id, "-----socket");
      const p_user = join_User(socket.id, username, room);
      socket.join(p_user.room);
      let allUsers = broadcastToRoomUsers(p_user.room);
      console.log(allUsers, "------allusers");
      server.sockets.in(allUsers[0].room).emit("message", { users: allUsers });
    } catch (error) {
      console.log(error);
    }
  });

  //user sending message
  socket.on("chat", (text) => {
    //gets the room user and the message sent
    try {
      const p_user = get_Current_User(socket.id);
      if (p_user.room == undefined) {
        p_user = join_User(socket.id, username, room);
      }
      let allUsers;
      if (p_user) allUsers = broadcastToRoomUsers(p_user.room);

      socket.to(allUsers[0].room).emit("chat", {
        username: p_user.username,
        text: text,
      });
    } catch (error) {
      console.log(error);
    }
  });

  //when the user exits the room
  socket.on("discon", () => {
    try {
      //the user is deleted from array of users and a left room message displayed
      const p_user = user_Disconnect(socket.id);

      if (p_user) {
        socket.to(p_user.room).emit("discon", {
          username: p_user.username,
        });
        validArray = [];
      }
    } catch (error) {
      console.log(error);
    }
  });
  socket.on("start", async ({ username, room }) => {
    // const p_user = join_User(socket.id, username, room);
    try {
      const p_user = get_Current_User(socket.id);
      let allUsers = broadcastToRoomUsers(p_user.room);
      if (validArray.findIndex((user) => user.id == p_user.id) == -1) {
        validArray.push(p_user);
        if (validArray.length === 2) {
          const data = await loadData();
          if (data != {}) {
            console.log(data);
            server.sockets.in(allUsers[0].room).emit("start", data);
            validArray = [];
          }
          server.sockets.in(allUsers[0].room).emit("start");
          validArray = [];
        } else {
          socket.to(allUsers[0].room).emit("startReq", { username });
        }
      }
      console.log(validArray);
    } catch (error) {
      console.log(error);
    }
  });
  socket.on("writing", () => {
    try {
      const p_user = get_Current_User(socket.id);
      
      let allUsers;
      if (p_user) allUsers = broadcastToRoomUsers(p_user.room);

      socket.to(allUsers[0].room).emit("writing");
    } catch (error) {
      console.log(error);
    }
  })
  socket.on("setwinner", async ({ username, bidValue, price, amount }) => {
    try {
      const realprice = price;
      let winner = {};
      let loser = {};
      let isSame = false;
      let success = false;
      const p_user = get_Current_User(socket.id);
      let allUsers = broadcastToRoomUsers(p_user.room);

      let userInfo = { user: username, value: bidValue };

      if (bidValueArray.findIndex((user) => user.id === p_user.id) == -1) {
        bidValueArray.push(userInfo);
      }
      if (bidValueArray.length == 2) {
        winner = setWinner(bidValueArray, realprice);
        loser =
          winner === bidValueArray[0] ? bidValueArray[1] : bidValueArray[0];
        isSame = winner.value === loser.value ? true : false;
        // success = await gameEnd(winner.username, loser.username, amount);
        // let success = await gameEnd(winner.username, loser.username, amount);
        isSame
          ? (success = true)
          : (success = await gameEnd(winner.user, loser.user, amount));
        console.log(success);
        if (success) {
          server.sockets
            .in(allUsers[0].room)
            .emit("winner", { winner, loser, realprice });
        } else {
          server.sockets.in(allUsers[0].room).emit("error", "Server Error.");
        }
        bidValueArray = [];
      }
    } catch (error) {
      console.log(error);
    }
  });
});
