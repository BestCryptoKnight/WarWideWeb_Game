import React from 'react';
import Dashboard from '../../components/dashboard/dashboard';
import Profile from '../../components/dashboard/profile';
import '../../styles/gamepage.css'

const MainBoard = () => {
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