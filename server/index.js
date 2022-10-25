require("dotenv").config(); // Secures variables
const app = require("./utils/app"); // Backend App (server)
const mongo = require("./utils/mongo"); // MongoDB (database)
const {
  get_Current_User,
  user_Disconnect,
  broadcastToRoomUsers,
  join_User,
  setWinner,
} = require("./socket/dummyuser");

const Routes = require("./routes/index");
const cors = require("cors");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

const { PORT } = require("./constants");
const { BASECLIENTURL } = require("./constants");
const { valid } = require("joi");
const { validate } = require("./models/Balance");
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
    const p_user = join_User(socket.id, username, room);
    socket.join(p_user.room);
    let allUsers = broadcastToRoomUsers(p_user.room);
    server.sockets.in(allUsers[0].room).emit("message", { users: allUsers });
  });

  //user sending message
  socket.on("chat", (text) => {
    //gets the room user and the message sent
    const p_user = get_Current_User(socket.id);
    let allUsers = broadcastToRoomUsers(p_user.room);

    socket.to(allUsers[0].room).emit("chat", {
      username: p_user.username,
      text: text,
    });
  });

  //when the user exits the room
  socket.on("discon", () => {
    //the user is deleted from array of users and a left room message displayed
    const p_user = user_Disconnect(socket.id);

    if (p_user) {
      socket.to(p_user.room).emit("discon", {
        username: p_user.username,
      });
    }
    // const p_user = get_Current_User(socket.id);
    // const username = p_user.username;
    // const isDelete = user_Disconnect(room);
    // isDelete == -1 ? server.sockets.in(room).emit("discon",{
    //   username: username,
    // }) : console.log("disconnect success");
    // if (p_user) {
    //   io.to(p_user.room).emit("message", {
    //     userId: p_user.id,
    //     username: p_user.username,
    //     text: `${p_user.username} has left the room`,
    //   });
    // }
  });
  socket.on("start", ({ username, room }) => {
    // const p_user = join_User(socket.id, username, room);
    const p_user = get_Current_User(socket.id);
    if (validArray.findIndex((user) => user.id == p_user.id) == -1) {
      validArray.push(p_user);
      validArray.length == 2
        ? server.sockets.in(p_user.room).emit("start")
        : socket.to(p_user.room).emit("startReq", { username });
    }
  });

  socket.on("setwinner", ({ username, bidValue, price }) => {
    const realprice = price;
    let winner = {};

    const p_user = get_Current_User(socket.id);
    let userInfo = { user: username, value: bidValue };

    if (bidValueArray.findIndex((user) => user.id === p_user.id) == -1) {
      bidValueArray.push(userInfo);
    }
    if (bidValueArray.length == 2) {
      winner = setWinner(bidValueArray, realprice);
      server.sockets.in(p_user.room).emit("winner", { winner });
    }
  });
});
//  }

// bootstrap();
