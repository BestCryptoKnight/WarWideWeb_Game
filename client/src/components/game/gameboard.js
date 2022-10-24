import React, { useEffect, useState } from "react";
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
  const [isFilled, setIsFilled] = useState(false);

  const classes = useStyles();

  const location = useLocation();
  const roomname = location.state.url;
  const user1 = location.state.user1;
  const user2 = location.state.user2;

  const Amount = location.state.amount;

  let username = '';
  let otheruser = '';

  // let username = user1;
  // let otheruser = user2;
  const boardAnimation = () => {
    {
      isLaptopOrMobile
        ? animationFunc("gameboard", "game-mainboard")
        : animationFunc("gameboard", "game-mainboard-mobile");
    }
  };

  const setUsers = () => {
    if (user2 != "") {
      username = user2;
      otheruser = user1;
    }else{
      username = user1;
      otheruser = user2;
    }
  };

  const socketMonitor = () => {
    socket.emit("joinRoom", { username: username, room: roomname });
    socket.on("message", (data) => {
      if (data.users.length != 1) {
        setIsFilled(true);
        
        console.log(username, "----------------")
        // setOtheruser(data.users[1].username);
      }
      console.log(data);
    });
  };
  useEffect(() => {
    {
      boardAnimation();
      setUsers();
      socketMonitor();
    }
  }, [username, isFilled]);

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
            <div className="realPic" />
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
                        size="small"
                        id="outlined-basic"
                        variant="outlined"
                        className={classes.root}
                        defaultValue=""
                        label="$"
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
                <Counter />
              </div>
              <div className="place-guess-btn"></div>
            </div>
            <div className="changeroom-addfund">
              <div className="changeroom">CHANGE ROOM</div>
              <div className="changeroom">ADD FUNDS</div>
            </div>
            <div className="chat-board">
              <Chat></Chat>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameBoard;
