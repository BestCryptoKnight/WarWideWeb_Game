import React, { useEffect, useState } from "react";
import "../../styles/gameboard.scss";
import { useMediaQuery } from "react-responsive";
import { makeStyles } from "@material-ui/core/styles";
import Counter from "./counter";
import { TextField } from "@mui/material";
import Chat from "./chat";
import {animationFunc} from "../../functions/animations"

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

const GameBoard = () => {
  let isLaptopOrMobile = useMediaQuery({
    minWidth: 430,
  });

  const classes = useStyles();

  useEffect(() => {
    {isLaptopOrMobile? animationFunc("gameboard", "game-mainboard") : animationFunc("gameboard", "game-mainboard-mobile")}
  }, []);

  return (
    <>
      <div
        className={isLaptopOrMobile ? "gameboard-laptop" : "gameboard-mobile"}
      >
        <div
          id="gameboard"
          className={
            isLaptopOrMobile ? "game-mainboard-anim" : "game-mainboard-mobile-anim"
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
                  <div className="userName">Esai111</div>
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
                      <div className="room-price">1$</div>
                    </div>
                  </div>
                </div>
                <div className="vs-second">
                  <div className="vs-second-logo" />
                  <div className="userName">Hades</div>
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
