import { Fragment, useState } from "react";
import {
  Dialog,
  DialogTitle,
  TextField,
  Button,
  CircularProgress,
  Icon,
} from "@mui/material";
import Alert from '@mui/material/Alert';
import './AuthModal.css';
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../../contexts/AuthContext";
import logo1 from "../../asset/metamask.ico";
import { useNavigate } from 'react-router-dom';
// import ToastService from "react-material-toast";


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
  walletBtn: {
    backgroundImage: `url(${logo1})`,
    backgroundSize: "100% 100%",
    width: '300px'
  }
});

const textFieldSx = { mx: 2, my: 0.5 };

export default function AuthModal({
  open,
  close,
  isRegisterMode,
  toggleRegister,
}) {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isWalletConnected, setWalletState] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function walletConnect(e) {

    if (typeof window.ethereum !== "undefined") {
      const useraddress = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setFormData((prev) => ({ ...prev, "wallet": useraddress[0] }));
      setWalletState(true);
    } else {
      setWalletState(false);
      window.open("https://metamask.io/download/");
    }
  }

  const clickSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      isRegisterMode ? await register(formData) : await login(formData);
      navigate('/main');
      close();
    } catch (error) {
      setError(error);
    }

    setLoading(false);
  };

  const classes = useStyles();


  const disabledLoginButton = !formData["name"] || !formData["password"];
  const disabledRegisterButton = !formData["name"] || !formData["password"];

  return (

    <Dialog open={open} onClose={close}
      className="c-modal"
    >
      {isWalletConnected ? <SuccessAlert /> : <FalseAlert />}
      {isRegisterMode ? (
        <RegisterForm
          classeName={classes.dialog}
          formData={formData}
          handleChange={handleChange}
          onClick={walletConnect}
        />
      ) : (
        <LoginForm
          formData={formData}
          handleChange={handleChange}
          onClick={walletConnect}
        />
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
      <div className={classes.conBtn} >
        <Button
          variant="outlined"
          onClick={onClick}
          name="wallet"
        >
          <Icon className={classes.walletBtn} ></Icon>
          <span style={{ width: '20px' }} ></span>
          <p >Wallet Connect</p>
        </Button>
      </div>
      <div className={classes.span}></div>
      <TextField
        label="Username"
        name="name"
        type="text"
        value={formData["name"] || ""}
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
        <DialogTitle color="#D42C94">Sign Up</DialogTitle>
      </div>
      <div className={classes.conBtn}>
        <Button
          variant="outlined"
          onClick={onClick}
          name="wallet"
        >
          <Icon className={classes.walletBtn}></Icon>
          <span style={{ width: '20px' }}></span>
          <p>Wallet Connect</p>
        </Button>
      </div>
      <div className={classes.span}></div>
      <TextField
        label="Username"
        name="name"
        type="text"
        value={formData["name"] || ""}
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
function SuccessAlert() {
  return (
    <Fragment>
      <Alert severity="success">Wallet Connected!</Alert>
    </Fragment>
  )
}
function FalseAlert() {
  return (
    <Fragment>
      <Alert severity="error">Wallet disconnected!</Alert>
    </Fragment>
  )
}

