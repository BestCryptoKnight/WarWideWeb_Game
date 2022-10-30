import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { joinRoom } from "../../api/RoomApi";
import toast from "react-hot-toast";
import { useAuth } from "../../contexts/AuthContext";
import { getAvailability, payFee, getBalance } from "../../api/balanceApi";
import { FEE } from "../../constants";
import "../../styles/room.css";

const Room = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const balance = useSelector(state => state.getBalance);
  const { account } = useAuth();

  const handleClick = async (e) => {
    e.preventDefault();
    const isPayFee = await getAvailability(account.name);
    if (!isPayFee) {
      if (balance >= FEE) {
        await payFee(account.name)
        toast.success('You paid FEE. You could enjoy next 24 hours')
        await getBalance(dispatch);
        if (balance >= props.value)
          enterRoom()
        else
          toast.error("You have not enough deposit.")
      }
      else {
        toast.error("You have not enough deposit.")
      }
    }
    else {
      if (balance >= props.value)
        enterRoom();
      else
        toast.error("You have not enough deposit.")
    }
  };

  const enterRoom = async () => {
    const data = await joinRoom(props.value);
    navigate(`${data.url}`, { state: { ...data } });
  }

  return (
    <div className="room">
      <div className="room-container">
        <div className="image-box">
          <div className={props.roomImg} />
        </div>
        <div className="invest-text">Invest Amount</div>
        <div className="text-price">${props.value}</div>
        <div className="play-button" onClick={handleClick}>
          Play Now
        </div>
      </div>
      <div className="room-big-circle"></div>
      <div className="room-small-circles"></div>
    </div>
  );
};

export default Room;
