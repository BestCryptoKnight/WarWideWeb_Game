import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import '../../styles/card.css';
import { useAuth } from '../../contexts/AuthContext';
import { withdraw } from '../../api/UserApi';
import { toast } from 'react-hot-toast';

const WithdrawCard = () => {
    const { account } = useAuth();
    const [amount, setAmount] = useState(0);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { value } = e.target;
        console.log(value);
        setAmount(value);
    }

    const handleClick = async () => {
        console.log('amount:', amount);
        console.log('balance: ', account.balance)
        if (amount > account.balance || amount === 0)
            toast.error('Insufficient Amount');
        else {
            await toast.promise(withdraw(amount), {
                loading: 'waiting...',
                success: <b>Withdraw Ended</b>,
                error: <b>Withdraw Failed</b>,
            })
            navigate('/game');
        }
    }

    return (
        <div className="card-info">
            <div className="deposit-card-content">
                <div className="input-form">
                    <input placeholder='Amount in ETH' className='card-input-field' onChange={handleChange} required />
                    <div className="submit-button" onClick={handleClick}>Withdraw</div>
                </div>
            </div>
            <div className="img-box">
                <div className="card-info-img">
                    <i className='fas fa-money'></i>
                </div>
            </div>
        </div>
    )
}

export default WithdrawCard;