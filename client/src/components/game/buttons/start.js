import React, { useState, useEffect } from 'react';
import { getAvailability, payFee, getBalance } from "../../../api/balanceApi";
import { FEE } from "../../../constants";
import { useDispatch, useSelector } from 'react-redux';
import { animationFunc } from "../../../functions/animations";
import toast from 'react-hot-toast';

const StartButton = ({ name, amount, socket, room, isFilled }) => {
    const balance = useSelector(state => state.getBalance);
    const isStart = useSelector((state) => state.gameStart);
    const dispatch = useDispatch();
    const [buttonClickable, setButtonClickable] = useState();

    useEffect(() => {
        console.log('isFilled: ', isFilled);
        if (isFilled && !isStart)
            setButtonClickable(true)
        else
            setButtonClickable(false)
    }, [isFilled, isStart])

    const handleClick = async () => {
        const isPayFee = await getAvailability(name);
        console.log('isPayed: ', isPayFee);
        // if (!isPayFee) {
        //     if (balance >= FEE) {
        //         await payFee(name)
        //         toast.success('You paid FEE. You could enjoy next 24 hours')
        //         await getBalance(dispatch);
        //         if (balance >= amount)
        //             socket.emit("start", { username: name, room: room });
        //         else
        //             toast.error("You have not enough deposit.")
        //     }
        //     else {
        //         toast.error("You have not enough deposit. Click Add Funds Button below Play Guess if you continue to play.")
        //     }
        // }
        // else {
        //     if (balance >= amount)
                socket.emit("start", { username: name, room: room });
            // else
                // toast.error("You have not enough deposit.")
        // }
    }

    const handleMouseDown = (e) => {
        animationFunc("placeBid", "place-guess-btn-anim");
    };

    const handleMouseUp = (e) => {
        animationFunc("placeBid", "place-guess-btn-clickable");
        handleClick();
    };

    let string = ''
    if (buttonClickable)
        string = <div id="placeBid" className='place-guess-btn-clickable' onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}></div>
    else
        string = <div id="placeBid" className='place-guess-btn'></div>

    return (
        <>
            {string}
        </>
    )
}


export default StartButton