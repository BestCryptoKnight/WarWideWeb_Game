import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

import { GAME_START } from "../../store/action/constants";

const STATUS = {
  STARTED: "Started",
  STOPPED: "Stopped",
};

const INITIAL_COUNT = 10;

const useStyles = makeStyles({
  mainprofile: {
    // background: "#E03889",
    border:"1px solid #B32B4C",
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    textAlign: "center",
    fontFamily: "Myriad Pro",
    fontSize: "35px",
    color: "white",
    marginLeft:'auto',
    marginRight: 'auto',
    alignContent:'center'
  },

});

export default function Counter(info) {
  const start = info.startFlag;
  const classes = useStyles();
  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT);
  const [status, setStatus] = useState(STATUS.STOPPED);
  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;
  const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60;

  const dispatch = useDispatch();
  const isStart = useSelector((state) => state.gameStart);

  // const isStart = useSelector(GameState => GameState.GameState);
  const handleStart = () => {
    console.log(start, "10101010");
    isStart ? setStatus(STATUS.STARTED) : setStatus(STATUS.STOPPED);
  };
  const handleStop = () => {
    setStatus(STATUS.STOPPED);
  };
  const handleReset = () => {
    if (isStart) {
      setStatus(STATUS.STOPPED);
      setSecondsRemaining(INITIAL_COUNT);
    }
  };

  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      } else {
        setStatus(STATUS.STOPPED);
        // timer finish detect
        // console.log(isStart);
        dispatch({ type: GAME_START, payload: false });
        handleReset();
      }
    },
    status === STATUS.STARTED ? 1000 : null
    // passing null stops the interval
  );

  useEffect(() => {
    handleStart();
  }, [isStart]);

  return (
    <div className={classes.mainprofile}>
      {twoDigits(secondsToDisplay)}
      {/* {twoDigits(hoursToDisplay)}:{twoDigits(minutesToDisplay)}: */}
    </div>
  );
}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

// https://stackoverflow.com/a/2998874/1673761
const twoDigits = (num) => String(num).padStart(2, "0");
