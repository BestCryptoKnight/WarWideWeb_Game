import React, { useState } from "react";

const FaqItem = (props) => {
  const [flag, setFlag] = useState(false);
  const handleClick = (e) => {
    if (flag) {
      setFlag(false);
    } else {
      setFlag(true);
    }
  };
  return (
    <div className="faq-item" onClick={handleClick} id={props.id}>
      <div className="faq-item__title">
        <h5 className="title">{props.title}</h5>
      </div>
      {flag ? (
        <div className="faq-item__content">
          <p>{props.content}</p> :
        </div>
      ) : (
        <div className="faq-item__content-display"></div>
      )}
    </div>
  );
};

export default FaqItem;
