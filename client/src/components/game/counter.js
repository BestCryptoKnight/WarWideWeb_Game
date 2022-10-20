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
    background: "##E03889",
    width: "100%",
    height: "100%",
    borderRadius: "50%",
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

    </div>
  );
}
