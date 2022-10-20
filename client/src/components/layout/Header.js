import { Fragment, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
  IconButton,
  Avatar,
  Popover,
  List,
  ListSubheader,
  ListItemButton,
} from "@mui/material";
import OnlineIndicator from "../OnlineIndicator";
import AuthModal from "../modals/AuthModal";
import { useAuth } from "../../contexts/AuthContext";
import avatarImg from "../../asset/icon.png";
import { makeStyles } from "@material-ui/core/styles";
import { useMediaQuery } from "react-responsive";
const useStyles = makeStyles({
  header: {
    background: "linear-gradient(290deg, #1B1251,#390A7C, #E33B86)",
    width: "100%",
    height: "90px",
  },
  avatar: {
    backgroundImage: `url(${avatarImg})`,
    backgroundSize: "100% 100%",
    marginTop: "15px",
  },
  label: {
    fontFamily: "Algerian",
    fontSize: "30px",
    color: "white",
  },
  btn_pannel: {
    float: "right",
    width: "30%",
    height: "30px",
    marginTop: "30px",
    minWidth: "300px",
    display: "flex",
    minWidth: "450px",
  },
  help: {
    width: "15%",
    height: "100%",
    textAlign: "center",
    fontFamily: "Times New Roman",
    fontWeight: "bold",
    fontSize: "20px",
    color: "#D42C94",
    borderRadius: "15px",
    "&:hover": {
      backgroundColor: "white",
      cursor: "pointer",
    },
  },
});

export default function Header() {
  let isLaptopOrMobile = useMediaQuery({
    minWidth: 430,
  });
  const { isLoggedIn, account, logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const [popover, setPopover] = useState(false);
  const [authModal, setAuthModal] = useState(false);
  const [register, setRegister] = useState(false);
  const navigate = useNavigate();

  const classes = useStyles();

  const openPopover = (e) => {
    setPopover(true);
    setAnchorEl(e.currentTarget);
  };

  const closePopover = () => {
    setPopover(false);
    setAnchorEl(null);
  };

  const clickLogin = () => {
    setRegister(false);
    setAuthModal(true);
    closePopover();
  };

  const clickRegister = () => {
    setRegister(true);
    setAuthModal(true);
    closePopover();
  };

  return (
    <div className={classes.header}>
      {isLaptopOrMobile ? (
        <div>
          <div className={classes.btn_pannel}>
            <div className={classes.help} style={{ minWidth: "100px" }}>
              help
            </div>
            <span style={{ width: "10%" }}></span>
            <div className={classes.help} style={{ minWidth: "120px" }}>
              how to play
            </div>
            <span style={{ width: "10%" }}></span>
            {isLoggedIn ? (
              <div
                className={classes.help}
                style={{ minWidth: "100px" }}
                onClick={logout}
              >
                logout
              </div>
            ) : (
              <>
                <div
                  className={classes.help}
                  style={{ minWidth: "100px" }}
                  onClick={clickRegister}
                >
                  register
                </div>
                <span style={{ width: "10%" }}></span>
                <div
                  className={classes.help}
                  style={{ minWidth: "100px" }}
                  onClick={clickLogin}
                >
                  login
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div>
          <IconButton onClick={openPopover}>
            <OnlineIndicator online={isLoggedIn}>
              <Avatar
                src={account?.username || ""}
                alt={account?.username || ""}
                className={classes.avatar}
              />
            </OnlineIndicator>
          </IconButton>
        </div>
      )}
      <Popover
        anchorEl={anchorEl}
        open={popover}
        onClose={closePopover}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <List style={{ minWidth: "200px" }}>
          <ListSubheader style={{ textAlign: "center" }}>
            Hello, {isLoggedIn ? account.username : "Guest"}
          </ListSubheader>

          {isLoggedIn ? (
            <ListItemButton onClick={logout}>Logout</ListItemButton>
          ) : (
            <Fragment>
              <ListItemButton onClick={clickLogin}>Login</ListItemButton>
              <ListItemButton onClick={clickRegister}>Reigster</ListItemButton>
              <ListItemButton>Help</ListItemButton>
              <ListItemButton>How to play</ListItemButton>
            </Fragment>
          )}
        </List>
      </Popover>
      <AuthModal
        open={authModal}
        close={() => setAuthModal(false)}
        isRegisterMode={register}
        toggleRegister={() => setRegister((prev) => !prev)}
      />
    </div>
  );
}
