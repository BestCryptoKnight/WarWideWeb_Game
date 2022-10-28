const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();
let buffer = 1500;

const getEthereumPrice = async () => {
    try {
        let data = await CoinGeckoClient.simple.price({
            ids: 'ethereum',
            vs_currencies: 'usd',
        });
        if (data.data.ethereum) {
            buffer = data.data.ethereum.usd;
            return data.data.ethereum.usd;
        }
        else
            return buffer;
    }
    catch (error) {
        console.log('error: ', error);
        if (buffer)
            return 1500
        else
            return buffer
    }
}

const getBuffer = (req, res) => {
    res.json(buffer);
}

async function calcEtherToUsd(etherAmount) {
    const rate = await getEthereumPrice();
    return Math.round(etherAmount * rate);
}

async function calcUsdToEther(usdAmount) {
    const rate = await getEthereumPrice();
    return Math.round(usdAmount / rate * 100000) / 100000;
}

module.exports = {
    getEthereumPrice,
    getBuffer,
    calcUsdToEther,
    calcEtherToUsd,
}