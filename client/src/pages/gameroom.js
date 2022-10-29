import React from "react";
import "../styles/gameroom.css";
import GameBoard from "../components/game/gameboard";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const GameRoom = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  useEffect(() => {
    if (!isLoggedIn)
      navigate('/signin')
  }, [isLoggedIn])
  return (
    <div>
      <GameBoard />
    </div>
  );

};

export default GameRoom;
