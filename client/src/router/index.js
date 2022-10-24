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
////////////////////////////////////////////////////
import MainBoard from '../pages/dashboard/mainboard';
import DepositBoard from '../pages/dashboard/depositboard';
import WithdrawBoard from '../pages/dashboard/withdrawboard';
import TransactionBoard from '../pages/dashboard/transactionboard';
import AccountBoard from '../pages/dashboard/accountboard';
import SecurityBoard from '../pages/dashboard/securityboard';

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
      path: "dashboard/room",
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
      path: '/dashboard/',
      element: <MainBoard />
    },
    {
      path: '/dashboard/deposit',
      element: <DepositBoard />
    },
    {
      path: '/dashboard/withdraw',
      element: <WithdrawBoard />
    },
    {
      path: '/dashboard/transaction',
      element: <TransactionBoard />
    },
    {
      path: '/dashboard/account',
      element: <AccountBoard />
    },
    {
      path: '/dashboard/security',
      element: <SecurityBoard />
    },

  ];

  return useRoutes(router);
}