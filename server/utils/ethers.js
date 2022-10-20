import { ethers } from "ethers";

const sendEther = async (to_address, amount) => {

    const ethProvider = new ethers.providers.InfuraProvider("mainnet");

    const wallet = new ethers.Wallet(privateKey, ethProvider);

    const gasPrice = await ethProvider.getGasPrice();

    const estimateGas = await ethProvider.estimateGas({
        to: to_address,
        value: amount,
    });
    
    const estimateTxFee = (gasPrice).mul(estimateGas); // mainnet: GasFee = (baseFee + Tip) * gasUnits ----- EIP1559 formula

    let sendAmount = amount.sub(estimateTxFee);

    console.log("gasPrice", " ", Number(gasPrice));
    console.log("balance:", Number(amount));
    console.log("Send pending =>: " + previousWallet.address + "---> " + to_address + ": " + sendAmount + " fee: " + estimateTxFee);

    const tx = {
        gasLimit: estimateGas,
        gasPrice: gasPrice,
        to: to_address,
        value: sendAmount,
    };

    const txResult = await wallet.sendTransaction(tx);
    const result = await txResult.wait();
    if (result.status) {
        console.log("sending transaction confirmed!");
    }

}

module.exports = sendEther;