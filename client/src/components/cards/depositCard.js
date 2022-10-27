import React, { useState } from 'react';
import '../../styles/card.css';
import toast from 'react-hot-toast';
import { deposit } from '../../api/UserApi';
import { useDispatch } from 'react-redux';
import { getBalance, getExchangeRate } from '../../api/balanceApi';

const DepositCard = () => {
    const dispatch = useDispatch();
    const [amount, setAmount] = useState(0);

    const handleChange = (e) => {
        const { value } = e.target;
        setAmount(value);
    }

    const handleSubmit = async () => {
        if (amount > 0) {
            const rate = await getExchangeRate();
            console.log('rate: ', rate)
            const btn = document.querySelector(".deposit-submit-button")
            btn.classList.add("button--loading");
            btn.classList.add('disabled')
            await toast.promise(deposit(amount / rate), {
                loading: 'waiting...',
                success: <b>Deposit Ended</b>,
                error: <b>Deposit Failed</b>,
            })
            btn.classList.remove("button--loading");
            btn.classList.remove("disabled")
            getBalance(dispatch);
        } else {
            toast.error('Fill the Amound field.')
        }

    }
    return (
        <div className="card-info">
            <div className="deposit-card-content">
                <div className="input-form">
                    <input placeholder='Amount in USD' className='card-input-field' name="amount" onChange={handleChange} required />
                    <button className="deposit-submit-button" onClick={handleSubmit}>
                        <div className='button-text'>Deposit</div>
                    </button>
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