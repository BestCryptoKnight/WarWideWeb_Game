import { SOCKET_ON } from "../action/constants";

let isSocketOn = false;

export default function gameStart(state = {}, action) {
  switch (action.type) {
    case SOCKET_ON:
      isSocketOn = action.payload;
      return isSocketOn;
    default:
      return false;
  }
}
