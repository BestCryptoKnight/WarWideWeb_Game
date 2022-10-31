import React from 'react';
import Dashboard from '../../components/dashboard/dashboard';
import Profile from '../../components/dashboard/profile';
import '../../styles/gamepage.css'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const MainBoard = () => {
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
                    <Dashboard />
                </div>
            </div>
        </div>
    )
}

export default MainBoard