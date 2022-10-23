import React from 'react';
import { useRoutes } from "react-router-dom";

import Homepage from "../pages/homepage";
import Room from "../pages/room";
import Admin from '../pages/admin';
import HowToPlay from "../pages/howtoplay";
import Rule from "../pages/rules";
import SignUp from "../pages/signup";
import SignIn from "../pages/signin";
// import GamePage from '../pages/game';
import GameRoom from '../pages/gameroom';
import GamePage from '../pages/game';

export default function Router() {
  const router = [
    {
      path: "/",
      element: <Homepage />
    },
    {
      path: "main/room",
      element: <Room />
    },
    {
      path: "/admin",
      element: <Admin />
    },
    {
      path: '/rules',
      element: <Rule />
    },
    {
      path: '/howtoplay',
      element: <HowToPlay />
    },
    {
      path: '/signup',
      element: <SignUp />
    },
    {
      path: '/signin',
      element: <SignIn />
    },
    {
      path: '/game',
      element: <GamePage />
    },
    {
      path: '/playroom',
      element: <GameRoom />
    }
  ];

  return useRoutes(router);
}