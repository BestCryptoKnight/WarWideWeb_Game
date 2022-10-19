import { useAuth } from "./contexts/AuthContext";
import Header from "./components/Header";
import { BrowserRouter, Route } from "react-router-dom";
import Router from "../src/router/index";
import Dashboard from "./pages/dashboard";


export default function App() {
  const { isLoggedIn } = useAuth();
  return (
    <BrowserRouter>
      <Header />
      {isLoggedIn ? <Router /> : <Dashboard/>}
    </BrowserRouter>
  );
}

const LoggedOutText = () => <p>dawdawf</p>;

