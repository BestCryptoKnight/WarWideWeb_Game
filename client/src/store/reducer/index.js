import gameStart from './game';
import setWinner from './winner';
import socket from './socket';
import {combineReducers} from 'redux';

const reducer = combineReducers({
    gameStart,
    setWinner,
    socket
});

export default reducer;