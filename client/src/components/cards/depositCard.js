import React, { useEffect, useState } from 'react';
import '../../styles/card.css';
import toast from 'react-hot-toast';
import { deposit } from '../../api/UserApi';
import { useNavigate } from 'react-router-dom';

const DepositCard = () => {
    const [amount, setAmount] = useState(0);
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { value } = e.target;
        console.log(value);
        setAmount(value);
    }

    const handleSubmit = async () => {
        if (amount > 0) {
            await toast.promise(deposit(amount), {
                loading: 'waiting...',
                success: <b>Deposit Ended</b>,
                error: <b>Deposit Failed</b>,
            })
            navigate('/dashboard/main');
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