import React from 'react';
import { useNavigate } from 'react-router-dom';
import { joinRoom } from '../../api/RoomApi'
import toast from 'react-hot-toast';
import { useAuth } from '../../contexts/AuthContext';
import { getAvailability } from '../../api/balanceApi';

const Room = (props) => {
    const navigate = useNavigate();
    const { account } = useAuth();
    const handleClick = async () => {
        console.log('I am clicked...')
        const result = await getAvailability(account.name);
        console.log('result: ', result);

        if (account.balance <= props.value) {
            toast.error('You have not enough deposited ETH')
        }
        else {
            const data = await joinRoom(props.value);
            console.log('data: ', data)
//            navigate(`${data.url}`, { state: { ...data } });
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