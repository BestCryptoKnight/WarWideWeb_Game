import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { SET_WINNER } from "../../store/action/constants";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(datas) {
  const setWinner = useSelector((state) => state.setWinner);
  const dispatch = useDispatch();
  let username = datas.username;
  let winner = "";
  let winnerValue = "";
  let loser = "";
  let loserValue = "";
  let price = "";
  // let winner = (datas.data.winner.user === undefined) ? "winner" : datas.data.winner.user;
  if (datas.data.winner != undefined) {
    winner = datas.data.winner.user;
    winnerValue = datas.data.winner.value;
    loser = datas.data.loser.user;
    loserValue = datas.data.loser.value;
    price = datas.data.realprice;
  }

  
  const handleClose = () => {
    dispatch({ type: SET_WINNER, payload: false });
  };

  useEffect(() => {
    return () => {
    dispatch({ type: SET_WINNER, payload: false });

    };
  }, []);

  return (
    <div>
      <Dialog
        open={setWinner}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle style={{color :"black"}}>
          {username == winner ? "Congratulations! You win" : "You Lost"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {username == winner
              ? "Real Price: " +
                price  +
                "." +
                "Your value: " +
                winnerValue  +
                " " +
                loser  +
                " value: " +
                loserValue 
              : "Real Price: " +
                 price  +
                "." +
                "Your value: " +
                loserValue  +
                " " +
                winner +
                " value: " +
                winnerValue }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
