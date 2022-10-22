import { GAME_START } from "../action/constants";

let isStart = false;

export default function gameStart(state = {}, action) {
  switch (action.type) {
    case GAME_START:
      isStart = action.payload;
      return isStart;
    default:
      return false;
  }
}
