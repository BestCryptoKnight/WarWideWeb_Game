import gameStart from './game';
import setWinner from './winner';
import {combineReducers} from 'redux';

const reducer = combineReducers({
    gameStart,
    setWinner
});

export default reducer;