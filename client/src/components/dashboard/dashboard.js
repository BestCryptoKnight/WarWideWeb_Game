import React from 'react';
import Room from './room';
import BalanceCard from '../cards/balanceCard';
import DepositCard from '../cards/depositCard';
import WithdrawCard from '../cards/withdrawCard';
import { PRICE1, PRICE2, PRICE3 } from '../../constants';
const Dashboard = () => {
    return (
        <div>
            <div className='cards-group-container'>
                <BalanceCard />
                <DepositCard />
                <WithdrawCard />
            </div>
            <div className='rooms-group-container'>
                <Room value={PRICE1} roomImg = 'room1-img'/>
                <Room value={PRICE2} roomImg = 'room2-img' />
                <Room value={PRICE3} roomImg = 'room3-img' />
            </div>
        </div>)
}

export default Dashboard;