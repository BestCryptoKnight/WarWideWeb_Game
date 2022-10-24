import { Fragment, useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router';

import "../styles/room.css";
import { makeStyles } from "@material-ui/core/styles";
import Profile from "../components/dashboard/profile";
import Counter from "../components/game/counter";
import { getAvailability } from "../api/balanceApi";
import { useMediaQuery } from "react-responsive";
import logo from "../assets/img/logo3.png";
import logo1 from "../assets/img/startbtnLogo.png";
import logo2 from "../assets/img/exitbtnLogo.png";
import defaultProduct from "../assets/img/demoProduct.png";
import { loadData } from "../api/RoomApi";
import { Input } from "@material-ui/core";
import { GAME_START } from "../store/action/constants";
import { useSelector, useDispatch } from "react-redux";

import io from "socket.io-client";
import { BACKEND_URL } from "../constants";

const socket = io.connect(BACKEND_URL);

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
  const location = useLocation();
  const url = location.state.url;
  const user1 = location.state.user1;
  const user2 = location.state.user2;
  const isFull = location.state.isFull;
  const Amount = location.state.amount;
  // const [isFirst, setFirst] = useState(false);

  if (user2 == "") {
    socket.emit("joinRoom", { username: user1, room: url });
  } else {
    socket.emit("joinRoom", { username: user2, room: url });
  }

  console.log(user1, "-------------------user1");
  console.log(user2, "-------------------user2");

  const [picUrl, setPicUrl] = useState("");
  const [socketUser2, setSocketUser2] = useState(user2);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    socket.on("message", (data) => {
      if (data.users.length != 1) {
        setIsFilled(true);
        setSocketUser2(data.users[1].username);
      }
      // setSocketUser2(data.users[1].username);
    });
  }, [isFilled]);

  let isLaptopOrMobile = useMediaQuery({
    minWidth: 430,
  });

  const classes = useStyles();
  return (
    <div className={classes.mainboard}>
      {isLaptopOrMobile ? (
        <RoomLaptop
          user1={user1}
          socketUser2={socketUser2}
          isFilled={isFilled}
          room={url}
        />
      ) : (
        <RoomMobile />
      )}
    </div>
  );
}

function RoomLaptop(state) {
  const dispatch = useDispatch();
  const isStart = useSelector((state) => state.gameStart);

  const user1 = state.user1;
  const user2 = state.socketUser2;
  const isFull = state.isFilled;
  const room = state.room;
  const [myStyle, setMyStyle] = useState({
    backgroundImage: `url(${defaultProduct})`,
  });
  const [startFlag, setStart] = useState(false);
  const [isFirst, setFirst] = useState(false);
  const [bidValue, setBid] = useState();
  const [chatText, setText] = useState();
  const [chatReceive, setReceive] = useState("");

  const classes = useStyles();

  useEffect(() => {
    let username = "";
    if (user2 == "") {
      setFirst(true);
      username = user1;
    } else username = user2;
    socket.on("start", () => {
      setStart(true);
      dispatch({ type: GAME_START, payload: true });
    });
    socket.on("valid", () => {
      // let valid = getAvailability(username);
      if (true) {
        socket.emit("valid", { username: username, room: room });
      } else {
        alert("Not enough deposit");
      }
    });
    socket.on("winner", (data) => {
      // let valid = getAvailability(username);
      console.log(data.winner.user);
      // if(data.winner.user == username) alert(username + "You win");
      // else alert("You lost");
      // alert(data.winner.user + "win");
    });
    socket.on("chat", (data) => {
      console.log(data.text);
      document.getElementById("chat").value = data.text;
      // setReceive(data.text);
    });
    setWinner();
    PictureFetch();
  }, [isFirst, startFlag, isStart]);

  function GameStart() {
    if (user2 == "") {
      socket.emit("start", { username: user1, room: room });
    } else {
      socket.emit("start", { username: user2, room: room });
    }
  }
  function setWinner() {
    if (!isStart && bidValue != "") {
      socket.emit("winner", { bidValue: bidValue });
      // console.log(bidValue);
    }
  }
  const PictureFetch = async () => {
    if (startFlag) {
      await loadData()
        .then((res) => {
          console.log(res.data.url);
          setMyStyle({ backgroundImage: `url(${res.data.url})` });
          console.log(window.document.getElementById("product"));
        })
        .catch((error) => alert(error));
    }
  };

  const handleChange = (e) => {
    setBid(e.target.value);
  };

  /////////chat
  const handleChatChange = (e) => {
    setText(e.target.value);
  };
  const sendData = (e) => {
    if (chatText !== "") {
      //encrypt the message here
      socket.emit("chat", chatText);
      setText("");
    }
  };
  return (
    <div style={{ display: "flex", overflowY: "auto" }}>
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
        {isFull ? (
          <div className={classes.buttonsPan}>
            {isFirst && !isStart ? (
              <div className={classes.button1}>
                <button
                  id="GameStart"
                  className={classes.btn1main}
                  onClick={GameStart}
                >
                  Start
                </button>
                <div className={classes.button1logo}></div>
              </div>
            ) : (
              <div />
            )}

            <span className={classes.btnSpan}></span>
            <div className={classes.button1}>
              <button className={classes.btn1main}>Exit</button>
              <div className={classes.button2logo}></div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
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
            <Input
              className={classes.input}
              placeholder="$"
              onChange={handleChange}
              type="number"
            ></Input>
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
      <div>
        <input
          onChange={handleChatChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendData();
            }
          }}
        ></input>
        <input id="chat"></input>
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
