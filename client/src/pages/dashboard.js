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

import { useAuth } from "../contexts/AuthContext";
import { createRoom, getRoom, deleteRoom } from "../api/RoomApi";
import CreateRoomComponent from "../components/CreateRoomComponet";
import io from "socket.io-client";

const socket = io.connect("/");

export default function dashboard() {

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <CreateRoomComponent userName="a" roomName="a1" socket={socket} />
      <CreateRoomComponent userName="b" roomName="b1" socket={socket} />
    </div>
  );
}
