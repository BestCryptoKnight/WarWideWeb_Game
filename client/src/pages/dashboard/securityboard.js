import React from 'react';
import Security from '../../components/dashboard/security';
import Profile from '../../components/dashboard/profile';
import '../../styles/gamepage.css'

const SecurityBoard = () => {
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