import React from 'react';
import { useNavigate } from 'react-router-dom';

const Room = (props) => {
    const navigate = useNavigate();
    return (
        <div className="room">
            <div className="room-container">
                <div className="image-box">
                    <div className="room-image" />
                </div>
                <div className="invest-text">Invest Amount</div>
                <div className="text-price">${props.value}</div>
                <div className="play-button" onClick={() => navigate('/playroom')}>Play Now</div>
            </div>
            <div className="room-big-circle"></div>
            <div className='room-small-circles'></div>
        </div>
    )
}

export default Room;