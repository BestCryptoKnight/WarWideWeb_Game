import React from 'react'
import { joinRoom } from '../../api/RoomApi'
import { useNavigate } from 'react-router-dom'

const Room = (props) => {
    const navigate = useNavigate();
    
    const handleClick = async () => {
        const data = await joinRoom(props.price);
        navigate(`${data.url}`, { state: { ...data }});
    }
    return (
        <>
            <button onClick={handleClick}>{props.price} ETH</button>
        </>
    )
}

export default Room;