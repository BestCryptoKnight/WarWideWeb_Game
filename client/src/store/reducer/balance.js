import { SET_BALANCE } from "../action/constants";

let balance = 0;

export default function getBalance(state = {}, action) {
    switch (action.type) {
        case SET_BALANCE:
            balance = action.payload;
            return balance;
        default:
            return balance;
    }
}