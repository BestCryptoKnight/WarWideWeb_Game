import { useAuth } from "./contexts/AuthContext";
import Header from "./components/layout/Header";
import { BrowserRouter, Route } from "react-router-dom";
import Router from "../src/router/index";
import Dashboard from "./pages/dashboard";
import { ToastContainer } from "react-toastify";


export default function App() {
  const { isLoggedIn } = useAuth();
  return (
    <BrowserRouter>
      <Header />
      {isLoggedIn ? <Router /> : <Dashboard/>}
      <ToastContainer />
    </BrowserRouter>
  );
}

const LoggedOutText = () => <div className = 'homepage' />;

