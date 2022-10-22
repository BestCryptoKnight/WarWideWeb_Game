import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Room from '../components/game/room.com';
import BalanceCard from '../components/game/cards/balanceCard';
import DepositCard from '../components/game/cards/depositCard';
import WithdrawCard from '../components/game/cards/withdrawCard';
import Profile from '../components/game/profile.com';
import { useAuth } from '../contexts/AuthContext';

import '../styles/gamepage.css'

const GamePage = () => {
    const navigate = useNavigate();
    const { account, logout } = useAuth();

    useEffect(()=>{
        console.log("Good");
    },[account])

    return (
        <>
            {account?
            <div className="gamepage">
                <div className='page-container'>
                    <div className='profile'>
                        <Profile name={account.name} logout={logout} />
                    </div>
                    <div className='page-info'>
                        <div className='cards-group-container'>
                            <BalanceCard />
                            <DepositCard />
                            <WithdrawCard />
                        </div>
                        <div className='rooms-group-container'>
                            <Room value="1"/>
                            <Room value="2"/>
                            <Room value="3"/>
                        </div>
                    </div>
                </div>
            </div>:''}
        </>
    )
}

export default GamePage;