import { useRoutes, Navigate } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Room from "../pages/room";
import Admin from '../pages/admin';

export default function Router() {
    const router= [
      {
        path:"/",
        element:<Dashboard/>
      },
      {
        path:"/room",
        element:<Room/>
      },
      {
        path: "/admin",
        element: <Admin />
      }
    ];
  
    return useRoutes(router);
  }