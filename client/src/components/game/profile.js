import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  AppBar,
  IconButton,
  Avatar,
  Popover,
  List,
  ListSubheader,
  ListItemButton,
} from "@mui/material";
import { margin } from "@mui/system";
// import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  mainprofile: {
    background: "#641284",
    width: "100%",
    height: "100%",
    borderRadius: "15px",
  },
  avatar: {
    position: "absolute",
    width: "70px",
    height: "70px",
    marginTop: "10px",
    borderRadius: "35px",
    marginLeft: "9%",
  },
  userLabel: {
    textAlign:'center',
    fontFamily:'Arial Black',
    fontSize:'18px',
    color:'white',
  },
  balanceLabel: {
    fontFamily:'Arial Black',
    fontSize:'13px',
    color:'#00B0F0',
    marginLeft: "-39%",

  },
});

export default function Profile(info) {
  const classes = useStyles();
  const user = info.user;
  const balance = 0.12244444444;
  //   console.log(info.user);
  // const navigate = useNavigate();
  return (
    <div className={classes.mainprofile}>
      <div className={classes.avatar}>
        <Avatar style={{ width: "100%", height: "100%" }} />
        <p className={classes.userLabel}>{user}</p>
      <div className={classes.balanceLabel}>{balance}</div>

      </div>

    </div>
  );
}
