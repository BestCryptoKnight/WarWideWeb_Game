import React from 'react';
import { useRoutes } from "react-router-dom";

import Homepage from "../pages/homepage";
import Room from "../pages/room";
import Admin from '../pages/admin';
///////////////////others/////////////////////////
import HowToPlay from "../pages/other/howtoplay";
import Rule from "../pages/other/rules";
import Faq from '../pages/other/faq';
import Contact from '../pages/other/contact';
////////////////////auth////////////////////////////
import SignUp from "../pages/auth/signup";
import SignIn from "../pages/auth/signin";
////////////////////////////////////////////////////
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
      path: '/signup',
      element: <SignUp />
    },
    {
      path: '/signin',
      element: <SignIn />
    },
    {
      path: "game/room",
      element: <GameRoom />
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
      path: '/faq',
      element: <Faq />
    },
    {
      path: '/contact',
      element: <Contact />
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