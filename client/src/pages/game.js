import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/dashboard/dashboard';
import TransactionTable from '../components/dashboard/transaction';
import Profile from '../components/game/profile';
import { useAuth } from '../contexts/AuthContext';
import History from '../components/tables/hitory';

import '../styles/gamepage.css'

const GamePage = () => {
    const { account, logout } = useAuth();

    return (
        <>
            {account ?
                <div className="gamepage">
                    <div className='gamepage-container'>
                        <div className='profile'>
                            <Profile />
                        </div>
                        <div className='page-info'>
                            <Dashboard />
                        </div>
                    </div>
                </div> : ''}
        </>
    )
}

export default GamePage;