import React from 'react'
import { joinRoom } from '../../api/RoomApi'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Room = (props) => {
    const navigate = useNavigate();
    const handleClick = async () => {
        console.log('I am clicked...')
        if (props.balance <= props.price) {
            toast('You have not enough deposited ETH')
        }
        else {
            const data = await joinRoom(props.price);
            console.log('data: ', data)
            navigate(`${data.url}`, { state: { ...data } });
        }
    }
    return (
        <>
            <button onClick={handleClick}>{props.price} ETH</button>
            <ToastContainer />
        </>
    )
}

export default Room;