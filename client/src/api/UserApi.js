import axios from "../utils/axios";
import { ethers } from 'ethers';
import { HEADER, GAME_ADDRESS } from '../constants';
import toast from "react-hot-toast";
import { getExchangeRate } from "./balanceApi";

const getBalance = async (name) => {
    const result = await axios.get(`/api/balance/${name}`, HEADER());
    return result.data.balance;
}

const getMetamaskBalance = async (_address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    //   const accounts = await provider.send("eth_requestAccounts", []);
    const balance = await provider.getBalance(_address);
    const balanceInEther = ethers.utils.formatEther(balance);
    return balanceInEther;
}

const deposit = async (amount_) => {
    const rate = await getExchangeRate();
    const amount = amount_ / rate;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
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
        await toast.promise(transaction.wait(), {
            loading: `Transaction submitted. Wait for confirmation...`,
            success: 'Transaction confirmed! 👌',
            error: 'Transaction failed! 🤯',
        });
        const result = await transaction.wait();
        if (result.status) {
            const data = {
                amount: amount,
            }
            const res = await axios.post('/api/balance/deposit', data, HEADER());
        }
    }
    catch (error) {
        console.log(error);
    }
}

const withdraw = async (amount) => {
    try {
        console.log('axios amount: ', amount);
        const res = await axios.post('/api/balance/withdraw', { amount: amount }, HEADER());
        console.log('response: ', res);
    } catch (error) {
        console.log(error);
    }
}

export { getMetamaskBalance, deposit, withdraw, getBalance }