import React from 'react';
import Profile from '../../components/dashboard/profile';
import History from '../../components/tables/hitory'
import '../../styles/gamepage.css'

const TransactionBoard = () => {
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