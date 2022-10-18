import { Fragment, useState } from "react";
import {
  AppBar,
  IconButton,
  Avatar,
  Popover,
  List,
  ListSubheader,
  ListItemButton,
} from "@mui/material";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { createRoom, getRoom, deleteRoom } from "../api/RoomApi";
import CreateRoomComponent from "../components/CreateRoomComponet";
import io from "socket.io-client";

const socket = io.connect('http://127.0.0.1:8080');

export default function dashboard() {
  socket.emit("joinRoom", {username:"fa", roomName:"dawd"})
  socket.on("message",data => console.log(data));
  
  console.log(socket);
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <CreateRoomComponent userName="a" roomName="a1" socket={socket} />
      <CreateRoomComponent userName="b" roomName="b1" socket={socket} />
    </div>
  );
}
