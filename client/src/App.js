import { useAuth } from "./contexts/AuthContext";
import Header from "./components/Header";
import Dashboard from "./pages/dashboard";

export default function App() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="App">
      <Header />

      {isLoggedIn ? <Dashboard/> : <LoggedOutText />}
    </div>
  );
}

const LoggedInDashboard = () => {
  // const { account } = useAuth();

  return (
    <div >
      sfsefgse
    </div>
  );
};

const LoggedOutText = () => (
  <p>dawdawf</p>
);
