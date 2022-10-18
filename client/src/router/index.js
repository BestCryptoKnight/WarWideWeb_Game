import { useRoutes, Navigate } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Room from "../pages/room";
export default function Router() {
    const router= [
    //   {
    //     path:"/404",
    //     element:<NotFoundView/>
    //   },
    //   {
    //     path:"*",
    //     element:<Navigate to='/404'/>
    //   },
      {
        path:"/",
        element:<Dashboard/>
      },
      {
        path:"/room",
        element:<Room/>
      }
    ];
  
    return useRoutes(router);
  }