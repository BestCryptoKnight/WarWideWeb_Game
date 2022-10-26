import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../styles/card.css';
import { withdraw } from '../../api/UserApi';
import { getBalance } from '../../api/balanceApi';
import { toast } from 'react-hot-toast';

const WithdrawCard = () => {
    const dispatch = useDispatch();
    const balance = useSelector(state => state.getBalance);
    const [amount, setAmount] = useState(0);

    const handleChange = (e) => {
        const { value } = e.target;
        console.log(value);
        setAmount(value);
    }

    const handleClick = async () => {
        console.log('amount:', amount);
        if (amount > balance || amount === 0)
            toast.error('Insufficient Amount');
        else {
            await toast.promise(withdraw(amount), {
                loading: 'waiting...',
                success: <b>Withdraw Ended</b>,
                error: <b>Withdraw Failed</b>,
            })
            getBalance(dispatch);
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