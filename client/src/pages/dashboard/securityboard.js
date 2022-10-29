import React from 'react';
import Security from '../../components/dashboard/security';
import Profile from '../../components/dashboard/profile';
import '../../styles/gamepage.css'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const SecurityBoard = () => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    useEffect(() => {
        if (!isLoggedIn)
            navigate('/signin')
    }, [isLoggedIn])
    return (
        <div className="gamepage">
            <div className='gamepage-container'>
                <div className='profile'>
                    <Profile />
                </div>
                <div className='page-info'>
                    <Security />
                </div>
            </div>
        </div>
    )
}

export default SecurityBoard