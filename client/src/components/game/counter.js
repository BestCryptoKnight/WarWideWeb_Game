import React, { useState, useRef, useEffect } from "react";
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

const STATUS = {
  STARTED: "Started",
  STOPPED: "Stopped",
};

const INITIAL_COUNT = 10;

const useStyles = makeStyles({
  mainprofile: {
    background: "#E03889",
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    textAlign: "center",
    fontFamily: "Algerian",
    fontSize: "60px",
    paddingTop: "70px",
    color: "white",
  },
});

export default function Counter(info) {
  const start = info.startFlag;
  console.log(start)
  const classes = useStyles();
  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_COUNT);
  const [status, setStatus] = useState(STATUS.STOPPED);
  const secondsToDisplay = secondsRemaining % 60;
  const minutesRemaining = (secondsRemaining - secondsToDisplay) / 60;
  const minutesToDisplay = minutesRemaining % 60;
  const hoursToDisplay = (minutesRemaining - minutesToDisplay) / 60;

  const handleStart = () => {
    console.log(start)
    // console.log(info.startFlag)
    // info.startFlag ? setStatus(STATUS.STARTED) : setStatus(STATUS.STOPPED);
    // if (start) {
      setStatus(STATUS.STARTED);
    // }
  };
  const handleStop = () => {
    setStatus(STATUS.STOPPED);
  };
  const handleReset = () => {
    setStatus(STATUS.STOPPED);
    setSecondsRemaining(INITIAL_COUNT);
  };
  useInterval(
    () => {
      if (secondsRemaining > 0) {
        setSecondsRemaining(secondsRemaining - 1);
      } else {
        setStatus(STATUS.STOPPED);
      }
    },
    status === STATUS.STARTED ? 1000 : null
    // passing null stops the interval
  );
  //   const Ref = useRef(null);

  //   const [timer, setTimer] = useState("00:00:00");
  //   const [startFlag, setStart] = useState(false);
  //   //   const startFlag = info.startFlag;
  //   const getTimeRemaining = (e) => {
  //     const total = Date.parse(e) - Date.parse(new Date());
  //     const seconds = Math.floor((total / 1000) % 60);
  //     const minutes = Math.floor((total / 1000 / 60) % 60);
  //     const hours = Math.floor((total / 1000 / 60 / 60) % 24);
  //     return {
  //       total,
  //       hours,
  //       minutes,
  //       seconds,
  //     };
  //   };
  //   const startTimer = (e) => {
  //     let { total, hours, minutes, seconds } = getTimeRemaining(e);
  //     if (total >= 0) {
  //       // update the timer
  //       // check if less than 10 then we need to
  //       // add '0' at the beginning of the variable
  //       setTimer(
  //         (hours > 9 ? hours : "0" + hours) +
  //           ":" +
  //           (minutes > 9 ? minutes : "0" + minutes) +
  //           ":" +
  //           (seconds > 9 ? seconds : "0" + seconds)
  //       );
  //     }
  //   };

  //   const clearTimer = (e) => {
  //     setTimer("00:00:10");
  //     if (Ref.current) clearInterval(Ref.current);
  //     const id = setInterval(() => {
  //       startTimer(e);
  //     }, 1000);
  //     Ref.current = id;
  //     // console.log(Ref.current)
  //   };

  //   const getDeadTime = () => {
  //     let deadline = new Date();
  //     deadline.setSeconds(deadline.getSeconds() + 10);
  //     return deadline;
  //   };
  //   const onClickReset = async () => {
  //     clearTimer(getDeadTime());
  //   };
  //   let number = 10;
  useEffect(() => {
    handleStart();
    // if (info.startFlag) {
    //   handleStart();
    // }
    //handleStart();
  }, []);

  //   setStart(true);
  //   let number = timer.split(":")[2];
  //   if(number == "00") {alert('s')}
  //   const user = info.user;
  //   console.log(info.user);
  // const navigate = useNavigate();
  return (
    <div className={classes.mainprofile}>
      {twoDigits(hoursToDisplay)}:{twoDigits(minutesToDisplay)}:
      {twoDigits(secondsToDisplay)}
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
