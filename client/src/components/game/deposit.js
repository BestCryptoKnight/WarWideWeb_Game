import React, {useState} from 'react';
import Button from '@mui/material/Button';
import DepositModal from '../modals/DepositModal';

const Deposit = () => {
    const [depositModal, setDepositModal] = useState(false);

    const clickDeposit = () => {
        setDepositModal(true);
    }

    return(
        <>
            <Button variant="contained" color='success' onClick={clickDeposit}>Deposit</Button>
            <DepositModal
                open={depositModal}
                close={() => setDepositModal(false)}
            />
        </>
        
    )
}

export default Deposit;