import axios from "../utils/axios";
import { ethers } from 'ethers';
import { HEADER, GAME_ADDRESS } from '../constants';
import { getExchangeRate } from "./balanceApi";

const getMetamaskBalance = async (_address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const accounts = await provider.send("eth_requestAccounts", []);
    // const { chainId } = await provider.getNetwork();
    // console.log('chainId: ', chainId)
    // console.log('public key: ', accounts[0]);
    const balance = await provider.getBalance(_address);
    const balanceInEther = ethers.utils.formatEther(balance);
    return balanceInEther;
}

const deposit = async (amount_) => {
    try {
        const rate = await getExchangeRate();
        const amount = amount_ / rate;
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const { chainId } = await provider.getNetwork();
        if (chainId === 1) {
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
            const transaction = await signer.sendTransaction(tx);
            const result = await transaction.wait();
            if (result.status === 1) {
                const res = await axios.post('api/balance/deposit', { amount: amount }, HEADER());
                return res.data;
            }
            else {
                return 'Not succed'
            }
        }
        else {
            return 'not Mainnet'
        }
    }
    catch (error) {
        return (error)
    }
}

const withdraw = async (amount) => {
    try {
        await axios.post('api/balance/withdraw', { amount: amount }, HEADER());
    } catch (error) {
        console.log(error);
    }
}

export { getMetamaskBalance, deposit, withdraw }