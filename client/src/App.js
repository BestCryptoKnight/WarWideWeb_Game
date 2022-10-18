import { useAuth } from "./contexts/AuthContext";
import Header from "./components/Header";
import Dashboard from "./pages/dashboard";
import Admin from "./pages/admin";
import Room from "./pages/room";
import { BrowserRouter } from "react-router-dom";
import Router from "../src/router/index;

export default function App() {
  const { isLoggedIn } = useAuth();

  return (
    
    <BrowserRouter>
      <Header/>
      <Router/>
    </BrowserRouter>
    // <Router>
    //   <div>
    //     <Header />
    //     <Routes>
    //       <Route path="/" component={Dashboard} />
    //       <Route path="/room" component={Room} />
    //     </Routes>
    //   </div>
    // </Router>
    // <div className="App">
    //   <Header />
    //   {isLoggedIn ? <Dashboard /> : <LoggedOutText />}
    //  </div>
  );
}

const LoggedOutText = () => <p>dawdawf</p>;

