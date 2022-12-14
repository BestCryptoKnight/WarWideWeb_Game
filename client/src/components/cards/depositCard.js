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
    try {
      if (amount > 0) {
        const btn = document.querySelector(".deposit-submit-button")
        btn.classList.add("button--loading");
        btn.classList.add('disabled')
        await toast.promise(deposit(amount), {
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
    catch (error) {
      toast.error('Deposit Failed')
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
          <div className='deposit-img' />
        </div>
      </div>
    </div>
  )
}

export default DepositCard;