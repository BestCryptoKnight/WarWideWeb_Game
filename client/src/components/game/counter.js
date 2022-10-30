import React, { useEffect, useState } from "react";
import "../../styles/counter.css";
import { useSelector, useDispatch } from "react-redux";
import { GAME_START } from "../../store/action/constants";

const Counter = (props) => {
  const [countdown, setCount] = useState(10);
  const isStart = useSelector((state) => state.gameStart);
  const dispatch = useDispatch();
  const socket = props.socket;
  const bidValue = props.gameValue;
  const username = props.username;
  const price = props.price;
  const amount = props.amount;

  const timer = new Promise((resolve, reject) => {
    setInterval(function () {
      return resolve();
    }, 1000);
  });


  useEffect(() => {
    const tmp = async () => {
      //countdown = --countdown <= 0 ? 10 : countdown;
      await timer;
      if (countdown > 1) setCount(countdown - 1);
      else {
        setCount(10);
        socket.emit("setwinner", { username: username, bidValue: bidValue, price: price, amount: amount })
        dispatch({ type: GAME_START, payload: false });
      }
    };
    isStart ? tmp() : console.log("start game");

  }, [countdown]);
  return (
    <div id="countdown">
      <div id="countdown-number">{countdown}</div>
      <svg>
        <circle r="18" cx="20" cy="20"></circle>
      </svg>
    </div>
  );
};

export default Counter;
