import React from 'react';
import Profile from '../../components/dashboard/profile';
import Account from '../../components/dashboard/account';
import '../../styles/gamepage.css'

const AccountBoard = () => {
    return (
        <div className="gamepage">
            <div className='gamepage-container'>
                <div className='profile'>
                    <Profile />
                </div>
                <div className='page-info'>
                    <Account />
                </div>
            </div>
        </div>
    )
}

export default AccountBoard