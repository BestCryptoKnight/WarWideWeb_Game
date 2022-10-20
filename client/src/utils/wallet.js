import { ethers } from 'ethers';
import { GAME_ADDRESS } from "../constants";
import { toast } from "react-toastify";
import axios from './axios';

const getMetamaskBalance = async (_address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    const balance = await provider.getBalance(_address);
    const balanceInEther = ethers.utils.formatEther(balance);
    console.log('account address and balance: ', { selectedAddress: accounts[0], balance: balanceInEther });
}

const deposit = async (username, amount) => {

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    const gasPrice = await provider.getGasPrice();

    const estimateGas = await provider.estimateGas({
        to: GAME_ADDRESS,
        value: ethers.utils.parseEther(amount.toString()),
    });

    const tx = {
        gasLimit: estimateGas,
        gasPrice: gasPrice,
        to: GAME_ADDRESS,
        value: ethers.utils.parseEther(amount.toString()),
    };

    try {
        const transaction = await signer.sendTransaction(tx);
        toast.promise(transaction.wait(), {
            pending: `Transaction submitted. Wait for confirmation...`,
            success: 'Transaction confirmed! 👌',
            error: 'Transaction failed! 🤯',
        });
        const result = await transaction.wait();
        if (result.status) {
            const data = {
                name: username,
                amount: amount,
            }
            const res = await axios.post('/api/balance/deposit', data);
            console.log('res');
        }
    }
    catch (error) {
        console.log(error);
    }

}

const withdraw = async (name, address, amount) => {
    try {
        const data = {
            name: name,
            address: GAME_ADDRESS,
            amount: amount,
        }
        const result = await axios.post('/api/balance/withdraw', data);
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

export { getMetamaskBalance, deposit, withdraw }