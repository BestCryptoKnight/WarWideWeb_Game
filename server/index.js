require("dotenv").config(); // Secures variables
const app = require("./utils/app"); // Backend App (server)
const mongo = require("./utils/mongo"); // MongoDB (database)
const { get_Current_User, user_Disconnect, join_User } = require("./dummyuser");
const Routes = require('./routes/index');
const cors = require("cors");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});


const { PORT } = require("./constants");
mongo.connect();

app.use('/api', Routes);

app.use(cors());

var http = require("http").createServer(app);

let io = http.listen(PORT, () => {
   console.log(`✅ Server is listening on port: ${PORT}`);
});

// const socket = require("socket.io")(http, {
//   cors: {
//     origin: "http://localhost:3000",
//   },
// });

// socket io

//initializing the socket io connection
// socket.on("connection", (socket) => {
//   console.log("connected");
//   //for a new user joining the room
//   socket.on("joinRoom", ({ username, roomname }) => {
//     console.log(username);
//     //* create user
//     //const p_user = join_User(socket.id, username, roomname);
//     // console.log(socket.id, "=id");
//     //socket.join(p_user.room);

//     //display a welcome message to the user who have joined a room
//     socket.emit("message", {
//       //userId: p_user.id,
//       username: username,
//       id: socket.id,
//       //text: `Welcome ${p_user.username}`,
//     });

//     //displays a joined room message to all other room users except that particular user
//     // socket.broadcast.to(p_user.room).emit("message", {
//     //   userId: p_user.id,
//     //   username: p_user.username,
//     //   text: `${p_user.username} has joined the chat`,
//     // });
//   });

//   //user sending message
//   socket.on("chat", (text) => {
//     //gets the room user and the message sent
//     //const p_user = get_Current_User(socket.id);

//     io.to(p_user.room).emit("message", {
//       userId: p_user.id,
//       username: p_user.username,
//       text: text,
//     });
//   });

//   //when the user exits the room
//   socket.on("disconnect", () => {
//     //the user is deleted from array of users and a left room message displayed
//     const p_user = user_Disconnect(socket.id);

//     if (p_user) {
//       io.to(p_user.room).emit("message", {
//         userId: p_user.id,
//         username: p_user.username,
//         text: `${p_user.username} has left the room`,
//       });
//     }
//   });
// });
//  }

// bootstrap();
