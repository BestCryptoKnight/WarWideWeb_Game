import React, { useState } from 'react';
import '../../../styles/card.css';
import { useAuth } from '../../../contexts/AuthContext';
import { withdraw } from '../../../api/UserApi';
import { toast } from 'react-hot-toast';

const WithdrawCard = () => {
    const { account } = useAuth();
    const [amount, setAmount] = useState(0);

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
        }
    }

    return (
        <div className="card">
            <div className="deposit-card-content">
                <div className="input-form">
                    <input type='number' placeholder='Amount in ETH' className='card-input-field' onChange={handleChange} required />
                    <div className="submit-button" onClick={handleClick}>Withdraw</div>
                </div>
            </div>
            <div className="img-box">
                <div className="card-img">
                    <i className='fas fa-money'></i>
                </div>
            </div>
        </div>
    )
}

export default WithdrawCard;