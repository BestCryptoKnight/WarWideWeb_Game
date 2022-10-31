import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import "../../styles/gameboard.scss";
import "../../styles/modal.css";
import { useMediaQuery } from "react-responsive";
import Counter from "./counter";
import { leaveRoom } from "../../api/RoomApi";
import Chat from "./chat";
import { profileNameSpilit } from "../../functions/nameSplit";

import Spinner from "./spinner";
import io from "socket.io-client";
import { BACKEND_URL } from "../../constants";
import toast from "react-hot-toast";
import { GAME_START, SET_WINNER } from "../../store/action/constants";
import defaultProduct from "../../assets/img/picDemo.png";
import GameEnd from "./modals/gameEndDialog";
import StartButton from "./buttons/start";
import { getBalance } from "../../api/balanceApi";
import AddFund from "./buttons/addFund";
import { useAuth } from "../../contexts/AuthContext";

const socket = io.connect(BACKEND_URL);

const GameBoard = () => {
  let isLaptopOrMobile = useMediaQuery({
    minWidth: 430,
  });

  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/signin')
    }
    return () => {
      setJoinReq(false);
      setIsFilled(false);
      setWinner({});
    }
  }, [isLoggedIn, navigate])

  const location = useLocation();
  const roomname = location.state.url;
  const user1 = location.state.user1;
  const user2 = location.state.user2;
  const amount = location.state.amount;

  const [joinReq, setJoinReq] = useState(false);
  const username = user2 === "" ? user1 : user2;
  const [otheruser, setOtheruser] = useState(user2 === "" ? user2 : user1);
  const [userValue, setUserValue] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("Description Here");
  const [isFilled, setIsFilled] = useState(false);
  const [winner, setWinner] = useState({});
  const [myStyle, setMyStyle] = useState({
    backgroundImage: `url(${defaultProduct})`,
  });

  const isStart = useSelector((state) => state.gameStart);
  let displayName = profileNameSpilit(username);
  let otherName = profileNameSpilit(otheruser);

  const dispatch = useDispatch();

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
      if (data) {
        setMyStyle({ backgroundImage: `url(${data.url})` });
        setPrice(data.price);
        setDescription(data.description);
      } else {

      }
    });
    socket.on("winner", async (data) => {
      await getBalance(dispatch);
      dispatch({ type: SET_WINNER, payload: true });
      setWinner(data);
    });
    socket.on("discon", (data) => {
      toast.error(data.username + " left the room");
      navigate("/dashboard");
    });
  };

  const socketDisconnect = async () => {
    await socket.emit("discon");
    isFilled ? console.log("ss") : leaveRoom(user1, amount);
    socket.removeListener("connection");
    socket.removeListener("message");
    socket.removeListener("startReq");
    socket.removeListener("start");
    socket.removeListener("winner");
    socket.removeListener("discon");
    document.removeEventListener("keydown", my_onkeydown_handler);
  };
  function my_onkeydown_handler(event) {
    switch (event.keyCode) {
      case 116: // 'F5'
        event.returnValue = false;
        break;
      default: return 0;
    }
  }
  useEffect(() => {
    socketMonitor();
    getBalance(dispatch);

    document.addEventListener("keydown", my_onkeydown_handler);

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
            isLaptopOrMobile ? "game-mainboard" : "game-mainboard-mobile"
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
                  <div className="userName">{displayName}</div>
                </div>
                <div className="vs-bid-label">
                  <div className="vs-bid-value">
                    <i className="fa fa-usd icon"></i>
                    <input
                      type="number"
                      className="vs-input"
                      step={0.1}
                      appearance="none"
                      margin={0}
                      onChange={handleCHange}
                    />
                  </div>
                  <div className="room-price">${amount}</div>
                </div>
                <div className="vs-second">
                  {isFilled ? (
                    <>
                      <div className="vs-second-logo" />
                      <div className="userName">{otherName}</div>
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
                    amount={amount}
                  />
                ) : (
                  <div></div>
                )}
              </div>
              <StartButton
                name={username}
                amount={amount}
                socket={socket}
                room={roomname}
                isFilled={isFilled}
              />
            </div>
            <div className="changeroom-addfund">
              <div
                className="changeroom"
                onClick={() => navigate("/dashboard")}
              >
                CHANGE ROOM
              </div>
              <AddFund />
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
