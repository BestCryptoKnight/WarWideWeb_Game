import React from 'react';
import Room from './room';
import BalanceCard from '../cards/balanceCard';
import DepositCard from '../cards/depositCard';
import WithdrawCard from '../cards/withdrawCard';

const Dashboard = () => {
    return (
        <div>
            <div className='cards-group-container'>
                <BalanceCard />
                <DepositCard />
                <WithdrawCard />
            </div>
            <div className='rooms-group-container'>
                <Room value="-1" />
                <Room value="0.02" />
                <Room value="0.03" />
            </div>
        </div>)
}

export default Dashboard;