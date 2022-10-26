import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../styles/card.css';
import { useAuth } from '../../contexts/AuthContext';
import { getBalance } from '../../api/balanceApi';

const BalanceCard = () => {
    const { account } = useAuth();
    const dispatch = useDispatch();
    const balance = useSelector(state => state.getBalance);
    useEffect(() => {
        getBalance(dispatch);
    }, [])
    return (
        <div className="card-info">
            <div className="card-content">
                {account ? <div className="current-balance">{balance}ETH</div> : ''}
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