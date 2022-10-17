import { Fragment, useState } from "react";
import {
  Dialog,
  DialogTitle,
  TextField,
  Button,
  CircularProgress,
  IconButton,
  Icon,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../contexts/AuthContext";

const useStyles = makeStyles({
  root: {
    borderRadius: 12,
    backgroundColor: "blue",
  },
  regForm: {
    minWidth: "500px",
  },
  regTitle: {},

  conBtn: {
    width: "90%",
    marginLeft: "5%",
  },
  span: {
    width: "80%",
    marginLeft: "10%",
    height: "10px",
  },
});

const textFieldSx = { mx: 2, my: 0.5 };

export default function AuthModal({
  open,
  close,
  isRegisterMode,
  toggleRegister,
}) {
  const { login, register } = useAuth();

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function walletConnect(e) {
    if (typeof window.ethereum !== "undefined") {
      const useraddress = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const { name, value } = e.target;
      await setFormData((prev) => ({ ...prev, [name]: useraddress[0] }));
    } else {
      window.open("https://metamask.io/download/");
    }
  }

  const clickSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      isRegisterMode ? await register(formData) : await login(formData);
      close();
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  };

  const disabledLoginButton = !formData["username"] || !formData["password"];
  const disabledRegisterButton = !formData["username"] || !formData["password"];

  return (
    <Dialog open={open} onClose={close}>
      {isRegisterMode ? (
        <RegisterForm
          formData={formData}
          handleChange={handleChange}
          onClick={walletConnect}
        />
      ) : (
        <LoginForm formData={formData} handleChange={handleChange} onClick={walletConnect} />
      )}

      {error && <span className="error">{error}</span>}

      {loading ? (
        <center>
          <CircularProgress color="inherit" />
        </center>
      ) : (
        <Button
          onClick={clickSubmit}
          disabled={
            isRegisterMode ? disabledRegisterButton : disabledLoginButton
          }
        >
          {isRegisterMode ? "Register" : "Login"}
        </Button>
      )}

      <Button onClick={toggleRegister}>
        {isRegisterMode
          ? "I already have an account"
          : "I don't have an account"}
      </Button>
    </Dialog>
  );
}

function LoginForm({ formData, handleChange, onClick }) {
  const classes = useStyles();

  return (
    <Fragment>
      <DialogTitle>Login to your account</DialogTitle>
      <div>
        <Button
          className={classes.conBtn}
          variant="contained"
          onClick={onClick}
          name = "walletAddress"
        >
          Wallet Connect
        </Button>
      </div>
      <div className={classes.span}></div>
      <TextField
        label="Username"
        name="username"
        type="text"
        value={formData["username"] || ""}
        onChange={handleChange}
        variant="filled"
        sx={textFieldSx}
        required
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData["password"] || ""}
        onChange={handleChange}
        variant="filled"
        sx={textFieldSx}
        required
      />
    </Fragment>
  );
}

function RegisterForm({ formData, handleChange, onClick }) {
  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.regForm}>
        <DialogTitle>Sign Up</DialogTitle>
      </div>
      <div>
        <Button
          className={classes.conBtn}
          variant="contained"
          onClick={onClick}
          name = "walletAddress"
        >
          Wallet Connect
        </Button>
      </div>
      <div className={classes.span}></div>
      <TextField
        label="Username"
        name="username"
        type="text"
        value={formData["username"] || ""}
        onChange={handleChange}
        variant="filled"
        sx={textFieldSx}
        required
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData["password"] || ""}
        onChange={handleChange}
        variant="filled"
        sx={textFieldSx}
        required
      />
    </Fragment>
  );
}
