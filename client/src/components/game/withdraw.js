import React, { useState } from 'react';
import Button from '@mui/material/Button';
import WithdrawModal from '../modals/WithdrawModal';

const Withdraw = () => {
    const [withdrawModal, setWithdrawModal] = useState(false);
    const clickWithdraw = () => {
        setWithdrawModal(true);
    }

    return (
        <>
            <Button variant="contained" color='error' onClick={clickWithdraw}>Withdraw</Button>
            <WithdrawModal
                open={withdrawModal}
                close={() => setWithdrawModal(false)}
            />
        </>

    )
}

export default Withdraw;