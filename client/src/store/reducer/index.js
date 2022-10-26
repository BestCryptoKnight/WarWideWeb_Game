import gameStart from './game';
import setWinner from './winner';
import getBalance from './balance';
import socket from './socket';
import {combineReducers} from 'redux';

const reducer = combineReducers({
    gameStart,
    setWinner,
    getBalance,
    socket
});

export default reducer;