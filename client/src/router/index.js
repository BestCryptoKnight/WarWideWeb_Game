import { useRoutes } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Room from "../pages/room";
import Admin from '../pages/admin';
import MainPage from '../pages/mainpage';
export default function Router() {
    const router= [
      {
        path:"/",
        element:<Dashboard/>
      },
      {
        path:"main/room",
        element:<Room/>
      },
      {
        path: "/admin",
        element: <Admin />
      },
      {
        path: '/main',
        element: <MainPage />
      }
    ];
  
    return useRoutes(router);
  }