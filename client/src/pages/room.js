import { Fragment, useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router';

import "./room.css";
import { makeStyles } from "@material-ui/core/styles";
import Profile from "../components/game/profile";
import Counter from "../components/game/counter";

import { useMediaQuery } from "react-responsive";
import logo from "../assets/img/logo3.png";
import logo1 from "../assets/img/startbtnLogo.png";
import logo2 from "../assets/img/exitbtnLogo.png";
import defaultProduct from "../assets/img/demoProduct.png";
import { loadData } from "../api/RoomApi";
import {
  AppBar,
  IconButton,
  Avatar,
  Popover,
  List,
  ListSubheader,
  ListItemButton,
  Button,
} from "@mui/material";
import SmileIcon from "@material-ui/icons/Mood";
import { Input } from "@material-ui/core";
// import { useNavigate } from "react-router-dom";

// const basePicUrl = "../assets/img/demoProduct.png";

const useStyles = makeStyles({
  mainboard: {
    background: "linear-gradient(290deg, #1B1251,#390A7C, #E33B86)",
    width: "100%",
    height: "100%",
    position: "fixed",
  },
  profileEventPan: {
    position: "relative",
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
    minHeight: "190px",
    display: "flex",
  },
  Profile: {
    width: "170px",
    height: "200px",
  },
  labelVS: {
    width: "40%",
    textAlign: "center",
    fontFamily: "Algerian",
    color: "white",
    paddingTop: "20px",
    fontSize: "50px",
  },
  logo: {
    marginLeft: "10%",
    backgroundImage: `url(${logo})`,
    backgroundSize: "100%, 100%",
    width: "80%",
    height: "50%",
    minWidth: "380px",
    minHeight: "350px",
  },
  buttonsPan: {
    width: "100%",
    height: "8%",
    marginTop: "15%",
    minWidth: "380px",
    minHeight: "20px",
    display: "flex",
  },
  button1: {
    width: "200px",
    height: "100%",
    display: "flex",
  },
  btnSpan: {
    width: "30%",
  },
  button1logo: {
    width: "50px",
    marginLeft: "-200px",
    height: "100%",
    backgroundImage: `url(${logo1})`,
    backgroundSize: "100%, 100%",
    backgroundRepeat: "round",
    minHeight: "50px",
  },
  button2logo: {
    width: "60px",
    height: "50px",
    marginLeft: "-200px",
    backgroundImage: `url(${logo2})`,
    backgroundSize: "100%, 100%",
    backgroundRepeat: "round",
  },
  btn1main: {
    width: "170px",
    height: "100%",
    marginLeft: "30px",
    background: "#641284",
    borderRadius: "20px",
    padding: "10px",
    color: "white",
    fontFamily: "Arial Black",
    fontSize: "24px",
    textAlign: "center",
    "&:hover": {
      boxShadow: "black",
      borderRadius: "30px",
    },
  },
  gamePan: {
    position: "relative",
    width: "45%",
    height: "100%",
    marginTop: "50px",
    minWidth: "420px",
    minHeight: "650px",
    background: "#641284",
    borderRadius: "20px",
    display: "flex",
  },
  productPan: {
    position: "absolute",
    width: "52%",
    height: "90%",
    marginLeft: "5%",
    marginTop: "5%",
    minWidth: "300px",
  },
  counterPan: {
    position: "absolute",
    width: "30%",
    height: "90%",
    marginLeft: "65%",
    marginTop: "5%",
  },
  picPan: {
    width: "100%",
    height: "70%",
    marginTop: "5%",
    // backgroundImage: `url(${defaultProduct})`,
    backgroundSize: "100% 100%",
  },
  inputPan: {
    width: "100%",
    height: "50px",
    marginTop: "30px",
    background: "white",
  },
  input: {
    width: "100%",
    marginTop: "2px",
    fontSize: "30px",
    fontFamily: "Britannic Bold",
    fontWeight: "bold",
    color: "#641284",
    borderBottomColor: "#222",
    borderBottomWidth: "30px",
  },
  counter: {
    width: "220px",
    height: "220px",
    marginTop: "100px",
  },
  price: {
    width: "220px",
    height: "70px",
    marginTop: "100px",
    background: "#E03889",
    borderRadius: "20px",
    fontFamily: "Algerian",
    fontSize: "50px",
    color: "white",
    textAlign: "center",
    display: "flex",
  },
  dolar: {
    width: "70px",
    height: "70px",
  },
  dolarLabel: {
    width: "100px",
    height: "70px",
  },
});

export default function Room() {
  const [picUrl, setPicUrl] = useState("");

  useEffect(() => { }, [picUrl]);

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



function Mousedown(e) {
  // console.log("a");
  const id = e.target.id;
  console.log(id);
  var controller = document.getElementById(id);
  controller.className = "startButtonDown";
  // e.target.class = "button2logo"
}

function RoomLaptop(roomInfo) {

  const location = useLocation();
  //const [baseUrl, setBaseUrl] = useState(url('../assets/img/demoProduct.png'));
  //const img = url({baseUrl});
  const [myStyle, setMyStyle] = useState({ backgroundImage: "url('https://media.geeksforgeeks.org/wp-content/uploads/rk.png')" });
  const [startFlag, setStart] = useState(false);
  const PictureFetch = async () => {
    await loadData()
      .then((res) => {
        console.log(res.data.url)
        setMyStyle({ backgroundImage: `url(${res.data.url})` });
        //window.document.getElementById("product").backgroundImage = res.data.url;
        console.log(window.document.getElementById("product"));
      })
      .catch((error) => alert(error));
  }

  const Counting = async () => {
    setStart(true);
  };

  function GameStart() {
    PictureFetch();
    Counting();
  }

  const classes = useStyles();
  const user1 = roomInfo.roomInfo.user1;
  const user2 = roomInfo.roomInfo.user2;

  return (
    <div style={{ display: "flex", overflowY: "auto" }}>

      <div>url: {location.state.url}</div>
      <div>user1: {location.state.user1}</div>
      <div>user2: {location.state.user2}</div>
      <div>isFull: {location.state.isFull}</div>
      <div>Amount: {location.state.amount}</div>

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
        <div className={classes.logo}></div>
        <div className={classes.buttonsPan}>
          <div className={classes.button1}>
            {/* <IconButton className={classes.btn1main} variant="contained" color="primary">Start</IconButton> */}
            <button
              id="GameStart"
              className={classes.btn1main}
              onClick={GameStart}
            >
              Start
            </button>
            {/* <Button variant="contained" color="secondary" startIcon={<SmileIcon />}>
              Button
            </Button> */}
            <div className={classes.button1logo}></div>
          </div>
          <span className={classes.btnSpan}></span>
          <div className={classes.button1}>
            <button className={classes.btn1main}>Exit</button>
            <div className={classes.button2logo}></div>
          </div>
        </div>
      </div>
      <span style={{ width: "150px" }}></span>
      <div className={classes.gamePan}>
        <div className={classes.productPan}>
          <div
            style={{
              textAlign: "center",
              color: "white",
              fontFamily: "Arial Black",
              fontSize: "30px",
            }}
          >
            Description
          </div>
          <div id="product" className={classes.picPan} style={myStyle}></div>
          <div className={classes.inputPan}>
            <Input className={classes.input} placeholder="$"></Input>
          </div>
        </div>
        <div className={classes.counterPan}>
          <div className={classes.counter}>
            <Counter startFlag={startFlag} />
          </div>
          <div className={classes.price}>
            <div className={classes.dolar}>$</div>
            <div className={classes.dolarLabel}>?</div>
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
