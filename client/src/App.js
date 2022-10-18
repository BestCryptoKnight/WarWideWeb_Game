import { useAuth } from "./contexts/AuthContext";
import Header from "./components/Header";
import Dashboard from "./pages/dashboard";
import Room from "./pages/room";
import { BrowserRouter } from "react-router-dom";
import Router from "../src/router/index";
export default function App() {
  const { isLoggedIn } = useAuth();

  return (
    
    <BrowserRouter>
      <Header/>
      {isLoggedIn ? <Router /> : <LoggedOutText />}
    </BrowserRouter>

  );
}

const LoggedOutText = () => <p>dawdawf</p>;
