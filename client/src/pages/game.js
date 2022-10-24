import React, { useState, useEffect } from 'react'
import Dashboard from '../components/dashboard/dashboard';
import Profile from '../components/dashboard/profile';
import { useAuth } from '../contexts/AuthContext';
import History from '../components/tables/hitory';
import Security from '../components/dashboard/security';
import Account from '../components/dashboard/account';
import '../styles/gamepage.css'

const GamePage = () => {
    const { account } = useAuth();
    const [id, setId] = useState(0);
    const [string, setString] = useState();
    useEffect(() => {
        console.log('here id: ', id);
        switch (id) {
            case 0: setString(<Dashboard />); break;
            case 1: setString(<History filter='deposit' />); break;
            case 2: setString(<History filter='withdraw' />); break;
            case 3: setString(<History fileter='all' />); break;
            case 4: setString(<Account />); break;
            case 5: setString(<Security />); break;
            default: setString(<Dashboard />)
        }
    }, [id]);
    return (
        <>
            {account ?
                <div className="gamepage">
                    <div className='gamepage-container'>
                        <div className='profile'>
                            <Profile />
                        </div>
                        <div className='page-info'>
                            {string}
                        </div>
                    </div>
                </div> : ''}
        </>
    )
}

export default GamePage;