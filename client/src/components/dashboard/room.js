import React from 'react';
import { useNavigate } from 'react-router-dom';
import { joinRoom } from '../../api/RoomApi'
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import { getAvailability, payFee } from '../../api/balanceApi';
import { FEE } from '../../constants';

const Room = (props) => {
    const navigate = useNavigate();
    const { account } = useAuth();
    const handleClick = async () => {
        console.log('I am clicked...')
        const result = await getAvailability(account.name);
        console.log('result: ', result);
        if (result.availability === true) {
            enterRoom();
        }
        else if (account.balance > FEE) {
            console.log('I should pay fee');
            await payFee(account.name);
            console.log('I pay FEE');
            enterRoom();
        }
        else {
            toast.error('You need to deposit money');
        }
    }

    const enterRoom = async () => {
        if (account.balance > props.value) {
            const data = await joinRoom(props.value);
            console.log('data: ', data)
            navigate(`${data.url}`, { state: { ...data } });
        }
        else {
            toast.error('You do not have enough money');
        }
    }
    return (
        <div className="room">
            <div className="room-container">
                <div className="image-box">
                    <div className="room-image" />
                </div>
                <div className="invest-text">Invest Amount</div>
                <div className="text-price">${props.value}</div>
                <div className="play-button" onClick={handleClick}>Play Now</div>
            </div>
            <div className="room-big-circle"></div>
            <div className='room-small-circles'></div>
        </div>
    )
}

export default Room;