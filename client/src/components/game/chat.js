import "../../styles/gameboard.scss";
// import { process } from "../store/action/index";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
//gets the data from the action object and reducers defined earlier
function Chat({ username, otheruser, socket }) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState(null);
  const dispatch = useDispatch();

  const pushNewMessage = (newMsg) => {
    console.log(messages.length);
    messages.push(newMsg);
    setMessages([...messages]);
  };

  const onChat = (data) => {
    //decypt the message
    setNewMsg({
      name: data.username,
      text: data.text,
    });
  };

  useEffect(() => {
    if (newMsg !== null) pushNewMessage(newMsg);
  }, [newMsg]);

  useEffect(() => {
    socket.on("chat", onChat);
  }, []);

  const sendData = () => {
    if (text !== "") {
      socket.emit("chat", text);
      setText("");
      setNewMsg({
        name: username,
        text: text,
      });
    }
  };
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="chat">
      <div className="chat-message">
        {/* <div className="message inform">
          {otheruser != "" ? (
            <p> {username} "created this room"</p>
          ) : (
            <p> {otheruser} joined </p>
          )}
        </div> */}
        {/* <div className="message inform">
          {otheruser == "" ? (
            <p>{username} created the room</p>
          ) : (
            <p>{otheruser} joined this room</p>
          )}
        </div> */}
        {messages.map((item, idx) => {
          return (
            <div
              key={idx}
              className={
                item.name === username ? "message" : "message mess-right"
              }
            >
              <p>{item.text}</p>
              <span>{item.username}</span>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      <span style={{ height: "5px" }}></span>
      <div className="send">
        <input
          placeholder="enter your message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendData();
            }
          }}
        ></input>
        <button onClick={sendData}>Send</button>
      </div>
    </div>
  );
}
export default Chat;
