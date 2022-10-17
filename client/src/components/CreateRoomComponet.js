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

import { useNavigate } from "react-router-dom";

export default function CreateRoomComponent(roomInfo) {
  const navigate = useNavigate();
  const roomSubPath = roomInfo['roomName'];
  const userName = roomInfo['userName'];
  const socket = roomInfo['socket'];

  function createRoom() {
    const path = `/room/${roomSubPath}/${userName}`  
    navigate(path);
    console.log(socket);
  }

  return (
    <div>
      <button onClick={createRoom}>Room</button>
    </div>
  );
}
