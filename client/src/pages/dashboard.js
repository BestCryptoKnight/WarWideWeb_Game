import React, { Fragment, useState } from "react";
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

export default function Dashboard() {
  const [sockets, setSocketes] = React.useState();
  React.useEffect(() => setSocketes(socket),[socket])
  // socket.on("message",data => console.log(data.userId));
  // console.log(socket);
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <CreateRoomComponent userName="a" roomName="a1" socket={socket} />
      <CreateRoomComponent userName="b" roomName="b1" socket={socket} />
    </div>
  );
}
