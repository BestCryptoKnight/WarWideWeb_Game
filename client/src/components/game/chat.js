import "../../styles/gameboard.scss";
// import { process } from "../store/action/index";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { BeatLoader } from "react-spinners";
import { profileNameSpilit } from "../../functions/nameSplit";

//gets the data from the action object and reducers defined earlier
function Chat({ username, otheruser, socket }) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState(null);
  const [isWriting, setIsWriting] = useState(false);

  const [isCreator, setIsCreator] = useState(otheruser === "" ? true : false);
  const pushNewMessage = (newMsg) => {
    messages.push(newMsg);
    setMessages([...messages]);
  };

  const joinedInform = () => {
    pushNewMessage({
      name: username,
      text: profileNameSpilit(otheruser) + " created this room",
    });
    pushNewMessage({
      name: otheruser,
      text: profileNameSpilit(username) + " joined this room",
    });
  };
  const createdInform = () => {
    pushNewMessage({
      name: username,
      text: profileNameSpilit(username) + " created this room",
    });
  };

  const onChat = (data) => {
    //decypt the message
    setNewMsg({
      name: data.username,
      text: data.text,
    });
  };

  const handleChange = (e) => {
    setText(e.target.value);
    socket.emit("writing");
  };
  const socketMonitor = () => {
    socket.on("chat", onChat);
    socket.on("message", (data) => {
      if (data.users.length > 1) {
        data.users[0].username === username
          ? pushNewMessage({
            name: data.users[1].username,
            text: profileNameSpilit(data.users[1].username) + " joined this room",
          })
          : console.log("");
      }
    });
    socket.on("writing", async () => {
      setIsWriting(true);
      setTimeout(() => {
        setIsWriting(false);
      }, 2000);
    });
  };
  useEffect(() => {
    if (newMsg !== null) pushNewMessage(newMsg);
  }, [newMsg]);

  useEffect(() => {
    isCreator ? createdInform() : joinedInform();
    socketMonitor();
    return () => {
      setMessages([]);
      setText("");
      setNewMsg("")
    };
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
      {isWriting ? <BeatLoader color="#FFF" margin={2} size={8} /> : <span />}

      <span style={{ height: "5px" }}></span>

      <div className="send">
        <input
          placeholder="enter your message"
          value={text}
          onChange={handleChange}
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
