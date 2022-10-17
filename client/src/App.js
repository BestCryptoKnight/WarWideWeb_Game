import { useAuth } from "./contexts/AuthContext";
import Header from "./components/Header";
import Dashboard from "./pages/dashboard";
import Admin from "./pages/admin";
export default function App() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="App">
      <Header />

      {isLoggedIn ? <Dashboard /> : <LoggedOutText />}
    </div>
  );
}

const LoggedInDashboard = () => {
  // const { account } = useAuth();

  return (
    <p>
      Good
    </p>
  );
};

const LoggedOutText = () => (
  <Admin />
);
