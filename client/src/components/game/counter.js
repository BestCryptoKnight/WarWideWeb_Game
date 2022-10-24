import React, { useEffect, useState } from "react";
import "../../styles/counter.css";

const Counter = () => {
  const [countdown, setCount] = useState(10);
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
      }
    };
    tmp();
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
