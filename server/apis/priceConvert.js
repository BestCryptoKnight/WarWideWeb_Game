const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();
const {ETHERPRICE} = require('../constants')

async function getEthereumPrice() {
    try {
        let data = await CoinGeckoClient.simple.price({
            ids: 'ethereum',
            vs_currencies: 'usd',
        });
        if(data)
            return data.data.ethereum.usd;
    }
    catch (error) {
        console.log('error: ', error);
        return ETHERPRICE
    }
}

module.exports = getEthereumPrice;