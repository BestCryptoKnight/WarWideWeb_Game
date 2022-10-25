import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import "../../styles/gameboard.scss";
import { useMediaQuery } from "react-responsive";
import { makeStyles } from "@material-ui/core/styles";
import Counter from "./counter";
import { TextField } from "@mui/material";
import Chat from "./chat";
import { animationFunc } from "../../functions/animations";
import Spinner from "./spinner";
import io from "socket.io-client";
import { BACKEND_URL } from "../../constants";
import toast from "react-hot-toast";
import { GAME_START, SET_WINNER } from "../../store/action/constants";
import { loadData } from "../../api/RoomApi";
import defaultProduct from "../../assets/img/picDemo.png";
import GameEnd from "./gameEndDialogue";

const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#824c6b",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#824c6b",
    },
    "& .MuiOutlinedInput-input": {
      color: "white",
    },
    "&:hover .MuiOutlinedInput-input": {
      color: "white",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
      color: "white",
    },
    "& .MuiInputLabel-outlined": {
      color: "#824c6b",
    },
    "&:hover .MuiInputLabel-outlined": {
      color: "white",
    },
    "& .MuiInputLabel-outlined.Mui-focused": {
      color: "white",
    },
  },
});

const socket = io.connect(BACKEND_URL);

const GameBoard = () => {
  let isLaptopOrMobile = useMediaQuery({
    minWidth: 430,
  });

  const navigate = useNavigate();
  const classes = useStyles();
  const location = useLocation();
  const roomname = location.state.url;
  const user1 = location.state.user1;
  const user2 = location.state.user2;
  const Amount = location.state.amount;

  const [joinReq, setJoin] = useState(false);
  const [username, setUser] = useState(user2 === "" ? user1 : user2);
  // const [isCreate, setCreate] = useState(user2 ==="" ? false : true);
  const [otheruser, setOtheruser] = useState(user2 === "" ? user2 : user1);
  const [startGame, setStartGame] = useState(false);
  const [userValue, setUserValue] = useState("");
  const [price, setPrice] = useState(100);
  const [isFilled, setIsFilled] = useState(false);
  const [myStyle, setMyStyle] = useState({
    backgroundImage: `url(${defaultProduct})`,
  });

  const isStart = useSelector((state) => state.gameStart);
  const dispatch = useDispatch();

  const PictureFetch = async () => {
    isStart
      ? await loadData()
          .then((res) => {
            setMyStyle({ backgroundImage: `url(${res.data.url})` });
          })
          .catch((error) => alert(error))
      : console.log("start game");
  };

  const boardAnimation = () => {
    isLaptopOrMobile
      ? animationFunc("gameboard", "game-mainboard")
      : animationFunc("gameboard", "game-mainboard-mobile");
  };

  const userValidate = () => {
    return true;
  };

  const sendStartReq = () => {
    socket.emit("start", { username: username, room: roomname });
  };

  const handleMouseDown = (e) => {
    animationFunc("placeBid", "place-guess-btn-anim");
  };

  const handleMouseUp = (e) => {
    animationFunc("placeBid", "place-guess-btn");
    let isValid = userValidate();
    isValid ? sendStartReq() : toast.error("Not enough deposit");
  };

  const handleCHange = (e) => {
    setUserValue(e.target.value);
  };

  const socketMonitor = () => {
    joinReq
      ? console.log("received")
      : socket.emit("joinRoom", { username: username, room: roomname });
    socket.on("message", (data) => {
      setJoin(true);
      if (data.users.length > 1) {
        setIsFilled(true);
        setOtheruser(
          data.users[0].username == username
            ? data.users[1].username
            : data.users[0].username
        );
      }
    });
    socket.on("startReq", (data) => {
      const reqUser = data.username;
      toast.success(reqUser + " is waiting for you now.");
    });
    socket.on("start", () => {
      dispatch({ type: GAME_START, payload: true });
      setStartGame(true);
    });
    socket.on("winner", (data) => {
      dispatch({ type: SET_WINNER, payload: true });
    });
    socket.on("discon", (data) => {
      toast.error(data.username + "left the room");
      navigate("/dashboard");
    });
  };

  const socketDisconnect = async () => {
    await socket.emit("discon");
  };
  useEffect(() => {
    boardAnimation();
    socketMonitor();
    PictureFetch();

    return () => {
      socketDisconnect();
    };
  }, []);

  return (
    <>
      <div
        className={isLaptopOrMobile ? "gameboard-laptop" : "gameboard-mobile"}
      >
        <div
          id="gameboard"
          className={
            isLaptopOrMobile
              ? "game-mainboard-anim"
              : "game-mainboard-mobile-anim"
          }
        >
          <div
            className={
              isLaptopOrMobile ? "picture-board" : "picture-board-mobile"
            }
          >
            <div className="realPic" style={myStyle} />
          </div>
          <div
            className={
              isLaptopOrMobile ? "gameboard-main" : "gameboard-main-mobile"
            }
          >
            <div className="vs-pan">
              <div className="vs-main">
                <div className="vs-first">
                  <div className="vs-first-logo" />
                  <div className="userName">{username}</div>
                </div>
                <div className="vs-bid-label">
                  <div className="vs-bid-value">
                    <div>
                      <TextField
                        type="number"
                        size="small"
                        id="outlined-basic"
                        variant="outlined"
                        className={classes.root}
                        defaultValue=""
                        label="$"
                        onChange={handleCHange}
                      />
                      <div className="room-price">{Amount}$</div>
                    </div>
                  </div>
                </div>
                <div className="vs-second">
                  {isFilled ? (
                    <>
                      <div className="vs-second-logo" />
                      <div className="userName">{otheruser}</div>
                    </>
                  ) : (
                    <>
                      <Spinner />
                      <div
                        className="userName"
                        style={{ marginTop: "-50px", color: "white" }}
                      >
                        waiting..{" "}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="description">MCLAREN KIDS TOY</div>
            <div className="play-guess">
              <div className="counter">
                {isStart ? (
                  <Counter
                    socket={socket}
                    username={username}
                    gameValue={userValue}
                    price={price}
                  />
                ) : (
                  <div></div>
                )}
              </div>
              <div
                id="placeBid"
                className="place-guess-btn"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
              ></div>
            </div>
            <div className="changeroom-addfund">
              <div
                className="changeroom"
                onClick={() => navigate("/dashboard")}
              >
                CHANGE ROOM
              </div>
              <div
                className="changeroom"
                onClick={() =>
                  toast(
                    <button onClick={() => navigate("/dashboard")}>Yes</button>
                  )
                }
              >
                ADD FUNDS
              </div>
            </div>
            <div className="chat-board">
              <Chat
                username={username}
                roomname={roomname}
                socket={socket}
                otheruser={otheruser}
              ></Chat>
            </div>
          </div>
        </div>
      </div>
      <GameEnd></GameEnd>
    </>
  );
};

export default GameBoard;
