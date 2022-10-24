import React, { useEffect, useState } from 'react';
import '../../styles/card.css';
import { useAuth } from '../../contexts/AuthContext';
const BalanceCard = () => {
    const { account } = useAuth();
    const [balance, setBalance] = useState();

    useEffect(() => {
        if (account)
            setBalance(Math.round(account.balance * 10000) / 10000);
        else
            setBalance(0)
    }, [account])

    return (
        <div className="card-info">
            <div className="card-content">
                {account ? <div className="current-balance">${balance}</div> : ''}
                <div className="white-text">Current Balance</div>
            </div>
            <div className="img-box">
                <div className="card-info-img">
                    <i className='fas fa-wallet'></i>
                </div>
            </div>
        </div>
    )
}

export default BalanceCard;