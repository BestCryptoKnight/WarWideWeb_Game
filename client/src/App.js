import { useAuth } from "./contexts/AuthContext";
import Header from "./components/Header";
import { BrowserRouter } from "react-router-dom";
import Router from "../src/router/index";

export default function App() {
  const { isLoggedIn } = useAuth();
  return (
    <BrowserRouter>
      <Header />
      {isLoggedIn ? <Router /> : <LoggedOutText />}
    </BrowserRouter>
  );
}

const LoggedOutText = () => <div className = 'homepage' />;

