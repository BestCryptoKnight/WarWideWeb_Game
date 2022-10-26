import React, { useState } from 'react';
import '../../styles/card.css';
import toast from 'react-hot-toast';
import { deposit } from '../../api/UserApi';
import { useDispatch } from 'react-redux';
import { getBalance } from '../../api/balanceApi';

const DepositCard = () => {
    const dispatch = useDispatch();
    const [amount, setAmount] = useState(0);

    const handleChange = (e) => {
        const { value } = e.target;
        setAmount(value);
    }

    const handleSubmit = async () => {
        if (amount > 0) {
            await toast.promise(deposit(amount), {
                loading: 'waiting...',
                success: <b>Deposit Ended</b>,
                error: <b>Deposit Failed</b>,
            })
            getBalance(dispatch);
        } else {
            toast.error('Fill the Amound field.')
        }

    }
    return (
        <div className="card-info">
            <div className="deposit-card-content">
                <div className="input-form">
                    <input placeholder='Amount in ETH' className='card-input-field' name="amount" onChange={handleChange} required />
                    <div className="submit-button" onClick={handleSubmit}>Deposit</div>
                </div>
            </div>
            <div className="img-box">
                <div className="card-info-img">
                    <i className='fas fa-wallet'></i>
                </div>
            </div>
        </div>
    )
}

export default DepositCard;