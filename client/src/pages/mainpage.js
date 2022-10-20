import React, { useState, useEffect } from 'react';
import { getBalance } from '../api/UserInfo';
import { makeStyles } from '@material-ui/core/styles';
import mainPageImg from '../asset/mainpage.png';
import { useAuth } from '../contexts/AuthContext';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import DepositModal from "../components/modals/DepositModal";
import WithdrawModal from '../components/modals/WithdrawModal';

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
        height:'20rem',
        fontSize: '3rem',
        opacity: '0.7',
        borderRadius: '15px',
    }
});

const MainPage = () => {
    const classes = useStyles();
    const { account } = useAuth();
    const [depositModal, setDepositModal] = useState(false);
    const [withdrawModal, setWithdrawModal] = useState(false);
    const [balance, setBalance] = useState(0);

    const clickDeposit = () => {
        console.log('deposit button clicked.')
        setDepositModal(true);
    }
    const clickWithdraw = () => {
        console.log('withdraw button clicked.')
        setWithdrawModal(true);
    }
    useEffect(() => {
        getBalance(account.username)
            .then((res) => {
                setBalance(res);
            })
    }, []);

    return (
        <div className={classes.mainpage}
            style={{ height: "100%", width: "100%", overflowY: "auto" }}>
            <Stack spacing={2} direction="row">
                <Button variant='contained' color='success' disabled>{balance + 'ETH'}</Button>
                <Button variant="contained" color='success' onClick={clickDeposit}>Deposit</Button>
                <Button variant="contained" color='error' onClick={clickWithdraw}>Withdraw</Button>
            </Stack>
            <div className={classes.mainImg}>
                <div className={classes.container}>
                    <button className = {classes.room}>0.1ETH</button>
                    <button className = {classes.room}>0.2ETH</button>
                    <button className = {classes.room}>0.3ETH</button>
                </div>
            </div>
            <DepositModal
                open={depositModal}
                close={() => setDepositModal(false)}
            />
            <WithdrawModal
                open={withdrawModal}
                close={() => setWithdrawModal(false)}
            />
        </div>
    )
}

export default MainPage;