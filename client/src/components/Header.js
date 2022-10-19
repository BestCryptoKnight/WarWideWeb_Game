import { Fragment, useState } from "react";
import {
  AppBar,
  IconButton,
  Avatar,
  Popover,
  List,
  ListSubheader,
  ListItemButton,
  Icon,
} from "@mui/material";
import OnlineIndicator from "./OnlineIndicator";
import AuthModal from "./AuthModal";
import { useAuth } from "../contexts/AuthContext";
import iconImg from "../asset/icon.png";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  header: {
    background: "linear-gradient(290deg, #1B1251,#390A7C, #E33B86)",
    height: "90px",
  },
  icon: {
    backgroundImage: `url(${iconImg})`,
    width:'70px',
    height:'70px'
  },
});

export default function Header() {
  const { isLoggedIn, account, logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const [popover, setPopover] = useState(false);
  const [authModal, setAuthModal] = useState(false);
  const [register, setRegister] = useState(false);

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
      
      {/* <IconButton onClick={openPopover}>
        <OnlineIndicator online={isLoggedIn}>
          <Avatar src={account?.username || ""} alt={account?.username || ""} />
        </OnlineIndicator>
      </IconButton>
      <Popover
        anchorEl={anchorEl}
        open={popover}
        onClose={closePopover}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
        transformOrigin={{vertical: 'top', horizontal: 'right'}}>
        <List style={{minWidth: '200px'}}>
          <ListSubheader style={{textAlign: 'center'}}>
            Hello, {isLoggedIn ? account.username : 'Guest'}
          </ListSubheader>

          {isLoggedIn ? (
            <ListItemButton onClick={logout}>Logout</ListItemButton>
          ) : (
            <Fragment>
              <ListItemButton onClick={clickLogin}>Login</ListItemButton>
              <ListItemButton onClick={clickRegister}>Reigster</ListItemButton>
            </Fragment>
          )}
        </List>
      </Popover> */}
    </div>
    // <AppBar className='header' position='static'>

    //   <IconButton onClick={openPopover}>
    //     <OnlineIndicator online={isLoggedIn}>
    //       <Avatar src={account?.username || ''} alt={account?.username || ''} />
    //     </OnlineIndicator>
    //   </IconButton>

    //   <Popover
    //     anchorEl={anchorEl}
    //     open={popover}
    //     onClose={closePopover}
    //     anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
    //     transformOrigin={{vertical: 'top', horizontal: 'right'}}>
    //     <List style={{minWidth: '200px'}}>
    //       <ListSubheader style={{textAlign: 'center'}}>
    //         Hello, {isLoggedIn ? account.username : 'Guest'}
    //       </ListSubheader>

    //       {isLoggedIn ? (
    //         <ListItemButton onClick={logout}>Logout</ListItemButton>
    //       ) : (
    //         <Fragment>
    //           <ListItemButton onClick={clickLogin}>Login</ListItemButton>
    //           <ListItemButton onClick={clickRegister}>Reigster</ListItemButton>
    //         </Fragment>
    //       )}
    //     </List>
    //   </Popover>

    //   <AuthModal
    //     open={authModal}
    //     close={() => setAuthModal(false)}
    //     isRegisterMode={register}
    //     toggleRegister={() => setRegister((prev) => !prev)}
    //   />
    // </AppBar>
  );
}
