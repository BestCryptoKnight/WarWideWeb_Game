import { SET_WINNER } from "../action/constants";

let setWinner = false;

export default function gameStart(state = {}, action) {
  switch (action.type) {
    case SET_WINNER:
        setWinner = action.payload;
      return setWinner;
    default:
      return false;
  }
}
