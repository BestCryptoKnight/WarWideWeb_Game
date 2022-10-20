import { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Profile from "../components/game/profile";
import { useMediaQuery } from "react-responsive";

import {
  AppBar,
  IconButton,
  Avatar,
  Popover,
  List,
  ListSubheader,
  ListItemButton,
} from "@mui/material";
// import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  mainboard: {
    background: "linear-gradient(290deg, #1B1251,#390A7C, #E33B86)",
    width: "100%",
    height: "100%",
    position: "fixed",
  },
  profileEventPan: {
    position: "absolute",
    width: "30%",
    height: "80%",
    marginTop: "50px",
    marginLeft: "10%",
    minWidth: "380px",
    minHeight: "500px",
  },
  profilePan: {
    width: "100%",
    height: "25%",
    minWidth: "380px",
    minHeight: "150px",
    display: "flex",
  },
  Profile: {
    width: "170px",
    height: "100%",
  },
  labelVS: {
    width: "40%",
    textAlign:"center",
    fontFamily:'Algerian',
    color:'white',
    paddingTop:'20px',
    fontSize:'50px',
  },
});

export default function Room() {
  let isLaptopOrMobile = useMediaQuery({
    minWidth: 430,
  });

  const roomInfo = { user1: "esai", user2: "hades", socket: "www" };

  const classes = useStyles();
  return (
    <div className={classes.mainboard}>
      {isLaptopOrMobile ? <RoomLaptop roomInfo={roomInfo} /> : <RoomMobile />}
    </div>
  );
}

function RoomLaptop(roomInfo) {
  const classes = useStyles();
  const user1 = roomInfo.roomInfo.user1;
  const user2 = roomInfo.roomInfo.user2;

  return (
    <div style={{ display: "flex" }}>
      <div className={classes.profileEventPan}>
        <div className={classes.profilePan}>
          <div className={classes.Profile}>
            <Profile user={user1} />
          </div>
          <div className={classes.labelVS}>VS</div>
          <div className={classes.Profile}>
            <Profile user={user2} />
          </div>
        </div>
      </div>
    </div>
  );
}

function RoomMobile() {
  const classes = useStyles();

  return (
    <div style={{ display: "flex" }}>
      <div className={classes.mainboard}></div>
    </div>
  );
}
