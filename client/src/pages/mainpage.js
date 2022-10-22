import React, { useState, useEffect } from 'react';
import { getBalance } from '../api/UserApi';
import { makeStyles } from '@material-ui/core/styles';
import mainPageImg from '../assets/img/mainpage.png';
import { useAuth } from '../contexts/AuthContext';
import Stack from '@mui/material/Stack';

import Deposit from '../components/game/deposit';
import Withdraw from '../components/game/withdraw';
import Room from '../components/game/room';

// import io from "socket.io-client";
// const socket = io.connect('http://127.0.0.1:8080');

const useStyles = makeStyles({
    mainpage: {
        background: "linear-gradient(290deg, #1B1251,#390A7C, #E33B86)",
        position: "fixed",
    },
    mainImg: {
        backgroundImage: `url(${mainPageImg})`,
        minWidth: '350px',
        height: '100%',
        backgroundSize: '100% 100%'
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
    },
    room: {
        marginTop: '200px',
        margin: 'auto',
        width: '20rem',
        height: '20rem',
        fontSize: '3rem',
        opacity: '0.7',
        borderRadius: '15px',
        cursor: 'pointer',
    }
});

const MainPage = () => {
    const classes = useStyles();
    const { account } = useAuth();
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        getBalance(account.username)
            .then((res) => {
                setBalance(res);
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    return (
        <div className={classes.mainpage}
            style={{ height: "100%", width: "100%", overflowY: "auto" }}>
            <Stack spacing={2} direction="row">
                <h5>{balance + 'ETH'}</h5>
                <Deposit />
                <Withdraw />
            </Stack>
            <div className={classes.mainImg}>
                <div className={classes.container}>
                    <Room price="-1" balance={balance} className={classes.room} />
                    <Room price="0.01" balance={balance} className={classes.room} />
                    <Room price="0.02" balance={balance} className={classes.room} />
                </div>
            </div>
        </div>
    )
}

export default MainPage;