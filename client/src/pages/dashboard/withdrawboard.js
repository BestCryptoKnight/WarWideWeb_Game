import React from 'react';
import Profile from '../../components/dashboard/profile';
import History from '../../components/tables/hitory'
import '../../styles/gamepage.css'

const WithdrawBoard = () => {
    return (
        <div className="gamepage">
            <div className='gamepage-container'>
                <div className='profile'>
                    <Profile />
                </div>
                <div className='page-info'>
                    <History filter='Withdraw' />
                </div>
            </div>
        </div>
    )
}

export default WithdrawBoard