import { Fragment, useState, useEffect } from "react";
import {
    Dialog,
    DialogTitle,
    TextField,
    Button,
    CircularProgress,
} from "@mui/material";
import './AuthModal.css'
import { makeStyles } from "@material-ui/core/styles";
import { useAuth } from "../../contexts/AuthContext";
import Alert from '@mui/material/Alert';
import { withdraw } from '../../api/UserApi';
import { ToastContainer, toast } from 'react-toastify';
import { getBalance } from "../../api/UserApi";
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles({
    root: {
        borderRadius: 12,
        backgroundColor: "blue",
    },
    regForm: {
        minWidth: "500px",
    },
    regTitle: {},

    conBtn: {
        width: "90%",
        marginLeft: "5%",
    },
    span: {
        width: "80%",
        marginLeft: "10%",
        height: "10px",
    },
});

const textFieldSx = { mx: 2, my: 0.5 };

export default function WithdrawModal({
    open,
    close,
}) {
    const { account } = useAuth();
    const [amount, setAmount] = useState(0.1);
    const [walletBalance, setWalletBalance] = useState();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const classes = useStyles();

    const handleChange = (e) => {
        const newValue = e.target.value;
        setAmount(newValue);
    };

    const clickSubmit = async (e) => {
        try {
            // e.preventDefault();
            // setLoading(true);
            console.log('account: ', account.username, account.walletaddress, amount);
            if (amount > walletBalance) {
                console.log("insufficient amount");
                toast("InSufficient Amount");
            }
            else {
                console.log('waiting for confirm')
                toast("Waiting for confirm")
                await withdraw(account.username, account.walletaddress, amount);
                close();
            }
            // setLoading(false);
        } catch (error) {
            setError(error);
        }
    };

    useEffect(() => {
        getBalance(account.username)
            .then((result) =>
                setWalletBalance(result)
            )
    }, []);
    return (
        <Dialog open={open} onClose={close}
            className="c-modal"
        >
            <WithdrawForm
                classeName={classes.dialog}
                amount={amount}
                message={"Available Maximum Amount is " + walletBalance + " ETH"}
                handleChange={handleChange}
            />
            {error && <span className="error">{error}</span>}

            {loading ? (
                <center>
                    <CircularProgress color="inherit" />
                </center>
            ) : (
                <Button
                    onClick={clickSubmit}
                >
                    Withdraw
                </Button>
            )}
            <ToastContainer />
        </Dialog>
    );
}

function WithdrawForm({ amount, message, handleChange }) {
    const classes = useStyles();

    return (
        <Fragment>
            <BalanceAlert message={message} />
            <div className={classes.regForm}>
                <DialogTitle color="#D42C94">Withdraw</DialogTitle>
            </div>
            <div className={classes.span}></div>
            <TextField
                label="Amount"
                name="amount"
                type="number"
                value={amount}
                onChange={handleChange}
                variant="filled"
                sx={textFieldSx}
                required
            />
        </Fragment>
    );
}

function BalanceAlert(props) {
    return (
        <Fragment>
            <Alert severity="success">{props.message}</Alert>
        </Fragment>
    )
}