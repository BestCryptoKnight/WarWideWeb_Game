import React, { useState } from "react";

const FaqItem = (props) => {
  const [flag, setFlag] = useState(false);
  const handleClick = () => {
    if (flag) {
      setFlag(false);
      document.getElementById(props.id).parentElement.classList.remove("open");
    } else {
      setFlag(true);

      for (let i = 0; i < 13; i++) {
        document.getElementById(i).className = "faq-item__content-display";
        document.getElementById(i).parentElement.classList.remove("open");

        document.getElementById(props.id).parentElement.classList.add("open");
      }
    }
  };
  return (
    <div className="faq-item" onClick={handleClick}>
      <div className="faq-item__title">
        <h5 className="title">{props.title}</h5>
      </div>
      {flag ? (
        <div className="faq-item__content" id={props.id}>
          <div>{props.content}</div>
        </div>
      ) : (
        <div className="faq-item__content-display" id={props.id}></div>
      )}
    </div>
  );
};

export default FaqItem;
