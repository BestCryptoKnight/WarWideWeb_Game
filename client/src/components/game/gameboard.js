import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import "../../styles/gameboard.scss";
import "../../styles/modal.css";
import { useMediaQuery } from "react-responsive";
import { makeStyles } from "@material-ui/core/styles";
import Counter from "./counter";
import { leaveRoom } from '../../api/RoomApi'
import Chat from "./chat";
import { animationFunc } from "../../functions/animations";
import Spinner from "./spinner";
import io from "socket.io-client";
import { BACKEND_URL } from "../../constants";
import toast from "react-hot-toast";
import {
  GAME_START,
  SET_WINNER,
} from "../../store/action/constants";
import defaultProduct from "../../assets/img/picDemo.png";
import GameEnd from "./gameEndDialog";
import StartButton from "./start";
import { getBalance } from "../../api/balanceApi";

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
  const amount = location.state.amount;

  const [joinReq, setJoinReq] = useState(false);
  const [username, setUserName] = useState(user2 === "" ? user1 : user2);
  const [otheruser, setOtheruser] = useState(user2 === "" ? user2 : user1);
  const [userValue, setUserValue] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('Description Here');
  const [isFilled, setIsFilled] = useState(false);
  const [winner, setWinner] = useState({});
  const [myStyle, setMyStyle] = useState({
    backgroundImage: `url(${defaultProduct})`,
  });

  const isStart = useSelector((state) => state.gameStart);
  const isSetWinner = useSelector((state) => state.setWinner);

  const dispatch = useDispatch();

  const boardAnimation = () => {
    isLaptopOrMobile
      ? animationFunc("gameboard", "game-mainboard")
      : animationFunc("gameboard", "game-mainboard-mobile");
  };

  const handleCHange = (e) => {
    setUserValue(e.target.value);
  };

  const socketMonitor = () => {
    joinReq
      ? console.log("received")
      : socket.emit("joinRoom", { username: username, room: roomname });
    socket.on("message", (data) => {
      setJoinReq(true);
      if (data.users.length > 1) {
        setIsFilled(true);
        setOtheruser(
          data.users[0].username === username
            ? data.users[1].username
            : data.users[0].username
        );
      }
    });
    socket.on("startReq", (data) => {
      const reqUser = data.username;
      toast.success(reqUser + " is waiting for you now.");
    });
    socket.on("start", (data) => {
      dispatch({ type: GAME_START, payload: true });
      console.log(data);
      if(data){
        setMyStyle({ backgroundImage: `url(${data.url})` });
        setPrice(data.price);
        setDescription(data.description);
      }
      else{
        console.log('No Data.')
      }
    });
    socket.on("winner", (data) => {
      dispatch({ type: SET_WINNER, payload: true });
      setWinner(data);
    });
    socket.on("discon", (data) => {
      console.log("disconnected");
      toast.error(data.username + " left the room");
      navigate("/dashboard");
    });
  };

  const socketDisconnect = async () => {
    await socket.emit("discon");
    isFilled ? console.log("ss") : leaveRoom(user1, amount);
    socket.removeListener("message");
    socket.removeListener("startReq");
    socket.removeListener("start");
    socket.removeListener("winner");
    socket.removeListener("discon");
  };
  useEffect(() => {
    boardAnimation();
    socketMonitor();
    getBalance(dispatch);

    return () => {
      socketDisconnect();
      setJoinReq(false);
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
                    <i className="fa fa-usd icon"></i>
                    <input type="number" className="vs-input" step={0.1} onChange={handleCHange} />
                  </div>
                  <div className="room-price">{amount}ETH</div>
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
                      <div className="waiting">waiting.. </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="description">{description}</div>
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
              <StartButton name={username} amount={amount} socket={socket} room={roomname} isFilled={isFilled} />
            </div>
            <div className="changeroom-addfund">
              <div
                className="changeroom"
                onClick={() => navigate("/dashboard")}
              >
                CHANGE ROOM
              </div>
              <div className="changeroom" onClick={() => { }}>
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

      {winner === {} ? (
        <div />
      ) : (
        <GameEnd data={winner} username={username}></GameEnd>
      )}
    </>
  );
};

export default GameBoard;
