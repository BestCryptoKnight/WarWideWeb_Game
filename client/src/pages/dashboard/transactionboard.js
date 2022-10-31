import React from 'react';
import Profile from '../../components/dashboard/profile';
import History from '../../components/tables/hitory'
import '../../styles/gamepage.css'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const TransactionBoard = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    useEffect(() => {
        if (!isLoggedIn)
            navigate('/signin')
    }, [isLoggedIn, navigate])
    return (
        <div className="gamepage">
            <div className='gamepage-container'>
                <div className='profile'>
                    <Profile />
                </div>
                <div className='page-info'>
                    <History filter='all' />
                </div>
            </div>
        </div>
    )
}

export default TransactionBoard