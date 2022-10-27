const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();
let buffer = 1500;

async function getEthereumPrice() {
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

module.exports = getEthereumPrice;